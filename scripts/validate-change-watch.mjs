#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(resolve(root, "data/ai_tool_changes.json"), "utf8"));
const today = new Date().toISOString().slice(0, 10);
const officialHosts = new Map([
  ["/ai-tools/tools/github-copilot/", ["github.blog", "docs.github.com", "github.com"]],
  ["/ai-tools/tools/cursor/", ["cursor.com", "docs.cursor.com"]],
  ["/ai-tools/tools/replit/", ["docs.replit.com", "replit.com"]]
]);
function date(value) {
  assert.match(value, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(new Date(value).toISOString().slice(0, 10), value, "Invalid calendar date");
  assert(value <= today, "Future dates cannot be presented as checked announcements");
}
date(data.checkedAt);
assert(Array.isArray(data.entries) && data.entries.length > 0);
const ids = new Set();
const watch = readFileSync(resolve(root, "public/ai-tools/review-updates/index.html"), "utf8");
const feed = readFileSync(resolve(root, "public/ai-tools/review-updates/index.xml"), "utf8");
for (const entry of data.entries) {
  for (const field of ["id", "tool", "topic", "title", "summary", "action", "sourceTitle", "sourceUrl", "guide"]) {
    assert(typeof entry[field] === "string" && entry[field].trim(), `Missing ${field}`);
  }
  assert.match(entry.id, /^[a-z0-9-]+$/);
  assert(!ids.has(entry.id), `Duplicate ID: ${entry.id}`);
  ids.add(entry.id);
  date(entry.announcedAt);
  date(entry.checkedAt);
  assert(entry.announcedAt <= entry.checkedAt && entry.checkedAt <= data.checkedAt);
  assert(Number.isInteger(entry.revision) && entry.revision > 0);
  const source = new URL(entry.sourceUrl);
  assert.equal(source.protocol, "https:");
  assert(!source.username && !source.password);
  assert(officialHosts.get(entry.tool)?.includes(source.hostname), `Review official host: ${entry.sourceUrl}`);
  for (const path of [entry.tool, entry.guide]) {
    assert.match(path, /^\/(ai-tools\/tools|guides|use-cases)\/[a-z0-9-]+\/$/);
    assert(existsSync(resolve(root, "public", path.slice(1), "index.html")), `Missing public route: ${path}`);
  }
  assert(watch.includes(`change-${entry.id}`), `Entry excluded from HTML: ${entry.id}`);
  assert(feed.includes(`aiplorer-change:${entry.id}:${entry.revision}`), `Entry excluded from RSS: ${entry.id}`);
}
console.log(`Change Watch: ${ids.size} official-source records passed date, identity, link, HTML, and RSS checks.`);
