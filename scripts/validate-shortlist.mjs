#!/usr/bin/env node
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const publicRoot = new URL("../public/", import.meta.url);
const shortlist = readFileSync(new URL("ai-tools/shortlist/index.html", publicRoot), "utf8");
const directory = readFileSync(new URL("ai-tools/tools/index.html", publicRoot), "utf8");

function attributeValues(html, name) {
  const pattern = new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "g");
  return [...html.matchAll(pattern)].map((match) => match[1] ?? match[2] ?? match[3]);
}

const savedPaths = attributeValues(shortlist, "data-shortlist-item");
const reviewedPaths = attributeValues(directory, "data-tool-path");
assert(savedPaths.length > 0, "No reviewed shortlist candidates were rendered");
assert.equal(savedPaths.length, new Set(savedPaths).size, "Duplicate shortlist candidates");
assert.deepEqual(savedPaths.sort(), reviewedPaths.sort(), "Shortlist and reviewed directory must use the same tools");

for (const hook of [
  "data-shortlist-visible-summary", "data-shortlist-filter-label", "data-shortlist-stage-filter",
  "data-shortlist-test-date-filter", "data-shortlist-next-check", "data-shortlist-review-pulse",
  "data-shortlist-export", "data-shortlist-export-brief", "data-shortlist-import",
  "data-shortlist-clear", "data-candidate-note-input", "data-candidate-test-date-input",
  "data-trial-check", "data-shortlist-status"
]) {
  assert(new RegExp(`\\b${hook}(?:[\\s=>])`).test(shortlist), `Missing control: ${hook}`);
}

const filters = shortlist.indexOf("aiplorer-shortlist-filters");
const grid = shortlist.indexOf("data-shortlist-grid");
const utilities = shortlist.indexOf("aiplorer-shortlist__utilities");
const backup = shortlist.indexOf("data-shortlist-backup");
assert(filters >= 0 && filters < grid && grid < utilities && utilities < backup,
  "Saved tools must follow filters and precede optional management panels");
assert.equal((shortlist.match(/<details\b/g) || []).length, savedPaths.length + 4,
  "Keep per-tool evaluation plus filters, progress, backup, and privacy disclosures");
assert(shortlist.includes("Privacy and review notes"), "Privacy notes must remain accessible");
assert(shortlist.includes("/ai-tools/compare/?view=shortlist"), "Saved comparison link is missing");

const source = readFileSync(new URL("../static/js/aiplorer-shortlist-announcements.js", import.meta.url));
const scriptPath = "js/aiplorer-shortlist-announcements." + createHash("sha256").update(source).digest("hex") + ".js";
assert(shortlist.includes("/" + scriptPath));
assert.deepEqual(readFileSync(new URL(scriptPath, publicRoot)), source);
const home = readFileSync(new URL("index.html", publicRoot), "utf8");
assert(!home.includes(scriptPath) && !home.includes("data-shortlist-follow-queue"));
assert(/<p\b[^>]*data-shortlist-follow-summary\b[^>]*\bhidden(?=[\s=>])[^>]*>/.test(shortlist));
const queue = shortlist.match(/<a\b[^>]*data-shortlist-follow-queue\b[^>]*>/)?.[0];
assert(queue, "No saved-tool follow-up link");
function followUrl(tag) {
  const href = attributeValues(tag, "href")[0].replaceAll("&amp;", "&");
  const url = new URL(href, "https://aiplorer.com");
  assert.equal(url.origin, "https://aiplorer.com");
  assert.equal(url.pathname, "/ai-tools/review-updates/");
  assert.equal(url.hash, "#tool-changes");
  assert.equal(url.searchParams.get("followup"), "1");
  assert.equal(url.searchParams.has("unread"), false);
  return url;
}
assert.equal(followUrl(queue).searchParams.get("changesSaved"), "1");
const followLinks = [...shortlist.matchAll(/<a\b[^>]*data-announcement-follow-link\b[^>]*>/g)].map(([tag]) => tag);
const announcements = JSON.parse(readFileSync(new URL("../data/ai_tool_changes.json", import.meta.url), "utf8")).entries;
assert.deepEqual(followLinks.map(tag => {
  assert(/\bhidden(?=[\s=>])/.test(tag));
  return "/ai-tools/tools/" + followUrl(tag).searchParams.get("tool") + "/";
}).sort(), [...new Set(announcements.map(entry => entry.tool))].sort());

console.log(`PASS: shortlist retains ${savedPaths.length} reviewed candidates, evaluation/backup controls, and tools-first layout.`);
