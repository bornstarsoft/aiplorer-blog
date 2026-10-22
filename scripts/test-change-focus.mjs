import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../static/js/aiplorer-change-watch.js", import.meta.url), "utf8");
const readKey = "aiplorer-change-read-v1", savedKey = "aiplorer-shortlist-v1";
function fixture(query = "", blocked = false) {
  let url = new URL("https://aiplorer.com/ai-tools/review-updates/" + query);
  const events = {}, storage = new Map([[savedKey, JSON.stringify(["/ai-tools/tools/cursor/"])]]);
  function control(values = []) { return { value: "", checked: false, disabled: false, options: values.map(value => ({ value })), events: {}, addEventListener(name, fn) { this.events[name] = fn; } }; }
  const saved = control(), unread = control(), tool = control(["", "cursor", "replit"]), topic = control(["", "Access", "Workflow"]), read = control(), reset = control(), status = {}, empty = {}, controls = {};
  const entries = [
    ["cursor-new:2", "cursor", "Access"], ["cursor-old:1", "cursor", "Workflow"], ["replit-one:1", "replit", "Access"]
  ].map(([id, slug, category]) => ({ dataset: { changeId: id, changeTool: "/ai-tools/tools/" + slug + "/", changeTopic: category }, badge: {}, querySelector() { return this.badge; } }));
  const elements = { "[data-change-saved]": saved, "[data-change-unread]": unread, "select[data-change-tool]": tool, "select[data-change-topic]": topic, "[data-change-read]": read, "[data-change-reset]": reset, "[data-change-status]": status, "[data-change-empty]": empty, "[data-change-controls]": controls };
  const window = { get location() { return url; }, history: { state: { retained: true }, replaceState(state, _, target) { assert.deepEqual(state, { retained: true }); url = new URL(target, url); } }, addEventListener: (event, fn) => { events[event] = fn; } };
  runInNewContext(source, { document: { querySelector: () => ({ querySelectorAll: () => entries, querySelector: s => elements[s] }) }, window, URL, URLSearchParams,
    localStorage: { getItem: k => { if (blocked) throw Error("blocked"); return storage.get(k); }, setItem: (k, v) => { if (blocked) throw Error("blocked"); storage.set(k, v); } }
  });
  return { saved, unread, tool, topic, read, reset, status, empty, entries, storage, events, url: () => url, navigate: value => { url = new URL(value, url); }, visible: () => entries.filter(e => !e.hidden) };
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
