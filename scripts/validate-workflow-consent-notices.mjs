#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = path => readFileSync(resolve(root, path), "utf8");
const entries = JSON.parse(read("data/ai_tool_changes.json")).entries;
const sunset = entries.find(entry => entry.id === "pipedream-workflows-sunset-notice-checked-2026-10-15");
assert(sunset);
assert.equal(sunset.dateLabel, "Notice checked");
assert.equal(sunset.announcedAt, sunset.checkedAt);
assert.match(sunset.summary, /Connect is unaffected/);
const pipedream = read("content/ai-tools/tools/pipedream.md");
assert.match(pipedream, /^draft: false$/m);
assert(!pipedream.includes('serviceStatus: "discontinued"'));
assert(!read("layouts/partials/aiplorer-workflow-collections.html").includes('"Pipedream"'));
for (const route of ["ai-tools/tools/pipedream", "ai-tools/tools", "ai-tools/automation-tools"]) {
  assert(read(`public/${route}/index.html`).includes("Pipedream Workflows and String close March 31, 2027."), route);
}
const tool = read("public/ai-tools/tools/pipedream/index.html");
assert(tool.includes("April 30, 2027"));
assert(tool.includes("manifest warnings"));
assert(tool.includes("not a one-click import"));
const speechify = read("public/ai-tools/tools/speechify/index.html");
assert(speechify.includes("Voice Cloning Consent Migration"));
assert(speechify.includes("Existing cloned voices and synthesis calls are unaffected"));
console.log("Workflow/consent notices: scoped sunset, checked-date label, list copy, migration cautions and voice scope passed.");
