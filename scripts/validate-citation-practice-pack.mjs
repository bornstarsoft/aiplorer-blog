#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const route = "/use-cases/check-whether-a-citation-supports-a-claim/";
const read = path => readFileSync(new URL(path, root), "utf8");
const files = ["inputs", "answer-key", "worksheet"].map(role => `citation-check-${role}-v1.txt`);
const article = read(`content${route}index.md`);
const html = read(`public${route}index.html`);
const sitemap = read("public/sitemap.xml");
const [input, key, worksheet] = files.map(file => read(`content${route}${file}`));
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
const excerpts = input.split("\n").filter(line => /^SOURCE-[A-Z]:/.test(line));
assert.equal(excerpts.length, 2);
for (const line of excerpts) assert(article.includes(line), "Article must preserve the download's exact source text");
assert(!input.includes("SOURCE-C:"), "Missing-source case must remain missing");
const instruction = input.split("INSTRUCTION\n")[1].split("\n\nSOURCE EXCERPTS")[0];
assert(article.includes(instruction));
const claims = input.split("\n").filter(line => /^C-\d+:/.test(line));
assert.equal(claims.length, 3);
for (const line of claims) assert(article.includes(line.split(": ")[1]));
assert.deepEqual(key.split("\n").filter(line => /^C-\d+ \|/.test(line)), [
  "C-01 | SOURCE-A | supported",
  "C-02 | SOURCE-B | not supported",
  "C-03 | SOURCE-C | source missing",
]);
const sourceText = excerpts.join("\n");
for (const [, quote] of key.matchAll(/"([^"]+)"/g)) assert(sourceText.includes(quote), "Review-key quotations must exist in the inputs");
assert(!input.includes("EXPECTED OUTCOMES") && !input.includes("CASE CHECKS"));
assert(key.includes("Do not include in model input"));
assert(key.includes("does not establish that no audit exists"));
assert.match(worksheet, /RUN A[\s\S]*RUN B[\s\S]*DECISION AND NEXT VISIT/);
for (const id of ["C-01", "C-02", "C-03"])
  assert.equal(worksheet.split(id + " outcome").length - 1, 2);
assert(article.includes("not a vendor benchmark"));
assert(article.includes("not real papers"));
assert.equal(sitemap.split(`<loc>https://aiplorer.com${route}</loc>`).length - 1, 1);
const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => tag).find(tag => attr(tag, "rel") === "canonical");
assert.equal(attr(canonical, "href"), "https://aiplorer.com" + route);
const index = read("public/use-cases/index.html");
const entry = [...index.matchAll(/<li\b[^>]*data-article-index-entry[^>]*>[\s\S]*?<\/li>/g)].find(([row]) => row.includes(route));
assert(entry && entry[0].includes("3 text downloads"));
for (const slug of ["scispace", "tome", "example-ai-assistant", "clipdrop", "julius-ai", "rows", "polymer", "obviously-ai"]) {
  assert(!sitemap.includes(`/ai-tools/tools/${slug}/`));
  assert(!existsSync(new URL(`public/ai-tools/tools/${slug}/index.html`, root)));
}
console.log("PASS: citation evidence, three outcomes, two-run worksheet, exact downloads, canonical, index and eight protected drafts.");
