#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const route = "/use-cases/test-ai-data-extraction-with-missing-values/";
const read = path => readFileSync(new URL(path, root), "utf8");
const files = ["inputs", "answer-key", "worksheet"].map(role => `extraction-check-${role}-v1.txt`);
const article = read(`content${route}index.md`);
const html = read(`public${route}index.html`);
const sitemap = read("public/sitemap.xml");
const input = read(`content${route}${files[0]}`);
const key = read(`content${route}${files[1]}`);
const worksheet = read(`content${route}${files[2]}`);
const attr = (tag, name) => {
  const match = tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`));
  return match && (match[1] ?? match[2] ?? match[3]);
};
const downloads = [...html.matchAll(/<a\b[^>]*\bdownload=[^>]*>/g)].map(([tag]) => tag);
assert.equal(downloads.length, 3);
for (const file of files) {
  assert.equal(read(`public${route}${file}`), read(`content${route}${file}`));
  assert(downloads.some(tag => attr(tag, "href") === route + file && attr(tag, "download") === file));
  assert(!sitemap.includes(route + file));
}
const sourceRows = input.split("\n").filter(line => /^R-\d+:/.test(line));
assert.equal(sourceRows.length, 3);
for (const line of sourceRows) assert(article.includes(line), "Article and download sources must agree");
const instruction = input.split("INSTRUCTION\n")[1].split("\n\nSOURCE REQUESTS")[0];
assert(article.includes(instruction), "Article and download instructions must agree");
const rows = key.split("\n").filter(line => /^R-\d+ \|/.test(line)).map(line => line.split(" | "));
assert.deepEqual(rows, [
  ["R-01", "Mia", "Not stated", "Not stated", "No owner or deadline agreed."],
  ["R-02", "Not stated", "Leo", "14 November 2026", "None stated."],
  ["R-03", "Not stated", "Not stated", "Not stated", "Priya proposed 18 November 2026 for the demo; unconfirmed."],
]);
assert(!input.includes("EXPECTED ROWS") && !input.includes("FIELD CHECKS"));
assert(key.includes("Do not include in model input"));
assert.match(worksheet, /RUN A[\s\S]*RUN B[\s\S]*DECISION AND NEXT VISIT/);
for (const id of ["R-01", "R-02", "R-03"])
  assert.equal(worksheet.split(id + " outcome").length - 1, 2);
assert.equal(sitemap.split(`<loc>https://aiplorer.com${route}</loc>`).length - 1, 1);
const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => tag).find(tag => attr(tag, "rel") === "canonical");
assert.equal(attr(canonical, "href"), "https://aiplorer.com" + route);
assert(!existsSync(new URL("content/use-cases/test-ai-data-extraction-with-missing-values.md", root)));
const index = read("public/use-cases/index.html");
const entry = [...index.matchAll(/<li\b[^>]*data-article-index-entry[^>]*>[\s\S]*?<\/li>/g)].find(([row]) => row.includes(route));
assert(entry && entry[0].includes("3 text downloads"));
for (const slug of ["scispace", "tome", "example-ai-assistant"]) {
  assert(!sitemap.includes(`/ai-tools/tools/${slug}/`));
  assert(!existsSync(new URL(`public/ai-tools/tools/${slug}/index.html`, root)));
}
console.log("PASS: extraction inputs, expected rows, two-run worksheet, exact downloads, stable canonical/route and draft exclusion.");
