import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = readFileSync(new URL("../static/js/aiplorer-practice-resume.js", import.meta.url), "utf8");
const key = "aiplorer-practice-resume-v1";
const chartId = "practice-chart";
const retryId = "practice-retry";

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
  const controls = node();
  const button = node();
  const status = node();
  const downloads = ["inputs-v1.txt", "answer-key-v1.txt", "worksheet-v1.txt"].map((file, index) => {
    const download = node({ textContent: ["Test input", "Review key", "Comparison worksheet"][index] });
    download.setAttribute("href", "/use-cases/" + id.slice("practice-".length) + "/" + file);
    download.setAttribute("download", file);
    return download;
  });
  const children = {
    "[data-practice-heading]": heading,
    "[data-practice-save-controls]": controls,
    "[data-practice-save]": button,
    "[data-practice-save-status]": status,
  };
  return { controls, button, status, downloads, querySelector: selector => children[selector], querySelectorAll: () => downloads };
}

function setup(saved = null, mode = "") {
  const storage = new Map([["unrelated", "preserve"]]);
  if (saved !== null) storage.set(key, saved);
  const writes = [];
  const chart = pack(chartId, "Chart check");
  const retry = pack(retryId, "Retry check");
  const unsafe = pack("javascript:bad", "Invalid target");
  const resume = node(), link = node(), title = node(), window = node();
  const nextStep = node({ value: "" }), nextStatus = node();
  const stepDownload = node();
  const children = {
    "[data-practice-resume]": resume,
    "[data-practice-resume-link]": link,
    "[data-practice-resume-title]": title,
    "[data-practice-next-step]": nextStep,
    "[data-practice-next-status]": nextStatus,
    "[data-practice-step-download]": stepDownload,
  };
  const shelf = { querySelector: s => children[s], querySelectorAll: () => [chart, retry, unsafe] };
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
  vm.runInNewContext(source, { document: { querySelector: () => shelf }, window, localStorage });
  return { chart, retry, unsafe, resume, link, title, nextStep, nextStatus, stepDownload, window, storage, writes };
}

test("does not save on visit and leaves native controls usable", () => {
  const p = setup();
  assert.equal(p.resume.hidden, true);
  assert.equal(p.chart.controls.hidden, false);
  assert.equal(p.unsafe.controls.hidden, true);
  assert.deepEqual(p.writes, []);
});

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
  assert.equal(p.resume.hidden, true);
  assert.deepEqual(p.writes, []);
});

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
