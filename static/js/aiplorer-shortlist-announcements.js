(function () {
  "use strict";
  var panels = Array.from(document.querySelectorAll("[data-shortlist-announcements]"));
  if (!panels.length) return;
  var readKey = "aiplorer-change-read-v1";

  function render() {
    var seen = new Set(), available = true;
    try {
      var stored = JSON.parse(window.localStorage.getItem(readKey) || "[]");
      if (!Array.isArray(stored)) throw new Error("Invalid read state");
      seen = new Set(stored.filter(function (key) { return typeof key === "string"; }));
    } catch (error) { available = false; }

    panels.forEach(function (panel) {
      var entries;
      try { entries = JSON.parse(panel.getAttribute("data-shortlist-announcements")); }
      catch (error) { return; }
      if (!Array.isArray(entries) || !entries.length) return;
      var status = panel.querySelector("[data-announcement-status]");
      var link = panel.querySelector("[data-announcement-link]");
      var unread = entries.filter(function (entry) { return !seen.has(entry.key); });
      var next = available && unread.length ? unread[0] : entries[0];
      panel.setAttribute("data-unread", String(available && unread.length > 0));
      status.textContent = !available ? "Read status unavailable in this browser" : unread.length
        ? unread.length + " unread announcement " + (unread.length === 1 ? "check" : "checks")
        : "All recorded checks read";
      link.textContent = next.title;
      link.href = next.href;
    });
  }

  window.addEventListener("storage", function (event) {
    if (!event.key || event.key === readKey) render();
  });
  window.addEventListener("pageshow", render);
  window.addEventListener("aiplorer:shortlist-change", render);
  render();
})();
