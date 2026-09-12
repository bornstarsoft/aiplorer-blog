import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";

const source = readFileSync(new URL("../static/js/aiplorer-tool-finder.js", import.meta.url), "utf8");
const shortlistKey = "aiplorer-shortlist-v1";
const viewKey = "aiplorer-tool-directory-view-v1";
const cursorPath = "/ai-tools/tools/cursor/";

// A small DOM contract fixture exercises the real finder script without dependencies.
function element(attributes = {}) {
  const listeners = new Map();
  return {
    hidden: false, value: "", textContent: "", dataset: {},
    classList: { toggle() {}, contains() { return true; } },
    getAttribute: (name) => attributes[name] ?? null,
    setAttribute: (name, value) => { attributes[name] = value; },
    removeAttribute: (name) => { delete attributes[name]; },
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener(name, callback) {
      if (!listeners.has(name)) listeners.set(name, []);
      listeners.get(name).push(callback);
    },
    emit(name, event = {}) {
      for (const callback of listeners.get(name) || []) callback(event);
    },
    focus() { this.focused = true; }
  };
}

function fixture({ saved = [], search = "", storageBlocked = false } = {}) {
  const names = ["query", "category", "reset", "count", "saved", "saved-button", "saved-count"];
  const controls = Object.fromEntries(names.map((name) => [name, element()]));
  controls.category.options = ["", "Coding Tools", "Writing Tools"].map((value) => ({ value }));
  const form = element();
  const viewButtons = ["cards", "compact"].map((view) => element({ "data-tool-finder-view": view }));
  const finder = element();
  finder.querySelector = (selector) => selector === "form" ? form
    : controls[selector.slice("[data-tool-finder-".length, -1)] || null;
  finder.querySelectorAll = (selector) => selector === "[data-tool-finder-view]" ? viewButtons : [];
  const cards = [
    ["cursor", "Coding Tools"], ["github-copilot", "Coding Tools"], ["deepl", "Writing Tools"]
  ].map(([slug, category]) => {
    const card = element({ "data-tool-path": `/ai-tools/tools/${slug}/`, "data-tool-review-date": "2026-07-25" });
    card.dataset = { toolSearch: slug, toolCategory: category };
    return card;
  });
  const groups = ["Coding Tools", "Writing Tools"].map((category) => {
    const group = element();
    group.count = element();
    group.querySelector = (selector) => selector === "[data-tool-group-count]" ? group.count : null;
    group.querySelectorAll = (selector) => cards.filter((card) =>
      card.dataset.toolCategory === category && (selector === "[data-tool-card]" || !card.hidden));
    return group;
  });
  const empty = element();
  const emptyReset = element();
  const results = element();
  const storage = new Map([[shortlistKey, JSON.stringify(saved)]]);
  const window = element();
  window.location = new URL(`https://aiplorer.com/ai-tools/tools/${search}`);
  window.history = { replaceState(_state, _title, path) {
    window.location = new URL(path, window.location);
  } };
  window.localStorage = {
    getItem(key) {
      if (storageBlocked) throw new Error("Storage unavailable");
      return storage.get(key) ?? null;
    },
    setItem(key, value) {
      if (storageBlocked) throw new Error("Storage unavailable");
      storage.set(key, value);
    },
    removeItem(key) { storage.delete(key); }
  };
  const document = {
    querySelector: (selector) => ({
      "[data-tool-finder]": finder, "[data-tool-finder-empty]": empty,
      "[data-tool-finder-empty-reset]": emptyReset, "[data-tool-results]": results
    })[selector] || null,
    querySelectorAll: (selector) => ({ "[data-tool-card]": cards, "[data-tool-group]": groups })[selector] || []
  };
  runInNewContext(source, { document, window, URL, URLSearchParams });
  return { controls, groups, cards, window, storage, empty, emptyReset, viewButtons, results,
    visible: () => cards.filter((card) => !card.hidden).map((card) => card.dataset.toolSearch),
    save: (paths) => window.emit("aiplorer:shortlist-change", { detail: { paths } }) };
}

test("first save enables filtering; removing the last saved item restores all tools", () => {
  const f = fixture();
  assert.equal(f.controls.saved.hidden, true);
  f.save([cursorPath]);
  assert.equal(f.controls.saved.hidden, false);
  assert.equal(f.controls["saved-count"].textContent, "1");
  f.controls["saved-button"].emit("click");
  assert.deepEqual(f.visible(), ["cursor"]);
  assert.equal(f.groups[0].count.textContent, "1 of 2");
  assert.equal(f.controls.count.textContent, "1 reviewed tool saved in this browser");
  assert.equal(f.window.location.searchParams.get("saved"), "1");
  f.save([]);
  assert.equal(f.visible().length, 3);
  assert.equal(f.controls.saved.hidden, true);
  assert.equal(f.controls["saved-button"].getAttribute("aria-pressed"), "false");
  assert.equal(f.window.location.searchParams.has("saved"), false);
});

test("search shows matching category counts and clear restores totals", () => {
  const f = fixture();
  f.controls.query.value = " Cursor ";
  f.controls.query.emit("input");
  assert.deepEqual(f.visible(), ["cursor"]);
  assert.equal(f.groups[0].count.textContent, "1 of 2");
  assert.equal(f.groups[1].hidden, true);
  f.controls.reset.emit("click");
  assert.equal(f.groups[0].count.textContent, "2");
  assert.equal(f.groups[1].count.textContent, "1");
  assert.equal(f.groups[1].hidden, false);
  assert.equal(f.controls.query.focused, true);
});

test("category and query combine; empty-state reset restores the directory", () => {
  const f = fixture();
  f.controls.category.value = "Coding Tools";
  f.controls.category.emit("change");
  assert.deepEqual(f.visible(), ["cursor", "github-copilot"]);
  f.controls.query.value = "deepl";
  f.controls.query.emit("input");
  assert.equal(f.empty.hidden, false);
  assert(f.groups.every((group) => group.hidden));
  f.emptyReset.emit("click");
  assert.equal(f.visible().length, 3);
  assert.equal(f.empty.hidden, true);
  assert.equal(f.window.location.search, "");
});

test("saved URL and cross-tab storage updates stay in sync", () => {
  const f = fixture({ saved: [cursorPath], search: "?saved=1" });
  assert.deepEqual(f.visible(), ["cursor"]);
  f.storage.set(shortlistKey, JSON.stringify(["/ai-tools/tools/deepl/"]));
  f.window.emit("storage", { key: shortlistKey });
  assert.deepEqual(f.visible(), ["deepl"]);
  assert.equal(f.groups[0].hidden, true);
  f.storage.set(shortlistKey, "[]");
  f.window.emit("storage", { key: shortlistKey });
  assert.equal(f.visible().length, 3);
  assert.equal(f.window.location.search, "");
});

test("unavailable storage does not prevent search or first-save filtering", () => {
  const f = fixture({ storageBlocked: true });
  f.controls.query.value = "cursor";
  f.controls.query.emit("input");
  assert.deepEqual(f.visible(), ["cursor"]);
  f.controls.reset.emit("click");
  f.save([cursorPath]);
  f.controls["saved-button"].emit("click");
  assert.deepEqual(f.visible(), ["cursor"]);
});

test("directory view preference persists and follows cross-tab changes", () => {
  const f = fixture();
  f.viewButtons[1].emit("click");
  assert.equal(f.results.getAttribute("data-directory-view"), "compact");
  assert.equal(f.storage.get(viewKey), "compact");
  f.storage.set(viewKey, "cards");
  f.window.emit("storage", { key: viewKey });
  assert.equal(f.results.getAttribute("data-directory-view"), "cards");
  assert.equal(f.viewButtons[0].getAttribute("aria-pressed"), "true");
});
