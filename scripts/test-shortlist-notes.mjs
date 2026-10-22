import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../static/js/aiplorer-shortlist.js", import.meta.url), "utf8");
const path = "/ai-tools/tools/cursor/", other = "/ai-tools/tools/replit/";
const key = "aiplorer-candidate-notes-v1", listKey = "aiplorer-shortlist-v1";
function fixture(notes = {}, saved = true) {
  const storage = new Map([[key, JSON.stringify(notes)], [listKey, JSON.stringify(saved ? [path, other] : [])]]);
  const handlers = {}, windowHandlers = {}, status = {}, count = {}, noteStatus = {}, label = {};
  let mode = "", writes = 0;
  const summary = { querySelector() { return label; } };
  const item = { querySelector(s) { return s === "[data-shortlist-evaluation-note]" ? summary : null; } };
  const input = { value: "", closest(s) { return s === "[data-candidate-note-input]" ? this : s === "[data-candidate-note]" ? control : null; }, focus() { this.focused = true; }, setSelectionRange(a, b) { this.selection = [a, b]; } };
  const starter = { closest(s) { return s === "[data-candidate-note-starter]" ? this : s === "[data-candidate-note]" ? control : null; } };
  const control = {
    getAttribute(name) { return name === "data-candidate-note" ? path : "Cursor"; },
    closest(s) { return s === "[data-shortlist-item]" ? item : null; },
    querySelector(s) { return ({ "[data-candidate-note-input]": input, "[data-candidate-note-count]": count, "[data-candidate-note-starter]": starter, "[data-candidate-note-status]": noteStatus })[s] || null; }
  };
  const document = {
    activeElement: null, documentElement: { classList: { add() {} } },
    addEventListener(k, fn) { handlers[k] = fn; },
    querySelector(s) { return ["[data-copy-test-plan-status]", "[data-shortlist-status]"].includes(s) ? status : null; },
    querySelectorAll(s) { return s === "[data-candidate-note]" ? [control] : []; }
  };
  const window = { location: { href: "https://aiplorer.com/ai-tools/shortlist/" },
    addEventListener(k, fn) { windowHandlers[k] = fn; },
    localStorage: {
      getItem(k) { return storage.get(k) ?? null; },
      setItem(k, v) { writes++; if (mode === "quota") throw Error("quota"); if (mode !== "silent") storage.set(k, v); },
      removeItem(k) { storage.delete(k); }
    }
  };
  runInNewContext(source, { window, document, URL, Date, Set, Map });
  return { storage, input, starter, noteStatus, summary, label, status, count, writes: () => writes,
    returnToPage() { windowHandlers.pageshow(); },
    focusInput() { document.activeElement = input; },
    mode(v) { mode = v; }, start() { handlers.click({ target: starter }); },
    type(value) { input.value = value; handlers.input({ target: input }); handlers.change({ target: input }); },
    external(notes) { storage.set(key, JSON.stringify(notes)); windowHandlers.storage({ key }); }
  };
}

test("starter creates a neutral note only and focuses its first empty field", () => {
  const f = fixture(); f.start();
  const note = JSON.parse(f.storage.get(key))[path];
  assert.match(note, /^Task: \nExpected: /);
  assert.match(note, /Observed \(or could not test\): \nNext check: /);
  assert.equal(f.input.focused, true); assert.deepEqual(f.input.selection, [6, 6]);
  assert.equal(f.starter.disabled, true); assert.equal(f.writes(), 1);
  assert.equal(f.storage.size, 2); assert.match(f.noteStatus.textContent, /^Saved/);
});
test("existing note or uncommitted input is never overwritten by the starter", () => {
  for (const stored of [true, false]) {
    const f = fixture(stored ? { [path]: "Keep this" } : {});
    if (!stored) f.input.value = "Keep this";
    f.start(); assert.equal(f.input.value, "Keep this"); assert.equal(f.writes(), 0);
    assert.match(f.status.textContent, /existing note was kept/);
  }
});
test("fresh storage is checked before starting even if another tab added the note", () => {
  const f = fixture(); f.storage.set(key, JSON.stringify({ [path]: "Other tab" }));
  f.start(); assert.equal(f.writes(), 0); assert.equal(JSON.parse(f.storage.get(key))[path], "Other tab");
});
test("unsaved candidates cannot start or persist notes", () => {
  const f = fixture({}, false); f.start(); f.type("should not persist"); assert.equal(f.writes(), 0);
});
test("editing keeps other candidates and applies the 600 character limit", () => {
  const f = fixture({ [other]: "Retain" }); f.type("x".repeat(650));
  assert.equal(f.input.value.length, 600); assert.equal(f.count.textContent, "600");
  assert.equal(JSON.parse(f.storage.get(key))[other], "Retain");
});
test("quota failure retains the edit during render and never announces success", () => {
  const f = fixture({ [path]: "Old" }); f.mode("quota"); f.type("New");
  assert.equal(f.input.value, "New"); assert.equal(JSON.parse(f.storage.get(key))[path], "Old");
  assert.match(f.noteStatus.textContent, /^Not saved/); assert.match(f.status.textContent, /note not saved/);
  assert.equal(f.label.textContent, "Note not saved");
  f.external({ [path]: "Old", [other]: "External update" }); assert.equal(f.input.value, "New");
  f.mode(""); f.type("Retry");
  assert.deepEqual(JSON.parse(f.storage.get(key)), { [path]: "Retry", [other]: "External update" });
  assert.match(f.noteStatus.textContent, /^Saved/);
});
test("silently ignored writes are detected for a starter and can be retried", () => {
  const f = fixture(); f.mode("silent"); f.start();
  assert.match(f.status.textContent, /not saved/); assert.match(f.input.value, /^Task:/);
  f.mode(""); f.type("My real result"); assert.equal(JSON.parse(f.storage.get(key))[path], "My real result");
});
test("failed clear stays empty in this visit and warns; successful clear reenables starter", () => {
  const f = fixture({ [path]: "Old" }); f.mode("quota"); f.type("");
  assert.equal(f.input.value, ""); assert.equal(f.summary.hidden, false);
  assert.match(f.noteStatus.textContent, /^Not saved/);
  f.mode(""); f.type(""); assert.equal(f.starter.disabled, false);
  assert.equal(f.summary.hidden, true); assert.match(f.status.textContent, /cleared/);
});

test("browser return preserves failed-save notes and does not retry storage writes", () => {
  const f = fixture({ [path]: "Old" }); f.mode("quota"); f.type("Keep my failed edit");
  const writes = f.writes(); f.returnToPage();
  assert.equal(f.input.value, "Keep my failed edit");
  assert.match(f.noteStatus.textContent, /^Not saved/); assert.equal(f.writes(), writes);
});
test("browser return updates unfocused notes but preserves focused input", () => {
  const f = fixture({ [path]: "Old" });
  f.storage.set(key, JSON.stringify({ [path]: "New saved note" }));
  f.returnToPage(); assert.equal(f.input.value, "New saved note");
  f.input.value = "Typing locally"; f.focusInput();
  f.storage.set(key, JSON.stringify({ [path]: "Other tab" }));
  f.returnToPage(); assert.equal(f.input.value, "Typing locally"); assert.equal(f.writes(), 0);
});
