import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../static/js/aiplorer-home-saved-updates.js", import.meta.url), "utf8");
const savedKey = "aiplorer-shortlist-v1";
const readKey = "aiplorer-change-read-v1";
function fixture(saved = [], seen = [], blocked = false) {
  const storage = new Map([[savedKey, JSON.stringify(saved)], [readKey, JSON.stringify(seen)]]);
  const status = {}, list = {}, link = {};
  const rows = Array.from({ length: 4 }, (_, i) => ({ hidden: true, dataset: { tool: "/cursor/", readKey: `change-${i}:1` } }));
  rows.push({ hidden: true, dataset: { tool: "/other/", readKey: "other:1" } });
  const listeners = {};
  const root = {
    querySelectorAll: () => rows,
    querySelector: (s) => ({ "[data-saved-update-status]": status, "[data-saved-update-list]": list, "[data-saved-update-link]": link })[s]
  };
  runInNewContext(source, {
    document: { querySelector: () => root },
    window: { addEventListener: (name, cb) => { listeners[name] = cb; } },
    localStorage: { getItem: (k) => { if (blocked) throw new Error("blocked"); return storage.get(k); } }
  });
  return { storage, status, list, link, rows, listeners };
}
test("empty and uncovered lists do not imply that vendors are unchanged", () => {
  assert.match(fixture().status.textContent, /Save tools/);
  const f = fixture(["/uncovered/"]);
  assert.match(f.status.textContent, /does not mean/);
  assert.equal(f.list.hidden, true);
});
test("only unread saved entries appear, bounded at three; no read mutation", () => {
  const f = fixture(["/cursor/"]);
  assert.equal(f.rows.filter(r => !r.hidden).length, 3);
  assert.match(f.status.textContent, /4 unread/);
  assert.match(f.link.href, /saved=1&unread=1/);
  assert.equal(f.storage.get(readKey), "[]");
});
test("read state and new revisions remain distinct", () => {
  const f = fixture(["/cursor/"], ["change-0:0", "change-1:1", "change-2:1", "change-3:1"]);
  assert.equal(f.rows[0].hidden, false);
  assert.match(f.status.textContent, /1 unread/);
  f.storage.set(readKey, JSON.stringify(["change-0:1", "change-1:1", "change-2:1", "change-3:1"]));
  f.listeners.storage();
  assert.match(f.status.textContent, /read all available/);
  assert.equal(f.list.hidden, true);
});
test("same-tab saves, cross-tab changes and back navigation refresh the panel", () => {
  const f = fixture();
  f.storage.set(savedKey, JSON.stringify(["/cursor/"]));
  f.listeners["aiplorer:shortlist-change"]();
  assert.equal(f.list.hidden, false);
  f.storage.set(savedKey, "[]");
  f.listeners.pageshow();
  assert.equal(f.list.hidden, true);
});
test("blocked or malformed storage has an honest fallback", () => {
  assert.match(fixture([], [], true).status.textContent, /unavailable/);
  const f = fixture();
  f.storage.set(savedKey, "{");
  f.listeners.storage();
  assert.match(f.status.textContent, /unavailable/);
});
