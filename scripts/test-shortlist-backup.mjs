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
const payload = () => ({
  schema: "aiplorer-shortlist-backup", version: 1, shortlist: [cursor],
  checks: { [cursor]: ["task", "output"] }, stages: { [cursor]: "testing" },
  notes: { [cursor]: "PRIVATE_SAMPLE_NOTE" }, testDates: { [cursor]: "2020-01-02" },
  stageView: "testing", testDateView: "dated"
});
const flush = () => new Promise(resolve => setImmediate(resolve));
function fixture(initial = {}) {
  const storage = new Map(Object.entries(initial)), dialogs = [], events = [], status = {};
  let writes = 0, mode = "", accepts = true;
  const input = { value: "chosen.json", files: [], addEventListener(name, fn) { this[name] = fn; } };
  const items = [[cursor, "Cursor"], [replit, "Replit"]].map(([path, title]) => ({
    getAttribute(name) { return name === "data-shortlist-item" ? path : name === "data-shortlist-title" ? title : ""; },
    querySelector() { return null; }, querySelectorAll() { return []; }
  }));
  const document = {
    documentElement: { classList: { add() {} } }, addEventListener() {},
    querySelector(selector) {
      if (selector === "[data-shortlist-import]") return input;
      if (selector === "[data-copy-test-plan-status]" || selector === "[data-shortlist-status]") return status;
      return null;
    },
    querySelectorAll(selector) { return selector === "[data-shortlist-item]" ? items : []; }
  };
  const window = {
    location: { href: "https://aiplorer.com/ai-tools/shortlist/" },
    addEventListener() {}, dispatchEvent(event) { events.push(event); },
    confirm(message) { dialogs.push(message); return accepts; },
    localStorage: {
      getItem(key) { if (mode === "blocked") throw Error("blocked"); return storage.get(key) ?? null; },
      setItem(key, value) {
        writes++;
        if (mode === "blocked" || (mode === "quota" && writes === 3) || (mode === "recovery-fails" && writes >= 3)) throw Error("quota");
        if (mode === "silent" && writes === 3) return;
        storage.set(key, value);
        if (mode === "concurrent" && writes === 7) storage.set(keys.notes, '{"other-tab":"keep"}');
      },
      removeItem(key) { if (mode === "recovery-fails") throw Error("blocked"); storage.delete(key); }
    }
  };
  runInNewContext(source, { document, window, URL, Set, Map, Date, CustomEvent: class { constructor(name, detail) { this.type = name; this.detail = detail.detail; } } });
  return {
    storage, dialogs, events, status, input, writes: () => writes,
    mode(value) { mode = value; writes = 0; }, cancel() { accepts = false; },
    async restore(value = payload(), size = 100) {
      input.files = [{ size, text: () => Promise.resolve(typeof value === "string" ? value : JSON.stringify(value)) }];
      input.change(); await flush();
    },
    start(textPromise) { input.files = [{ size: 100, text: () => textPromise }]; input.change(); }
  };
}

test("restore preflight includes sanitized counts and tool names but not note contents", async () => {
  const f = fixture({ [keys.list]: JSON.stringify([replit]) });
  f.cancel();
  const p = payload(); p.shortlist.push("/ai-tools/tools/retired/");
  await f.restore(p);
  assert.equal(f.dialogs.length, 1);
  assert.match(f.dialogs[0], /Incoming saved tools: 1/);
  assert.match(f.dialogs[0], /Cursor/);
  assert.match(f.dialogs[0], /Notes: 1; test dates: 1; completed checks: 2/);
  assert.match(f.dialogs[0], /skipped: 1/);
  assert.match(f.dialogs[0], /Current saved tools to replace: 1/);
  assert.doesNotMatch(f.dialogs[0], /PRIVATE_SAMPLE_NOTE/);
  assert.equal(f.writes(), 0);
});
test("empty shortlist still requires confirmation and cancel preserves all data", async () => {
  const f = fixture({ unrelated: "keep" }); f.cancel(); await f.restore();
  assert.equal(f.dialogs.length, 1);
  assert.deepEqual(Object.fromEntries(f.storage), { unrelated: "keep" });
  assert.match(f.status.textContent, /cancelled/);
  assert.equal(f.input.value, "");
});
test("successful restore replaces only seven evaluation keys and not read/reset history", async () => {
  const f = fixture({ [keys.list]: JSON.stringify([replit]), "aiplorer-change-read-v1": '["keep"]', unrelated: "keep" });
  await f.restore();
  assert.deepEqual(JSON.parse(f.storage.get(keys.list)), [cursor]);
  assert.deepEqual(JSON.parse(f.storage.get(keys.notes)), { [cursor]: "PRIVATE_SAMPLE_NOTE" });
  assert.equal(f.storage.get(keys.stageView), "testing");
  assert.equal(f.storage.get(keys.dateView), "dated");
  assert.equal(f.storage.get("aiplorer-change-read-v1"), '["keep"]');
  assert.equal(f.storage.get("unrelated"), "keep");
  assert.equal(f.writes(), 7);
  assert.match(f.status.textContent, /^Restored 1 saved candidate/);
  assert.equal(f.events.length, 1);
});
test("restore preserves the older local test-date view", async () => {
  const f = fixture(); await f.restore({ ...payload(), testDateView: "older" });
  assert.equal(f.storage.get(keys.dateView), "older");
  assert.match(f.status.textContent, /^Restored/);
});
test("invalid files and backups with no current tools do not prompt or write", async () => {
  for (const value of ["{bad", {}, { ...payload(), version: 2 }, { ...payload(), shortlist: [] }, { ...payload(), shortlist: ["/ai-tools/tools/tome/"] }]) {
    const f = fixture(); await f.restore(value);
    assert.equal(f.dialogs.length, 0); assert.equal(f.writes(), 0);
    assert.match(f.status.textContent, /could not be restored/);
  }
});
test("oversized file is rejected before reading", async () => {
  const f = fixture(); await f.restore(payload(), 262145);
  assert.equal(f.dialogs.length, 0); assert.equal(f.writes(), 0);
  assert.match(f.status.textContent, /too large/);
});
test("unknown fields, duplicate checks, long notes and future dates are sanitized", async () => {
  const f = fixture(), p = payload();
  p.shortlist.push(cursor, "https://outside.example/");
  p.checks[cursor] = ["task", "task", "invented"];
  p.notes[cursor] = "n".repeat(700);
  p.testDates[cursor] = "2999-01-01";
  p.stageView = "invented";
  await f.restore(p);
  assert.deepEqual(JSON.parse(f.storage.get(keys.checks))[cursor], ["task"]);
  assert.equal(JSON.parse(f.storage.get(keys.notes))[cursor].length, 600);
  assert.deepEqual(JSON.parse(f.storage.get(keys.dates)), {});
  assert.equal(f.storage.get(keys.stageView), "all");
});
test("blocked storage never reports restore success", async () => {
  const f = fixture({ [keys.list]: JSON.stringify([replit]) });
  f.mode("blocked"); await f.restore();
  assert.match(f.status.textContent, /storage is unavailable/);
  assert.equal(f.storage.get(keys.list), JSON.stringify([replit]));
  assert.equal(f.writes(), 0); assert.equal(f.events.length, 0);
});
test("mid-write quota failure restores previous keys including originally absent keys", async () => {
  const initial = { [keys.list]: JSON.stringify([replit]), [keys.checks]: JSON.stringify({ [replit]: ["task"] }), unrelated: "keep" };
  const f = fixture(initial); f.mode("quota"); await f.restore();
  assert.deepEqual(Object.fromEntries(f.storage), initial);
  assert.match(f.status.textContent, /Previous stored data was restored/);
  assert.equal(f.events.length, 0);
});
test("silent write failure is detected by read-back and rolled back", async () => {
  const f = fixture({ unrelated: "keep" }); f.mode("silent"); await f.restore();
  assert.deepEqual(Object.fromEntries(f.storage), { unrelated: "keep" });
  assert.match(f.status.textContent, /Previous stored data was restored/);
});
test("failed rollback warns that recovery could not be verified", async () => {
  const f = fixture(); f.mode("recovery-fails"); await f.restore();
  assert.match(f.status.textContent, /recovery could not be verified/);
  assert.doesNotMatch(f.status.textContent, /^Restored/);
  assert.equal(f.events.length, 0);
});
test("later file selection wins over an older asynchronous read", async () => {
  const f = fixture(); let finish;
  f.start(new Promise(resolve => { finish = resolve; }));
  await f.restore({ ...payload(), shortlist: [replit] });
  finish(JSON.stringify(payload())); await flush();
  assert.deepEqual(JSON.parse(f.storage.get(keys.list)), [replit]);
  assert.equal(f.dialogs.length, 1);
});
test("rollback preserves an intervening value and warns instead of overwriting it", async () => {
  const f = fixture(); f.mode("concurrent"); await f.restore();
  assert.equal(f.storage.get(keys.notes), '{"other-tab":"keep"}');
  assert.match(f.status.textContent, /recovery could not be verified/);
  assert.equal(f.events.length, 0);
});
