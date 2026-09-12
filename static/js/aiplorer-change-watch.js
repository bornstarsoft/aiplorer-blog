(function () {
  "use strict";
  var root = document.querySelector("[data-change-watch]");
  if (!root) return;
  var entries = Array.from(root.querySelectorAll("[data-change-entry]"));
  var savedOnly = root.querySelector("[data-change-saved]");
  var unreadOnly = root.querySelector("[data-change-unread]");
  var topic = root.querySelector("select[data-change-topic]");
  var markRead = root.querySelector("[data-change-read]");
  var storageKey = "aiplorer-change-read-v1";
  var storageAvailable = true;

  function readSet(key) {
    try {
      var value = JSON.parse(localStorage.getItem(key) || "[]");
      return new Set(Array.isArray(value) ? value.filter(function (item) { return typeof item === "string"; }) : []);
    } catch (error) {
      return new Set();
    }
  }
  var seen = readSet(storageKey);

  function render() {
    var saved = readSet("aiplorer-shortlist-v1");
    var visible = 0;
    var unread = 0;
    entries.forEach(function (entry) {
      var isUnread = !seen.has(entry.dataset.changeId);
      entry.hidden = (savedOnly.checked && !saved.has(entry.dataset.changeTool)) ||
        (unreadOnly.checked && !isUnread) || (topic.value && topic.value !== entry.dataset.changeTopic);
      entry.querySelector("[data-change-badge]").hidden = !isUnread;
      if (!entry.hidden) { visible++; if (isUnread) unread++; }
    });
    root.querySelector("[data-change-status]").textContent = visible + " of " + entries.length +
      " updates shown; " + unread + " unread" + (storageAvailable ? "" : ". Read status lasts for this visit; browser storage is unavailable.");
    root.querySelector("[data-change-empty]").hidden = visible > 0;
    markRead.disabled = unread === 0;
  }

  [savedOnly, unreadOnly, topic].forEach(function (control) { control.addEventListener("change", render); });
  markRead.addEventListener("click", function () {
    entries.forEach(function (entry) { if (!entry.hidden) seen.add(entry.dataset.changeId); });
    // Keep only current entries so the local read history stays bounded.
    seen = new Set(entries.map(function (entry) { return entry.dataset.changeId; }).filter(function (id) { return seen.has(id); }));
    try { localStorage.setItem(storageKey, JSON.stringify(Array.from(seen))); }
    catch (error) { storageAvailable = false; }
    render();
  });
  window.addEventListener("storage", function (event) {
    if (!event.key || event.key === storageKey) seen = readSet(storageKey);
    render();
  });
  window.addEventListener("aiplorer:shortlist-change", render);
  root.querySelector("[data-change-controls]").hidden = false;
  render();
})();
