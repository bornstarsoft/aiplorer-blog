import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../static/js/aiplorer-reset-return.js", import.meta.url), "utf8");
const key = "aiplorer-reset-seen-v1";
const records = [
  { key: "new|usage", kind: "usage" },
  { key: "credit|banked", kind: "banked" },
  { key: "old|both", kind: "both" },
  { key: "unclear|unclassified", kind: "unclassified" }
];
function state(keys) { return JSON.stringify({ version: 1, checkedAt: "2026-10-20T00:00:00.000Z", keys }); }
function fixture({ saved = null, home = false, blocked = false, failWrite = false, payload = { records } } = {}) {
  const storage = new Map(saved === null ? [] : [[key, saved]]);
  storage.set("aiplorer-shortlist-v1", '["/cursor/"]');
  const node = () => ({ hidden: true, textContent: "", handlers: {}, addEventListener(name, cb) { this.handlers[name] = cb; } });
  const badge = node(), panel = node(), status = node(), detail = node(), time = node(), mark = node(), forget = node();
  const nodes = { "[data-reset-return-data]": { textContent: JSON.stringify(payload) }, "[data-reset-unseen]": home ? badge : null, "[data-reset-return]": home ? null : panel };
  panel.querySelector = s => ({ "[data-reset-return-status]": status, "[data-reset-return-detail]": detail, "[data-reset-return-time]": time, "[data-reset-mark]": mark, "[data-reset-forget]": forget })[s];
  const listeners = {};
  runInNewContext(source, {
    document: { querySelector: s => nodes[s] },
    window: { addEventListener: (name, cb) => { listeners[name] = cb; } },
    localStorage: {
      getItem(k) { if (blocked) throw new Error("blocked"); return storage.get(k) ?? null; },
      setItem(k, v) { if (failWrite) throw new Error("full"); storage.set(k, v); },
      removeItem(k) { if (blocked) throw new Error("blocked"); storage.delete(k); }
    }
  });
  return { storage, badge, panel, status, detail, time, mark, forget, listeners };
}
test("first home visit has no badge or implicit write", () => {
  const f = fixture({ home: true });
  assert.equal(f.badge.hidden, true); assert.equal(f.storage.has(key), false);
});
test("first tracker visit requires an explicit check", () => {
  const f = fixture();
  assert.match(f.status.textContent, /No saved check/); assert.equal(f.storage.has(key), false);
  f.mark.handlers.click();
  assert.deepEqual(JSON.parse(f.storage.get(key)).keys, records.map(r => r.key));
  assert.equal(f.mark.disabled, true); assert.match(f.status.textContent, /No added or revised/);
});
test("home reports unseen records, not visits or elapsed time", () => {
  const saved = state(["old|both", "unclear|unclassified"]);
  const f = fixture({ home: true, saved });
  assert.equal(f.badge.textContent, "2 unseen records"); assert.equal(f.badge.hidden, false);
  assert.match(f.badge.title, /1 usage reset.*1 reset credit/);
  assert.equal(f.storage.get(key), saved);
});
test("both and unclassified records are counted once each", () => {
  const f = fixture({ saved: state(["new|usage", "credit|banked"]) });
  assert.match(f.status.textContent, /^2 records/);
  assert.match(f.detail.textContent, /1 reset \+ credit.*1 unclassified/);
});
test("backfilled and revised records count even when their dates are old", () => {
  const f = fixture({ home: true, saved: state(["old|usage"]), payload: { records: [records[2]] } });
  assert.equal(f.badge.textContent, "1 unseen record");
});
test("repeat visit and deleted records do not create a false new badge", () => {
  const f = fixture({ home: true, saved: state(records.map(r => r.key).concat("removed")) });
  assert.equal(f.badge.hidden, true);
});
test("pageshow and cross-tab checks refresh without writing", () => {
  const f = fixture({ home: true, saved: state([]) });
  f.storage.set(key, state(records.map(r => r.key))); f.listeners.storage({ key });
  assert.equal(f.badge.hidden, true);
  f.storage.set(key, state([])); f.listeners.pageshow();
  assert.equal(f.badge.hidden, false);
  f.storage.delete(key); f.listeners.storage({ key: null });
  assert.equal(f.badge.hidden, true);
});
test("forget removes only this feature's saved state", () => {
  const f = fixture({ saved: state([]) }); f.forget.handlers.click();
  assert.equal(f.storage.has(key), false); assert.equal(f.storage.get("aiplorer-shortlist-v1"), '["/cursor/"]');
  assert.match(f.status.textContent, /No saved check/);
});
test("blocked and malformed storage fail safely without hiding public history", () => {
  for (const options of [{ blocked: true }, { saved: "{" }, { saved: "null" }, { saved: JSON.stringify({ version: 1, keys: [], checkedAt: "invalid" }) }]) {
    const f = fixture(options); assert.match(f.status.textContent, /unavailable/); assert.equal(f.mark.disabled, true);
    assert.equal(fixture({ ...options, home: true }).badge.hidden, true);
  }
});
test("malformed saved state can be explicitly cleared", () => {
  const f = fixture({ saved: "{" }); f.forget.handlers.click();
  assert.match(f.status.textContent, /No saved check/); assert.equal(f.mark.disabled, false);
});
test("write failure never reports a successful check", () => {
  const f = fixture({ failWrite: true }); f.mark.handlers.click();
  assert.match(f.status.textContent, /unavailable/); assert.equal(f.storage.has(key), false);
});
test("checking an older snapshot preserves keys seen in a newer snapshot", () => {
  const f = fixture({ saved: state(["from-newer-page"]) }); f.mark.handlers.click();
  assert.ok(JSON.parse(f.storage.get(key)).keys.includes("from-newer-page"));
});
test("invalid or duplicate payload stays hidden and cannot write", () => {
  for (const payload of [{ records: [] }, { records: [records[0], records[0]] }, { records: [{ key: "bad", kind: "invalid" }] }, {}]) {
    const f = fixture({ payload }); assert.equal(f.panel.hidden, true); assert.equal(f.mark.handlers.click, undefined);
  }
});
