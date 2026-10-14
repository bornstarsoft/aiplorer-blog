(function () {
  "use strict";
  var root = document.querySelector("[data-home-saved-updates]");
  if (!root) return;
  var entries = Array.from(root.querySelectorAll("[data-saved-update]"));
  var status = root.querySelector("[data-saved-update-status]");
  var list = root.querySelector("[data-saved-update-list]");
  var link = root.querySelector("[data-saved-update-link]");
  function read(key) {
    var value = JSON.parse(localStorage.getItem(key) || "[]");
    if (!Array.isArray(value)) throw new Error("Invalid saved state");
    return new Set(value.filter(function (item) { return typeof item === "string"; }));
  }
  function render() {
    entries.forEach(function (entry) { entry.hidden = true; });
    list.hidden = true;
    link.href = "/ai-tools/review-updates/#tool-changes";
    link.textContent = "Browse announcement checks \u2192";
    var saved, seen;
    try { saved = read("aiplorer-shortlist-v1"); seen = read("aiplorer-change-read-v1"); }
    catch (error) {
      status.textContent = "Saved updates are unavailable in this browser. You can still browse all announcement checks.";
      return;
    }
    if (!saved.size) {
      status.textContent = "Save tools from the directory to see their unread announcement checks here.";
      return;
    }
    var matching = entries.filter(function (entry) { return saved.has(entry.dataset.tool); });
    var unread = matching.filter(function (entry) { return !seen.has(entry.dataset.readKey); });
    if (!matching.length) {
      status.textContent = "No announcement checks cover your saved tools yet. This does not mean those tools are unchanged.";
      return;
    }
    link.href = "/ai-tools/review-updates/?saved=1#tool-changes";
    link.textContent = "All checks for saved tools \u2192";
    if (!unread.length) {
      status.textContent = "You have read all available checks for your saved tools.";
      return;
    }
    status.textContent = unread.length + " unread announcement " + (unread.length === 1 ? "check" : "checks") + " for your saved tools" + (unread.length > 3 ? "; showing the latest 3." : ".");
    unread.slice(0, 3).forEach(function (entry) { entry.hidden = false; });
    list.hidden = false;
    link.href = "/ai-tools/review-updates/?saved=1&unread=1#tool-changes";
    link.textContent = "Read saved-tool updates \u2192";
  }
  window.addEventListener("storage", render);
  window.addEventListener("pageshow", render);
  window.addEventListener("aiplorer:shortlist-change", render);
  render();
})();
