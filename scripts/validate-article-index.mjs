#!/usr/bin/env node
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const read = path => readFileSync(new URL(path, root), "utf8");
// Use the machine's standard YAML parser, not a front-matter regex parser.
const pages = JSON.parse(execFileSync("ruby", ["-ryaml", "-rdate", "-rjson", "-e", `
  pages = Dir.glob("content/{guides,use-cases}/**/*.md").reject { |p| File.basename(p) == "_index.md" }.map do |path|
    parts = File.read(path).split(/^---[ \\t]*$/, 3)
    raise "Missing YAML front matter: #{path}" unless parts.length == 3
    data = YAML.safe_load(parts[1], permitted_classes: [Date, Time], aliases: false)
    relative = path.sub(/^content\\//, "").sub(/(?:\\/index)?\\.md$/, "")
    if data["slug"]
      relative = relative.sub(/[^\\/]+$/, data["slug"])
    end
    { path: path, route: data["url"] || "/#{relative}/", section: relative.split("/").first,
      title: data["title"], reviewed: data["reviewStatus"] == "reviewed", draft: data["draft"] == true }
  end
  puts JSON.generate(pages)
`], { cwd: fileURLToPath(root), encoding: "utf8" }));

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`));
  return match && (match[1] ?? match[2] ?? match[3]);
}

for (const section of ["guides", "use-cases"]) {
  const html = read(`public/${section}/index.html`);
  const entries = [...html.matchAll(/<a\b[^>]*\bdata-article-index-link\b[^>]*>/g)].map(([tag]) => attr(tag, "href"));
  const expected = pages.filter(p => p.section === section && p.reviewed && !p.draft &&
    existsSync(new URL(`public${p.route}index.html`, root)));
  assert.deepEqual([...entries].sort(), expected.map(p => p.route).sort(), `${section}: index must cover every published reviewed page exactly once`);
  assert.equal(entries.length, new Set(entries).size);
  assert.equal((html.match(/id=["']?all-reviewed-articles\b/g) || []).length, 1);
  assert(html.includes("#all-reviewed-articles"), "Missing stable jump link");
  assert(html.includes("/css/aiplorer-article-index.css?v=20261118b"));
  for (const route of entries) assert(existsSync(new URL(`public${route}index.html`, root)), route);
  console.log(`PASS: ${section} indexes all ${entries.length} published reviewed articles without duplicates.`);
}
const useCases = read("public/use-cases/index.html");
assert(useCases.includes("3 text downloads"), "Make the reference pack's resources visible");
assert(!read("public/index.html").includes("aiplorer-article-index.css"), "Keep new styles off home");
assert(!read("public/ai-tools/tools/index.html").includes("aiplorer-article-index.css"), "Scope styles to article hubs");

const documentPath = "/use-cases/review-an-ai-assisted-document-before-sharing/";
const researchPath = "/use-cases/check-an-ai-research-brief-against-its-sources/";
const shelf = useCases.indexOf("data-practice-shelf");
const recent = useCases.indexOf("practice-recent-title", shelf);
const shelfIntro = useCases.slice(shelf, recent);
const links = html => [...html.matchAll(/<a\b[^>]*>/g)].map(([tag]) => tag);
const pathNav = [...shelfIntro.matchAll(/<nav\b[^>]*>[\s\S]*?<\/nav>/g)]
  .map(([nav]) => nav).find(nav => attr(nav.slice(0, nav.indexOf(">") + 1), "aria-label") === "Practice paths");
assert(pathNav, "Keep the two workflows together in the practice shelf");
assert.deepEqual(links(pathNav).map(tag => attr(tag, "href")), [documentPath, researchPath]);

const home = read("public/index.html");
const sitemap = read("public/sitemap.xml");
function validatePracticePath(route, practiceRoutes, filename) {
  const html = read(`public${route}index.html`);
  assert(!home.includes(route), "Keep the workflow off the homepage");
  const anchors = links(html);
  assert.deepEqual(anchors.map(tag => attr(tag, "href")).filter(href => practiceRoutes.includes(href)), practiceRoutes);
  for (const practice of practiceRoutes) assert(read(`public${practice}index.html`).includes("Download test input"));
  assert(anchors.some(tag => attr(tag, "href") === "/use-cases/#practice-downloads"));
  assert(!html.includes("/js/aiplorer-practice-resume."));
  const download = anchors.find(tag => attr(tag, "download") === filename);
  assert(download && attr(download, "href") === route + filename);
  const content = read(`public${route}${filename}`);
  assert.equal(content, read(`content${route}${filename}`));
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => tag).find(tag => attr(tag, "rel") === "canonical");
  assert.equal(attr(canonical, "href"), "https://aiplorer.com" + route);
  assert.equal(sitemap.split(`<loc>https://aiplorer.com${route}</loc>`).length, 2);
  return content;
}

const checklistText = validatePracticePath(documentPath, [
  "/use-cases/check-an-ai-event-announcement-against-a-brief/",
  "/use-cases/check-an-ai-redaction-before-sharing/",
  "/use-cases/check-an-ai-export-plan-against-delivery-requirements/",
], "public-document-review-v1.txt");
assert.deepEqual(checklistText.match(/^0\d [A-Z ]+$/gm), ["01 FACTS", "02 SHARING SCOPE", "03 FINAL FILE"]);
assert(checklistText.includes("Release decision (Ready / Hold):") && checklistText.includes("When to recheck:"));

const claimLog = validatePracticePath(researchPath, [
  "/use-cases/check-whether-a-citation-supports-a-claim/",
  "/use-cases/check-an-ai-quote-against-a-transcript/",
  "/use-cases/retest-ai-summaries-with-a-reference-pack/",
], "research-claim-log-v1.txt");
for (const field of ["Exact claim in the draft:", "Evidence location (page / section / timestamp):", "Not supported / Unverified", "Recheck when:"]) {
  assert(claimLog.includes(field));
}
console.log("PASS: both practice paths, ordered exercises, exact downloads, and canonicals.");
