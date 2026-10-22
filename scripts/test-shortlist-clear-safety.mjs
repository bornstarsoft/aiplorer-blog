import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../static/js/aiplorer-shortlist.js", import.meta.url), "utf8");
const cursor = "/ai-tools/tools/cursor/", replit = "/ai-tools/tools/replit/";
const keys = {
  list: "aiplorer-shortlist-v1", checks: "aiplorer-trial-checks-v1",
  stages: "aiplorer-candidate-stage-v1", notes: "aiplorer-candidate-notes-v1",
  dates: "aiplorer-candidate-test-date-v1", stageView: "aiplorer-shortlist-stage-view-v1",
  dateView: "aiplorer-shortlist-test-date-view-v1"
};
function fixture({ cancel = false, mode = "", concurrent = false, empty = false } = {}) {
  const initial = {
    [keys.list]: JSON.stringify(empty ? [] : [cursor, replit]),
    [keys.checks]: JSON.stringify({ [cursor]: ["task", "output"] }),
    [keys.stages]: JSON.stringify({ [cursor]: "testing" }),
    [keys.notes]: JSON.stringify({ [cursor]: "PRIVATE_NOTE_DO_NOT_SHOW" }),
    [keys.dates]: JSON.stringify({ [cursor]: "2020-01-02" }),
    [keys.stageView]: "testing", [keys.dateView]: "dated",
    "aiplorer-change-read-v1": '["keep"]', "reset-checkpoint": "keep", unrelated: "keep"
  };
  const storage = new Map(Object.entries(initial)), dialogs = [], events = [], listeners = {}, status = {};
  let writes = 0;
  const items = [[cursor, "Cursor"], [replit, "Replit"]].map(([path, title]) => ({
    hidden: path === replit,
    getAttribute(name) { return name === "data-shortlist-item" ? path : name === "data-shortlist-title" ? title : ""; },
    querySelector() { return null; }, querySelectorAll() { return []; }
  }));
  const document = {
    documentElement: { classList: { add() {} } }, addEventListener(name, fn) { listeners[name] = fn; },
    querySelector(selector) { return selector === "[data-copy-test-plan-status]" || selector === "[data-shortlist-status]" ? status : null; },
    querySelectorAll(selector) { return selector === "[data-shortlist-item]" ? items : []; }
  };
  const window = {
    location: { href: "https://aiplorer.com/ai-tools/shortlist/" }, addEventListener() {},
    dispatchEvent(event) { events.push(event); },
    confirm(message) {
      dialogs.push(message);
      if (concurrent) storage.set(keys.notes, JSON.stringify({ [cursor]: "OTHER_TAB_EDIT" }));
      return !cancel;
    },
    localStorage: {
      getItem(key) { if (mode === "blocked") throw Error("blocked"); return storage.get(key) ?? null; },
      setItem(key, value) {
        writes++;
        if ((mode === "quota" && writes === 3) || (mode === "recovery-fails" && writes >= 3)) throw Error("quota");
        if (mode === "silent" && writes === 3) return;
        storage.set(key, value);
      },
      removeItem(key) { storage.delete(key); }
    }
  };
  runInNewContext(source, { document, window, URL, Set, Map, Date,
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } }
  });
  return { storage, initial, dialogs, events, status, writes: () => writes,
    clear() { listeners.click({ target: { closest(s) { return s === "[data-shortlist-clear]" ? {} : null; } } }); }
  };
}

test("clear confirmation counts all candidates and data without revealing private notes", () => {
  const f = fixture({ cancel: true }); f.clear();
  assert.match(f.dialogs[0], /Clear all 2 saved candidates/);
  assert.match(f.dialogs[0], /hidden by stage or date filters/);
  assert.match(f.dialogs[0], /1 private notes, 2 completed checks, 1 decision stages and 1 test dates/);
  assert.doesNotMatch(f.dialogs[0], /PRIVATE_NOTE_DO_NOT_SHOW/);
});
test("cancel performs no writes and preserves every stored key", () => {
  const f = fixture({ cancel: true }); f.clear();
  assert.deepEqual(Object.fromEntries(f.storage), f.initial);
  assert.equal(f.writes(), 0); assert.equal(f.events.length, 0);
  assert.match(f.status.textContent, /cancelled/);
});
test("confirmed clear removes only evaluation state and resets both views", () => {
  const f = fixture(); f.clear();
  assert.equal(f.storage.get(keys.list), "[]");
  for (const key of [keys.checks, keys.stages, keys.notes, keys.dates]) assert.equal(f.storage.get(key), "{}");
  for (const key of [keys.stageView, keys.dateView]) assert.equal(f.storage.get(key), "all");
  for (const key of ["aiplorer-change-read-v1", "reset-checkpoint", "unrelated"]) assert.equal(f.storage.get(key), f.initial[key]);
  assert.equal(f.writes(), 7); assert.equal(f.events.length, 1);
  assert.match(f.status.textContent, /^Shortlist and candidate evaluation data cleared/);
});
test("other-tab change during confirmation stops the clear without overwriting it", () => {
  const f = fixture({ concurrent: true }); f.clear();
  assert.match(f.storage.get(keys.notes), /OTHER_TAB_EDIT/);
  assert.equal(f.storage.get(keys.list), f.initial[keys.list]);
  assert.equal(f.writes(), 0); assert.equal(f.events.length, 0);
  assert.match(f.status.textContent, /Nothing was cleared/);
});
test("blocked storage prevents confirmation and never reports successful clear", () => {
  const f = fixture({ mode: "blocked" }); f.clear();
  assert.equal(f.dialogs.length, 0); assert.equal(f.writes(), 0);
  assert.match(f.status.textContent, /was not cleared/);
});
for (const mode of ["quota", "silent"]) test(`${mode} write failure rolls back all prior values`, () => {
  const f = fixture({ mode }); f.clear();
  assert.deepEqual(Object.fromEntries(f.storage), f.initial);
  assert.equal(f.events.length, 0);
  assert.match(f.status.textContent, /could not be cleared/);
});
test("unverified rollback warns instead of claiming preserved or cleared data", () => {
  const f = fixture({ mode: "recovery-fails" }); f.clear();
  assert.match(f.status.textContent, /recovery could not be verified/);
  assert.equal(f.events.length, 0);
});
test("empty shortlist does not prompt or clear orphaned evaluation keys", () => {
  const f = fixture({ empty: true }); f.clear();
  assert.equal(f.dialogs.length, 0); assert.equal(f.writes(), 0);
  assert.deepEqual(Object.fromEntries(f.storage), f.initial);
});
