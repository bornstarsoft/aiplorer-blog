import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = path => readFileSync(resolve(root, path), "utf8");
const data = JSON.parse(read("data/ai_tool_changes.json"));
const entry = data.entries.find(e => e.id === "relay-app-shutdown-2026-09");
assert.equal(entry.announcedAt, "2026-09");
assert.equal(entry.datePrecision, "month");
assert.equal(entry.dateLabel, "Closed");
for (const path of ["index.html", "ai-tools/tools/index.html",
  "ai-tools/automation-tools/index.html", "ai-tools/shortlist/index.html",
  "ai-tools/tools/relay-app/index.html"]) {
  assert(read("public/" + path).includes("Relay.app (Discontinued)"), path);
}
const tool = read("public/ai-tools/tools/relay-app/index.html");
assert(tool.includes("Official closure notice"));
assert(tool.includes("September 2026"));
assert(!tool.includes("Existing workflows remain available"));
assert(!tool.includes("September 14, 2026"));
const watch = read("public/ai-tools/review-updates/index.html");
assert(watch.includes("exact day not published"));
const feed = read("public/ai-tools/review-updates/index.xml");
const item = feed.match(/<item>[\s\S]*?<\/item>/g).find(i => i.includes(entry.id));
assert(item);
assert(!item.includes("<pubDate>"), "Month-only closure must not invent an RSS day");
assert(item.includes("September 2026"));
assert(read("public/sitemap.xml").includes("/ai-tools/tools/relay-app/"));
console.log("Relay closure: archive route, list labels, month precision and RSS passed.");
