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
assert.equal((html.match(/data-practice-pack\b/g) || []).length, 5);
const tasks = [
  ["retest-ai-summaries-with-a-reference-pack", "Summarize notes"],
  ["check-an-ai-rewrite-without-changing-the-promise", "Rewrite a message"],
  ["test-ai-data-extraction-with-missing-values", "Extract a table"],
  ["fix-a-zero-value-default-with-ai", "Test a code fix"],
  ["check-whether-a-citation-supports-a-claim", "Check a citation"],
];
const jumps = [...html.matchAll(/<a\b[^>]*\bdata-practice-task\b[^>]*>[\s\S]*?<\/a>/g)].map(([link]) => link);
assert.equal(jumps.length, 5);
const headings = [...html.matchAll(/<h3\b[^>]*>[\s\S]*?<\/h3>/g)].map(([tag]) => tag);
for (const [slug, label] of tasks) {
  const id = "practice-" + slug;
  assert.equal(jumps.filter(link => attr(link, "href") === "#" + id && link.includes(label)).length, 1);
  const targets = headings.filter(tag => attr(tag, "id") === id);
  assert.equal(targets.length, 1, "One stable target per task");
  assert.equal(attr(targets[0], "tabindex"), "-1", "Keyboard anchor must focus the heading");
  assert(targets[0].includes("/use-cases/" + slug + "/"));
}
const tags = [...html.matchAll(/<a\b[^>]*\bdata-practice-download\b[^>]*>/g)].map(([tag]) => tag);
const hrefs = tags.map(tag => attr(tag, "href"));
const previews = [...html.matchAll(/<details\b[^>]*\bdata-practice-preview=[^>]*>[\s\S]*?<\/details>/g)].map(([tag]) => tag);
assert.equal(previews.length, 5);
const previewPaths = previews.map(tag => attr(tag, "data-practice-preview"));
assert.equal(new Set(previewPaths).size, 5);
for (const preview of previews) {
  const path = attr(preview, "data-practice-preview");
  assert(hrefs.includes(path), "Preview must reference an existing download");
  assert(/(?:-inputs-v1\.txt|\/reminder-days-v1\.mjs)$/.test(path), "Only test input is previewed");
  assert(!/^<details\b[^>]*\bopen(?:[\s=>])/.test(preview), "Preview starts collapsed");
  assert(preview.includes("Preview test input") && preview.includes("aiplorer-visually-hidden"));
  const pre = preview.match(/<pre\b[^>]*>/)?.[0];
  assert(pre && attr(pre, "tabindex") === "0" && attr(pre, "role") === "region");
  assert(attr(pre, "aria-label").startsWith("Test input for "));
  assert(!/<(?:script|iframe)\b/i.test(preview));
  assert(/<div\b[^>]*data-practice-copy-controls\b[^>]*\bhidden(?:[\s=>])/.test(preview));
  const button = preview.match(/<button\b[^>]*data-practice-copy\b[^>]*>/)?.[0];
  assert(button && attr(button, "type") === "button");
  assert(attr(button, "aria-label").startsWith("Copy test input for "));
  const status = preview.match(/<span\b[^>]*data-practice-copy-status\b[^>]*>/)?.[0];
  assert(status && attr(status, "role") === "status" && attr(status, "aria-live") === "polite");
}
assert(html.includes("/js/aiplorer-practice-copy.js?v=20261024a"));
assert.equal(tags.length, 15);
assert.equal(new Set(hrefs).size, 15);
const packs = [
  ["retest-ai-summaries-with-a-reference-pack", "summary"],
  ["check-an-ai-rewrite-without-changing-the-promise", "rewrite"],
  ["test-ai-data-extraction-with-missing-values", "extraction"],
  ["check-whether-a-citation-supports-a-claim", "citation"],
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
const codeRoute = "/use-cases/fix-a-zero-value-default-with-ai/";
for (const file of ["reminder-days-v1.mjs", "reminder-days-v1.test.mjs", "code-check-worksheet-v1.txt"]) {
  assert(tags.some(tag => attr(tag, "href") === codeRoute + file && attr(tag, "download") === file));
  assert.equal(read(`public${codeRoute}${file}`), read(`content${codeRoute}${file}`));
  assert(!read("public/sitemap.xml").includes(codeRoute + file));
}
for (const file of ["public/index.html", "public/guides/index.html", "public/ai-tools/tools/index.html"]) {
  assert(!read(file).includes("data-practice-download"), `Unexpected download shelf: ${file}`);
  assert(!read(file).includes("aiplorer-practice-copy.js"), `Unexpected clipboard script: ${file}`);
}
assert(!read("public/use-cases/fix-a-zero-value-default-with-ai/index.html").includes("aiplorer-practice-copy.js"));
console.log("PASS: five input-only previews with progressive copy controls, fifteen exact native downloads, script scoped to use-cases hub.");
