import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../static/js/aiplorer-shortlist.js", import.meta.url), "utf8");
const paths = ["cursor", "replit", "tabnine"].map(s => `/ai-tools/tools/${s}/`);
function fixture({ today = "2026-10-23", dates = ["2026-09-23", "2026-09-24", ""], stage = "all", view = "older" } = {}) {
  let localToday = today, blob;
  class LocalDate extends Date {
    constructor(...args) { super(...(args.length ? args : [localToday + "T00:00:00Z"])); this.current = !args.length; }
    getFullYear() { return this.current ? Number(localToday.slice(0, 4)) : super.getFullYear(); }
    getMonth() { return this.current ? Number(localToday.slice(5, 7)) - 1 : super.getMonth(); }
    getDate() { return this.current ? Number(localToday.slice(8, 10)) : super.getDate(); }
  }
  const storage = new Map(Object.entries({
    "aiplorer-shortlist-v1": JSON.stringify(paths),
    "aiplorer-candidate-test-date-v1": JSON.stringify(Object.fromEntries(paths.map((p, i) => [p, dates[i]]))),
    "aiplorer-candidate-stage-v1": JSON.stringify({ [paths[0]]: "testing", [paths[1]]: "ready" }),
    "aiplorer-shortlist-stage-view-v1": stage,
    "aiplorer-shortlist-test-date-view-v1": view
  }));
  const initial = Object.fromEntries(storage), listeners = {}, windowListeners = {}, downloads = [];
  const count = {}, label = {}, briefCount = {}, button = {}, status = {}, writes = [];
  const items = paths.map(path => ({ hidden: false,
    getAttribute(k) { return k === "data-shortlist-item" ? path : k === "data-shortlist-title" ? path.split("/").at(-2) : ""; },
    querySelector() { return null; }, querySelectorAll() { return []; }
  }));
  const document = {
    documentElement: { classList: { add() {} } },
    addEventListener(n, fn) { listeners[n] = fn; },
    querySelector(s) {
      if (s === "[data-shortlist-brief-scope]") return { value: "visible" };
      if (s === "[data-shortlist-brief-count]") return briefCount;
      if (s === "[data-shortlist-export-brief]") return button;
      if (s === "[data-shortlist-filter-label]") return label;
      if (s === "[data-shortlist-status]") return status;
      return null;
    },
    querySelectorAll(s) {
      if (s === "[data-shortlist-item]") return items;
      if (s === "[data-shortlist-test-date-count]") return [Object.assign(count, { getAttribute() { return "older"; } })];
      return [];
    },
    body: { appendChild() {} },
    createElement() { return { click() { downloads.push(blob.text); }, remove() {} }; }
  };
  const window = {
    location: { href: "https://aiplorer.com/ai-tools/shortlist/" },
    addEventListener(n, fn) { windowListeners[n] = fn; }, setTimeout(fn) { fn(); },
    URL: { createObjectURL(b) { blob = b; return "blob:test"; }, revokeObjectURL() {} },
    localStorage: { getItem(k) { return storage.get(k) ?? null; }, setItem(k, v) { writes.push(k); storage.set(k, v); } }
  };
  runInNewContext(source, { document, window, URL, Date: LocalDate, Set, Map,
    Blob: class { constructor(parts) { this.text = parts.join(""); } }
  });
  return { items, count, label, briefCount, button, downloads, storage, initial, writes,
    advance(date) { localToday = date; windowListeners.pageshow(); },
    export() { listeners.click({ target: { closest(s) { return s === "[data-shortlist-export-brief]" ? {} : null; } } }); }
  };
}

test("30-day threshold includes day 30 but excludes day 29 and missing dates", () => {
  const f = fixture();
  assert.deepEqual(f.items.map(i => i.hidden), [false, true, true]);
  assert.equal(f.count.textContent, "1");
  assert.match(f.label.textContent, /Tested 30\+ days ago/);
});
test("invalid and future dates are never included as older tests", () => {
  const f = fixture({ dates: ["2026-02-30", "2026-10-24", "invalid"] });
  assert(f.items.every(i => i.hidden)); assert.equal(f.count.textContent, "0");
  assert.equal(f.button.disabled, true);
});
test("stage and age intersect while date count describes the full saved list", () => {
  const f = fixture({ stage: "ready", dates: ["2026-09-01", "2026-09-02", ""] });
  assert.deepEqual(f.items.map(i => i.hidden), [true, false, true]);
  assert.equal(f.count.textContent, "2"); assert.match(f.briefCount.textContent, /^1 candidate/);
});
test("focused export shares age filtering without changing stored dates or checks", () => {
  const f = fixture(); f.export();
  assert.match(f.downloads[0], /## 1\. cursor/);
  assert.doesNotMatch(f.downloads[0], /## \d\. (replit|tabnine)/);
  assert.match(f.downloads[0], /test date=older/);
  assert.deepEqual(Object.fromEntries(f.storage), f.initial); assert.equal(f.writes.length, 0);
});
test("return on the next local calendar day refreshes the age view", () => {
  const f = fixture(); f.advance("2026-10-24");
  assert.deepEqual(f.items.map(i => i.hidden), [false, false, true]);
  assert.equal(f.count.textContent, "2"); assert.equal(f.writes.length, 0);
});
test("calendar age crosses spring/fall DST, month ends and leap day consistently", () => {
  for (const [today, thirty, twentyNine] of [
    ["2026-03-20", "2026-02-18", "2026-02-19"],
    ["2026-11-10", "2026-10-11", "2026-10-12"],
    ["2024-03-01", "2024-01-31", "2024-02-01"]
  ]) {
    const f = fixture({ today, dates: [thirty, twentyNine, ""] });
    assert.deepEqual(f.items.map(i => i.hidden), [false, true, true], today);
  }
});
test("no-date and all-date views retain their meaning independently of age", () => {
  assert.deepEqual(fixture({ view: "untested" }).items.map(i => i.hidden), [true, true, false]);
  assert.deepEqual(fixture({ view: "dated" }).items.map(i => i.hidden), [false, false, true]);
  assert.deepEqual(fixture({ view: "all" }).items.map(i => i.hidden), [false, false, false]);
});
