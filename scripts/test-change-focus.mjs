import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../static/js/aiplorer-change-watch.js", import.meta.url), "utf8");
const readKey = "aiplorer-change-read-v1", savedKey = "aiplorer-shortlist-v1";
const viewKey = "aiplorer-change-view-v1";
const remembered = JSON.stringify({ version: 1, saved: true, unread: true, tool: "cursor", topic: "Access" });
function fixture(query = "", blocked = false, view = null) {
  let url = new URL("https://aiplorer.com/ai-tools/review-updates/" + query);
  const events = {}, storage = new Map([[savedKey, JSON.stringify(["/ai-tools/tools/cursor/"])]]);
  const downloads = [], revoked = [], timers = [];
  let downloadFails = false;
  if (view !== null) storage.set(viewKey, view);
  function control(values = []) { return { value: "", checked: false, disabled: false, options: values.map(value => ({ value })), events: {}, focus() { this.focused = true; }, addEventListener(name, fn) { this.events[name] = fn; } }; }
  const saved = control(), unread = control(), tool = control(["", "cursor", "replit"]), topic = control(["", "Access", "Workflow"]), read = control(), reset = control(), exportButton = control(), status = {}, empty = {}, controls = {};
  const entries = [
    ["cursor-new:2", "cursor", "Access"], ["cursor-old:1", "cursor", "Workflow"], ["replit-one:1", "replit", "Access"]
  ].map(([id, slug, category]) => ({ dataset: { changeId: id, changeTool: "/ai-tools/tools/" + slug + "/", changeTopic: category }, badge: {}, checkbox: control(), readControl: {}, querySelector(selector) { return selector === "[data-change-entry-read]" ? this.checkbox : selector === "[data-change-entry-read-control]" ? this.readControl : this.badge; } }));
  entries.forEach(entry => {
    const id = entry.dataset.changeId.split(":")[0], slug = entry.dataset.changeTool.split("/")[3];
    entry.brief = {
      "[data-brief-tool]": { textContent: slug },
      "[data-brief-title]": { textContent: id + " announcement", getAttribute: () => "#change-" + id },
      "[data-brief-date]": { textContent: "Announced 2026-10 (exact day not published)" },
      "[data-brief-checked]": { textContent: "2026-10-15" },
      "[data-brief-summary]": { textContent: "Public summary for " + id },
      "[data-brief-action]": { textContent: "Confirm scope before acting" },
      "[data-brief-source]": { href: "https://official.example/" + id }
    };
    const original = entry.querySelector.bind(entry);
    entry.querySelector = selector => entry.brief[selector] || original(selector);
  });
  const elements = { "[data-change-saved]": saved, "[data-change-unread]": unread, "select[data-change-tool]": tool, "select[data-change-topic]": topic, "[data-change-read]": read, "[data-change-reset]": reset, "[data-change-export]": exportButton, "[data-change-status]": status, "[data-change-empty]": empty, "[data-change-controls]": controls };
  const window = { get location() { return url; }, history: { state: { retained: true }, replaceState(state, _, target) { assert.deepEqual(state, { retained: true }); url = new URL(target, url); } }, addEventListener: (event, fn) => { events[event] = fn; } };
  window.URL = { createObjectURL: blob => { downloads.push({ blob }); return "blob:brief"; }, revokeObjectURL: value => revoked.push(value) };
  window.setTimeout = fn => timers.push(fn);
  const document = {
    querySelector: () => ({ dataset: { changeUrl: "https://aiplorer.com/ai-tools/review-updates/" }, querySelectorAll: () => entries, querySelector: s => elements[s] }),
    body: { appendChild() {} },
    createElement: () => ({ click() { if (downloadFails) throw Error("blocked"); downloads.at(-1).filename = this.download; }, remove() { downloads.at(-1).removed = true; } })
  };
  runInNewContext(source, { document, window, URL, URLSearchParams, Blob,
    localStorage: { getItem: k => { if (blocked) throw Error("blocked"); return storage.get(k); }, setItem: (k, v) => { if (blocked) throw Error("blocked"); storage.set(k, v); }, removeItem: k => { if (blocked) throw Error("blocked"); storage.delete(k); } }
  });
  return { saved, unread, tool, topic, read, reset, exportButton, downloads, revoked, timers, failDownload: () => { downloadFails = true; }, status, empty, entries, storage, events, url: () => url, navigate: value => { url = new URL(value, url); }, visible: () => entries.filter(e => !e.hidden) };
}

test("tool deep link shows only that tool and does not mark records read", () => {
  const f = fixture("?tool=cursor#change-cursor-new");
  assert.equal(f.visible().length, 2);
  assert.equal(f.tool.value, "cursor");
  assert.equal(f.storage.has(readKey), false);
  assert.equal(f.url().hash, "#change-cursor-new");
});
test("topic, tool, saved and unread combine; only visible records are marked read", () => {
  const f = fixture("?tool=cursor&topic=Access&changesSaved=1&unread=1");
  assert.equal(f.visible().length, 1);
  f.read.events.click();
  assert.deepEqual(JSON.parse(f.storage.get(readKey)), ["cursor-new:2"]);
  assert.equal(f.visible().length, 0);
  assert.equal(f.empty.hidden, false);
  assert.equal(f.read.disabled, true);
});
test("filter changes create a bookmarkable view and preserve unrelated query state", () => {
  const f = fixture("?view=guides&new=1");
  f.tool.value = "replit"; f.tool.events.change();
  f.topic.value = "Access"; f.topic.events.change();
  f.unread.checked = true; f.unread.events.change();
  assert.equal(f.url().searchParams.get("tool"), "replit");
  assert.equal(f.url().searchParams.get("view"), "guides");
  assert.equal(f.url().searchParams.get("new"), "1");
  assert.equal(f.url().hash, "#tool-changes");
  assert.equal(fixture(f.url().search).visible().length, 1);
});
test("legacy saved links work; clearing announcement filters does not clear the lower panel", () => {
  const f = fixture("?saved=1&tool=cursor&topic=Access");
  assert.equal(f.saved.checked, true);
  f.reset.events.click();
  assert.equal(f.visible().length, 3);
  assert.equal(f.url().searchParams.get("saved"), "1");
  assert.equal(f.url().searchParams.get("changesSaved"), "0");
  assert.equal(fixture(f.url().search).visible().length, 3);
  assert.equal(f.reset.disabled, true);
});
test("unknown tool/topic values fall back to all; saved-empty state stays empty", () => {
  const f = fixture("?tool=not-a-tool&topic=unknown");
  assert.equal(f.visible().length, 3);
  const saved = fixture("?changesSaved=1");
  saved.storage.set(savedKey, "[]"); saved.events.storage({ key: savedKey });
  assert.equal(saved.visible().length, 0);
  saved.navigate("?changesSaved=1&view=tools"); saved.events.pageshow();
  assert.equal(saved.visible().length, 0);
});
test("return and cross-tab changes refresh read state; revisions remain unread", () => {
  const f = fixture("?tool=cursor&unread=1");
  f.storage.set(readKey, JSON.stringify(["cursor-new:1", "cursor-old:1"]));
  f.events.pageshow(); assert.equal(f.visible().length, 1);
  f.storage.set(readKey, JSON.stringify(["cursor-new:2", "cursor-old:1"]));
  f.events.storage({ key: readKey }); assert.equal(f.visible().length, 0);
  f.navigate("?tool=replit"); f.events.popstate();
  assert.equal(f.visible().length, 1);
  assert.equal(f.tool.value, "replit");
});
test("blocked storage keeps current-session read state and warns honestly", () => {
  const f = fixture("?tool=cursor&unread=1", true);
  assert.match(f.status.textContent, /storage is unavailable/);
  f.read.events.click(); f.events.pageshow();
  assert.equal(f.visible().length, 0);
});

test("individual read and unread toggles change only that announcement", () => {
  const f = fixture("?tool=cursor"), checkbox = f.entries[0].checkbox;
  assert.equal(checkbox.checked, false);
  assert.equal(f.entries[0].readControl.hidden, false);
  checkbox.checked = true; checkbox.events.change();
  assert.deepEqual(JSON.parse(f.storage.get(readKey)), ["cursor-new:2"]);
  assert.equal(f.entries[0].badge.hidden, true);
  assert.equal(f.entries[1].checkbox.checked, false);
  checkbox.checked = false; checkbox.events.change();
  assert.deepEqual(JSON.parse(f.storage.get(readKey)), []);
  assert.equal(f.entries[0].badge.hidden, false);
});
test("individual actions preserve other-tab and newer-page read keys", () => {
  const f = fixture();
  f.storage.set(readKey, JSON.stringify(["replit-one:1", "future-record:1"]));
  f.entries[0].checkbox.checked = true; f.entries[0].checkbox.events.change();
  assert.deepEqual(new Set(JSON.parse(f.storage.get(readKey))), new Set(["replit-one:1", "future-record:1", "cursor-new:2"]));
  f.entries[0].checkbox.checked = false; f.entries[0].checkbox.events.change();
  assert.deepEqual(new Set(JSON.parse(f.storage.get(readKey))), new Set(["replit-one:1", "future-record:1"]));
});
test("bulk actions also preserve stored keys absent from this page", () => {
  const f = fixture("?tool=cursor");
  f.storage.set(readKey, JSON.stringify(["future-record:1"]));
  f.read.events.click();
  assert.deepEqual(new Set(JSON.parse(f.storage.get(readKey))), new Set(["future-record:1", "cursor-new:2", "cursor-old:1"]));
});
test("unread-only actions move keyboard focus to the next result then the filter", () => {
  const f = fixture("?tool=cursor&unread=1");
  f.entries[0].checkbox.checked = true; f.entries[0].checkbox.events.change();
  assert.equal(f.entries[0].hidden, true);
  assert.equal(f.entries[1].checkbox.focused, true);
  f.entries[1].checkbox.checked = true; f.entries[1].checkbox.events.change();
  assert.equal(f.visible().length, 0);
  assert.equal(f.unread.focused, true);
});
test("cross-tab unread and pageshow keep checkbox state in sync", () => {
  const f = fixture();
  f.storage.set(readKey, JSON.stringify(["cursor-new:2"]));
  f.events.pageshow(); assert.equal(f.entries[0].checkbox.checked, true);
  f.storage.set(readKey, "[]");
  f.events.storage({ key: readKey }); assert.equal(f.entries[0].checkbox.checked, false);
});
test("individual toggles still work for this visit when storage is blocked", () => {
  const f = fixture("?tool=cursor", true);
  f.entries[0].checkbox.checked = true; f.entries[0].checkbox.events.change();
  f.events.pageshow(); assert.equal(f.entries[0].checkbox.checked, true);
  assert.match(f.status.textContent, /storage is unavailable/);
  f.entries[0].checkbox.checked = false; f.entries[0].checkbox.events.change();
  assert.equal(f.entries[0].checkbox.checked, false);
});
test("malformed read storage warns and preserves the current-session state", () => {
  const f = fixture();
  f.entries[0].checkbox.checked = true; f.entries[0].checkbox.events.change();
  f.storage.set(readKey, "{}"); f.events.pageshow();
  assert.equal(f.entries[0].checkbox.checked, true);
  assert.match(f.status.textContent, /storage is unavailable/);
});

test("plain return restores all remembered filters without marking notices read", () => {
  const f = fixture("", false, remembered);
  assert.equal(f.visible().length, 1);
  assert.equal(f.saved.checked, true);
  assert.equal(f.unread.checked, true);
  assert.equal(f.tool.value, "cursor");
  assert.equal(f.topic.value, "Access");
  assert.match(f.status.textContent, /Last view restored/);
  assert.equal(f.url().searchParams.get("tool"), "cursor");
  assert.equal(f.url().hash, "");
  assert.equal(f.storage.has(readKey), false);
});
test("filter interaction remembers a validated view for a later plain visit", () => {
  const f = fixture();
  assert.equal(f.storage.has(viewKey), false);
  f.tool.value = "replit"; f.tool.events.change();
  f.unread.checked = true; f.unread.events.change();
  const next = fixture("", false, f.storage.get(viewKey));
  assert.equal(next.tool.value, "replit");
  assert.equal(next.unread.checked, true);
  assert.equal(next.visible().length, 1);
});
test("explicit filters override preferences without replacing them", () => {
  for (const query of ["?tool=replit", "?changesSaved=0", "?saved=0", "?unread=0", "?topic=Workflow"]) {
    const f = fixture(query, false, remembered);
    assert.doesNotMatch(f.status.textContent, /Last view restored/);
    assert.equal(f.storage.get(viewKey), remembered);
    assert.equal(f.saved.checked, false);
    assert.equal(f.unread.checked, false);
  }
});
test("direct announcement anchors including RSS links cannot be hidden by a saved filter", () => {
  const f = fixture("#change-replit-one", false, remembered);
  assert.equal(f.visible().length, 3);
  assert.equal(f.url().hash, "#change-replit-one");
  assert.equal(f.url().search, "");
  assert.equal(f.storage.get(viewKey), remembered);
});
test("resume preserves unrelated query state and section anchors", () => {
  const f = fixture("?view=guides&new=1#tool-changes", false, remembered);
  assert.equal(f.visible().length, 1);
  assert.equal(f.url().searchParams.get("view"), "guides");
  assert.equal(f.url().searchParams.get("new"), "1");
  assert.equal(f.url().hash, "#tool-changes");
});
test("clear removes only remembered filters, leaving read state and saved tools", () => {
  const f = fixture("", false, remembered);
  f.storage.set(readKey, JSON.stringify(["cursor-old:1"]));
  f.reset.events.click();
  assert.equal(f.storage.has(viewKey), false);
  assert.equal(f.visible().length, 3);
  assert.equal(f.storage.get(readKey), JSON.stringify(["cursor-old:1"]));
  assert.equal(f.storage.get(savedKey), JSON.stringify(["/ai-tools/tools/cursor/"]));
  assert.doesNotMatch(f.status.textContent, /Last view restored/);
});
test("unknown saved options are discarded and invalid schemas fail to the default view", () => {
  const f = fixture("", false, JSON.stringify({ version: 1, saved: false, unread: false, tool: "removed", topic: "removed" }));
  assert.equal(f.visible().length, 3);
  assert.equal(f.reset.disabled, true);
  for (const value of ["[]", "null", "{}", '{"version":2}', '{"version":1,"saved":"true"}']) {
    assert.equal(fixture("", false, value).visible().length, 3);
  }
});
test("blocked or malformed view storage keeps filters usable without claiming persistence", () => {
  for (const f of [fixture("", true), fixture("", false, "{bad")]) {
    assert.match(f.status.textContent, /saved view is unavailable/);
    f.tool.value = "replit"; f.tool.events.change();
    assert.equal(f.visible().length, 1);
    f.reset.events.click();
    assert.equal(f.visible().length, 3);
  }
});
test("other tabs cannot unexpectedly switch the current view", () => {
  const f = fixture("?tool=replit", false, remembered);
  f.events.storage({ key: viewKey }); f.events.pageshow();
  assert.equal(f.tool.value, "replit");
  assert.equal(f.visible().length, 1);
});
test("history navigation follows the URL instead of resuming the saved preference", () => {
  const f = fixture("", false, remembered);
  f.navigate("/ai-tools/review-updates/"); f.events.popstate();
  assert.equal(f.visible().length, 3);
  assert.doesNotMatch(f.status.textContent, /Last view restored/);
  assert.equal(f.storage.get(viewKey), remembered);
});

test("brief includes only filtered public records and preserves source dates and links", async () => {
  const f = fixture("?tool=cursor&topic=Access");
  f.exportButton.events.click();
  assert.equal(f.downloads.length, 1);
  const text = await f.downloads[0].blob.text();
  assert.match(text, /Included announcements: 1/);
  assert.match(text, /cursor-new announcement/);
  assert.doesNotMatch(text, /cursor-old|replit-one/);
  assert.match(text, /Announced 2026-10 \(exact day not published\)/);
  assert.match(text, /Source checked: 2026-10-15/);
  assert.match(text, /https:\/\/official.example\/cursor-new/);
  assert.match(text, /https:\/\/aiplorer.com\/ai-tools\/review-updates\/#change-cursor-new/);
  assert.match(text, /Next step \/ owner \/ check date: \[not recorded\]/);
  assert.match(f.downloads[0].filename, /^aiplorer-announcements-\d{4}-\d{2}-\d{2}\.txt$/);
  assert.equal(f.downloads[0].blob.type, "text/plain;charset=utf-8");
});
test("export never copies private storage or changes read/filter state", async () => {
  const f = fixture("?changesSaved=1&unread=1");
  f.storage.set(readKey, JSON.stringify(["cursor-old:1"]));
  f.storage.set("aiplorer-candidate-notes-v1", "PRIVATE_NOTE_SENTINEL");
  f.events.storage({key: readKey});
  const before = Array.from(f.storage.entries());
  f.exportButton.events.click();
  const text = await f.downloads[0].blob.text();
  assert.match(text, /Included announcements: 1/);
  assert.doesNotMatch(text, /PRIVATE_NOTE_SENTINEL|cursor-old announcement/);
  assert.deepEqual(Array.from(f.storage.entries()), before);
  assert.equal(f.entries[0].checkbox.checked, false);
});
test("empty filtered view disables export and does not create a file", () => {
  const f = fixture("?tool=cursor&unread=1");
  f.read.events.click();
  assert.equal(f.exportButton.disabled, true);
  f.exportButton.events.click();
  assert.equal(f.downloads.length, 0);
});
test("all-read visible entries remain exportable without unread-only filtering", () => {
  const f = fixture("?tool=cursor");
  f.read.events.click();
  assert.equal(f.exportButton.disabled, false);
  f.exportButton.events.click();
  assert.equal(f.downloads.length, 1);
});
test("export works with blocked storage and cleans up temporary download resources", () => {
  const f = fixture("?tool=replit", true);
  f.exportButton.events.click();
  assert.equal(f.downloads[0].removed, true);
  assert.match(f.status.textContent, /Download requested for 1 updates/);
  f.timers.forEach(fn => fn());
  assert.deepEqual(f.revoked, ["blob:brief"]);
});
test("download failure is reported honestly and still cleans up", () => {
  const f = fixture();
  f.failDownload(); f.exportButton.events.click();
  assert.match(f.status.textContent, /Could not download/);
  assert.equal(f.storage.has(readKey), false);
  assert.equal(f.downloads[0].removed, true);
  f.timers.forEach(fn => fn());
  assert.deepEqual(f.revoked, ["blob:brief"]);
});
