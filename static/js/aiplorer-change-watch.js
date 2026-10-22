(function () {
  "use strict";
  var root = document.querySelector("[data-change-watch]");
  if (!root) return;
  var entries = Array.from(root.querySelectorAll("[data-change-entry]"));
  var savedOnly = root.querySelector("[data-change-saved]");
  var unreadOnly = root.querySelector("[data-change-unread]");
  var topic = root.querySelector("select[data-change-topic]");
  var tool = root.querySelector("select[data-change-tool]");
  var reset = root.querySelector("[data-change-reset]");
  var markRead = root.querySelector("[data-change-read]");
  var storageKey = "aiplorer-change-read-v1";
  var storageAvailable = true;

  function readSet(key, fallback) {
    try {
      var value = JSON.parse(localStorage.getItem(key) || "[]");
      if (!Array.isArray(value)) throw new Error("Invalid stored list");
      return new Set(value.filter(function (item) { return typeof item === "string"; }));
    } catch (error) {
      if (key === storageKey) storageAvailable = false;
      return fallback || new Set();
    }
  }
  var seen = readSet(storageKey);
  function selectKnown(select, value) {
    select.value = Array.from(select.options).some(function (option) { return option.value === value; }) ? value : "";
  }
  function restoreView() {
    var query = new URLSearchParams(window.location.search);
    // The lower review-activity panel owns the legacy `saved` parameter too.
    savedOnly.checked = query.has("changesSaved") ? query.get("changesSaved") === "1" : query.get("saved") === "1";
    unreadOnly.checked = query.get("unread") === "1";
    selectKnown(tool, query.get("tool"));
    selectKnown(topic, query.get("topic"));
  }
  function saveView() {
    var url = new URL(window.location.href);
    [["changesSaved", savedOnly.checked ? "1" : (url.searchParams.has("saved") ? "0" : "")], ["unread", unreadOnly.checked ? "1" : ""],
      ["tool", tool.value], ["topic", topic.value]].forEach(function (pair) {
      if (pair[1]) url.searchParams.set(pair[0], pair[1]);
      else url.searchParams.delete(pair[0]);
    });
    url.hash = "tool-changes";
    try { window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash); }
    catch (error) { /* Filters remain usable when URL updates are unavailable. */ }
  }
  restoreView();

  function render() {
    var saved = readSet("aiplorer-shortlist-v1");
    var visible = 0;
    var unread = 0;
    entries.forEach(function (entry) {
      var isUnread = !seen.has(entry.dataset.changeId);
      entry.hidden = (savedOnly.checked && !saved.has(entry.dataset.changeTool)) ||
        (unreadOnly.checked && !isUnread) || (topic.value && topic.value !== entry.dataset.changeTopic) ||
        (tool.value && entry.dataset.changeTool !== "/ai-tools/tools/" + tool.value + "/");
      entry.querySelector("[data-change-badge]").hidden = !isUnread;
      entry.querySelector("[data-change-entry-read]").checked = !isUnread;
      entry.querySelector("[data-change-entry-read-control]").hidden = false;
      if (!entry.hidden) { visible++; if (isUnread) unread++; }
    });
    root.querySelector("[data-change-status]").textContent = visible + " of " + entries.length +
      " updates shown; " + unread + " unread" + (storageAvailable ? "" : ". Read status lasts for this visit; browser storage is unavailable.");
    root.querySelector("[data-change-empty]").hidden = visible > 0;
    markRead.disabled = unread === 0;
    reset.disabled = !(savedOnly.checked || unreadOnly.checked || tool.value || topic.value);
  }

  [savedOnly, unreadOnly, topic, tool].forEach(function (control) {
    control.addEventListener("change", function () { saveView(); render(); });
  });
  reset.addEventListener("click", function () {
    savedOnly.checked = false; unreadOnly.checked = false;
    tool.value = ""; topic.value = "";
    saveView(); render();
  });
  function updateReadState(change) {
    // Re-read before changing one record; preserve keys from newer cached pages.
    if (storageAvailable) seen = readSet(storageKey, seen);
    change();
    try { localStorage.setItem(storageKey, JSON.stringify(Array.from(seen))); }
    catch (error) { storageAvailable = false; }
    render();
  }
  entries.forEach(function (entry, index) {
    var checkbox = entry.querySelector("[data-change-entry-read]");
    checkbox.addEventListener("change", function () {
      var checked = checkbox.checked;
      updateReadState(function () {
        if (checked) seen.add(entry.dataset.changeId);
        else seen.delete(entry.dataset.changeId);
      });
      if (entry.hidden) {
        var next = entries.slice(index + 1).concat(entries.slice(0, index)).find(function (item) { return !item.hidden; });
        (next ? next.querySelector("[data-change-entry-read]") : unreadOnly).focus();
      }
    });
  });
  markRead.addEventListener("click", function () {
    updateReadState(function () {
      entries.forEach(function (entry) { if (!entry.hidden) seen.add(entry.dataset.changeId); });
    });
  });
  window.addEventListener("storage", function (event) {
    if (!event.key || event.key === storageKey) seen = readSet(storageKey, seen);
    render();
  });
  window.addEventListener("aiplorer:shortlist-change", render);
  window.addEventListener("popstate", function () { restoreView(); render(); });
  window.addEventListener("pageshow", function () {
    if (storageAvailable) seen = readSet(storageKey, seen);
    render();
  });
  root.querySelector("[data-change-controls]").hidden = false;
  render();
})();
