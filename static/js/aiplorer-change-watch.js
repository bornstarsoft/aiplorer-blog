(function () {
  "use strict";
  var root = document.querySelector("[data-change-watch]");
  if (!root) return;
  var entries = Array.from(root.querySelectorAll("[data-change-entry]"));
  var upcoming = root.querySelector("[data-change-upcoming]");
  var savedOnly = root.querySelector("[data-change-saved]");
  var unreadOnly = root.querySelector("[data-change-unread]");
  var followOnly = root.querySelector("[data-change-follow-only]");
  var topic = root.querySelector("select[data-change-topic]");
  var tool = root.querySelector("select[data-change-tool]");
  var reset = root.querySelector("[data-change-reset]");
  var markRead = root.querySelector("[data-change-read]");
  var firstUnread = root.querySelector("[data-change-first-unread]");
  var caughtUp = root.querySelector("[data-change-caught-up]");
  var showRead = root.querySelector("[data-change-show-read]");
  var exportBrief = root.querySelector("[data-change-export]");
  var storageKey = "aiplorer-change-read-v1";
  var storageAvailable = true;
  var viewKey = "aiplorer-change-view-v1";
  var viewStorageAvailable = true;
  var followKey = "aiplorer-change-follow-up-v1";
  var followStorageAvailable = true;
  var resumedView = false;
  var readingIndex = -1;

  function readSet(key, fallback) {
    try {
      var value = JSON.parse(localStorage.getItem(key) || "[]");
      if (!Array.isArray(value)) throw new Error("Invalid stored list");
      return new Set(value.filter(function (item) { return typeof item === "string"; }));
    } catch (error) {
      if (key === storageKey) storageAvailable = false;
      if (key === followKey) followStorageAvailable = false;
      return fallback || new Set();
    }
  }
  var seen = readSet(storageKey);
  var followed = readSet(followKey);
  function followId(entry) {
    return entry.dataset.changeId.split(":", 1)[0];
  }
  function followingOnly() {
    return Boolean(followOnly && followOnly.checked);
  }
  function selectKnown(select, value) {
    select.value = Array.from(select.options).some(function (option) { return option.value === value; }) ? value : "";
  }
  function restoreView() {
    var query = new URLSearchParams(window.location.search);
    // The lower review-activity panel owns the legacy `saved` parameter too.
    savedOnly.checked = query.has("changesSaved") ? query.get("changesSaved") === "1" : query.get("saved") === "1";
    unreadOnly.checked = query.get("unread") === "1";
    if (followOnly) followOnly.checked = query.get("followup") === "1";
    selectKnown(tool, query.get("tool"));
    selectKnown(topic, query.get("topic"));
  }
  function saveView(keepHash) {
    var url = new URL(window.location.href);
    [["changesSaved", savedOnly.checked ? "1" : (url.searchParams.has("saved") ? "0" : "")], ["unread", unreadOnly.checked ? "1" : ""],
      ["followup", followingOnly() ? "1" : ""], ["tool", tool.value], ["topic", topic.value]].forEach(function (pair) {
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
      if (!(savedOnly.checked || unreadOnly.checked || followingOnly() || tool.value || topic.value)) {
        localStorage.removeItem(viewKey);
      } else {
        var view = {
          version: 1, saved: savedOnly.checked, unread: unreadOnly.checked,
          tool: tool.value, topic: topic.value
        };
        if (followingOnly()) view.followup = true;
        localStorage.setItem(viewKey, JSON.stringify(view));
      }
    } catch (error) { viewStorageAvailable = false; }
  }
  function resumeView() {
    var query = new URLSearchParams(window.location.search);
    // Shared views and RSS/direct record anchors must never be hidden by a preference.
    if (["changesSaved", "saved", "unread", "followup", "tool", "topic"].some(function (key) { return query.has(key); }) ||
        window.location.hash.indexOf("#change-") === 0) return;
    try {
      var value = JSON.parse(localStorage.getItem(viewKey) || "null");
      if (!value || value.version !== 1 || typeof value.saved !== "boolean" ||
          typeof value.unread !== "boolean" || typeof value.tool !== "string" ||
          typeof value.topic !== "string") return;
      savedOnly.checked = value.saved;
      unreadOnly.checked = value.unread;
      if (followOnly) followOnly.checked = value.followup === true;
      selectKnown(tool, value.tool);
      selectKnown(topic, value.topic);
      resumedView = Boolean(savedOnly.checked || unreadOnly.checked || followingOnly() || tool.value || topic.value);
      if (resumedView) saveView(true);
    } catch (error) { viewStorageAvailable = false; }
  }
  restoreView();
  resumeView();

  function renderUpcoming() {
    if (!upcoming) return;
    var now = new Date();
    var today = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") +
      "-" + String(now.getDate()).padStart(2, "0");
    var hasUpcoming = false;
    upcoming.querySelectorAll("[data-change-transition-date]").forEach(function (item) {
      item.hidden = item.dataset.changeTransitionDate < today;
      if (!item.hidden) hasUpcoming = true;
    });
    upcoming.hidden = !hasUpcoming;
  }

  function nextUnreadIndex(afterIndex) {
    return entries.findIndex(function (entry, index) {
      return index > afterIndex && !entry.hidden && !seen.has(entry.dataset.changeId);
    });
  }
  function renderReadingNavigation() {
    if (firstUnread) firstUnread.disabled = nextUnreadIndex(-1) < 0;
    if (readingIndex >= 0 && entries[readingIndex].hidden) readingIndex = -1;
    entries.forEach(function (entry, index) {
      var nav = entry.querySelector("[data-change-reading-nav]");
      if (!nav) return;
      nav.hidden = index !== readingIndex;
      var next = nav.querySelector("[data-change-next-unread]");
      next.hidden = nav.hidden || nextUnreadIndex(index) < 0;
    });
  }
  function goToUnread(afterIndex) {
    var index = nextUnreadIndex(afterIndex);
    if (index < 0) return false;
    readingIndex = index;
    renderReadingNavigation();
    entries[index].querySelector("[data-brief-title]").focus();
    return true;
  }

  function render() {
    var saved = readSet("aiplorer-shortlist-v1");
    var matches = 0;
    var visible = 0;
    var unread = 0;
    var followCount = 0;
    var filterFollow = followingOnly();
    entries.forEach(function (entry) {
      var isUnread = !seen.has(entry.dataset.changeId);
      var isFollowed = followed.has(followId(entry));
      var inScope = !((savedOnly.checked && !saved.has(entry.dataset.changeTool)) ||
        (filterFollow && !isFollowed) ||
        (topic.value && topic.value !== entry.dataset.changeTopic) ||
        (tool.value && entry.dataset.changeTool !== "/ai-tools/tools/" + tool.value + "/"));
      if (inScope) matches++;
      entry.hidden = !inScope || (unreadOnly.checked && !isUnread);
      entry.querySelector("[data-change-badge]").hidden = !isUnread;
      entry.querySelector("[data-change-entry-read]").checked = !isUnread;
      entry.querySelector("[data-change-entry-read-control]").hidden = false;
      var followControl = entry.querySelector("[data-change-follow-control]");
      if (followControl) {
        followControl.hidden = false;
        followControl.querySelector("[data-change-entry-follow]").checked = isFollowed;
      }
      if (!entry.hidden) { visible++; if (isUnread) unread++; if (isFollowed) followCount++; }
    });
    root.querySelector("[data-change-status]").textContent = visible + " of " + entries.length +
      " updates shown; " + unread + " unread" +
      (followCount ? "; " + followCount + " marked for follow-up" : "") + (resumedView ? ". Last view restored." : "") +
      (viewStorageAvailable ? "" : ". Filters last for this visit; saved view is unavailable.") +
      (storageAvailable ? "" : ". Read status lasts for this visit; browser storage is unavailable.") +
      (followStorageAvailable ? "" : ". Follow-up flags are only available for this visit.");
    var finished = Boolean(caughtUp && showRead && unreadOnly.checked && matches > 0 && visible === 0);
    if (caughtUp) caughtUp.hidden = !finished;
    root.querySelector("[data-change-empty]").hidden = visible > 0 || finished;
    markRead.disabled = unread === 0;
    exportBrief.disabled = visible === 0;
    reset.disabled = !(savedOnly.checked || unreadOnly.checked || filterFollow || tool.value || topic.value);
    renderReadingNavigation();
  }

  function applyFilters() { rememberView(); saveView(); render(); }
  [savedOnly, unreadOnly, followOnly, topic, tool].forEach(function (control) {
    if (control) control.addEventListener("change", applyFilters);
  });
  reset.addEventListener("click", function () {
    savedOnly.checked = false; unreadOnly.checked = false;
    if (followOnly) followOnly.checked = false;
    tool.value = ""; topic.value = "";
    applyFilters();
  });
  if (caughtUp && showRead) showRead.addEventListener("click", function () {
    if (caughtUp.hidden) return;
    unreadOnly.checked = false;
    applyFilters();
    var first = entries.find(function (entry) { return !entry.hidden; });
    (first ? first.querySelector("[data-brief-title]") : unreadOnly).focus();
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
    var followControl = entry.querySelector("[data-change-follow-control]");
    if (followControl) {
      var flag = followControl.querySelector("[data-change-entry-follow]");
      flag.addEventListener("change", function () {
        if (followStorageAvailable) followed = readSet(followKey, followed);
        if (flag.checked) followed.add(followId(entry));
        else followed.delete(followId(entry));
        if (followStorageAvailable) {
          try { localStorage.setItem(followKey, JSON.stringify(Array.from(followed))); }
          catch (error) { followStorageAvailable = false; }
        }
        render();
        if (entry.hidden && followOnly) {
          var next = entries.slice(index + 1).find(function (item) { return !item.hidden; });
          var nextControl = next && next.querySelector("[data-change-follow-control]");
          (nextControl ? nextControl.querySelector("[data-change-entry-follow]") : followOnly).focus();
        }
      });
    }
    var nav = entry.querySelector("[data-change-reading-nav]");
    if (nav) {
      nav.querySelector("[data-change-next-unread]").addEventListener("click", function () {
        if (readingIndex === index) goToUnread(index);
      });
      nav.querySelector("[data-change-back-to-filters]").addEventListener("click", function () {
        if (readingIndex !== index) return;
        readingIndex = -1;
        renderReadingNavigation();
        (firstUnread && !firstUnread.disabled ? firstUnread : unreadOnly).focus();
      });
    }
    var checkbox = entry.querySelector("[data-change-entry-read]");
    checkbox.addEventListener("change", function () {
      var checked = checkbox.checked;
      var wasReading = readingIndex === index;
      updateReadState(function () {
        if (checked) seen.add(entry.dataset.changeId);
        else seen.delete(entry.dataset.changeId);
      });
      if (entry.hidden) {
        if (wasReading) {
          if (!goToUnread(index)) {
            if (caughtUp && !caughtUp.hidden) showRead.focus();
            else (firstUnread && !firstUnread.disabled ? firstUnread : unreadOnly).focus();
          }
          return;
        }
        var next = entries.slice(index + 1).concat(entries.slice(0, index)).find(function (item) { return !item.hidden; });
        (next ? next.querySelector("[data-change-entry-read]") : unreadOnly).focus();
      }
    });
  });
  if (firstUnread) firstUnread.addEventListener("click", function () { goToUnread(-1); });
  markRead.addEventListener("click", function () {
    updateReadState(function () {
      entries.forEach(function (entry) { if (!entry.hidden) seen.add(entry.dataset.changeId); });
    });
    if (caughtUp && !caughtUp.hidden) showRead.focus();
  });
  window.addEventListener("storage", function (event) {
    if (!event.key || event.key === storageKey) seen = readSet(storageKey, seen);
    if (!event.key || event.key === followKey) followed = readSet(followKey, followed);
    render();
  });
  window.addEventListener("aiplorer:shortlist-change", render);
  window.addEventListener("focus", renderUpcoming);
  window.addEventListener("popstate", function () { resumedView = false; restoreView(); render(); });
  window.addEventListener("pageshow", function () {
    renderUpcoming();
    if (storageAvailable) seen = readSet(storageKey, seen);
    if (followStorageAvailable) followed = readSet(followKey, followed);
    render();
  });
  root.querySelector("[data-change-controls]").hidden = false;
  renderUpcoming();
  render();
})();
