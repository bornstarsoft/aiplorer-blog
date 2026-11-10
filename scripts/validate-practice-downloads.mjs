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
const tasks = [
  ["retest-ai-summaries-with-a-reference-pack", "Summarize notes"],
  ["check-an-ai-rewrite-without-changing-the-promise", "Rewrite a message"],
  ["test-ai-data-extraction-with-missing-values", "Extract a table"],
  ["fix-a-zero-value-default-with-ai", "Test a code fix"],
  ["check-whether-a-citation-supports-a-claim", "Check a citation"],
  ["check-an-automation-before-retrying", "Check an automation retry"],
  ["check-an-ai-slide-chart-before-sharing", "Review a slide chart"],
  ["check-ai-captions-against-a-reference", "Check captions"],
  ["check-an-ai-schedule-across-time-zones", "Check time zones"],
  ["check-an-ai-redaction-before-sharing", "Check redactions"],
];
assert.equal((html.match(/data-practice-pack\b/g) || []).length, tasks.length);
const jumps = [...html.matchAll(/<a\b[^>]*\bdata-practice-task\b[^>]*>[\s\S]*?<\/a>/g)].map(([link]) => link);
assert.equal(jumps.length, tasks.length);
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
assert.equal(previews.length, tasks.length);
const previewPaths = previews.map(tag => attr(tag, "data-practice-preview"));
assert.equal(new Set(previewPaths).size, tasks.length);
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
assert(html.includes("/js/aiplorer-practice-resume.js?v=20261110d"));
assert.match(html, /<p\b[^>]*data-practice-count\b[^>]*\bhidden(?:[\s=>])/);
assert.equal((html.match(/data-practice-shelf\b/g) || []).length, 1);
assert.match(html, /<div\b[^>]*data-practice-resume\b[^>]*\bhidden(?:[\s=>])/);
const action = html.match(/<a\b[^>]*data-practice-step-download\b[^>]*>/)?.[0];
assert(action && /\bhidden(?:[\s=>])/.test(action) && attr(action, "href") === null);
const nextStep = html.match(/<select\b[^>]*data-practice-next-step\b[^>]*>[\s\S]*?<\/select>/)?.[0];
assert(nextStep);
const options = [...nextStep.matchAll(/<option\b[^>]*>/g)]
  .map(([tag]) => attr(tag, "value") ?? (/\svalue(?=[\s>])/.test(tag) ? "" : null));
assert.deepEqual(options, ["", "input", "review", "compare"]);
assert.match(html, /<label\b[^>]*for=["']?practice-next-step\b[^>]*>Next step<\/label>/);
assert.equal((html.match(/<div\b[^>]*data-practice-save-controls\b[^>]*\bhidden(?:[\s=>])/g) || []).length, tasks.length);
const saveButtons = [...html.matchAll(/<button\b[^>]*\bdata-practice-save\b[^>]*>/g)].map(([tag]) => tag);
assert.equal(saveButtons.length, tasks.length);
for (const tag of saveButtons) {
  assert.equal(attr(tag, "aria-pressed"), "false");
  assert(attr(tag, "aria-label").startsWith("Save pack: "));
}
const packs = [
  ["retest-ai-summaries-with-a-reference-pack", "summary"],
  ["check-an-ai-rewrite-without-changing-the-promise", "rewrite"],
  ["test-ai-data-extraction-with-missing-values", "extraction"],
  ["check-whether-a-citation-supports-a-claim", "citation"],
  ["check-an-automation-before-retrying", "retry"],
  ["check-an-ai-slide-chart-before-sharing", "chart"],
  ["check-ai-captions-against-a-reference", "caption"],
  ["check-an-ai-schedule-across-time-zones", "schedule"],
  ["check-an-ai-redaction-before-sharing", "redaction"],
];
const downloadOrder = new Map();
for (const [pack] of html.matchAll(/<li\b[^>]*data-practice-pack\b[^>]*>[\s\S]*?<\/li>/g)) {
  const heading = pack.match(/<h3\b[^>]*>/)?.[0];
  assert(heading);
  const id = attr(heading, "id");
  assert(!downloadOrder.has(id));
  const mark = pack.match(/<label\b[^>]*data-practice-mark\b[^>]*>\s*(<input\b[^>]*>)/);
  assert(mark && /\bhidden(?:[\s=>])/.test(mark[0]));
  assert.equal(attr(mark[1], "type"), "checkbox");
  assert.match(mark[1], /\bdata-practice-practiced\b/);
  assert(!/\bchecked(?:[\s=>])/.test(mark[1]));
  assert(attr(mark[1], "aria-label").startsWith("Practiced: "));
  downloadOrder.set(id, [...pack.matchAll(/<a\b[^>]*data-practice-download\b[^>]*>/g)]
    .map(([tag]) => attr(tag, "href")));
}
const downloadCount = (packs.length + 1) * 3;
assert.equal(tags.length, downloadCount);
assert.equal(new Set(hrefs).size, downloadCount);
for (const [slug, prefix] of packs) {
  const route = `/use-cases/${slug}/`;
  const roles = ["inputs", "answer-key", "worksheet"];
  assert.deepEqual(downloadOrder.get("practice-" + slug), roles.map(role => route + `${prefix}-check-${role}-v1.txt`));
  for (const role of roles) {
    const file = `${prefix}-check-${role}-v1.txt`;
    assert(tags.some(tag => attr(tag, "href") === route + file && attr(tag, "download") === file));
    assert.equal(read(`public${route}${file}`), read(`content${route}${file}`));
    assert(!read("public/sitemap.xml").includes(route + file));
  }
}
const codeRoute = "/use-cases/fix-a-zero-value-default-with-ai/";
const codeFiles = ["reminder-days-v1.mjs", "reminder-days-v1.test.mjs", "code-check-worksheet-v1.txt"];
assert.deepEqual(downloadOrder.get("practice-fix-a-zero-value-default-with-ai"), codeFiles.map(file => codeRoute + file));
for (const file of codeFiles) {
  assert(tags.some(tag => attr(tag, "href") === codeRoute + file && attr(tag, "download") === file));
  assert.equal(read(`public${codeRoute}${file}`), read(`content${codeRoute}${file}`));
  assert(!read("public/sitemap.xml").includes(codeRoute + file));
}
for (const file of ["public/index.html", "public/guides/index.html", "public/ai-tools/tools/index.html"]) {
  assert(!read(file).includes("data-practice-download"), `Unexpected download shelf: ${file}`);
  assert(!read(file).includes("aiplorer-practice-copy.js"), `Unexpected clipboard script: ${file}`);
  assert(!read(file).includes("aiplorer-practice-resume.js"), `Unexpected practice save script: ${file}`);
}
assert(!read("public/use-cases/fix-a-zero-value-default-with-ai/index.html").includes("aiplorer-practice-copy.js"));
const retryRoute = "/use-cases/check-an-automation-before-retrying/";
const retryArticle = read(`public${retryRoute}index.html`);
assert(!retryArticle.includes("aiplorer-practice-copy.js"));
assert(retryArticle.includes("text-only conversation without connected actions"));
for (const role of ["inputs", "answer-key", "worksheet"]) {
  const file = `retry-check-${role}-v1.txt`;
  assert(retryArticle.includes(retryRoute + file));
}
assert(read("public/use-cases/how-to-test-an-ai-automation-before-relying-on-it/index.html").includes(retryRoute));
const chartRoute = "/use-cases/check-an-ai-slide-chart-before-sharing/";
const chart = read(`public${chartRoute}index.html`);
assert(!chart.includes("aiplorer-practice-resume.js"));
for (const role of ["inputs", "answer-key", "worksheet"])
  assert(chart.includes(chartRoute + `chart-check-${role}-v1.txt`));
assert(read("public/guides/ai-presentation-client-handoff-checklist/index.html").includes(chartRoute));
const captionRoute = "/use-cases/check-ai-captions-against-a-reference/";
const caption = read(`public${captionRoute}index.html`);
assert(!caption.includes("aiplorer-practice-resume.js"));
for (const role of ["inputs", "answer-key", "worksheet"])
  assert(caption.includes(captionRoute + `caption-check-${role}-v1.txt`));
assert(read("public/guides/how-to-use-ai-meeting-tools-responsibly/index.html").includes(captionRoute));
const scheduleRoute = "/use-cases/check-an-ai-schedule-across-time-zones/";
const schedule = read(`public${scheduleRoute}index.html`);
assert(!schedule.includes("aiplorer-practice-resume.js"));
for (const role of ["inputs", "answer-key", "worksheet"]) {
  const file = `schedule-check-${role}-v1.txt`;
  assert(schedule.includes(scheduleRoute + file));
  const contents = read(`public${scheduleRoute}${file}`);
  for (const id of ["SCH-01", "SCH-02", "SCH-03"]) assert(contents.includes(id));
}
assert(read("public/guides/how-to-use-ai-meeting-tools-responsibly/index.html").includes(scheduleRoute));
assert.equal(read("public/sitemap.xml").split(`<loc>https://aiplorer.com${scheduleRoute}</loc>`).length, 2);
const redactionRoute = "/use-cases/check-an-ai-redaction-before-sharing/";
const redaction = read(`public${redactionRoute}index.html`);
assert(!redaction.includes("aiplorer-practice-resume.js"));
for (const role of ["inputs", "answer-key", "worksheet"]) {
  const file = `redaction-check-${role}-v1.txt`;
  assert(redaction.includes(redactionRoute + file));
  for (const id of ["RED-01", "RED-02", "RED-03"]) assert(read(`public${redactionRoute}${file}`).includes(id));
}
const redactionPreview = previews.find(tag => attr(tag, "data-practice-preview") === redactionRoute + "redaction-check-inputs-v1.txt");
assert(redactionPreview.includes("CASE-419") && !redactionPreview.includes("An acceptable replacement"));
assert(!redactionPreview.includes("<a "), "Fictional link must remain inert text");
assert(read("public/guides/review-an-ai-tool-decision-brief-before-sharing/index.html").includes(redactionRoute));
assert.equal(read("public/sitemap.xml").split(`<loc>https://aiplorer.com${redactionRoute}</loc>`).length, 2);
console.log(`PASS: ${tasks.length} input-only previews, ${downloadCount} exact step-ordered downloads, guide entry links, script scoped to use-cases hub.`);
