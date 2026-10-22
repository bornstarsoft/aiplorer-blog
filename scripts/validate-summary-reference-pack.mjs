#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const route = "/use-cases/retest-ai-summaries-with-a-reference-pack/";
const source = `content${route}`;
const read = path => readFileSync(new URL(path, root), "utf8");
const files = ["inputs", "answer-key", "worksheet"].map(type => `summary-check-${type}-v1.txt`);
const html = read(`public${route}index.html`);
const sitemap = read("public/sitemap.xml");

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`));
  return match && (match[1] ?? match[2] ?? match[3]);
}
const downloads = [...html.matchAll(/<a\b[^>]*\bdownload=[^>]*>/g)].map(([tag]) => tag);
assert.equal(downloads.length, 3, "Offer exactly three separate native downloads");
for (const file of files) {
  const original = read(source + file);
  assert.match(original, /Aiplorer Summary Reference Pack \| Version 1/);
  assert.equal(read(`public${route}${file}`), original, `Download bytes changed: ${file}`);
  assert(downloads.some(tag => attr(tag, "href") === route + file && attr(tag, "download") === file));
  assert(!sitemap.includes(route + file), "Text resources are not sitemap pages");
}
const input = read(source + files[0]), key = read(source + files[1]);
assert.equal((input.match(/^CASE S-0[123]:/gm) || []).length, 3);
const sourceIDs = [...input.matchAll(/^\[(S-0[123][abc])\]/gm)].map(m => m[1]);
assert.equal(sourceIDs.length, 9);
assert.equal(new Set(sourceIDs).size, 9, "Source IDs must be unique");
for (const id of sourceIDs) assert(key.includes(id), `Missing answer coverage: ${id}`);
for (const [, id] of key.matchAll(/\b(S-0[123][abc])\b/g)) assert(sourceIDs.includes(id));
assert(!input.includes("REQUIRED MEANING") && !input.includes("FAILURE EXAMPLES"), "Keep answers out of input");
assert.match(key, /Do not include in model input/);
assert.match(read(source + files[2]), /RUN A[\s\S]*RUN B[\s\S]*DECISION AND NEXT VISIT/);
assert(sitemap.includes(`https://aiplorer.com${route}`));
assert(read("public/use-cases/index.html").includes(route), "Pack must be discoverable in Use Cases");
for (const page of ["retest-a-saved-ai-tool-after-an-update", "test-ai-data-extraction-with-missing-values"]) {
  assert(read(`public/use-cases/${page}/index.html`).includes(route), `Missing entry link: ${page}`);
}
console.log("PASS: three versioned downloads match source; nine source IDs covered; answers separate; article and entry links published.");
