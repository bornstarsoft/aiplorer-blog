import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../static/js/aiplorer-change-watch.js", import.meta.url), "utf8");
const readKey = "aiplorer-change-read-v1", savedKey = "aiplorer-shortlist-v1";
const viewKey = "aiplorer-change-view-v1";
const followKey = "aiplorer-change-follow-up-v1";
const remembered = JSON.stringify({ version: 1, saved: true, unread: true, tool: "cursor", topic: "Access" });
function fixture(query = "", blocked = false, view = null, dates = []) {
  let url = new URL("https://aiplorer.com/ai-tools/review-updates/" + query);
  let now = new Date();
  const events = {}, storage = new Map([[savedKey, JSON.stringify(["/ai-tools/tools/cursor/"])]]);
  const downloads = [], revoked = [], timers = [];
  let downloadFails = false;
  if (view !== null) storage.set(viewKey, view);
  function control(values = []) { return { value: "", checked: false, disabled: false, options: values.map(value => ({ value })), events: {}, focus() { this.focused = true; }, addEventListener(name, fn) { this.events[name] = fn; } }; }
  const saved = control(), unread = control(), tool = control(["", "cursor", "replit"]), topic = control(["", "Access", "Workflow"]), read = control(), reset = control(), exportButton = control(), status = {}, empty = {}, controls = {};
  const firstUnread = control(), caughtUp = {}, showRead = control(), followOnly = control();
  const exportCalendar = control(), calendarStatus = {};
  const transitions = dates.map((date, index) => ({
    hidden: true,
    dataset: {
      changeTransitionDate: date,
      changeTransitionId: "transition-" + index,
      changeTransitionSource: "https://official.example/transition-" + index,
    },
    title: { textContent: "Transition " + index },
    querySelector() { return this.title; },
  }));
  const upcoming = dates.length ? {
    hidden: true, querySelectorAll: () => transitions,
    querySelector: selector => selector === "[data-change-export-calendar]" ? exportCalendar : calendarStatus,
  } : null;
  const entries = [
    ["cursor-new:2", "cursor", "Access"], ["cursor-old:1", "cursor", "Workflow"], ["replit-one:1", "replit", "Access"]
  ].map(([id, slug, category]) => ({ dataset: { changeId: id, changeTool: "/ai-tools/tools/" + slug + "/", changeTopic: category }, badge: {}, checkbox: control(), readControl: {}, querySelector(selector) { return selector === "[data-change-entry-read]" ? this.checkbox : selector === "[data-change-entry-read-control]" ? this.readControl : this.badge; } }));
  entries.forEach(entry => {
    const id = entry.dataset.changeId.split(":")[0], slug = entry.dataset.changeTool.split("/")[3];
    entry.nextUnread = control();
    entry.backToFilters = control();
    entry.follow = control();
    entry.followControl = { querySelector: () => entry.follow };
    entry.readingNav = { querySelector: s => s === "[data-change-next-unread]" ? entry.nextUnread : entry.backToFilters };
    entry.brief = {
      "[data-change-reading-nav]": entry.readingNav,
      "[data-change-follow-control]": entry.followControl,
      "[data-brief-tool]": { textContent: slug },
      "[data-brief-title]": { ...control(), textContent: id + " announcement", getAttribute: () => "#change-" + id },
      "[data-brief-date]": { textContent: "Announced 2026-10 (exact day not published)" },
      "[data-brief-checked]": { textContent: "2026-10-15" },
      "[data-brief-summary]": { textContent: "Public summary for " + id },
      "[data-brief-action]": { textContent: "Confirm scope before acting" },
      "[data-brief-source]": { href: "https://official.example/" + id }
    };
    const original = entry.querySelector.bind(entry);
    entry.querySelector = selector => entry.brief[selector] || original(selector);
  });
  const elements = { "[data-change-saved]": saved, "[data-change-unread]": unread, "[data-change-follow-only]": followOnly, "select[data-change-tool]": tool, "select[data-change-topic]": topic, "[data-change-read]": read, "[data-change-first-unread]": firstUnread, "[data-change-caught-up]": caughtUp, "[data-change-show-read]": showRead, "[data-change-reset]": reset, "[data-change-export]": exportButton, "[data-change-status]": status, "[data-change-empty]": empty, "[data-change-controls]": controls, "[data-change-upcoming]": upcoming };
  const window = { get location() { return url; }, history: { state: { retained: true }, replaceState(state, _, target) { assert.deepEqual(state, { retained: true }); url = new URL(target, url); } }, addEventListener: (event, fn) => { events[event] = fn; } };
  window.URL = { createObjectURL: blob => { downloads.push({ blob }); return "blob:brief"; }, revokeObjectURL: value => revoked.push(value) };
  window.setTimeout = fn => timers.push(fn);
  const document = {
    querySelector: () => ({ dataset: { changeUrl: "https://aiplorer.com/ai-tools/review-updates/" }, querySelectorAll: () => entries, querySelector: s => elements[s] }),
    body: { appendChild() {} },
    createElement: () => ({ click() { if (downloadFails) throw Error("blocked"); downloads.at(-1).filename = this.download; }, remove() { downloads.at(-1).removed = true; } })
  };
  runInNewContext(source, { document, window, URL, URLSearchParams, Blob, TextEncoder,
    Date: class extends Date { constructor(...args) { super(...(args.length ? args : [now])); } },
    localStorage: { getItem: k => { if (blocked) throw Error("blocked"); return storage.get(k); }, setItem: (k, v) => { if (blocked) throw Error("blocked"); storage.set(k, v); }, removeItem: k => { if (blocked) throw Error("blocked"); storage.delete(k); } }
  });
  return { saved, unread, tool, topic, read, firstUnread, caughtUp, showRead, followOnly, upcoming, transitions, exportCalendar, calendarStatus, setLocalTime: (year, month, day, hour = 0) => { now = new Date(year, month - 1, day, hour); }, reset, exportButton, downloads, revoked, timers, failDownload: () => { downloadFails = true; }, status, empty, entries, storage, events, url: () => url, navigate: value => { url = new URL(value, url); }, visible: () => entries.filter(e => !e.hidden) };
}

test("upcoming transitions retain local today and hide expired dates when revisiting", () => {
  const f = fixture("?changesSaved=1&followup=1&tool=cursor#tool-changes", false, null, ["2026-11-30", "2026-12-11", "2027-03-31"]);
  const href = f.url().href, initialStorage = [...f.storage];
  f.setLocalTime(2026, 11, 30, 23);
  f.events.focus();
  assert.equal(f.upcoming.hidden, false);
  assert.deepEqual(f.transitions.map(item => item.hidden), [false, false, false]);
  f.setLocalTime(2026, 12, 1);
  f.events.pageshow();
  assert.deepEqual(f.transitions.map(item => item.hidden), [true, false, false]);
  f.setLocalTime(2027, 4, 1);
  f.events.focus();
  assert.equal(f.upcoming.hidden, true);
  assert.equal(f.visible().length, 0);
  assert.equal(f.url().href, href);
  assert.deepEqual([...f.storage], initialStorage);
});

test("calendar exports only current and future dates as all-day public events", async () => {
  const f = fixture("?tool=cursor&followup=1#tool-changes", false, null, ["2026-11-30", "2026-12-11", "2027-03-31"]);
  f.setLocalTime(2026, 12, 11, 22);
  f.storage.set("aiplorer-candidate-notes-v1", "PRIVATE_NOTE_SENTINEL");
  const before = [...f.storage], href = f.url().href;
  f.exportCalendar.events.click();
  assert.equal(f.downloads.length, 1);
  assert.equal(f.downloads[0].filename, "aiplorer-transition-dates.ics");
  assert.equal(f.downloads[0].blob.type, "text/calendar;charset=utf-8");
  const raw = await f.downloads[0].blob.text();
  const lines = raw.replace(/\r\n /g, "").split("\r\n");
  assert.deepEqual(lines.slice(0, 2), ["BEGIN:VCALENDAR", "VERSION:2.0"]);
  assert.deepEqual(lines.slice(-2), ["END:VCALENDAR", ""]);
  assert.deepEqual(lines.filter(line => line.startsWith("DTSTART")), ["DTSTART;VALUE=DATE:20261211", "DTSTART;VALUE=DATE:20270331"]);
  assert.deepEqual(lines.filter(line => line.startsWith("UID:")), ["UID:transition-1@aiplorer.com", "UID:transition-2@aiplorer.com"]);
  assert(lines.includes("URL:https://aiplorer.com/ai-tools/review-updates/#change-transition-1"));
  assert(lines.some(line => line.startsWith("DESCRIPTION:") && line.includes("Official source: https://official.example/transition-1")));
  assert(lines.filter(line => line.startsWith("DTSTAMP:")).every(line => /^DTSTAMP:\d{8}T\d{6}Z$/.test(line)));
  assert.doesNotMatch(raw, /20261130|BEGIN:VALARM|PRIVATE_NOTE_SENTINEL|followup=1/);
  assert.equal(f.downloads[0].removed, true);
  assert.deepEqual([...f.storage], before);
  assert.equal(f.url().href, href);
  assert.match(f.calendarStatus.textContent, /does not sync/);
});

test("calendar escapes text and folds UTF-8 lines before download", async () => {
  const f = fixture("", false, null, ["2027-03-31"]);
  f.setLocalTime(2026, 11, 18);
  const title = "\u00e9".repeat(43) + ", model; beta\\release\nNext line";
  f.transitions[0].title.textContent = title;
  f.exportCalendar.events.click();
  const raw = await f.downloads[0].blob.text();
  assert(raw.includes("\r\n "));
  assert(raw.split("\r\n").every(line => Buffer.byteLength(line, "utf8") <= 75));
  const unfolded = raw.replace(/\r\n /g, "");
  assert(unfolded.includes("SUMMARY:Scheduled: " + "\u00e9".repeat(43) + "\\, model\\; beta\\\\release\\nNext line"));
  assert.doesNotMatch(raw, /\ufffd/);
});

test("calendar handles a blocked download and skips an expired schedule", () => {
  const f = fixture("", false, null, ["2027-03-31"]);
  f.setLocalTime(2026, 11, 18);
  f.failDownload();
  f.exportCalendar.events.click();
  assert.match(f.calendarStatus.textContent, /Could not download the calendar/);
  assert.equal(f.downloads[0].removed, true);
  f.timers.forEach(fn => fn());
  assert.deepEqual(f.revoked, ["blob:brief"]);
  f.setLocalTime(2027, 4, 1);
  f.exportCalendar.events.click();
  assert.equal(f.upcoming.hidden, true);
  assert.equal(f.downloads.length, 1);
});

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
  assert.equal(f.empty.hidden, true);
  assert.equal(f.caughtUp.hidden, false);
  assert.equal(f.showRead.focused, true);
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
test("read navigation follows only visible unread records and returns without changing state", () => {
  const f = fixture("?tool=cursor&changesSaved=1&view=guides#tool-changes", false, remembered);
  const [first, second, other] = f.entries;
  const initial = [...f.storage];
  const url = f.url().href;
  assert(f.entries.every(entry => entry.readingNav.hidden));
  assert.equal(f.firstUnread.disabled, false);
  f.firstUnread.events.click();
  assert.equal(first.brief["[data-brief-title]"].focused, true);
  assert.equal(first.nextUnread.hidden, false);
  first.nextUnread.events.click();
  assert.equal(first.readingNav.hidden, true);
  assert.equal(second.brief["[data-brief-title]"].focused, true);
  assert.equal(second.readingNav.hidden, false);
  assert.equal(second.nextUnread.hidden, true);
  assert.equal(other.readingNav.hidden, true);
  second.backToFilters.events.click();
  assert.equal(f.firstUnread.focused, true);
  assert(f.entries.every(entry => entry.readingNav.hidden));
  assert.equal(f.url().href, url);
  assert.deepEqual([...f.storage], initial);
});

test("read navigation skips previously read records and updates when results disappear", () => {
  const f = fixture("?tool=cursor&unread=1");
  const [first, second] = f.entries;
  f.storage.set(readKey, JSON.stringify(["cursor-new:2"]));
  f.events.storage({ key: readKey });
  f.firstUnread.events.click();
  assert.equal(first.readingNav.hidden, true);
  assert.equal(second.readingNav.hidden, false);
  f.storage.set(readKey, JSON.stringify(["cursor-new:2", "cursor-old:1"]));
  f.events.storage({ key: readKey });
  assert.equal(second.readingNav.hidden, true);
  assert.equal(f.firstUnread.disabled, true);
  assert.equal(f.empty.hidden, true);
  assert.equal(f.caughtUp.hidden, false);
});

test("reading a guided unread record advances and the last record focuses the caught-up action", () => {
  const f = fixture("?tool=cursor&unread=1");
  const [first, second] = f.entries;
  const href = f.url().href;
  f.firstUnread.events.click();
  first.checkbox.checked = true; first.checkbox.events.change();
  assert.equal(first.readingNav.hidden, true);
  assert.equal(second.readingNav.hidden, false);
  assert.equal(second.brief["[data-brief-title]"].focused, true);
  assert.deepEqual(JSON.parse(f.storage.get(readKey)), ["cursor-new:2"]);
  second.checkbox.checked = true; second.checkbox.events.change();
  assert.equal(f.caughtUp.hidden, false);
  assert.equal(f.showRead.focused, true);
  assert.deepEqual(JSON.parse(f.storage.get(readKey)), ["cursor-new:2", "cursor-old:1"]);
  assert.equal(f.url().href, href);
});

test("guided reading stops instead of returning to an earlier skipped unread record", () => {
  const f = fixture("?tool=cursor&unread=1");
  const [first, second] = f.entries;
  f.firstUnread.events.click();
  first.nextUnread.events.click();
  second.checkbox.checked = true; second.checkbox.events.change();
  assert.equal(first.readingNav.hidden, true);
  assert.equal(first.checkbox.checked, false);
  assert.equal(f.caughtUp.hidden, true);
  assert.equal(f.firstUnread.focused, true);
});

test("showing read updates clears only the unread filter and preserves read state", () => {
  const f = fixture("?changesSaved=1&unread=1&tool=cursor&topic=Access&view=guides");
  f.storage.set(readKey, JSON.stringify(["cursor-new:2", "other:1"]));
  f.events.storage({ key: readKey });
  assert.equal(f.caughtUp.hidden, false);
  f.showRead.events.click();
  assert.deepEqual(f.visible().map(entry => entry.dataset.changeId), ["cursor-new:2"]);
  assert.equal(f.entries[0].brief["[data-brief-title]"].focused, true);
  assert.equal(f.caughtUp.hidden, true);
  assert.equal(f.unread.checked, false);
  for (const [key, value] of [["changesSaved", "1"], ["tool", "cursor"], ["topic", "Access"], ["view", "guides"]]) {
    assert.equal(f.url().searchParams.get(key), value);
  }
  assert.equal(f.url().searchParams.has("unread"), false);
  assert.deepEqual(JSON.parse(f.storage.get(viewKey)), { version: 1, saved: true, unread: false, tool: "cursor", topic: "Access" });
  assert.deepEqual(JSON.parse(f.storage.get(readKey)), ["cursor-new:2", "other:1"]);
});

test("an empty filter scope is not treated as caught up", () => {
  const f = fixture("?tool=replit&topic=Workflow&unread=1");
  assert.equal(f.visible().length, 0);
  assert.equal(f.empty.hidden, false);
  assert.equal(f.caughtUp.hidden, true);
  f.showRead.events.click();
  assert.equal(f.unread.checked, true);
  assert.equal(f.storage.has(viewKey), false);
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

test("follow-up flags are independent of revisioned read status and preserve other entries", () => {
  const f = fixture("?tool=cursor");
  f.storage.set(followKey, JSON.stringify(["future-record"]));
  f.storage.set(readKey, JSON.stringify(["cursor-new:1"]));
  const [updated] = f.entries;
  updated.follow.checked = true; updated.follow.events.change();
  assert.deepEqual(JSON.parse(f.storage.get(followKey)), ["future-record", "cursor-new"]);
  assert.deepEqual(JSON.parse(f.storage.get(readKey)), ["cursor-new:1"]);
  assert.equal(updated.followControl.hidden, false);
  f.events.pageshow();
  assert.equal(updated.follow.checked, true);
  assert.equal(updated.checkbox.checked, false);
  updated.checkbox.checked = true; updated.checkbox.events.change();
  assert.equal(updated.follow.checked, true);
  assert.deepEqual(JSON.parse(f.storage.get(followKey)), ["future-record", "cursor-new"]);
});

test("the follow-up filter restores on a plain visit and combines with all current filters", () => {
  const f = fixture("?changesSaved=1&tool=cursor&topic=Access&view=guides");
  f.storage.set(followKey, JSON.stringify(["cursor-new", "cursor-old", "replit-one"]));
  f.storage.set(readKey, JSON.stringify(["cursor-new:2"]));
  f.events.storage({ key: null });
  f.followOnly.checked = true; f.followOnly.events.change();
  assert.deepEqual(f.visible().map(entry => entry.dataset.changeId), ["cursor-new:2"]);
  assert.equal(f.entries[0].checkbox.checked, true);
  assert.equal(f.url().searchParams.get("followup"), "1");
  assert.equal(f.url().searchParams.get("view"), "guides");
  const next = fixture("", false, f.storage.get(viewKey));
  assert.equal(next.followOnly.checked, true);
  assert.equal(next.url().searchParams.get("followup"), "1");
  const linked = fixture("#change-cursor-new", false, f.storage.get(viewKey));
  assert.equal(linked.followOnly.checked, false);
  assert.equal(linked.visible().length, 3);
  f.unread.checked = true; f.unread.events.change();
  assert.equal(f.caughtUp.hidden, false);
  f.showRead.events.click();
  assert.equal(f.followOnly.checked, true);
  assert.deepEqual(f.visible().map(entry => entry.dataset.changeId), ["cursor-new:2"]);
  f.reset.events.click();
  assert.equal(f.followOnly.checked, false);
  assert.equal(f.url().searchParams.has("followup"), false);
  assert.equal(JSON.parse(f.storage.get(followKey)).length, 3);
});

test("clearing a visible flag focuses the next flag or the filter and honors storage updates", () => {
  const f = fixture("?followup=1");
  const [first, second] = f.entries;
  f.storage.set(followKey, JSON.stringify(["cursor-new", "cursor-old"]));
  f.events.storage({ key: followKey });
  assert.equal(f.visible().length, 2);
  first.follow.checked = false; first.follow.events.change();
  assert.equal(first.hidden, true);
  assert.equal(second.follow.focused, true);
  second.follow.checked = false; second.follow.events.change();
  assert.equal(f.empty.hidden, false);
  assert.equal(f.followOnly.focused, true);
  assert.deepEqual(JSON.parse(f.storage.get(followKey)), []);
  assert.equal(f.storage.has(readKey), false);
});

test("follow-up flags remain usable for this visit if storage is unavailable", () => {
  const f = fixture("", true);
  const [first] = f.entries;
  first.follow.checked = true; first.follow.events.change();
  f.events.pageshow();
  assert.equal(first.follow.checked, true);
  assert.match(f.status.textContent, /Follow-up flags are only available for this visit/);
  assert.equal(f.storage.has(followKey), false);
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
