#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(resolve(root, "data/ai_tool_changes.json"), "utf8"));
// Editorial check dates use Seoul calendar days, including before UTC midnight.
const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit"
}).format(new Date());
const officialHosts = new Map([
  ["/ai-tools/tools/gemini/", ["knowledge.workspace.google.com"]],
  ["/ai-tools/tools/microsoft-copilot/", ["support.microsoft.com"]],
  ["/ai-tools/tools/midjourney/", ["updates.midjourney.com"]],
  ["/ai-tools/tools/leonardo-ai/", ["docs.leonardo.ai"]],
  ["/ai-tools/tools/open-webui/", ["github.com"]],
  ["/ai-tools/tools/frase/", ["www.frase.io"]],
  ["/ai-tools/tools/udio/", ["help.udio.com"]],
  ["/ai-tools/tools/jasper/", ["www.jasper.ai"]],
  ["/ai-tools/tools/tabnine/", ["docs.tabnine.com"]],
  ["/ai-tools/tools/ifttt/", ["www.tp-link.com"]],
  ["/ai-tools/tools/you-com/", ["you.com"]],
  ["/ai-tools/tools/beautiful-ai/", ["www.beautiful.ai"]],
  ["/ai-tools/tools/relay-app/", ["relay.app"]],
  ["/ai-tools/tools/jan/", ["www.jan.ai"]],
  ["/ai-tools/tools/synthesia/", ["help.synthesia.io"]],
  ["/ai-tools/tools/fireflies-ai/", ["fireflies.ai"]],
  ["/ai-tools/tools/otter-ai/", ["otter.ai"]],
  ["/ai-tools/tools/canva-ai/", ["www.canva.com"]],
  ["/ai-tools/tools/photoroom/", ["www.photoroom.com"]],
  ["/ai-tools/tools/figma-ai/", ["www.figma.com"]],
  ["/ai-tools/tools/granola/", ["www.granola.ai"]],
  ["/ai-tools/tools/deepl/", ["www.deepl.com"]],
  ["/ai-tools/tools/zoho-zia/", ["www.zoho.com"]],
  ["/ai-tools/tools/fin/", ["fin.ai"]],
  ["/ai-tools/tools/shopify-sidekick/", ["changelog.shopify.com"]],
  ["/ai-tools/tools/descript/", ["feedback.descript.com"]],
  ["/ai-tools/tools/suno/", ["suno.com"]],
  ["/ai-tools/tools/elevenlabs/", ["elevenlabs.io"]],
  ["/ai-tools/tools/pitch/", ["pitch.com"]],
  ["/ai-tools/tools/gamma/", ["ideas.gamma.app"]],
  ["/ai-tools/tools/grammarly/", ["www.grammarly.com"]],
  ["/ai-tools/tools/consensus/", ["consensus.app"]],
  ["/ai-tools/tools/elicit/", ["elicit.com"]],
  ["/ai-tools/tools/notebooklm/", ["blog.google"]],
  ["/ai-tools/tools/github-copilot/", ["github.blog", "docs.github.com", "github.com"]],
  ["/ai-tools/tools/cursor/", ["cursor.com", "docs.cursor.com", "prod.cursor.com"]],
  ["/ai-tools/tools/windsurf/", ["docs.devin.ai"]],
  ["/ai-tools/tools/replit/", ["docs.replit.com", "replit.com"]],
  ["/ai-tools/tools/notion-ai/", ["www.notion.com"]],
  ["/ai-tools/tools/claude/", ["www.anthropic.com"]],
  ["/ai-tools/tools/perplexity/", ["www.perplexity.ai"]],
  ["/ai-tools/tools/runway/", ["runway.com"]],
  ["/ai-tools/tools/adobe-firefly/", ["blog.adobe.com", "helpx.adobe.com"]],
  ["/ai-tools/tools/lm-studio/", ["lmstudio.ai"]],
  ["/ai-tools/tools/ollama/", ["ollama.com"]],
  ["/ai-tools/tools/make/", ["help.make.com"]],
  ["/ai-tools/tools/n8n/", ["docs.n8n.io"]],
  ["/ai-tools/tools/zapier/", ["community.zapier.com", "help.zapier.com"]]
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
  if (entry.datePrecision === "month") {
    assert.match(entry.announcedAt, /^\d{4}-(0[1-9]|1[0-2])$/);
    assert.equal(entry.dateLabel, "Closed");
    assert(entry.announcedAt <= today.slice(0, 7));
  } else {
    assert(!entry.datePrecision || entry.datePrecision === "day");
    date(entry.announcedAt);
  }
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
