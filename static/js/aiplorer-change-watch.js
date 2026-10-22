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
  var exportBrief = root.querySelector("[data-change-export]");
  var storageKey = "aiplorer-change-read-v1";
  var storageAvailable = true;
  var viewKey = "aiplorer-change-view-v1";
  var viewStorageAvailable = true;
  var resumedView = false;

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
  function saveView(keepHash) {
    var url = new URL(window.location.href);
    [["changesSaved", savedOnly.checked ? "1" : (url.searchParams.has("saved") ? "0" : "")], ["unread", unreadOnly.checked ? "1" : ""],
      ["tool", tool.value], ["topic", topic.value]].forEach(function (pair) {
      if (pair[1]) url.searchParams.set(pair[0], pair[1]);
      else url.searchParams.delete(pair[0]);
    });
    if (!keepHash) url.hash = "tool-changes";
    try { window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash); }
    catch (error) { /* Filters remain usable when URL updates are unavailable. */ }
  }
  function rememberView() {
    resumedView = false;
    try {
      if (!(savedOnly.checked || unreadOnly.checked || tool.value || topic.value)) {
        localStorage.removeItem(viewKey);
      } else {
        localStorage.setItem(viewKey, JSON.stringify({
          version: 1, saved: savedOnly.checked, unread: unreadOnly.checked,
          tool: tool.value, topic: topic.value
        }));
      }
    } catch (error) { viewStorageAvailable = false; }
  }
  function resumeView() {
    var query = new URLSearchParams(window.location.search);
    // Shared views and RSS/direct record anchors must never be hidden by a preference.
    if (["changesSaved", "saved", "unread", "tool", "topic"].some(function (key) { return query.has(key); }) ||
        window.location.hash.indexOf("#change-") === 0) return;
    try {
      var value = JSON.parse(localStorage.getItem(viewKey) || "null");
      if (!value || value.version !== 1 || typeof value.saved !== "boolean" ||
          typeof value.unread !== "boolean" || typeof value.tool !== "string" ||
          typeof value.topic !== "string") return;
      savedOnly.checked = value.saved;
      unreadOnly.checked = value.unread;
      selectKnown(tool, value.tool);
      selectKnown(topic, value.topic);
      resumedView = Boolean(savedOnly.checked || unreadOnly.checked || tool.value || topic.value);
      if (resumedView) saveView(true);
    } catch (error) { viewStorageAvailable = false; }
  }
  restoreView();
  resumeView();

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
      " updates shown; " + unread + " unread" + (resumedView ? ". Last view restored." : "") +
      (viewStorageAvailable ? "" : ". Filters last for this visit; saved view is unavailable.") +
      (storageAvailable ? "" : ". Read status lasts for this visit; browser storage is unavailable.");
    root.querySelector("[data-change-empty]").hidden = visible > 0;
    markRead.disabled = unread === 0;
    exportBrief.disabled = visible === 0;
    reset.disabled = !(savedOnly.checked || unreadOnly.checked || tool.value || topic.value);
  }

  [savedOnly, unreadOnly, topic, tool].forEach(function (control) {
    control.addEventListener("change", function () { rememberView(); saveView(); render(); });
  });
  reset.addEventListener("click", function () {
    savedOnly.checked = false; unreadOnly.checked = false;
    tool.value = ""; topic.value = "";
    rememberView(); saveView(); render();
  });
  function briefText(visible, exportedAt) {
    var lines = [
      "Aiplorer AI tool update brief", "Exported (UTC): " + exportedAt,
      "Included announcements: " + visible.length, "",
      "Selected recorded announcements, not a complete or live feed.",
      "Export time is not a source-check date. Recheck the official notice before acting.",
      "This file does not certify a tool, record completed tests or mark notices read.",
      "Review the selected tools and any notes you add before sharing.", ""
    ];
    visible.forEach(function (entry, index) {
      function text(selector) { return entry.querySelector(selector).textContent.trim(); }
      var title = entry.querySelector("[data-brief-title]");
      lines.push(
        (index + 1) + ". " + text("[data-brief-tool]") + ": " + title.textContent.trim(),
        text("[data-brief-date]"), "Source checked: " + text("[data-brief-checked]"),
        "Summary: " + text("[data-brief-summary]"),
        "Check before use: " + text("[data-brief-action]"),
        "Official source: " + entry.querySelector("[data-brief-source]").href,
        "Aiplorer record: " + new URL(title.getAttribute("href"), root.dataset.changeUrl).href,
        "Next step / owner / check date: [not recorded]", ""
      );
    });
    return lines.join("\n");
  }
  exportBrief.addEventListener("click", function () {
    var visible = entries.filter(function (entry) { return !entry.hidden; });
    if (!visible.length) return;
    var objectUrl, download;
    var status = root.querySelector("[data-change-status]");
    try {
      var now = new Date().toISOString();
      var blob = new Blob([briefText(visible, now)], { type: "text/plain;charset=utf-8" });
      objectUrl = window.URL.createObjectURL(blob);
      download = document.createElement("a");
      download.href = objectUrl;
      download.download = "aiplorer-announcements-" + now.slice(0, 10) + ".txt";
      document.body.appendChild(download);
      download.click();
      status.textContent = "Download requested for " + visible.length + " updates. Review the file before sharing; read status is unchanged.";
    } catch (error) {
      status.textContent = "Could not download this brief. Open the official links or try another browser.";
    } finally {
      if (download) download.remove();
      if (objectUrl) window.setTimeout(function () { window.URL.revokeObjectURL(objectUrl); }, 1000);
    }
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
  window.addEventListener("popstate", function () { resumedView = false; restoreView(); render(); });
  window.addEventListener("pageshow", function () {
    if (storageAvailable) seen = readSet(storageKey, seen);
    render();
  });
  root.querySelector("[data-change-controls]").hidden = false;
  render();
})();
