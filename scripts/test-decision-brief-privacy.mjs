import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../static/js/aiplorer-shortlist.js", import.meta.url), "utf8");
const cursor = "/ai-tools/tools/cursor/", replit = "/ai-tools/tools/replit/";
function fixture({ empty = false, failure = false } = {}) {
  const initial = {
    "aiplorer-shortlist-v1": JSON.stringify(empty ? [] : [cursor, replit]),
    "aiplorer-candidate-notes-v1": JSON.stringify({ [cursor]: "PRIVATE_SAMPLE_NOTE" }),
    "aiplorer-candidate-stage-v1": JSON.stringify({ [cursor]: "testing" }),
    "aiplorer-shortlist-stage-view-v1": "testing",
    "aiplorer-shortlist-test-date-view-v1": "dated"
  };
  const storage = new Map(Object.entries(initial)), listeners = {}, windowListeners = {};
  const choice = { checked: true }, status = {}, downloads = [], revoked = [];
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
  return { choice, status, downloads, revoked, storage, initial, windowListeners,
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
