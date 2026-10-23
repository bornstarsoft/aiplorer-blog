#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = path => readFileSync(new URL(path, root), "utf8");
const route = "/use-cases/retest-a-saved-ai-tool-after-an-update/";
const guide = read(`public${route}index.html`);
const shortlist = read("public/ai-tools/shortlist/index.html");
const hub = read("public/use-cases/index.html");
const sitemap = read("public/sitemap.xml");
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`));
  return m && (m[1] ?? m[2] ?? m[3]);
};
const links = html => [...html.matchAll(/<a\b[^>]*>/g)].map(([tag]) => attr(tag, "href"));
const packs = [
  "retest-ai-summaries-with-a-reference-pack",
  "check-an-ai-rewrite-without-changing-the-promise",
  "test-ai-data-extraction-with-missing-values",
  "fix-a-zero-value-default-with-ai",
  "check-whether-a-citation-supports-a-claim",
];
const choiceTable = [...guide.matchAll(/<table\b[^>]*>[\s\S]*?<\/table>/g)]
  .map(([table]) => table).find(table => packs.every(slug => table.includes(`/use-cases/${slug}/`)));
assert(choiceTable, "One task-choice table must link all five published packs");
for (const slug of packs) {
  assert(existsSync(new URL(`public/use-cases/${slug}/index.html`, root)));
  assert.equal(links(choiceTable).filter(href => href === `/use-cases/${slug}/`).length, 1);
}
for (const html of [shortlist, guide])
  assert(links(html).includes("/use-cases/#practice-downloads"));
assert.match(hub, /id=["']?practice-downloads\b/);
assert(links(shortlist).includes(route), "Preserve existing retest entry");
assert(links(shortlist).includes("/guides/restart-an-ai-tool-evaluation-without-losing-context/"));
for (const marker of [
  "No Earlier Output? Start A Baseline",
  "remembered result is not a comparable run",
  "first documented baseline",
  "not an observed product result",
]) assert(guide.includes(marker), marker);
const source = read("content" + route.slice(0, -1) + ".md");
assert(source.includes("do not change a local test date merely"));
assert(source.includes("access, permissions or a plan change"));
assert.equal(sitemap.split(`<loc>https://aiplorer.com${route}</loc>`).length - 1, 1);
for (const slug of ["scispace", "tome", "example-ai-assistant"]) {
  assert(!sitemap.includes(`/ai-tools/tools/${slug}/`));
  assert(!existsSync(new URL(`public/ai-tools/tools/${slug}/index.html`, root)));
}
console.log("PASS: shortlist links, five task-matched packs, missing-baseline guidance, stable route and protected drafts.");
