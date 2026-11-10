import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = readFileSync(new URL("../static/js/aiplorer-practice-resume.js", import.meta.url), "utf8");
const key = "aiplorer-practice-resume-v1";
const practicedKey = "aiplorer-practiced-packs-v1";
const planKey = "aiplorer-practice-next-pack-v1";
const chartId = "practice-chart";
const retryId = "practice-retry";
const thirdId = "practice-third";

function node(properties = {}) {
  const attributes = new Map();
  return {
    hidden: true, textContent: "", ...properties,
    getAttribute: name => attributes.get(name),
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: name => attributes.delete(name),
    addEventListener(name, handler) { this[name] = handler; },
  };
}

function pack(id, title) {
  const heading = node({ id, textContent: title });
  const task = node({ hidden: false });
  task.setAttribute("href", "#" + id);
  const controls = node();
  const button = node();
  const status = node();
  const mark = node();
  const practiced = node({ checked: false });
  const summary = node({ focus() { this.focused = true; } });
  const preview = node({ open: false, querySelector: () => summary });
  const finish = node();
  const restart = node();
  const reviewProgress = node();
  const downloads = ["inputs-v1.txt", "answer-key-v1.txt", "worksheet-v1.txt"].map((file, index) => {
    const download = node({ textContent: ["Test input", "Review key", "Comparison worksheet"][index] });
    download.setAttribute("href", "/use-cases/" + id.slice("practice-".length) + "/" + file);
    download.setAttribute("download", file);
    return download;
  });
  const children = {
    "[data-practice-heading]": heading,
    "[data-practice-description]": node({ textContent: title + " description" }),
    "[data-practice-save-controls]": controls,
    "[data-practice-save]": button,
    "[data-practice-save-status]": status,
    "[data-practice-mark]": mark,
    "[data-practice-practiced]": practiced,
    "[data-practice-preview]": preview,
    "[data-practice-finish]": finish,
    "[data-practice-restart]": restart,
    "[data-practice-active-review-progress]": reviewProgress,
  };
  return {
    controls, button, status, downloads, mark, practiced, task, heading, preview, summary, finish, restart, reviewProgress, hidden: false,
    contains: element => Object.values(children).includes(element),
    querySelector: selector => children[selector], querySelectorAll: () => downloads,
  };
}

function setup(saved = null, mode = "", practicedSaved = null, planned = null, includeThird = false) {
  const storage = new Map([["unrelated", "preserve"]]);
  if (saved !== null) storage.set(key, saved);
  if (practicedSaved !== null) storage.set(practicedKey, practicedSaved);
  if (planned !== null) storage.set(planKey, planned);
  const writes = [];
  const chart = pack(chartId, "Chart check");
  const retry = pack(retryId, "Retry check");
  const third = pack(thirdId, "Third check");
  const unsafe = pack("javascript:bad", "Invalid target");
  const resume = node(), link = node(), title = node(), window = node();
  const nextStep = node({ value: "" }), nextStatus = node();
  const stepDownload = node();
  const practicedCount = node();
  const filterControls = node(), filter = node({ value: "all" }), filterEmpty = node(), taskNav = node();
  const chartOption = node({ value: chartId }), retryOption = node({ value: retryId });
  const unsafeOption = node({ value: "javascript:bad" });
  const thirdOption = node({ value: thirdId });
  const chartGroup = node({ querySelectorAll: () => [chartOption] });
  const retryGroup = node({ querySelectorAll: () => [retryOption, ...(includeThird ? [thirdOption] : []), unsafeOption] });
  const chooser = node(), choice = node({ value: "", querySelectorAll: () => [chartGroup, retryGroup] });
  const choiceDetails = node(), choiceDescription = node(), choiceLink = node(), choiceEmpty = node();
  const reviewReset = node();
  const roundProgress = node();
  const choiceLabel = node();
  const newMode = node({ value: "new", checked: true });
  const reviewMode = node({ value: "review", checked: false });
  const choiceMode = node({ querySelectorAll: () => [newMode, reviewMode] });
  const choiceControls = node();
  const afterNew = node(), afterRepeat = node();
  const afterReview = node({ contains: target => target === afterNew || target === afterRepeat });
  const plan = node(), planTitle = node(), planStart = node(), planDone = node();
  const planClear = node(), planSave = node(), planStatus = node();
  const document = { activeElement: null, querySelector: () => shelf };
  filter.focus = () => { document.activeElement = filter; };
  choice.focus = () => { document.activeElement = choice; };
  choiceEmpty.focus = () => { document.activeElement = choiceEmpty; };
  afterNew.focus = () => { document.activeElement = afterNew; };
  window.location = { hash: "" };
  const children = {
    "[data-practice-resume]": resume,
    "[data-practice-resume-link]": link,
    "[data-practice-resume-title]": title,
    "[data-practice-next-step]": nextStep,
    "[data-practice-next-status]": nextStatus,
    "[data-practice-step-download]": stepDownload,
    "[data-practice-count]": practicedCount,
    "[data-practice-filter-controls]": filterControls,
    "[data-practice-filter]": filter,
    "[data-practice-empty]": filterEmpty,
    "[data-practice-tasks]": taskNav,
    "[data-practice-chooser]": chooser,
    "[data-practice-choice]": choice,
    "[data-practice-choice-label]": choiceLabel,
    "[data-practice-choice-mode]": choiceMode,
    "[data-practice-choice-controls]": choiceControls,
    "[data-practice-after-review]": afterReview,
    "[data-practice-after-new]": afterNew,
    "[data-practice-after-repeat]": afterRepeat,
    "[data-practice-choice-details]": choiceDetails,
    "[data-practice-choice-description]": choiceDescription,
    "[data-practice-choice-link]": choiceLink,
    "[data-practice-choice-empty]": choiceEmpty,
    "[data-practice-review-reset]": reviewReset,
    "[data-practice-round-progress]": roundProgress,
    "[data-practice-plan]": plan,
    "[data-practice-plan-title]": planTitle,
    "[data-practice-plan-start]": planStart,
    "[data-practice-plan-done]": planDone,
    "[data-practice-plan-clear]": planClear,
    "[data-practice-plan-save]": planSave,
    "[data-practice-plan-status]": planStatus,
  };
  const shelf = { querySelector: s => children[s], querySelectorAll: s =>
    s === "[data-practice-task]" ? [chart.task, retry.task, ...(includeThird ? [third.task] : [])] :
      [chart, retry, ...(includeThird ? [third] : []), unsafe] };
  const localStorage = {
    getItem(k) {
      if (mode === "read blocked") throw new Error("Denied");
      return storage.get(k) ?? null;
    },
    setItem(k, value) {
      writes.push([k, value]);
      if (mode === "write blocked") throw new Error("Quota");
      if (mode !== "write ignored") storage.set(k, value);
    },
    removeItem(k) {
      writes.push([k, null]);
      if (mode === "remove blocked") throw new Error("Denied");
      storage.delete(k);
    },
  };
  vm.runInNewContext(source, { document, window, localStorage });
  return { chart, retry, unsafe, resume, link, title, nextStep, nextStatus, stepDownload, practicedCount, window, storage, writes,
    filter, filterControls, filterEmpty, taskNav, document, chooser, choice, choiceDetails, choiceDescription, choiceLink,
    choiceEmpty, reviewReset, roundProgress, choiceLabel, choiceMode, newMode, reviewMode, chartOption, retryOption, unsafeOption, chartGroup, retryGroup,
    plan, planTitle, planStart, planDone, planClear, planSave, planStatus,
    choiceControls, afterReview, afterNew, afterRepeat, third, thirdOption };
}

test("does not save on visit and leaves native controls usable", () => {
  const p = setup();
  assert.equal(p.resume.hidden, true);
  assert.equal(p.chart.controls.hidden, false);
  assert.equal(p.unsafe.controls.hidden, true);
  assert.equal(p.chart.mark.hidden, false);
  assert.equal(p.practicedCount.hidden, true);
  assert.equal(p.plan.hidden, true);
  assert.equal(p.planSave.hidden, true);
  assert.equal(p.chart.finish.hidden, true);
  assert.equal(p.chart.restart.hidden, true);
  assert.deepEqual(p.writes, []);
});

test("starting a practiced pack again opens and focuses its input without changing any stored state", () => {
  const saved = JSON.stringify({ id: retryId, step: "compare" });
  const marks = JSON.stringify([chartId]);
  const p = setup(saved, "", marks, retryId);
  p.filter.value = "practiced";
  p.filter.change();
  assert.equal(p.chart.restart.hidden, false);
  assert.equal(p.retry.restart.hidden, true);
  p.chart.restart.click();
  assert.equal(p.chart.preview.open, true);
  assert.equal(p.chart.summary.focused, true);
  assert.equal(p.retry.preview.open, false);
  assert.equal(p.filter.value, "practiced");
  assert.equal(p.chart.practiced.checked, true);
  assert.equal(p.chartOption.disabled, true);
  assert.equal(p.chart.finish.hidden, false);
  assert.equal(p.chart.finish.textContent, "Finish review and choose next");
  assert.equal(p.storage.get(key), saved);
  assert.equal(p.storage.get(planKey), retryId);
  assert.equal(p.storage.get(practicedKey), marks);
  assert.deepEqual(p.writes, []);
});

test("finishing a review moves to the next chooser without writing marks or saved state", () => {
  const saved = JSON.stringify({ id: retryId, step: "review" });
  const marks = JSON.stringify([chartId]);
  const p = setup(saved, "write blocked", marks, retryId);
  p.filter.value = "practiced";
  p.filter.change();
  p.chart.restart.click();
  p.chart.finish.click();
  assert.equal(p.chart.finish.hidden, true);
  assert.equal(p.document.activeElement, p.choice);
  assert.equal(p.planStatus.textContent, "Review finished.");
  assert.equal(p.filter.value, "practiced");
  assert.equal(p.chart.practiced.checked, true);
  assert.equal(p.chartOption.disabled, true);
  assert.equal(p.retryOption.disabled, false);
  assert.equal(p.storage.get(key), saved);
  assert.equal(p.storage.get(planKey), retryId);
  assert.equal(p.storage.get(practicedKey), marks);
  assert.deepEqual(p.writes, []);
});

test("finishing a review when all packs are practiced focuses the review chooser", () => {
  const p = setup(null, "", JSON.stringify([chartId, retryId]));
  p.chart.restart.click();
  p.chart.finish.click();
  assert.equal(p.document.activeElement, p.choice);
  assert.equal(p.choiceEmpty.hidden, false);
  assert.equal(p.afterReview.hidden, true);
  assert.equal(p.chartOption.disabled, true, "The review just finished is not suggested again");
  assert.equal(p.retryOption.disabled, false);
  assert.deepEqual(p.writes, []);
});

for (const review of [false, true]) {
  test(`finishing with both kinds available lets the user choose ${review ? "another review" : "a new practice"}`, () => {
    const marks = JSON.stringify([chartId, retryId]);
    const saved = JSON.stringify({ id: thirdId, step: "review" });
    const p = setup(saved, "", marks, thirdId, true);
    p.chart.restart.click();
    p.chart.finish.click();
    assert.equal(p.afterReview.hidden, false);
    assert.equal(p.choiceControls.hidden, true);
    assert.equal(p.document.activeElement, p.afterNew);
    (review ? p.afterRepeat : p.afterNew).click();
    assert.equal(p.afterReview.hidden, true);
    assert.equal(p.choiceControls.hidden, false);
    assert.equal(p.document.activeElement, p.choice);
    assert.equal(p.choiceLabel.textContent, review ? "Choose a practice to review" : "Choose next practice");
    assert.equal(p.chartOption.disabled, true);
    assert.equal(p.retryOption.disabled, !review);
    assert.equal(p.thirdOption.disabled, review);
    assert.equal(p.storage.get(practicedKey), marks);
    assert.equal(p.storage.get(key), saved);
    assert.equal(p.storage.get(planKey), thirdId);
    assert.deepEqual(p.writes, []);
  });
}

test("a cross-tab unmark closes the decision when only a new option remains", () => {
  const p = setup(null, "", JSON.stringify([chartId, retryId]), null, true);
  p.chart.restart.click();
  p.chart.finish.click();
  p.storage.set(practicedKey, JSON.stringify([chartId]));
  p.window.storage({ key: practicedKey });
  assert.equal(p.afterReview.hidden, true);
  assert.equal(p.choiceControls.hidden, false);
  assert.equal(p.document.activeElement, p.choice);
  assert.equal(p.choiceLabel.textContent, "Choose next practice");
  assert.deepEqual(p.writes, []);
});

test("a new review round restores completed candidates without changing saved progress", () => {
  const marks = JSON.stringify([chartId, retryId]);
  const saved = JSON.stringify({ id: thirdId, step: "compare" });
  const p = setup(saved, "", marks, thirdId, true);
  assert.equal(p.roundProgress.hidden, true);
  assert.equal(p.chart.reviewProgress.hidden, true);
  p.chart.restart.click();
  assert.equal(p.chart.reviewProgress.hidden, false);
  assert.equal(p.chart.reviewProgress.textContent, "Review round: 0 finished, 2 left.");
  assert.equal(p.retry.reviewProgress.hidden, true);
  p.chart.finish.click();
  assert.equal(p.chart.reviewProgress.hidden, true);
  assert.equal(p.roundProgress.textContent, "Review round: 1 finished, 1 left.");
  p.afterRepeat.click();
  assert.equal(p.reviewReset.hidden, true);
  p.reviewReset.click();
  assert.equal(p.chartOption.disabled, true);
  assert.equal(p.retryOption.disabled, false);
  p.choice.value = retryId;
  p.choice.change();
  p.choiceLink.click();
  assert.equal(p.retry.reviewProgress.textContent, "Review round: 1 finished, 1 left.");
  p.retry.finish.click();
  assert.equal(p.afterReview.hidden, true);
  assert.equal(p.choiceMode.hidden, true);
  assert.equal(p.choiceLabel.textContent, "Choose next practice");
  assert.equal(p.thirdOption.disabled, false);
  assert.equal(p.choiceEmpty.hidden, false);
  assert.equal(p.choiceEmpty.textContent, "No more completed practices to review this round.");
  assert.equal(p.document.activeElement, p.choice);
  assert.equal(p.reviewReset.hidden, false);
  assert.equal(p.roundProgress.textContent, "Review round: 2 finished, 0 left.");
  p.reviewReset.click();
  assert.equal(p.reviewReset.hidden, true);
  assert.equal(p.choiceEmpty.hidden, true);
  assert.equal(p.choiceLabel.textContent, "Choose a practice to review");
  assert.equal(p.document.activeElement, p.choice);
  assert.equal(p.chartOption.disabled, false);
  assert.equal(p.retryOption.disabled, false);
  assert.equal(p.thirdOption.disabled, true);
  assert.equal(p.chart.practiced.checked, true);
  assert.equal(p.retry.practiced.checked, true);
  assert.equal(p.roundProgress.hidden, false);
  assert.equal(p.roundProgress.textContent, "Review round: 0 finished, 2 left.");
  assert.equal(p.storage.get(practicedKey), marks);
  assert.equal(p.storage.get(key), saved);
  assert.equal(p.storage.get(planKey), thirdId);
  assert.deepEqual(p.writes, []);
});

test("review counts are distinct and follow eligibility changes without writing storage", () => {
  const p = setup(null, "", JSON.stringify([chartId, retryId]), null, true);
  for (let i = 0; i < 2; i++) {
    p.chart.restart.click();
    p.chart.finish.click();
  }
  assert.equal(p.roundProgress.textContent, "Review round: 1 finished, 1 left.");
  p.afterRepeat.click();
  p.storage.set(practicedKey, JSON.stringify([retryId, thirdId]));
  p.window.storage({ key: practicedKey });
  assert.equal(p.roundProgress.textContent, "Review round: 1 finished, 2 left.");
  p.storage.delete(practicedKey);
  p.window.storage({ key: practicedKey });
  assert.equal(p.roundProgress.hidden, true);
  assert.deepEqual(p.writes, []);
});

test("an all-practiced list can start multiple review rounds without reloading", () => {
  const marks = JSON.stringify([chartId, retryId]);
  const p = setup(null, "", marks);
  for (let round = 0; round < 2; round++) {
    for (const pack of [p.chart, p.retry]) {
      pack.restart.click();
      pack.finish.click();
    }
    assert.equal(p.chartOption.disabled, true);
    assert.equal(p.retryOption.disabled, true);
    assert.equal(p.choice.disabled, true);
    assert.equal(p.choiceControls.hidden, true);
    assert.equal(p.choiceEmpty.hidden, false);
    assert.equal(p.choiceEmpty.textContent, "No more completed practices to review this round.");
    assert.equal(p.document.activeElement, p.choiceEmpty);
    assert.equal(p.reviewReset.hidden, false);
    p.reviewReset.click();
    assert.equal(p.reviewReset.hidden, true);
    assert.equal(p.chartOption.disabled, false);
    assert.equal(p.retryOption.disabled, false);
    assert.equal(p.choice.disabled, false);
    assert.equal(p.document.activeElement, p.choice);
  }
  assert.deepEqual(p.writes, []);
  const fresh = setup(null, "", marks);
  assert.equal(fresh.chartOption.disabled, false);
  assert.equal(fresh.retryOption.disabled, false);
  assert.equal(fresh.choiceLabel.textContent, "Choose a practice to review");
});

test("a review never restores a practiced mark removed in another tab", () => {
  const p = setup(null, "", JSON.stringify([chartId]));
  p.chart.restart.click();
  p.storage.delete(practicedKey);
  p.chart.finish.click();
  assert.equal(p.chart.practiced.checked, false);
  assert.equal(p.chart.finish.hidden, true);
  assert.equal(p.chart.status.textContent, "The practice mark changed.");
  assert.deepEqual(p.writes, []);
});

test("the restart action follows practiced changes and is inert on unpracticed packs", () => {
  const p = setup();
  p.chart.restart.click();
  assert.equal(p.chart.preview.open, false);
  p.storage.set(practicedKey, JSON.stringify([chartId]));
  p.window.storage({ key: practicedKey });
  assert.equal(p.chart.restart.hidden, false);
  p.storage.delete(practicedKey);
  p.window.storage({ key: practicedKey });
  assert.equal(p.chart.restart.hidden, true);
  p.chart.restart.click();
  assert.equal(p.chart.preview.open, false);
  assert.deepEqual(p.writes, []);
});

test("finishing only the planned pack opens the chooser and preserves both saved slots", () => {
  const saved = JSON.stringify({ id: chartId, step: "compare" });
  const p = setup(saved, "", null, retryId);
  assert.equal(p.chart.finish.hidden, true);
  assert.equal(p.retry.finish.hidden, false);
  assert.equal(p.retry.finish.textContent, "Finish and choose next");
  p.choice.value = retryId;
  p.choice.change();
  p.retry.finish.click();
  assert.equal(p.retry.practiced.checked, true);
  assert.equal(p.planDone.hidden, false);
  assert.equal(p.retry.finish.textContent, "Choose next practice");
  assert.equal(p.retryOption.disabled, true);
  assert.equal(p.chartOption.disabled, false);
  assert.equal(p.choice.value, "");
  assert.equal(p.document.activeElement, p.choice);
  assert.equal(p.storage.get(key), saved);
  assert.equal(p.storage.get(planKey), retryId);
  assert.equal(p.nextStep.value, "compare");
  assert.deepEqual(p.writes, [[practicedKey, JSON.stringify([retryId])]]);
  p.retry.finish.click();
  assert.equal(p.writes.length, 1, "Choosing again does not rewrite an existing mark");
});

test("finishing the last unpracticed pack opens the review chooser", () => {
  const p = setup(null, "", JSON.stringify([chartId]), retryId);
  p.retry.finish.click();
  assert.equal(p.choice.disabled, false);
  assert.equal(p.choiceLabel.textContent, "Choose a practice to review");
  assert.equal(p.choiceEmpty.hidden, false);
  assert.equal(p.document.activeElement, p.choice);
});

test("a stale finish action cannot mark an old plan after a replacement", () => {
  const p = setup(null, "", null, retryId);
  p.storage.set(planKey, chartId);
  p.retry.finish.click();
  assert.equal(p.retry.practiced.checked, false);
  assert.equal(p.retry.finish.hidden, true);
  assert.equal(p.chart.finish.hidden, false);
  assert.equal(p.retry.status.textContent, "The saved next practice changed.");
  assert.deepEqual(p.writes, []);
});

test("failed completion does not move focus or claim that the pack is done", () => {
  for (const mode of ["write blocked", "write ignored"]) {
    const p = setup(chartId, mode, null, retryId);
    p.document.activeElement = p.retry.finish;
    p.retry.finish.click();
    assert.equal(p.retry.practiced.checked, false);
    assert.equal(p.planDone.hidden, true);
    assert.equal(p.document.activeElement, p.retry.finish);
    assert.equal(p.retry.status.textContent, "Could not mark this practice as finished.");
    assert.equal(p.storage.get(key), chartId);
  }
});

test("only the save command plans a pack and replacing or clearing it preserves resume", () => {
  const saved = JSON.stringify({ id: chartId, step: "review" });
  const p = setup(saved);
  p.choice.value = retryId;
  p.choice.change();
  assert.equal(p.planSave.hidden, false);
  assert.deepEqual(p.writes, []);
  p.planSave.click();
  assert.equal(p.planTitle.textContent, "Retry check");
  assert.equal(p.planStart.getAttribute("href"), "#" + retryId);
  assert.equal(p.planStatus.textContent, "Saved for next visit.");
  p.choice.value = chartId;
  p.choice.change();
  p.planSave.click();
  assert.equal(p.planTitle.textContent, "Chart check");
  p.planClear.click();
  assert.equal(p.plan.hidden, true);
  assert.equal(p.document.activeElement, p.choice);
  assert.equal(p.storage.get(key), saved);
  assert.equal(p.nextStep.value, "review");
  assert.deepEqual(p.writes, [[planKey, retryId], [planKey, chartId], [planKey, null]]);
});

test("restores a known saved next pack and opens the input without changing progress", () => {
  const p = setup(chartId, "", JSON.stringify([chartId]), retryId);
  assert.equal(p.plan.hidden, false);
  assert.equal(p.planTitle.textContent, "Retry check");
  p.filter.value = "practiced";
  p.filter.change();
  assert.equal(p.retry.hidden, true);
  p.planStart.click();
  assert.equal(p.retry.hidden, false);
  assert.equal(p.retry.preview.open, true);
  assert.equal(p.chart.preview.open, false);
  assert.equal(p.link.getAttribute("href"), "#" + chartId);
  assert.deepEqual(p.writes, []);
});

test("removed or unknown pack IDs cannot start a practice", () => {
  for (const id of ["practice-missing", "javascript:bad", "https://example.invalid/"]) {
    const p = setup(chartId, "", null, id);
    assert.equal(p.plan.hidden, true);
    assert.equal(p.planStart.getAttribute("href"), undefined);
    assert.deepEqual(p.writes, []);
  }
});

test("practiced packs cannot be newly planned; a completed plan remains clearable", () => {
  const p = setup(chartId, "", JSON.stringify([retryId]), retryId);
  assert.equal(p.planStart.hidden, true);
  assert.equal(p.planDone.hidden, false);
  assert.equal(p.plan.hidden, false);
  p.planClear.click();
  assert.equal(p.plan.hidden, true);
  p.choice.value = chartId;
  p.choice.change();
  p.storage.set(practicedKey, JSON.stringify([chartId, retryId]));
  p.planSave.click();
  assert.equal(p.plan.hidden, true);
  assert.equal(p.storage.has(planKey), false);
  assert.deepEqual(p.writes, [[planKey, null]]);
});

test("an out-of-date clear cannot remove a replacement from another tab", () => {
  const p = setup(null, "", null, chartId);
  p.storage.set(planKey, retryId);
  p.planClear.click();
  assert.equal(p.planTitle.textContent, "Retry check");
  assert.equal(p.storage.get(planKey), retryId);
  assert.deepEqual(p.writes, []);
  p.storage.delete(planKey);
  p.window.storage({ key: planKey });
  assert.equal(p.plan.hidden, true);
});

for (const mode of ["write blocked", "write ignored", "remove blocked"]) {
  test(`a ${mode} next pack change keeps the previous state`, () => {
    const p = setup(chartId, mode, null, chartId);
    p.choice.value = retryId;
    p.choice.change();
    if (mode === "remove blocked") p.planClear.click();
    else p.planSave.click();
    assert.equal(p.planStatus.textContent, "Could not save the next practice.");
    assert.equal(p.planTitle.textContent, "Chart check");
    assert.equal(p.storage.get(planKey), chartId);
    assert.equal(p.storage.get(key), chartId);
  });
}

test("restores only a valid current pack", () => {
  const p = setup(chartId);
  assert.equal(p.resume.hidden, false);
  assert.equal(p.link.getAttribute("href"), "#" + chartId);
  assert.equal(p.title.textContent, "Chart check");
  assert.equal(p.chart.button.getAttribute("aria-pressed"), "true");
  assert.deepEqual(p.writes, []);
  for (const id of ["practice-missing", "javascript:bad"]) {
    const invalid = setup(id);
    assert.equal(invalid.resume.hidden, true);
    assert.equal(invalid.link.getAttribute("href"), undefined);
    assert.deepEqual(invalid.writes, []);
  }
});

test("saves one, replaces it, and removes it without touching other storage", () => {
  const p = setup();
  p.chart.button.click();
  assert.equal(p.storage.get(key), chartId);
  assert.equal(p.chart.status.textContent, "Saved for this browser.");
  p.retry.button.click();
  assert.equal(p.storage.get(key), retryId);
  assert.equal(p.chart.button.getAttribute("aria-pressed"), "false");
  assert.equal(p.title.textContent, "Retry check");
  p.retry.button.click();
  assert.equal(p.resume.hidden, true);
  assert.equal(p.retry.status.textContent, "Saved pack removed.");
  assert.equal(p.storage.get("unrelated"), "preserve");
  assert.deepEqual(p.writes, [[key, chartId], [key, retryId], [key, null]]);
});

test("refreshes after back navigation and cross-tab changes without writing", () => {
  const p = setup(chartId);
  p.storage.set(key, retryId);
  p.window.storage({ key: "unrelated" });
  assert.equal(p.title.textContent, "Chart check");
  p.window.storage({ key });
  assert.equal(p.title.textContent, "Retry check");
  p.storage.delete(key);
  p.window.pageshow();
  assert.equal(p.resume.hidden, true);
  assert.deepEqual(p.writes, []);
});

test("blocked reads leave the save controls hidden", () => {
  const p = setup(chartId, "read blocked");
  assert.equal(p.chart.controls.hidden, true);
  assert.equal(p.filterControls.hidden, true);
  assert.equal(p.chooser.hidden, true);
  assert.equal(p.chart.hidden, false);
  assert.equal(p.chart.mark.hidden, true);
  assert.equal(p.resume.hidden, true);
  assert.deepEqual(p.writes, []);
});

test("the picker exposes only known unpracticed tasks in nonempty groups", () => {
  const p = setup(chartId, "", JSON.stringify([chartId]));
  assert.equal(p.chooser.hidden, false);
  assert.equal(p.chartOption.disabled, true);
  assert.equal(p.chartOption.hidden, true);
  assert.equal(p.chartGroup.hidden, true);
  assert.equal(p.retryOption.disabled, false);
  assert.equal(p.retryGroup.hidden, false);
  assert.equal(p.unsafeOption.disabled, true);
  assert.equal(p.choiceDetails.hidden, true);
  assert.deepEqual(p.writes, []);
});

test("starting a selected candidate opens its input without changing any stored practice state", () => {
  const saved = JSON.stringify({ id: chartId, step: "compare" });
  const marks = JSON.stringify([chartId]);
  const p = setup(saved, "", marks, chartId);
  p.filter.value = "practiced";
  p.filter.change();
  p.choice.value = retryId;
  p.choice.change();
  assert.equal(p.choiceDetails.hidden, false);
  assert.equal(p.choiceDescription.textContent, "Retry check description");
  assert.equal(p.choiceLink.getAttribute("href"), "#" + retryId);
  assert.equal(p.retry.hidden, true);
  assert.equal(p.retry.preview.open, false, "Selecting is not starting");
  p.choiceLink.click();
  assert.equal(p.filter.value, "all");
  assert.equal(p.retry.hidden, false);
  assert.equal(p.retry.preview.open, true);
  assert.equal(p.chart.preview.open, false);
  assert.equal(p.storage.get(key), saved);
  assert.equal(p.storage.get(planKey), chartId);
  assert.equal(p.storage.get(practicedKey), marks);
  assert.deepEqual(p.writes, []);
});

test("start only opens a preview for a known pack anchor", () => {
  const p = setup();
  for (const href of ["#practice-missing", "https://example.invalid/", "x" + chartId]) {
    p.choiceLink.setAttribute("href", href);
    p.choiceLink.click();
  }
  assert.equal(p.chart.preview.open, false);
  assert.equal(p.retry.preview.open, false);
  assert.deepEqual(p.writes, []);
});

test("finishing a directly started pack writes only its practiced mark", () => {
  const saved = JSON.stringify({ id: chartId, step: "review" });
  const p = setup(saved, "", null, chartId);
  p.choice.value = retryId;
  p.choice.change();
  assert.equal(p.retry.finish.hidden, true, "Selecting does not start a practice");
  p.choiceLink.click();
  assert.equal(p.retry.finish.hidden, false);
  assert.equal(p.chart.finish.hidden, false, "The planned pack remains usable");
  assert.deepEqual(p.writes, [], "Starting does not write");
  p.retry.finish.click();
  assert.equal(p.retry.practiced.checked, true);
  assert.equal(p.retryOption.disabled, true);
  assert.equal(p.document.activeElement, p.choice);
  assert.equal(p.storage.get(key), saved);
  assert.equal(p.storage.get(planKey), chartId);
  assert.deepEqual(p.writes, [[practicedKey, JSON.stringify([retryId])]]);
});

test("switching directly started packs does not finish the previous pack", () => {
  const p = setup();
  for (const id of [retryId, chartId]) {
    p.choice.value = id;
    p.choice.change();
    p.choiceLink.click();
  }
  assert.equal(p.retry.finish.hidden, true);
  assert.equal(p.chart.finish.hidden, false);
  p.retry.finish.click();
  assert.equal(p.retry.practiced.checked, false);
  assert.deepEqual(p.writes, []);
  assert.equal(setup().chart.finish.hidden, true, "The started pack is not restored on reload");
});

test("direct finish failure retains the current practice and does not move focus", () => {
  const p = setup(null, "write ignored");
  p.choice.value = retryId;
  p.choice.change();
  p.choiceLink.click();
  p.document.activeElement = p.retry.finish;
  p.retry.finish.click();
  assert.equal(p.retry.finish.hidden, false);
  assert.equal(p.retry.practiced.checked, false);
  assert.equal(p.document.activeElement, p.retry.finish);
  assert.equal(p.retry.status.textContent, "Could not mark this practice as finished.");
  assert.equal(p.storage.has(planKey), false);
});

test("the picker switches between unpracticed and review choices without leaving a stale selection", () => {
  const p = setup(null, "", JSON.stringify([chartId]));
  p.choice.value = retryId;
  p.choice.change();
  p.storage.set(practicedKey, JSON.stringify([chartId, retryId]));
  p.window.storage({ key: practicedKey });
  assert.equal(p.choiceDetails.hidden, true);
  assert.equal(p.choiceDescription.textContent, "");
  assert.equal(p.choiceLink.getAttribute("href"), undefined);
  assert.equal(p.choice.value, "");
  assert.equal(p.choice.disabled, false);
  assert.equal(p.choiceLabel.textContent, "Choose a practice to review");
  assert.equal(p.chartOption.disabled, false);
  assert.equal(p.retryOption.disabled, false);
  assert.equal(p.unsafeOption.disabled, true);
  assert.equal(p.choiceEmpty.hidden, false);
  p.storage.set(practicedKey, JSON.stringify([retryId]));
  p.window.storage({ key: practicedKey });
  assert.equal(p.choice.disabled, false);
  assert.equal(p.chartOption.disabled, false);
  assert.equal(p.retryOption.disabled, true);
  assert.equal(p.choiceLabel.textContent, "Choose next practice");
  assert.equal(p.choiceEmpty.hidden, true);
  assert.deepEqual(p.writes, []);
});

test("the all-practiced picker starts a review without offering a save or changing progress", () => {
  const saved = JSON.stringify({ id: retryId, step: "review" });
  const marks = JSON.stringify([chartId, retryId]);
  const p = setup(saved, "", marks, retryId);
  assert.equal(p.choiceMode.hidden, true);
  p.filter.value = "unpracticed";
  p.filter.change();
  p.choice.value = chartId;
  p.choice.change();
  assert.equal(p.choiceLink.textContent, "Start review");
  assert.equal(p.choiceDetails.hidden, false);
  assert.equal(p.planSave.hidden, true);
  assert.equal(p.chart.hidden, true);
  p.choiceLink.click();
  assert.equal(p.chart.hidden, false);
  assert.equal(p.chart.preview.open, true);
  assert.equal(p.chart.finish.textContent, "Finish review and choose next");
  p.chart.finish.click();
  assert.equal(p.document.activeElement, p.choice);
  assert.equal(p.storage.get(practicedKey), marks);
  assert.equal(p.storage.get(key), saved);
  assert.equal(p.storage.get(planKey), retryId);
  assert.deepEqual(p.writes, []);
});

test("mixed progress allows explicit review and returns to new choices after finishing", () => {
  const saved = JSON.stringify({ id: retryId, step: "review" });
  const marks = JSON.stringify([chartId]);
  const p = setup(saved, "", marks, retryId);
  assert.equal(p.choiceMode.hidden, false);
  assert.equal(p.newMode.checked, true);
  p.choice.value = retryId;
  p.choice.change();
  assert.equal(p.planSave.hidden, false);
  p.reviewMode.checked = true;
  p.reviewMode.change();
  assert.equal(p.choice.value, "");
  assert.equal(p.reviewMode.checked, true);
  assert.equal(p.newMode.checked, false);
  assert.equal(p.choiceLabel.textContent, "Choose a practice to review");
  assert.equal(p.chartOption.disabled, false);
  assert.equal(p.retryOption.disabled, true);
  assert.equal(p.choiceEmpty.hidden, true);
  p.choice.value = chartId;
  p.choice.change();
  assert.equal(p.choiceLink.textContent, "Start review");
  assert.equal(p.planSave.hidden, true);
  p.choiceLink.click();
  assert.equal(p.chart.preview.open, true);
  p.chart.finish.click();
  assert.equal(p.choiceLabel.textContent, "Choose next practice");
  assert.equal(p.newMode.checked, true);
  assert.equal(p.retryOption.disabled, false);
  assert.equal(p.chartOption.disabled, true);
  assert.equal(p.document.activeElement, p.choice);
  assert.equal(p.storage.get(practicedKey), marks);
  assert.equal(p.storage.get(key), saved);
  assert.equal(p.storage.get(planKey), retryId);
  assert.deepEqual(p.writes, []);
});

test("removing every mark while in review switches back to new practice", () => {
  const p = setup(null, "", JSON.stringify([chartId]));
  p.reviewMode.checked = true;
  p.reviewMode.change();
  p.storage.delete(practicedKey);
  p.window.storage({ key: practicedKey });
  assert.equal(p.choiceMode.hidden, true);
  assert.equal(p.newMode.checked, true);
  assert.equal(p.choiceLabel.textContent, "Choose next practice");
  assert.equal(p.chartOption.disabled, false);
  assert.equal(p.retryOption.disabled, false);
  assert.deepEqual(p.writes, []);
});

test("shows all, practiced or not-yet-practiced packs and matching jump links without writing", () => {
  const p = setup(null, "", JSON.stringify([chartId]));
  assert.equal(p.filterControls.hidden, false);
  for (const [value, hiddenChart, hiddenRetry] of [
    ["practiced", false, true], ["unpracticed", true, false], ["all", false, false],
  ]) {
    p.filter.value = value;
    p.filter.change();
    assert.equal(p.chart.hidden, hiddenChart);
    assert.equal(p.chart.task.hidden, hiddenChart);
    assert.equal(p.retry.hidden, hiddenRetry);
    assert.equal(p.retry.task.hidden, hiddenRetry);
    assert.equal(p.filterEmpty.hidden, true);
  }
  assert.deepEqual(p.writes, []);
});

test("updates filtered views and empty messages after marks change", () => {
  const p = setup();
  p.filter.value = "practiced";
  p.filter.change();
  assert.equal(p.filterEmpty.textContent, "No practiced packs yet.");
  assert.equal(p.taskNav.hidden, true);
  p.storage.set(practicedKey, JSON.stringify([chartId, retryId]));
  p.window.storage({ key: practicedKey });
  assert.equal(p.filterEmpty.hidden, true);
  assert.equal(p.taskNav.hidden, false);
  p.filter.value = "unpracticed";
  p.filter.change();
  assert.equal(p.filterEmpty.textContent, "All packs have been practiced.");
  assert.equal(p.filterEmpty.hidden, false);
});

test("returns focus to the filter when a marked pack disappears", () => {
  const p = setup();
  p.filter.value = "unpracticed";
  p.filter.change();
  p.document.activeElement = p.chart.practiced;
  p.chart.practiced.checked = true;
  p.chart.practiced.change();
  assert.equal(p.chart.hidden, true);
  assert.equal(p.document.activeElement, p.filter);
});

test("continue and direct anchors reveal filtered packs without rewriting storage", () => {
  const p = setup(chartId, "", JSON.stringify([chartId]));
  p.filter.value = "unpracticed";
  p.filter.change();
  p.link.click();
  assert.equal(p.filter.value, "all");
  assert.equal(p.chart.hidden, false);
  assert.equal(p.link.getAttribute("href"), "#" + chartId);
  p.filter.value = "practiced";
  p.filter.change();
  p.retry.heading.focus = () => { p.document.activeElement = p.retry.heading; };
  p.retry.heading.scrollIntoView = () => {};
  p.window.location.hash = "#" + retryId;
  p.window.hashchange();
  assert.equal(p.retry.hidden, false);
  assert.equal(p.document.activeElement, p.retry.heading);
  assert.deepEqual(p.writes, []);
});

test("practiced marks are explicit, reversible and separate from the saved next step", () => {
  const saved = JSON.stringify({ id: chartId, step: "compare" });
  const p = setup(saved);
  p.retry.practiced.checked = true;
  p.retry.practiced.change();
  assert.equal(p.practicedCount.textContent, "1 of 2 practiced in this browser");
  assert.equal(p.practicedCount.hidden, false);
  assert.equal(p.storage.get(key), saved);
  assert.equal(p.nextStep.value, "compare");
  assert.deepEqual(p.writes, [[practicedKey, JSON.stringify([retryId])]]);
  p.chart.button.click();
  assert.equal(p.retry.practiced.checked, true);
  p.retry.practiced.checked = false;
  p.retry.practiced.change();
  assert.equal(p.storage.has(practicedKey), false);
  assert.equal(p.practicedCount.hidden, true);
  assert.equal(p.practicedCount.textContent, "");
});

test("restores only distinct current pack IDs, without migrating storage", () => {
  const p = setup(null, "", JSON.stringify([chartId, chartId, "practice-missing", "javascript:bad"]));
  assert.equal(p.chart.practiced.checked, true);
  assert.equal(p.retry.practiced.checked, false);
  assert.equal(p.practicedCount.textContent, "1 of 2 practiced in this browser");
  assert.deepEqual(p.writes, []);
  for (const value of ["{broken", JSON.stringify({ id: chartId }), "null"]) {
    const invalid = setup(null, "", value);
    assert.equal(invalid.practicedCount.hidden, true);
    assert.equal(invalid.chart.practiced.checked, false);
    assert.deepEqual(invalid.writes, []);
  }
});

test("merges marks with current storage and refreshes across tabs without changing resume", () => {
  const p = setup(chartId);
  p.storage.set(practicedKey, JSON.stringify([retryId]));
  p.chart.practiced.checked = true;
  p.chart.practiced.change();
  assert.deepEqual(JSON.parse(p.storage.get(practicedKey)), [retryId, chartId]);
  assert.equal(p.retry.practiced.checked, true);
  p.storage.set(practicedKey, JSON.stringify([retryId]));
  p.window.storage({ key: practicedKey });
  assert.equal(p.chart.practiced.checked, false);
  assert.equal(p.chart.button.getAttribute("aria-pressed"), "true");
  p.storage.delete(practicedKey);
  p.window.pageshow();
  assert.equal(p.retry.practiced.checked, false);
  assert.equal(p.practicedCount.hidden, true);
});

for (const mode of ["write blocked", "write ignored", "remove blocked"]) {
  test(`practice mark rolls back when storage is ${mode}`, () => {
    const marked = mode === "remove blocked";
    const p = setup(chartId, mode, marked ? JSON.stringify([chartId]) : null);
    p.chart.practiced.checked = !marked;
    p.chart.practiced.change();
    assert.equal(p.chart.practiced.checked, marked);
    assert.equal(p.chart.status.textContent, "Could not update the practice mark.");
    assert.equal(p.storage.get(key), chartId);
  });
}

for (const mode of ["write blocked", "write ignored", "remove blocked"]) {
  test(`${mode} does not claim success or lose the saved selection`, () => {
    const p = setup(chartId, mode);
    const target = mode === "remove blocked" ? p.chart : p.retry;
    target.button.click();
    assert.equal(p.title.textContent, "Chart check");
    assert.equal(p.storage.get(key), chartId);
    assert.equal(target.status.textContent, "Could not update the saved pack.");
  });
}

test("restores an explicit next step while preserving old anchor-only saves", () => {
  const old = setup(chartId);
  assert.equal(old.nextStep.value, "");
  assert.deepEqual(old.writes, []);
  const p = setup(JSON.stringify({ id: chartId, step: "review" }));
  assert.equal(p.nextStep.value, "review");
  assert.equal(p.link.getAttribute("href"), "#" + chartId);
  assert.deepEqual(p.writes, []);
});

test("ignores invalid saved steps and malformed records", () => {
  const p = setup(JSON.stringify({ id: chartId, step: "private text" }));
  assert.equal(p.resume.hidden, false);
  assert.equal(p.nextStep.value, "");
  for (const raw of ["{broken", "null", JSON.stringify({ id: "practice-missing", step: "review" })]) {
    const invalid = setup(raw);
    assert.equal(invalid.resume.hidden, true);
    assert.deepEqual(invalid.writes, []);
  }
});

test("writes only a pack and allowlisted step, and clears the step alone", () => {
  const p = setup(chartId);
  p.nextStep.value = "compare";
  p.nextStep.change();
  assert.deepEqual(JSON.parse(p.storage.get(key)), { id: chartId, step: "compare" });
  assert.equal(p.nextStatus.textContent, "Next step saved.");
  p.nextStep.value = "free text";
  p.nextStep.change();
  assert.equal(p.writes.length, 1);
  assert.equal(p.nextStep.value, "compare");
  p.nextStep.value = "";
  p.nextStep.change();
  assert.equal(p.storage.get(key), chartId);
  assert.equal(p.nextStatus.textContent, "Next step cleared.");
});

test("changing or unsaving the pack cannot carry a step to another pack", () => {
  const p = setup(JSON.stringify({ id: chartId, step: "review" }));
  p.retry.button.click();
  assert.equal(p.nextStep.value, "");
  assert.equal(p.storage.get(key), retryId);
  p.nextStep.value = "input";
  p.nextStep.change();
  p.retry.button.click();
  assert.equal(p.storage.has(key), false);
  assert.equal(p.resume.hidden, true);
});

test("stale next-step selection cannot write over a different pack from another tab", () => {
  const p = setup(chartId);
  p.storage.set(key, JSON.stringify({ id: retryId, step: "input" }));
  p.nextStep.value = "review";
  p.nextStep.change();
  assert.equal(p.title.textContent, "Retry check");
  assert.equal(p.nextStep.value, "input");
  assert.deepEqual(p.writes, []);
});

test("storage failures restore the last saved next step without claiming success", () => {
  for (const mode of ["write blocked", "write ignored"]) {
    const p = setup(JSON.stringify({ id: chartId, step: "input" }), mode);
    p.nextStep.value = "compare";
    p.nextStep.change();
    assert.equal(p.nextStep.value, "input");
    assert.equal(p.stepDownload.getAttribute("href"), "/use-cases/chart/inputs-v1.txt");
    assert.equal(p.nextStatus.textContent, "Could not update the next step.");
  }
});

test("offers the saved step's download without rewriting storage", () => {
  for (const [step, file, label] of [
    ["input", "inputs-v1.txt", "Test input"],
    ["review", "answer-key-v1.txt", "Review key"],
    ["compare", "worksheet-v1.txt", "Comparison worksheet"],
  ]) {
    const p = setup(JSON.stringify({ id: chartId, step }));
    assert.equal(p.stepDownload.hidden, false);
    assert.equal(p.stepDownload.getAttribute("href"), "/use-cases/chart/" + file);
    assert.equal(p.stepDownload.getAttribute("download"), file);
    assert.equal(p.stepDownload.textContent, "Download: " + label);
    assert.deepEqual(p.writes, []);
  }
});

test("clearing, replacing or removing a saved step removes the old download", () => {
  const p = setup(JSON.stringify({ id: chartId, step: "review" }));
  const hidden = () => {
    assert.equal(p.stepDownload.hidden, true);
    assert.equal(p.stepDownload.getAttribute("href"), undefined);
    assert.equal(p.stepDownload.getAttribute("download"), undefined);
    assert.equal(p.stepDownload.textContent, "");
  };
  p.nextStep.value = "";
  p.nextStep.change();
  hidden();
  p.nextStep.value = "compare";
  p.nextStep.change();
  p.retry.button.click();
  hidden();
  p.nextStep.value = "input";
  p.nextStep.change();
  p.retry.button.click();
  hidden();
});

test("ignores stored URLs, unrelated downloads and incomplete resource lists", () => {
  const p = setup(JSON.stringify({ id: chartId, step: "input", href: "https://other.invalid/input.txt" }));
  assert.equal(p.stepDownload.getAttribute("href"), "/use-cases/chart/inputs-v1.txt");
  for (const href of ["https://other.invalid/input.txt", "/use-cases/retry/inputs-v1.txt", "/use-cases/chart/inputs-v1.txt?x=1"]) {
    p.chart.downloads[0].setAttribute("href", href);
    p.window.pageshow();
    assert.equal(p.stepDownload.hidden, true);
    assert.equal(p.stepDownload.getAttribute("href"), undefined);
  }
  p.chart.downloads.pop();
  p.window.pageshow();
  assert.equal(p.stepDownload.hidden, true);
});
