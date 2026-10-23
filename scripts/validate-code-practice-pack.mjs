#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const route = "/use-cases/fix-a-zero-value-default-with-ai/";
const read = path => readFileSync(new URL(path, root), "utf8");
const files = ["reminder-days-v1.mjs", "reminder-days-v1.test.mjs", "code-check-worksheet-v1.txt"];
const html = read(`public${route}index.html`);
const sitemap = read("public/sitemap.xml");
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`));
  return m && (m[1] ?? m[2] ?? m[3]);
};
const links = [...html.matchAll(/<a\b[^>]*\bdownload=[^>]*>/g)].map(([tag]) => tag);
assert.equal(links.length, 3);
for (const file of files) {
  assert.equal(read(`public${route}${file}`), read(`content${route}${file}`));
  assert(links.some(tag => attr(tag, "href") === route + file && attr(tag, "download") === file));
  assert(!sitemap.includes(route + file));
}
for (const [tag] of html.matchAll(/<script\b[^>]*>/g))
  assert(!files.some(file => (attr(tag, "src") || "").includes(file)), "Practice code must not run in the browser");
assert(html.includes("first run should fail on zero"));
assert.equal(sitemap.split(`<loc>https://aiplorer.com${route}</loc>`).length - 1, 1);
const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => tag).find(tag => attr(tag, "rel") === "canonical");
assert.equal(attr(canonical, "href"), "https://aiplorer.com" + route);
assert(!existsSync(new URL("content/use-cases/fix-a-zero-value-default-with-ai.md", root)));
assert.match(read(`content${route}${files[2]}`), /RUN A[\s\S]*RUN B[\s\S]*DECISION AND NEXT VISIT/);

// Run the shipped harness against the original and contract-breaking mutations.
const temp = mkdtempSync(join(tmpdir(), "aiplorer-code-check-"));
try {
  writeFileSync(join(temp, files[1]), read(`content${route}${files[1]}`));
  const run = source => {
    writeFileSync(join(temp, files[0]), source);
    const result = spawnSync(process.execPath, [files[1]], { cwd: temp, encoding: "utf8", timeout: 5000 });
    assert(!result.error, result.error?.message);
    return result;
  };
  const original = run(read(`content${route}${files[0]}`));
  assert.equal(original.status, 1);
  assert(original.stderr.includes("preserve a valid zero"));
  const fixed = run("export const reminderDays = value => value ?? 7;");
  assert.equal(fixed.status, 0);
  assert(fixed.stdout.includes("PASS: all five checks passed"));
  const mutations = [
    ["value === 1 ? 7 : value ?? 7", "preserve one day"],
    ["value === 14 ? 7 : value ?? 7", "preserve fourteen days"],
    ["value === null ? 0 : value ?? 7", "default null to seven"],
    ["value === undefined ? 0 : value ?? 7", "default an omitted argument to seven"],
  ];
  for (const [expression, message] of mutations) {
    const result = run(`export const reminderDays = value => ${expression};`);
    assert.equal(result.status, 1, expression);
    assert(result.stderr.includes(message), expression);
  }
} finally {
  rmSync(temp, { recursive: true, force: true });
}
console.log("PASS: original fails, fix passes, four other contract regressions fail; exact downloads, stable URL and no browser execution.");
