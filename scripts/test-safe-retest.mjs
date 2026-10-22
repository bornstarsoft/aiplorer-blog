import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../static/js/aiplorer-shortlist-trial.js", import.meta.url), "utf8");
const path = "/ai-tools/tools/cursor/", other = "/ai-tools/tools/make/";
const key = "aiplorer-trial-checks-v1", listKey = "aiplorer-shortlist-v1";
function fixture() {
  const storage = new Map([[key, JSON.stringify({ [path]: ["task", "output"], [other]: ["privacy"] })],
    [listKey, JSON.stringify([path, other])], ["aiplorer-candidate-notes-v1", JSON.stringify({ [path]: "Keep evidence" })],
    ["aiplorer-candidate-stage-v1", JSON.stringify({ [path]: "ready" })],
    ["aiplorer-candidate-test-date-v1", JSON.stringify({ [path]: "2026-10-20" })],
    ["aiplorer-change-read-v1", '["keep"]']]);
  const handlers = {}, events = {}, writes = [], prompts = [], notices = [];
  const status = {}, complete = {}, summary = {}, globalStatus = {};
  let mode = "", accepted = true, duringConfirm = () => {};
  const inputs = ["task", "output", "privacy", "plans"].map(value => ({ value, checked: false,
    focus() { this.focused = true; }, closest(s) { return s === "[data-trial-check]" ? this : checklist; } }));
  const reset = { closest(s) { return s === "[data-trial-reset]" ? this : checklist; } };
  const checklist = { getAttribute(k) { return k === "data-trial-checklist" ? path : "Cursor"; },
    closest() { return { querySelector() { return summary; } }; },
    querySelector(s) { return ({ "[data-trial-complete]": complete, "[data-trial-reset]": reset,
      "[data-trial-status]": status, "[data-trial-check]": inputs[0] })[s] || null; },
    querySelectorAll(s) { return s.endsWith(":checked") ? inputs.filter(x => x.checked) : inputs; }
  };
  const window = { addEventListener(k, fn) { events[k] = fn; }, dispatchEvent(e) { notices.push(e.type); },
    confirm(message) { prompts.push(message); duringConfirm(); return accepted; },
    localStorage: {
      getItem(k) { if (mode === "blocked") throw Error("blocked"); return storage.get(k) ?? null; },
      setItem(k, v) { writes.push(k); if (mode === "quota") throw Error("quota"); if (mode !== "silent") storage.set(k, v); }
    }
  };
  const document = { addEventListener(k, fn) { handlers[k] = fn; },
    querySelector() { return globalStatus; }, querySelectorAll() { return [checklist]; } };
  runInNewContext(source, { window, document, Set, CustomEvent: class { constructor(type) { this.type = type; } } });
  return { storage, writes, prompts, notices, inputs, reset, status, complete, events,
    mode(v) { mode = v; }, accept(v) { accepted = v; }, onConfirm(fn) { duringConfirm = fn; },
    click() { handlers.click({ target: reset }); }, change(index = 0) { handlers.change({ target: inputs[index] }); } };
}

test("reset requires confirmation and cancel preserves every stored value", () => {
  const f = fixture(); const before = Array.from(f.storage.entries()); f.accept(false); f.click();
  assert.match(f.prompts[0], /Cursor/); assert.match(f.prompts[0], /note, last test date/);
  assert.deepEqual(Array.from(f.storage.entries()), before); assert.deepEqual(f.writes, []);
  assert.match(f.status.textContent, /cancelled/); assert.equal(f.inputs[0].checked, true);
});
test("confirmed reset clears only this candidate's checks and focuses the first check", () => {
  const f = fixture(); const before = new Map(f.storage); f.click();
  assert.deepEqual(JSON.parse(f.storage.get(key)), { [other]: ["privacy"] });
  for (const [k, v] of before) if (k !== key) assert.equal(f.storage.get(k), v);
  assert.deepEqual(f.writes, [key]); assert.deepEqual(f.notices, ["aiplorer:trial-checks-change"]);
  assert.equal(f.complete.textContent, "0 of 4"); assert.equal(f.reset.disabled, true);
  assert.equal(f.inputs[0].focused, true); assert.match(f.status.textContent, /^Checks reset/);
});
test("reset rereads other candidates after confirmation instead of overwriting newer checks", () => {
  const f = fixture(); f.onConfirm(() => f.storage.set(key, JSON.stringify({ [path]: ["task"], [other]: ["privacy", "plans"] })));
  f.click(); assert.deepEqual(JSON.parse(f.storage.get(key)), { [other]: ["privacy", "plans"] });
});
test("removed or already-cleared candidate is not rewritten after confirmation", () => {
  for (const action of [f => f.storage.set(listKey, JSON.stringify([other])), f => f.storage.set(key, JSON.stringify({ [other]: ["privacy"] }))]) {
    const f = fixture(); f.onConfirm(() => action(f)); f.click();
    assert.deepEqual(f.writes, []); assert.match(f.status.textContent, /No saved checks/);
  }
});
test("unsaved candidates and empty checks never prompt or write", () => {
  for (const action of [f => f.storage.set(listKey, "[]"), f => f.storage.set(key, "{}")]) {
    const f = fixture(); action(f); f.click(); assert.deepEqual(f.prompts, []); assert.deepEqual(f.writes, []);
  }
});
test("malformed or blocked storage aborts without changing persisted data", () => {
  for (const mode of ["malformed", "blocked", "array"]) {
    const f = fixture();
    if (mode === "malformed") f.storage.set(key, "broken");
    else if (mode === "array") f.storage.set(key, "[]");
    else f.mode(mode);
    const before = Array.from(f.storage.entries()); f.click();
    assert.deepEqual(Array.from(f.storage.entries()), before); assert.deepEqual(f.writes, []);
    assert.match(f.status.textContent, /Could not verify/);
  }
});
test("quota and silent-write failures never announce success or dispatch completion", () => {
  for (const mode of ["quota", "silent"]) {
    const f = fixture(); const before = f.storage.get(key); f.mode(mode); f.click();
    assert.equal(f.storage.get(key), before); assert.equal(f.inputs[0].checked, true);
    assert.match(f.status.textContent, /Could not verify/); assert.deepEqual(f.notices, []);
  }
});
test("browser return and cross-tab clear refresh checkbox and summary state without writes", () => {
  const f = fixture(); f.storage.set(key, JSON.stringify({ [path]: ["privacy"] })); f.events.pageshow();
  assert.deepEqual(f.inputs.map(x => x.checked), [false, false, true, false]);
  f.storage.clear(); f.events.storage({ key: null }); assert.equal(f.complete.textContent, "0 of 4");
  assert.deepEqual(f.writes, []);
});
test("a later manual check clears stale reset feedback", () => {
  const f = fixture(); f.click(); f.inputs[0].checked = true; f.change();
  assert.match(f.status.textContent, /^Saved in this browser/); assert.equal(f.complete.textContent, "1 of 4");
});

test("manual change merges only the clicked check with fresh storage", () => {
  const f = fixture(); const before = new Map(f.storage);
  f.storage.set(key, JSON.stringify({ [path]: ["task", "privacy"], [other]: ["privacy", "plans"] }));
  f.inputs[3].checked = true; f.change(3);
  assert.deepEqual(JSON.parse(f.storage.get(key)), { [path]: ["task", "privacy", "plans"], [other]: ["privacy", "plans"] });
  assert.deepEqual(f.inputs.map(x => x.checked), [true, false, true, true]);
  for (const [k, v] of before) if (k !== key) assert.equal(f.storage.get(k), v);
  assert.match(f.status.textContent, /Saved in this browser\. 3 of 4/);
  assert.deepEqual(f.notices, ["aiplorer:trial-checks-change"]);
});

test("unchecking the last current check removes only that candidate's entry", () => {
  const f = fixture();
  f.storage.set(key, JSON.stringify({ [path]: ["task"], [other]: ["privacy"] }));
  f.inputs[0].checked = false; f.change();
  assert.deepEqual(JSON.parse(f.storage.get(key)), { [other]: ["privacy"] });
  assert.equal(f.complete.textContent, "0 of 4");
});

test("manual check rejects unsaved candidates without any storage write", () => {
  const f = fixture(); f.storage.set(listKey, JSON.stringify([other]));
  f.inputs[2].checked = true; f.change(2);
  assert.deepEqual(f.writes, []); assert.deepEqual(f.notices, []);
  assert.match(f.status.textContent, /no longer saved/);
});

test("manual check fails closed on malformed or inaccessible storage", () => {
  for (const mode of ["blocked", "broken-list", "broken-checks", "array-checks"]) {
    const f = fixture();
    if (mode === "blocked") f.mode(mode);
    if (mode === "broken-list") f.storage.set(listKey, "{}");
    if (mode === "broken-checks") f.storage.set(key, "broken");
    if (mode === "array-checks") f.storage.set(key, "[]");
    const before = Array.from(f.storage.entries());
    f.inputs[2].checked = true; f.change(2);
    assert.deepEqual(f.storage.size, before.length);
    assert.deepEqual(Array.from(f.storage.entries()), before);
    assert.deepEqual(f.writes, []); assert.deepEqual(f.notices, []);
    assert.match(f.status.textContent, /Could not verify/);
    assert.equal(f.inputs[2].checked, false);
  }
});

test("failed writes restore recorded checks and never announce save success", () => {
  for (const mode of ["quota", "silent"]) {
    const f = fixture(); const before = f.storage.get(key); f.mode(mode);
    f.inputs[2].checked = true; f.change(2);
    assert.equal(f.storage.get(key), before); assert.equal(f.inputs[2].checked, false);
    assert.equal(f.complete.textContent, "2 of 4");
    assert.match(f.status.textContent, /Could not verify/); assert.deepEqual(f.notices, []);
    f.events.pageshow(); assert.equal(f.inputs[2].checked, false);
    f.mode(""); f.inputs[2].checked = true; f.change(2);
    assert.match(f.status.textContent, /^Saved in this browser/);
    assert.equal(f.complete.textContent, "3 of 4");
  }
});

test("invalid check names are ignored without writes", () => {
  const f = fixture(); f.inputs[0].value = "unknown"; f.change();
  assert.deepEqual(f.writes, []); assert.deepEqual(f.notices, []);
});
