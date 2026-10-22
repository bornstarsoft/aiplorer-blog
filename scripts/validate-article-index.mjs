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
  assert(html.includes("/css/aiplorer-article-index.css?v=20261023a"));
  for (const route of entries) assert(existsSync(new URL(`public${route}index.html`, root)), route);
  console.log(`PASS: ${section} indexes all ${entries.length} published reviewed articles without duplicates.`);
}
const useCases = read("public/use-cases/index.html");
assert(useCases.includes("3 text downloads"), "Make the reference pack's resources visible");
assert(!read("public/index.html").includes("aiplorer-article-index.css"), "Keep new styles off home");
assert(!read("public/ai-tools/tools/index.html").includes("aiplorer-article-index.css"), "Scope styles to article hubs");
