import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../static/js/aiplorer-shortlist-compare.js", import.meta.url), "utf8");
const listKey = "aiplorer-shortlist-v1", checksKey = "aiplorer-trial-checks-v1";
const cursor = "/ai-tools/tools/cursor/", make = "/ai-tools/tools/make/";
function element(attrs = {}) {
  return { hidden: false, textContent: "", listeners: {},
    classList: { toggle() {}, add() {}, remove() {} },
    getAttribute(k) { return attrs[k] ?? null; },
    setAttribute(k, v) { attrs[k] = v; }, removeAttribute(k) { delete attrs[k]; },
    addEventListener(k, fn) { this.listeners[k] = fn; },
    matches(s) { return s === "a"; }, scrollIntoView() {} };
}
function fixture({ category = "Coding Tools", saved = [cursor, make], blocked = false } = {}) {
  const storage = new Map([[listKey, JSON.stringify(saved)],
    [checksKey, JSON.stringify({ [cursor]: ["task"], [make]: ["task", "output", "privacy", "plans"] })]]);
  const groups = ["Coding Tools", "Automation Tools"].map(name => element({ "data-compare-category": name }));
  const rows = [cursor, make].map((path, i) => {
    const row = element({ "data-compare-path": path });
    row.progress = element(); row.count = element();
    row.querySelector = s => s === "[data-compare-trial-progress]" ? row.progress : row.count;
    row.closest = () => groups[i]; groups[i].querySelectorAll = () => [row];
    return row;
  });
  const links = ["", "Coding Tools", "Automation Tools"].map(name => element({ "data-compare-category": name }));
  links.forEach(link => { link.count = element(); link.querySelector = () => link.count; });
  const buttons = ["all", "shortlist"].map(view => element({ "data-compare-view": view }));
  const outputs = Object.fromEntries(["summary", "shortlist-empty", "jump-nav", "trial-summary", "trial-copy"].map(k => [k, element()]));
  const listeners = {}, writes = [];
  const window = { location: { href: "https://aiplorer.com/ai-tools/compare/?view=shortlist&category=" + encodeURIComponent(category) + "&from=test#compare-categories" },
    addEventListener(k, fn) { listeners[k] = fn; },
    history: { replaceState(a, b, url) { window.location.href = new URL(url, window.location.href).href; } },
    localStorage: {
      getItem(k) { if (blocked) throw Error("blocked"); return storage.get(k) ?? null; },
      setItem(k, v) { writes.push([k, v]); }
    }
  };
  const document = {
    querySelectorAll(s) { return ({ "[data-compare-row]": rows, "[data-compare-group]": groups, "[data-compare-view]": buttons, "[data-compare-category]": links })[s] || []; },
    querySelector(s) { return outputs[s.replace("[data-compare-", "").replace("]", "")]; },
    getElementById() { return element(); }
  };
  runInNewContext(source, { document, window, URL, Set });
  return { storage, listeners, rows, groups, links, buttons, outputs, writes, window };
}

test("comparison progress counts only the visible saved category", () => {
  const f = fixture();
  assert.equal(f.outputs["trial-copy"].textContent, "1 of 4 candidate checks complete for 1 saved tool in Coding Tools.");
  f.links[0].listeners.click({ preventDefault() {} });
  assert.equal(f.outputs["trial-copy"].textContent, "5 of 8 candidate checks complete for 2 saved tools across all categories.");
});
test("category without a saved candidate hides progress, including all-reviewed mode", () => {
  const f = fixture({ saved: [make] });
  assert.equal(f.outputs["trial-summary"].hidden, true);
  f.buttons[0].listeners.click();
  assert.equal(f.groups[0].hidden, false);
  assert.equal(f.outputs["trial-summary"].hidden, true);
  assert.equal(f.rows[0].progress.hidden, true);
});
test("category counts follow saved-only scope and restore all reviewed totals", () => {
  const f = fixture({ saved: [cursor] });
  assert.deepEqual(f.links.map(link => link.count.textContent), ["1", "1", "0"]);
  f.buttons[0].listeners.click();
  assert.deepEqual(f.links.map(link => link.count.textContent), ["2", "1", "1"]);
});
test("browser return refreshes checks and removed saves without changing scope", () => {
  const f = fixture();
  f.storage.set(checksKey, JSON.stringify({ [cursor]: ["task", "output"] }));
  f.listeners.pageshow(); assert.match(f.outputs["trial-copy"].textContent, /^2 of 4/);
  f.storage.set(listKey, JSON.stringify([make])); f.listeners.pageshow();
  assert.equal(f.outputs["trial-summary"].hidden, true);
  assert.equal(f.outputs["shortlist-empty"].hidden, false);
});
test("storage clear removes stale progress", () => {
  const f = fixture(); f.storage.clear(); f.listeners.storage({ key: null });
  assert.equal(f.outputs["trial-summary"].hidden, true);
});
test("scope changes preserve unrelated query and anchor without writing private state", () => {
  const f = fixture(); f.links[2].listeners.click({ preventDefault() {} });
  const url = new URL(f.window.location.href);
  assert.equal(url.searchParams.get("category"), "Automation Tools");
  assert.equal(url.searchParams.get("from"), "test"); assert.equal(url.hash, "#compare-categories");
  assert.deepEqual(f.writes, []);
});
test("blocked storage and empty saved lists safely hide progress", () => {
  assert.equal(fixture({ blocked: true }).outputs["trial-summary"].hidden, true);
  assert.equal(fixture({ saved: [] }).outputs["trial-summary"].hidden, true);
});
test("comparison evaluation links target their own notes with explicit all-stage views", () => {
  const layout = readFileSync(new URL("../layouts/ai-tools/compare.html", import.meta.url), "utf8");
  assert.match(layout, /stage=all&amp;test=all&amp;candidate=\{\{ .RelPermalink \| urlquery \}\}&amp;check=note/);
  assert.match(layout, /All saved tools testing/);
});
