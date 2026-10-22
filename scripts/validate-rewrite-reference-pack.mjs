#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const route = "/use-cases/check-an-ai-rewrite-without-changing-the-promise/";
const read = path => readFileSync(new URL(path, root), "utf8");
const files = ["inputs", "answer-key", "worksheet"].map(type => `rewrite-check-${type}-v1.txt`);
const html = read(`public${route}index.html`);
const sitemap = read("public/sitemap.xml");
const attr = (tag, name) => {
  const match = tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`));
  return match && (match[1] ?? match[2] ?? match[3]);
};
const downloads = [...html.matchAll(/<a\b[^>]*\bdownload=[^>]*>/g)].map(([tag]) => tag);
assert.equal(downloads.length, 3);
for (const file of files) {
  const source = read(`content${route}${file}`);
  assert.match(source, /^Aiplorer Rewrite Reference Pack \| Version 1/);
  assert.equal(read(`public${route}${file}`), source, `Changed download bytes: ${file}`);
  assert(downloads.some(tag => attr(tag, "href") === route + file && attr(tag, "download") === file));
  assert(!sitemap.includes(route + file), "Downloads must not be sitemap pages");
}
const input = read(`content${route}${files[0]}`);
const key = read(`content${route}${files[1]}`);
for (const text of [input, key]) {
  assert.deepEqual([...text.matchAll(/^CASE (W-\d+):/gm)].map(m => m[1]), ["W-01", "W-02", "W-03"]);
  for (const fact of ["12 November 2026", "10 November 2026", "USD 480", "one draft and one revision", "preview-A.png"])
    assert(text.includes(fact), `Missing reference fact: ${fact}`);
}
assert(!input.includes("REQUIRED MEANING") && !input.includes("FAILURE EXAMPLES"));
assert.match(key, /Do not include in model input/);
assert.match(read(`content${route}${files[2]}`), /RUN A[\s\S]*RUN B[\s\S]*DECISION AND NEXT VISIT/);
assert(sitemap.includes(`https://aiplorer.com${route}`));
const index = read("public/use-cases/index.html");
const entry = [...index.matchAll(/<li\b[^>]*data-article-index-entry[^>]*>[\s\S]*?<\/li>/g)].find(([row]) => row.includes(route));
assert(entry && entry[0].includes("3 text downloads"), "Show pack resources in complete article index");
for (const slug of ["scispace", "tome", "example-ai-assistant"]) {
  assert(!sitemap.includes(`/ai-tools/tools/${slug}/`));
  assert(!existsSync(new URL(`public/ai-tools/tools/${slug}/index.html`, root)));
}
console.log("PASS: rewrite pack facts and separate answers; three exact downloads; index discovery; production draft exclusion.");
