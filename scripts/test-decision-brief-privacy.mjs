import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../static/js/aiplorer-shortlist.js", import.meta.url), "utf8");
const cursor = "/ai-tools/tools/cursor/", replit = "/ai-tools/tools/replit/";
function fixture({ empty = false, failure = false, scope = "all", stage = "testing", dateView = "dated" } = {}) {
  const initial = {
    "aiplorer-shortlist-v1": JSON.stringify(empty ? [] : [cursor, replit]),
    "aiplorer-candidate-notes-v1": JSON.stringify({ [cursor]: "PRIVATE_SAMPLE_NOTE" }),
    "aiplorer-candidate-stage-v1": JSON.stringify({ [cursor]: "testing" }),
    "aiplorer-shortlist-stage-view-v1": stage,
    "aiplorer-shortlist-test-date-view-v1": dateView
  };
  const storage = new Map(Object.entries(initial)), listeners = {}, windowListeners = {};
  const choice = { checked: true }, status = {}, downloads = [], revoked = [];
  const scopeControl = { value: scope }, count = {}, exportButton = {};
  let removed = 0, writes = 0, blob;
  const items = [[cursor, "Cursor"], [replit, "Replit"]].map(([path, title]) => ({
    hidden: path === replit,
    getAttribute(name) { return name === "data-shortlist-item" ? path : name === "data-shortlist-title" ? title : ""; },
    querySelector() { return null; }, querySelectorAll() { return []; }
  }));
  const document = {
    documentElement: { classList: { add() {} } },
    addEventListener(name, fn) { listeners[name] = fn; },
    querySelector(selector) {
      if (selector === "[data-shortlist-brief-notes]") return choice;
      if (selector === "[data-shortlist-brief-scope]") return scopeControl;
      if (selector === "[data-shortlist-brief-count]") return count;
      if (selector === "[data-shortlist-export-brief]") return exportButton;
      if (selector === "[data-copy-test-plan-status]" || selector === "[data-shortlist-status]") return status;
      return null;
    },
    querySelectorAll(selector) { return selector === "[data-shortlist-item]" ? items : []; },
    body: { appendChild() {} },
    createElement() { return {
      click() { if (failure) throw Error("download blocked"); downloads.push({ text: blob.text, filename: this.download }); },
      remove() { removed++; }
    }; }
  };
  const window = {
    location: { href: "https://aiplorer.com/ai-tools/shortlist/" },
    addEventListener(name, fn) { windowListeners[name] = fn; },
    setTimeout(fn) { fn(); },
    URL: { createObjectURL(value) { blob = value; return "blob:test"; }, revokeObjectURL(value) { revoked.push(value); } },
    localStorage: {
      getItem(key) { return storage.get(key) ?? null; },
      setItem(key, value) { writes++; storage.set(key, value); },
      removeItem(key) { writes++; storage.delete(key); }
    }
  };
  runInNewContext(source, { document, window, URL, Set, Map, Date,
    Blob: class { constructor(parts) { this.text = parts.join(""); } }
  });
  return { choice, status, downloads, revoked, storage, initial, windowListeners, count, exportButton,
    scope(value) { scopeControl.value = value; listeners.change({ target: { closest(s) { return s === "[data-shortlist-brief-scope]" ? scopeControl : null; } } }); },
    removed: () => removed, writes: () => writes,
    click(selector = "[data-shortlist-export-brief]") {
      listeners.click({ target: { closest(value) { return value === selector ? {} : null; } } });
    }
  };
}

test("brief excludes notes by default, including a restored checked checkbox", () => {
  const f = fixture(); assert.equal(f.choice.checked, false); f.click();
  assert.match(f.downloads[0].text, /Private test notes: excluded/);
  assert.doesNotMatch(f.downloads[0].text, /PRIVATE_SAMPLE_NOTE|### Private test note/);
  assert.match(f.status.textContent, /notes excluded/);
});
test("explicit note inclusion is for one download only", () => {
  const f = fixture(); f.choice.checked = true; f.click();
  assert.match(f.downloads[0].text, /Private test notes: 1 included/);
  assert.match(f.downloads[0].text, /> PRIVATE_SAMPLE_NOTE/);
  assert.equal(f.choice.checked, false); f.click();
  assert.doesNotMatch(f.downloads[1].text, /PRIVATE_SAMPLE_NOTE/);
});
test("pageshow clears an unsubmitted note inclusion choice", () => {
  const f = fixture(); f.choice.checked = true; f.windowListeners.pageshow();
  assert.equal(f.choice.checked, false);
});
test("brief includes all saved candidates regardless of hidden cards and view filters", () => {
  const f = fixture(); f.click();
  assert.match(f.downloads[0].text, /Saved candidates: 2/);
  assert.match(f.downloads[0].text, /## 1\. Cursor/);
  assert.match(f.downloads[0].text, /## 2\. Replit/);
  assert.match(f.downloads[0].text, /Scope: all saved candidates/);
});
test("brief download does not change stored evaluation state", () => {
  const f = fixture(); f.choice.checked = true; f.click();
  assert.equal(f.writes(), 0);
  assert.deepEqual(Object.fromEntries(f.storage), f.initial);
  assert.equal(f.removed(), 1); assert.deepEqual(f.revoked, ["blob:test"]);
});
test("failed download reports failure, preserves data and cleans up the temporary link", () => {
  const f = fixture({ failure: true }); f.choice.checked = true; f.click();
  assert.equal(f.downloads.length, 0);
  assert.match(f.status.textContent, /could not be started/);
  assert.doesNotMatch(f.status.textContent, /download requested/);
  assert.equal(f.writes(), 0); assert.equal(f.choice.checked, true);
  assert.equal(f.removed(), 1); assert.deepEqual(f.revoked, ["blob:test"]);
});
test("empty shortlist never starts a download", () => {
  const f = fixture({ empty: true }); f.click();
  assert.equal(f.downloads.length, 0);
  assert.match(f.status.textContent, /Save at least one/);
});
test("private JSON backup still includes notes independently of brief choice", () => {
  const f = fixture(); f.click("[data-shortlist-export]");
  assert.equal(JSON.parse(f.downloads[0].text).notes[cursor], "PRIVATE_SAMPLE_NOTE");
  assert.equal(f.writes(), 0);
});

test("current-view brief follows stage and date filters and excludes hidden candidate notes", () => {
  const f = fixture({ scope: "visible", stage: "unset", dateView: "untested" });
  f.choice.checked = true; f.click();
  const text = f.downloads[0].text;
  assert.match(text, /Saved candidates: 1/);
  assert.match(text, /## 1\. Replit/);
  assert.doesNotMatch(text, /Cursor|PRIVATE_SAMPLE_NOTE/);
  assert.match(text, /Scope: current view; stage=unset; test date=untested/);
  assert.match(f.count.textContent, /^1 candidate in the current view/);
});
test("empty current view disables download and never creates an empty brief", () => {
  const f = fixture({ scope: "visible" });
  assert.equal(f.exportButton.disabled, true); f.click();
  assert.equal(f.downloads.length, 0);
  assert.match(f.count.textContent, /^0 candidates/);
  assert.match(f.status.textContent, /No saved candidates match/);
});
test("switching to all saved candidates restores full scope without changing filters", () => {
  const f = fixture({ scope: "visible" }); f.scope("all"); f.click();
  assert.equal(f.exportButton.disabled, false);
  assert.match(f.downloads[0].text, /Saved candidates: 2/);
  assert.match(f.count.textContent, /^2 candidates in the full saved list/);
  assert.deepEqual(Object.fromEntries(f.storage), f.initial);
  assert.equal(f.writes(), 0);
});
test("dated and testing filters intersect using current stored values, not stale DOM", () => {
  const f = fixture({ scope: "visible" });
  f.storage.set("aiplorer-candidate-test-date-v1", JSON.stringify({ [cursor]: "2020-01-02" }));
  f.click();
  assert.match(f.downloads[0].text, /## 1\. Cursor/);
  assert.doesNotMatch(f.downloads[0].text, /Replit/);
  assert.match(f.downloads[0].text, /Local test dates saved: 1/);
});
test("pageshow refreshes current-view count and keeps note consent cleared", () => {
  const f = fixture({ scope: "visible", dateView: "untested" });
  assert.match(f.count.textContent, /^1 candidate/);
  f.storage.set("aiplorer-candidate-stage-v1", "{}");
  f.choice.checked = true; f.windowListeners.pageshow();
  assert.match(f.count.textContent, /^0 candidates/);
  assert.equal(f.exportButton.disabled, true); assert.equal(f.choice.checked, false);
});
test("JSON backup remains full-list even when brief scope is the current view", () => {
  const f = fixture({ scope: "visible", dateView: "untested" });
  f.click("[data-shortlist-export]");
  const payload = JSON.parse(f.downloads[0].text);
  assert.deepEqual(payload.shortlist, [cursor, replit]);
  assert.equal(payload.notes[cursor], "PRIVATE_SAMPLE_NOTE");
});
test("unknown brief scope falls back to all candidates", () => {
  const f = fixture({ scope: "unknown" }); f.click();
  assert.match(f.downloads[0].text, /Scope: all saved candidates/);
  assert.match(f.downloads[0].text, /Saved candidates: 2/);
});
