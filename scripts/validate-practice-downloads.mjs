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
  ["check-an-ai-spreadsheet-formula-before-copying-it", "Check a formula"],
  ["check-ai-meeting-actions-against-decisions", "Check meeting actions"],
  ["check-an-ai-video-shot-list-before-sharing", "Review a video shot list"],
  ["check-an-ai-file-handoff-before-switching-tools", "Check a file handoff"],
  ["check-an-ai-tool-comparison-against-test-records", "Check a tool comparison"],
  ["check-an-ai-automation-for-permission-scope", "Check automation permissions"],
  ["check-an-ai-image-edit-against-a-brief", "Check an image edit"],
  ["check-an-ai-audio-cleanup-against-a-brief", "Check audio cleanup"],
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
assert(html.includes("/js/aiplorer-practice-resume.js?v=20261110l"));
assert.match(html, /<a\b[^>]*data-practice-choice-link\b[^>]*>Start selected practice<\/a>/);
assert.match(html, /<p\b[^>]*data-practice-choice-empty\b[^>]*>/);
const emptyChoice = html.match(/<p\b[^>]*data-practice-choice-empty\b[^>]*>/)[0];
assert.equal(attr(emptyChoice, "tabindex"), "-1");
assert.match(html, /<div\b[^>]*data-practice-plan\b[^>]*\bhidden(?:[\s=>])/);
const planStart = html.match(/<a\b[^>]*data-practice-plan-start\b[^>]*>/)?.[0];
assert(planStart && attr(planStart, "href") === null);
assert.match(html, /<button\b[^>]*data-practice-plan-save\b[^>]*\bhidden(?:[\s=>])/);
assert.match(html, /<div\b[^>]*data-practice-chooser\b[^>]*\bhidden(?:[\s=>])/);
assert.match(html, /<label\b[^>]*for=["']?practice-choice\b[^>]*>Choose next practice<\/label>/);
assert.match(html, /<div\b[^>]*data-practice-choice-details\b[^>]*\bhidden(?:[\s=>])/);
const choice = html.match(/<select\b[^>]*data-practice-choice\b[^>]*>[\s\S]*?<\/select>/)?.[0];
assert(choice);
const topics = JSON.parse(read("data/practice_topics.json"));
const groups = [...choice.matchAll(/(<optgroup\b[^>]*>)([\s\S]*?)<\/optgroup>/g)];
assert.deepEqual(groups.map(([, tag]) => attr(tag, "label")), topics.map(topic => topic.label));
const taskLabels = new Map(tasks.map(([slug, label]) => ["practice-" + slug, label]));
const pickerIds = [];
for (const [i, [, , body]] of groups.entries()) {
  const options = [...body.matchAll(/(<option\b[^>]*>)([^<]+)/g)];
  const ids = options.map(([, tag]) => attr(tag, "value"));
  assert.deepEqual(ids.slice().sort(), topics[i].packs.map(slug => "practice-" + slug).sort());
  for (const [, tag, label] of options) assert.equal(label.trim(), taskLabels.get(attr(tag, "value")));
  pickerIds.push(...ids);
}
assert.deepEqual(pickerIds.sort(), [...taskLabels.keys()].sort(), "One picker option per published pack");
assert.match(html, /<div\b[^>]*data-practice-filter-controls\b[^>]*\bhidden(?:[\s=>])/);
assert.match(html, /<label\b[^>]*for=["']?practice-filter\b[^>]*>Show practice packs<\/label>/);
const filter = html.match(/<select\b[^>]*data-practice-filter\b[^>]*>[\s\S]*?<\/select>/)?.[0];
assert(filter);
assert.deepEqual([...filter.matchAll(/<option\b[^>]*>/g)].map(([tag]) => attr(tag, "value")), ["all", "unpracticed", "practiced"]);
assert.match(html, /<p\b[^>]*data-practice-empty\b[^>]*\bhidden(?:[\s=>])/);
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
  ["check-an-ai-spreadsheet-formula-before-copying-it", "formula"],
  ["check-ai-meeting-actions-against-decisions", "action"],
  ["check-an-ai-video-shot-list-before-sharing", "shot"],
  ["check-an-ai-file-handoff-before-switching-tools", "handoff"],
  ["check-an-ai-tool-comparison-against-test-records", "comparison"],
  ["check-an-ai-automation-for-permission-scope", "permission"],
  ["check-an-ai-image-edit-against-a-brief", "image-edit"],
  ["check-an-ai-audio-cleanup-against-a-brief", "audio"],
];
const downloadOrder = new Map();
for (const [pack] of html.matchAll(/<li\b[^>]*data-practice-pack\b[^>]*>[\s\S]*?<\/li>/g)) {
  assert(!/^<li\b[^>]*\bhidden(?:[\s=>])/.test(pack), "Unfiltered list works without JavaScript");
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
  const finish = pack.match(/<button\b[^>]*data-practice-finish\b[^>]*>/)?.[0];
  assert(finish && /\bhidden(?:[\s=>])/.test(finish) && attr(finish, "type") === "button");
  const restart = pack.match(/<button\b[^>]*data-practice-restart\b[^>]*>/)?.[0];
  assert(restart && /\bhidden(?:[\s=>])/.test(restart) && attr(restart, "type") === "button");
  assert(attr(restart, "aria-label").startsWith("Start again: "));
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
const formulaRoute = "/use-cases/check-an-ai-spreadsheet-formula-before-copying-it/";
const formulaArticle = read(`public${formulaRoute}index.html`);
assert(!formulaArticle.includes("aiplorer-practice-resume.js"));
for (const role of ["inputs", "answer-key", "worksheet"]) {
  const file = `formula-check-${role}-v1.txt`;
  assert(formulaArticle.includes(formulaRoute + file));
  for (const id of ["FORM-01", "FORM-02", "FORM-03"]) assert(read(`public${formulaRoute}${file}`).includes(id));
}
const formulaPreview = previews.find(tag => attr(tag, "data-practice-preview") === formulaRoute + "formula-check-inputs-v1.txt");
assert(formulaPreview.includes("FORM-03") && !formulaPreview.includes("ISBLANK"));
assert(read("public/use-cases/test-ai-data-extraction-with-missing-values/index.html").includes(formulaRoute));
assert.equal(read("public/sitemap.xml").split(`<loc>https://aiplorer.com${formulaRoute}</loc>`).length, 2);
const actionRoute = "/use-cases/check-ai-meeting-actions-against-decisions/";
const actionArticle = read(`public${actionRoute}index.html`);
assert(!actionArticle.includes("aiplorer-practice-resume.js"));
for (const role of ["inputs", "answer-key", "worksheet"]) {
  const file = `action-check-${role}-v1.txt`;
  assert(actionArticle.includes(actionRoute + file));
  for (const id of ["ACT-01", "ACT-02", "ACT-03"]) assert(read(`public${actionRoute}${file}`).includes(id));
}
const actionPreview = previews.find(tag => attr(tag, "data-practice-preview") === actionRoute + "action-check-inputs-v1.txt");
assert(actionPreview.includes("ACT-03") && !actionPreview.includes("Equivalent wording"));
assert(read("public/use-cases/how-to-turn-ai-meeting-notes-into-action-items/index.html").includes(actionRoute));
assert.equal(read("public/sitemap.xml").split(`<loc>https://aiplorer.com${actionRoute}</loc>`).length, 2);
const shotRoute = "/use-cases/check-an-ai-video-shot-list-before-sharing/";
const shotArticle = read(`public${shotRoute}index.html`);
assert(!shotArticle.includes("aiplorer-practice-resume.js"));
for (const role of ["inputs", "answer-key", "worksheet"]) {
  const file = `shot-check-${role}-v1.txt`;
  assert(shotArticle.includes(shotRoute + file));
  for (const id of ["SHOT-01", "SHOT-02", "SHOT-03"]) assert(read(`public${shotRoute}${file}`).includes(id));
}
const shotPreview = previews.find(tag => attr(tag, "data-practice-preview") === shotRoute + "shot-check-inputs-v1.txt");
assert(shotPreview.includes("TMP-03") && !shotPreview.includes("Keep this file out of the test conversation"));
assert(read("public/use-cases/plan-a-product-video-without-inventing-claims/index.html").includes(shotRoute));
assert.equal(read("public/sitemap.xml").split(`<loc>https://aiplorer.com${shotRoute}</loc>`).length, 2);
const handoffRoute = "/use-cases/check-an-ai-file-handoff-before-switching-tools/";
const handoffArticle = read(`public${handoffRoute}index.html`);
assert(!handoffArticle.includes("aiplorer-practice-resume.js"));
for (const role of ["inputs", "answer-key", "worksheet"]) {
  const file = `handoff-check-${role}-v1.txt`;
  assert(handoffArticle.includes(handoffRoute + file));
  for (const id of ["HAND-01", "HAND-02", "HAND-03"]) assert(read(`public${handoffRoute}${file}`).includes(id));
}
const handoffPreview = previews.find(tag => attr(tag, "data-practice-preview") === handoffRoute + "handoff-check-inputs-v1.txt");
assert(handoffPreview.includes("Access denied") && !handoffPreview.includes("Do not claim corruption was diagnosed"));
assert(read("public/guides/keep-your-work-portable-when-an-ai-service-changes/index.html").includes(handoffRoute));
assert.equal(read("public/sitemap.xml").split(`<loc>https://aiplorer.com${handoffRoute}</loc>`).length, 2);
const comparisonRoute = "/use-cases/check-an-ai-tool-comparison-against-test-records/";
const comparisonArticle = read(`public${comparisonRoute}index.html`);
assert(!comparisonArticle.includes("aiplorer-practice-resume.js"));
for (const role of ["inputs", "answer-key", "worksheet"]) {
  const file = `comparison-check-${role}-v1.txt`;
  assert(comparisonArticle.includes(comparisonRoute + file));
  for (const id of ["CMP-01", "CMP-02", "CMP-03"]) assert(read(`public${comparisonRoute}${file}`).includes(id));
}
const comparisonPreview = previews.find(tag => attr(tag, "data-practice-preview") === comparisonRoute + "comparison-check-inputs-v1.txt");
assert(comparisonPreview.includes("No matched-input run") && !comparisonPreview.includes("Keep this file out of the test conversation"));
assert(read("public/use-cases/compare-two-ai-tools-when-results-disagree/index.html").includes(comparisonRoute));
assert.equal(read("public/sitemap.xml").split(`<loc>https://aiplorer.com${comparisonRoute}</loc>`).length, 2);
const permissionRoute = "/use-cases/check-an-ai-automation-for-permission-scope/";
const permissionArticle = read(`public${permissionRoute}index.html`);
assert(!permissionArticle.includes("aiplorer-practice-resume.js"));
for (const role of ["inputs", "answer-key", "worksheet"]) {
  const file = `permission-check-${role}-v1.txt`;
  assert(permissionArticle.includes(permissionRoute + file));
  for (const id of ["PERM-01", "PERM-02", "PERM-03"]) assert(read(`public${permissionRoute}${file}`).includes(id));
}
const permissionPreview = previews.find(tag => attr(tag, "data-practice-preview") === permissionRoute + "permission-check-inputs-v1.txt");
assert(permissionPreview.includes("Demo Inputs") && !permissionPreview.includes("Keep this file out of the test conversation"));
assert(read("public/guides/review-connected-ai-app-permissions/index.html").includes(permissionRoute));
assert.equal(read("public/sitemap.xml").split(`<loc>https://aiplorer.com${permissionRoute}</loc>`).length, 2);
const imageEditRoute = "/use-cases/check-an-ai-image-edit-against-a-brief/";
const imageEditArticle = read(`public${imageEditRoute}index.html`);
assert(!imageEditArticle.includes("aiplorer-practice-resume.js"));
for (const role of ["inputs", "answer-key", "worksheet"]) {
  const file = `image-edit-check-${role}-v1.txt`;
  assert(imageEditArticle.includes(imageEditRoute + file));
  for (const id of ["IMG-01", "IMG-02", "IMG-03"]) assert(read(`public${imageEditRoute}${file}`).includes(id));
}
const imageEditPreview = previews.find(tag => attr(tag, "data-practice-preview") === imageEditRoute + "image-edit-check-inputs-v1.txt");
assert(imageEditPreview.includes("Batch 04") && !imageEditPreview.includes("Keep this file out of the test conversation"));
assert(read("public/guides/how-to-plan-a-multimodal-ai-creative-workflow/index.html").includes(imageEditRoute));
assert.equal(read("public/sitemap.xml").split(`<loc>https://aiplorer.com${imageEditRoute}</loc>`).length, 2);
const audioRoute = "/use-cases/check-an-ai-audio-cleanup-against-a-brief/";
const audioArticle = read(`public${audioRoute}index.html`);
assert(!audioArticle.includes("aiplorer-practice-resume.js"));
for (const role of ["inputs", "answer-key", "worksheet"]) {
  const file = `audio-check-${role}-v1.txt`;
  assert(audioArticle.includes(audioRoute + file));
  for (const id of ["AUD-01", "AUD-02", "AUD-03"]) assert(read(`public${audioRoute}${file}`).includes(id));
}
const audioPreview = previews.find(tag => attr(tag, "data-practice-preview") === audioRoute + "audio-check-inputs-v1.txt");
assert(audioPreview.includes("00:02.600") && !audioPreview.includes("Keep this file out of the test conversation"));
assert(read("public/guides/how-to-plan-a-multimodal-ai-creative-workflow/index.html").includes(audioRoute));
assert.equal(read("public/sitemap.xml").split(`<loc>https://aiplorer.com${audioRoute}</loc>`).length, 2);
console.log(`PASS: ${tasks.length} input-only previews, ${downloadCount} exact step-ordered downloads, guide entry links, script scoped to use-cases hub.`);
