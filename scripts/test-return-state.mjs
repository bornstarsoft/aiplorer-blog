import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../static/js/aiplorer-shortlist.js", import.meta.url), "utf8");
const path = "/ai-tools/tools/cursor/";
const list = "aiplorer-shortlist-v1", stages = "aiplorer-candidate-stage-v1";
const checks = "aiplorer-trial-checks-v1", dates = "aiplorer-candidate-test-date-v1";
function fixture() {
  const storage = new Map([[list, JSON.stringify([path])], [stages, JSON.stringify({ [path]: "testing" })],
    [checks, JSON.stringify({ [path]: ["task"] })], ["aiplorer-change-read-v1", '["keep"]']]);
  const handlers = {}, writes = [], count = {}, stage = { setAttribute() {}, closest() { return row; } };
  const date = { closest() { return row; } }, testing = {}, link = {}, homeProgress = {}, homeHeading = {};
  const row = { getAttribute() { return path; } };
  const home = { hidden: true,
    querySelector(s) { return ({ "[data-home-evaluation-progress]": homeProgress, "[data-home-evaluation-heading]": homeHeading })[s] || null; },
    querySelectorAll() { return []; }
  };
  let blocked = false;
  const window = { location: { href: "https://aiplorer.com/" },
    addEventListener(k, fn) { handlers[k] = fn; },
    localStorage: {
      getItem(k) { if (blocked) throw Error("blocked"); return storage.get(k) ?? null; },
      setItem(k, v) { writes.push(k); storage.set(k, v); }, removeItem(k) { writes.push(k); storage.delete(k); }
    }
  };
  const document = { documentElement: { classList: { add() {} } }, addEventListener() {},
    querySelector(s) { return s === "[data-home-evaluation]" ? home : null; },
    querySelectorAll(s) { return ({ "[data-shortlist-count]": [count], "[data-compare-candidate-stage]": [stage],
      "[data-compare-test-date]": [date], "[data-compare-testing-count]": [testing], "[data-compare-testing-link]": [link] })[s] || []; }
  };
  runInNewContext(source, { document, window, URL, Set, Map, Date });
  return { storage, handlers, writes, count, stage, date, testing, link, home, homeProgress, homeHeading,
    block() { blocked = true; } };
}

test("browser return refreshes counts, home progress, stages and local test dates together", () => {
  const f = fixture(); assert.equal(f.count.textContent, "1");
  f.storage.set(list, JSON.stringify([path, "/ai-tools/tools/make/"]));
  f.storage.set(stages, JSON.stringify({ [path]: "ready" }));
  f.storage.set(checks, JSON.stringify({ [path]: ["task", "output"] }));
  f.storage.set(dates, JSON.stringify({ [path]: "2026-10-20" }));
  const before = Array.from(f.storage.entries()); f.handlers.pageshow();
  assert.equal(f.count.textContent, "2"); assert.match(f.homeHeading.textContent, /2 saved/);
  assert.match(f.homeProgress.textContent, /^2 of 8/); assert.equal(f.stage.textContent, "Ready to decide");
  assert.equal(f.date.textContent, "Last tested locally 2026-10-20");
  assert.equal(f.testing.textContent, "0"); assert.equal(f.link.hidden, true);
  assert.deepEqual(Array.from(f.storage.entries()), before); assert.deepEqual(f.writes, []);
});
test("return after removing all saves hides resume state and clears comparison labels", () => {
  const f = fixture(); f.storage.set(list, "[]"); f.handlers.pageshow();
  assert.equal(f.count.textContent, "0"); assert.equal(f.home.hidden, true);
  assert.equal(f.stage.textContent, "Stage not set"); assert.equal(f.date.textContent, "Local test date not set");
  assert.deepEqual(f.writes, []);
});
test("cross-tab storage clear refreshes without cleanup writes", () => {
  const f = fixture(); f.storage.clear(); f.handlers.storage({ key: null });
  assert.equal(f.count.textContent, "0"); assert.equal(f.home.hidden, true); assert.deepEqual(f.writes, []);
});
test("blocked storage on return preserves the current session without throwing", () => {
  const f = fixture(); f.block(); f.handlers.pageshow();
  assert.equal(f.count.textContent, "1"); assert.match(f.homeProgress.textContent, /^1 of 4/);
  assert.deepEqual(f.writes, []);
});
test("unrelated storage events do not rerender candidate state", () => {
  const f = fixture(); f.storage.set(list, "[]"); f.handlers.storage({ key: "unrelated" });
  assert.equal(f.count.textContent, "1");
});
