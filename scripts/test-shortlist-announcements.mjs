import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../static/js/aiplorer-shortlist-announcements.js", import.meta.url), "utf8");
const key = "aiplorer-change-read-v1";
function fixture(read = [], blocked = false) {
  const storage = new Map([[key, JSON.stringify(read)]]);
  const listeners = {};
  const makePanel = (entries) => {
    const status = { textContent: "Announcement checks" }, link = {};
    const attrs = { "data-shortlist-announcements": JSON.stringify(entries) };
    return { status, link, attrs,
      getAttribute: name => attrs[name],
      setAttribute: (name, value) => { attrs[name] = value; },
      querySelector: name => name === "[data-announcement-status]" ? status : link
    };
  };
  const first = { key: "first:2", title: "Newer notice", href: "/ai-tools/review-updates/?saved=1#change-first" };
  const older = { key: "older:1", title: "Older notice", href: "/ai-tools/review-updates/?saved=1#change-older" };
  const panels = [makePanel([first, older]), makePanel([]), makePanel([{ ...first, key: "other:1" }])];
  runInNewContext(source, {
    document: { querySelectorAll: () => panels },
    window: { localStorage: { getItem: k => { if (blocked) throw new Error("blocked"); return storage.get(k); } },
      addEventListener: (name, cb) => { listeners[name] = cb; } }
  });
  return { panels, storage, listeners };
}

test("counts per tool and links to the newest unread check without writing read state", () => {
  const f = fixture();
  assert.equal(f.panels[0].status.textContent, "2 unread announcement checks");
  assert.match(f.panels[0].link.href, /#change-first$/);
  assert.equal(f.panels[2].status.textContent, "1 unread announcement check");
  assert.equal(f.storage.get(key), "[]");
});
test("already-read newer records do not hide an older unread check", () => {
  const f = fixture(["first:2"]);
  assert.equal(f.panels[0].status.textContent, "1 unread announcement check");
  assert.match(f.panels[0].link.href, /#change-older$/);
});
test("a revised record remains unread and unknown tools do not imply no change", () => {
  const f = fixture(["first:1", "older:1"]);
  assert.equal(f.panels[0].status.textContent, "1 unread announcement check");
  assert.equal(f.panels[1].status.textContent, "Announcement checks");
});
test("read-all state keeps the newest reference accessible", () => {
  const f = fixture(["first:2", "older:1"]);
  assert.equal(f.panels[0].status.textContent, "All recorded checks read");
  assert.match(f.panels[0].link.href, /#change-first$/);
  assert.equal(f.panels[0].attrs["data-unread"], "false");
});
test("return navigation, storage and shortlist changes refresh the status", () => {
  const f = fixture();
  for (const refresh of [() => f.listeners.pageshow(), () => f.listeners.storage({ key }), () => f.listeners.storage({ key: null }), () => f.listeners["aiplorer:shortlist-change"]()]) {
    f.storage.set(key, JSON.stringify(["first:2", "older:1"]));
    refresh();
    assert.equal(f.panels[0].status.textContent, "All recorded checks read");
    f.storage.set(key, "[]");
    refresh();
    assert.equal(f.panels[0].status.textContent, "2 unread announcement checks");
  }
});
test("blocked, malformed and non-array storage never report false unread counts", () => {
  assert.match(fixture([], true).panels[0].status.textContent, /unavailable/);
  const f = fixture();
  for (const invalid of ["{", "{}", "null"]) {
    f.storage.set(key, invalid);
    f.listeners.pageshow();
    assert.match(f.panels[0].status.textContent, /unavailable/);
    assert.equal(f.panels[0].attrs["data-unread"], "false");
    assert.match(f.panels[0].link.href, /#change-first$/);
  }
});
test("unrelated storage events do not change the display; malformed panel stays safe", () => {
  const f = fixture();
  f.storage.set(key, "{}");
  f.listeners.storage({ key: "other" });
  assert.match(f.panels[0].status.textContent, /2 unread/);
  f.panels[0].attrs["data-shortlist-announcements"] = "{";
  assert.doesNotThrow(() => f.listeners.pageshow());
});
