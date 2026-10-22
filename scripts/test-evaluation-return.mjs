import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../static/js/aiplorer-shortlist.js", import.meta.url), "utf8");
const path = "/ai-tools/tools/cursor/";
const listKey = "aiplorer-shortlist-v1", stagesKey = "aiplorer-candidate-stage-v1";
const stageViewKey = "aiplorer-shortlist-stage-view-v1", dateViewKey = "aiplorer-shortlist-test-date-view-v1";
const checksKey = "aiplorer-trial-checks-v1", notesKey = "aiplorer-candidate-notes-v1";
function fixture({ saved = true, stage = "researching", check = "note", completed = [], detail = false, unknown = false, blocked = false } = {}) {
  const storage = new Map([
    [listKey, JSON.stringify(saved ? [path] : [])], [stagesKey, JSON.stringify({ [path]: stage })],
    [stageViewKey, "ready"], [dateViewKey, "dated"], [checksKey, JSON.stringify({ [path]: completed })],
    [notesKey, JSON.stringify({ [path]: "Private sample note" })], ["aiplorer-change-read-v1", '["keep"]']
  ]);
  const writes = [], listeners = {}, status = {}, details = { open: false };
  const label = { scrollIntoView() { this.scrolled = true; } };
  const note = { focus() { this.focused = true; }, closest() { return label; } };
  const trial = { value: "task", focus() { this.focused = true; }, closest() { return label; } };
  const item = { hidden: true,
    getAttribute(k) { return k === "data-shortlist-item" ? path : k === "data-shortlist-title" ? "Cursor" : ""; },
    querySelector(s) { return s === "details" ? details : s === "[data-candidate-note-input]" ? note : null; },
    querySelectorAll(s) { return s === "[data-trial-check]" ? [trial] : []; }
  };
  const link = { hidden: true, getAttribute() { return path; } };
  const filters = { stage: {}, date: {} };
  const document = { documentElement: { classList: { add() {} } }, addEventListener() {},
    querySelector(s) {
      if (s === "[data-copy-test-plan-status]") return status;
      if (!detail && s === "[data-shortlist-stage-filter]") return filters.stage;
      if (!detail && s === "[data-shortlist-test-date-filter]") return filters.date;
      return null;
    },
    querySelectorAll(s) {
      if (s === "[data-shortlist-evaluation-link]") return [link];
      return s === "[data-shortlist-item]" && !detail && !unknown ? [item] : [];
    }
  };
  const window = {
    location: { href: detail ? "https://aiplorer.com/ai-tools/tools/cursor/" : "https://aiplorer.com/ai-tools/shortlist/?stage=all&test=all&candidate=" + encodeURIComponent(path) + "&check=" + encodeURIComponent(check) + "&from=tool#saved-tools-heading" },
    history: { replaceState(a, b, url) { window.location.href = new URL(url, window.location.href).href; } },
    addEventListener(k, fn) { listeners[k] = fn; }, requestAnimationFrame(fn) { fn(); },
    localStorage: {
      getItem(k) { if (blocked) throw Error("blocked"); return storage.get(k) ?? null; },
      setItem(k, v) { if (blocked) throw Error("blocked"); writes.push(k); storage.set(k, v); }
    }
  };
  runInNewContext(source, { document, window, URL, Set, Map, Date });
  return { storage, writes, listeners, note, trial, details, item, link, status, window, label };
}

test("saved detail-page evaluation link follows saved state, storage changes and pageshow", () => {
  const f = fixture({ detail: true }); assert.equal(f.link.hidden, false);
  f.storage.set(listKey, "[]"); f.listeners.storage({ key: listKey }); assert.equal(f.link.hidden, true);
  f.storage.set(listKey, JSON.stringify([path])); f.listeners.pageshow(); assert.equal(f.link.hidden, false);
});
test("unsaved and storage-blocked detail pages hide the evaluation link", () => {
  assert.equal(fixture({ detail: true, saved: false }).link.hidden, true);
  assert.equal(fixture({ detail: true, blocked: true }).link.hidden, true);
});
test("note handoff opens any saved stage and clears only view filters", () => {
  for (const stage of ["", "researching", "testing", "ready"]) {
    const f = fixture({ stage, completed: ["task", "output", "privacy", "plans"] });
    assert.equal(f.item.hidden, false); assert.equal(f.details.open, true); assert.equal(f.note.focused, true);
    assert.equal(f.label.scrolled, true); assert.deepEqual(f.writes, [stageViewKey, dateViewKey]);
    assert.deepEqual(JSON.parse(f.storage.get(notesKey)), { [path]: "Private sample note" });
    assert.equal(f.storage.get("aiplorer-change-read-v1"), '["keep"]');
    assert.match(f.status.textContent, /opened your test note/);
  }
});
test("handoff parameters are consumed without removing unrelated URL state", () => {
  const f = fixture(); const url = new URL(f.window.location.href);
  assert.equal(url.search, "?from=tool"); assert.equal(url.hash, "#saved-tools-heading");
  assert(!url.href.includes("Private"));
});
test("unsaved or missing directory targets never open or auto-save", () => {
  for (const options of [{ saved: false }, { unknown: true }]) {
    const f = fixture(options); assert.equal(f.details.open, false); assert.equal(f.note.focused, undefined);
    assert(!f.writes.includes(listKey));
  }
});
test("invalid check values do not open notes", () => {
  const f = fixture({ check: 'note<script>' }); assert.equal(f.details.open, false);
});
test("existing unfinished-check handoff still requires testing stage and an incomplete check", () => {
  assert.equal(fixture({ stage: "testing", check: "task" }).trial.focused, true);
  assert.equal(fixture({ stage: "ready", check: "task" }).trial.focused, undefined);
  assert.equal(fixture({ stage: "testing", check: "task", completed: ["task"] }).trial.focused, undefined);
});
