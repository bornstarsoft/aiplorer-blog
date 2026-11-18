(function () {
  "use strict";
  var panels = Array.from(document.querySelectorAll("[data-shortlist-announcements]"));
  if (!panels.length) return;
  var summary = document.querySelector("[data-shortlist-follow-summary]");
  var queue = summary && summary.querySelector("[data-shortlist-follow-queue]");
  var readKey = "aiplorer-change-read-v1";
  var followKey = "aiplorer-change-follow-up-v1";
  var savedKey = "aiplorer-shortlist-v1";

  function readIds(key) {
    try {
      var stored = JSON.parse(window.localStorage.getItem(key) || "[]");
      return Array.isArray(stored) ? new Set(stored.filter(function (item) { return typeof item === "string"; })) : null;
    } catch (error) { return null; }
  }

  function render() {
    var seen = readIds(readKey);
    var followed = readIds(followKey);
    var saved = readIds(savedKey);
    var total = 0;
    panels.forEach(function (panel) {
      var entries;
      var followLink = panel.querySelector("[data-announcement-follow-link]");
      if (followLink) followLink.hidden = true;
      try { entries = JSON.parse(panel.getAttribute("data-shortlist-announcements")); }
      catch (error) { return; }
      if (!Array.isArray(entries) || !entries.length) return;
      var status = panel.querySelector("[data-announcement-status]");
      var link = panel.querySelector("[data-announcement-link]");
      var unread = seen ? entries.filter(function (entry) { return !seen.has(entry.key); }) : [];
      var next = unread[0] || entries[0];
      panel.setAttribute("data-unread", String(unread.length > 0));
      status.textContent = !seen ? "Read status unavailable in this browser" : unread.length
        ? unread.length + " unread announcement " + (unread.length === 1 ? "check" : "checks")
        : "All recorded checks read";
      link.textContent = next.title;
      link.href = next.href;
      if (!followLink || !followed || !saved) return;
      var card = panel.closest("[data-shortlist-item]");
      if (!card || !saved.has(card.getAttribute("data-shortlist-item"))) return;
      var count = entries.filter(function (entry) {
        return typeof entry.key === "string" && followed.has(entry.key.split(":", 1)[0]);
      }).length;
      total += count;
      if (!count) return;
      var label = count + (count === 1 ? " follow-up" : " follow-ups");
      followLink.textContent = label;
      followLink.setAttribute("aria-label", label + " for " + card.getAttribute("data-shortlist-title"));
      followLink.hidden = false;
    });
    if (queue) {
      summary.hidden = total === 0;
      if (total) queue.textContent = "Review " + total + (total === 1 ? " saved-tool follow-up" : " saved-tool follow-ups");
    }
  }

  window.addEventListener("storage", function (event) {
    if (!event.key || event.key === readKey || event.key === savedKey || event.key === followKey) render();
  });
  window.addEventListener("pageshow", render);
  window.addEventListener("aiplorer:shortlist-change", render);
  render();
})();
