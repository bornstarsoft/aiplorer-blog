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
  const children = {
    "[data-practice-heading]": heading,
    "[data-practice-save-controls]": controls,
    "[data-practice-save]": button,
    "[data-practice-save-status]": status,
  };
  return { controls, button, status, querySelector: selector => children[selector] };
}

function setup(saved = null, mode = "") {
  const storage = new Map([["unrelated", "preserve"]]);
  if (saved !== null) storage.set(key, saved);
  const writes = [];
  const chart = pack(chartId, "Chart check");
  const retry = pack(retryId, "Retry check");
  const unsafe = pack("javascript:bad", "Invalid target");
  const resume = node(), link = node(), title = node(), window = node();
  const children = {
    "[data-practice-resume]": resume,
    "[data-practice-resume-link]": link,
    "[data-practice-resume-title]": title,
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
  return { chart, retry, unsafe, resume, link, title, window, storage, writes };
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
