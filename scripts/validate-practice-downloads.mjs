#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = path => readFileSync(new URL(path, root), "utf8");
const html = read("public/use-cases/index.html");
const attr = (tag, name) => {
  const match = tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`));
  return match && (match[1] ?? match[2] ?? match[3]);
};
assert.equal((html.match(/id=["']?practice-downloads\b/g) || []).length, 1);
assert(html.includes("#practice-downloads"));
assert(html.includes("Keep review keys out of the AI conversation"));
assert.equal((html.match(/data-practice-pack\b/g) || []).length, 3);
const tags = [...html.matchAll(/<a\b[^>]*\bdata-practice-download\b[^>]*>/g)].map(([tag]) => tag);
const hrefs = tags.map(tag => attr(tag, "href"));
assert.equal(tags.length, 9);
assert.equal(new Set(hrefs).size, 9);
const packs = [
  ["retest-ai-summaries-with-a-reference-pack", "summary"],
  ["check-an-ai-rewrite-without-changing-the-promise", "rewrite"],
  ["test-ai-data-extraction-with-missing-values", "extraction"],
];
for (const [slug, prefix] of packs) {
  const route = `/use-cases/${slug}/`;
  for (const role of ["inputs", "answer-key", "worksheet"]) {
    const file = `${prefix}-check-${role}-v1.txt`;
    assert(tags.some(tag => attr(tag, "href") === route + file && attr(tag, "download") === file));
    assert.equal(read(`public${route}${file}`), read(`content${route}${file}`));
    assert(!read("public/sitemap.xml").includes(route + file));
  }
}
for (const file of ["public/index.html", "public/guides/index.html", "public/ai-tools/tools/index.html"])
  assert(!read(file).includes("data-practice-download"), `Unexpected download shelf: ${file}`);
console.log("PASS: three reviewed packs, nine unique native downloads with original bytes, no home/guides/tool-index shelf.");
