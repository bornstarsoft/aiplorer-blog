(function () {
  "use strict";
  var data = document.querySelector("[data-reset-return-data]");
  if (!data) return;
  var badge = document.querySelector("[data-reset-unseen]");
  var panel = document.querySelector("[data-reset-return]");
  var status = panel && panel.querySelector("[data-reset-return-status]");
  var detail = panel && panel.querySelector("[data-reset-return-detail]");
  var time = panel && panel.querySelector("[data-reset-return-time]");
  var mark = panel && panel.querySelector("[data-reset-mark]");
  var forget = panel && panel.querySelector("[data-reset-forget]");
  var key = "aiplorer-reset-seen-v1";
  var labels = { usage: "usage reset", banked: "reset credit", both: "reset + credit", unclassified: "unclassified" };
  var records;
  try {
    records = JSON.parse(data.textContent).records;
    if (!Array.isArray(records) || !records.length || records.length > 5000 ||
        records.some(function (r) { return !r || typeof r.key !== "string" || !r.key.length || r.key.length > 400 || !Object.prototype.hasOwnProperty.call(labels, r.kind); }) ||
        new Set(records.map(function (r) { return r.key; })).size !== records.length) return;
  } catch (error) { return; }

  function read() {
    var raw = localStorage.getItem(key);
    if (!raw) return null;
    var saved = JSON.parse(raw);
    if (!saved || saved.version !== 1 || !Array.isArray(saved.keys) || saved.keys.length > 5000 ||
        saved.keys.some(function (k) { return typeof k !== "string" || !k.length || k.length > 400; }) ||
        typeof saved.checkedAt !== "string" || !Number.isFinite(Date.parse(saved.checkedAt))) throw new Error("Invalid saved check");
    return saved;
  }
  function unavailable() {
    if (badge) badge.hidden = true;
    if (!panel) return;
    panel.hidden = false;
    status.textContent = "Your saved check is unavailable in this browser.";
    detail.textContent = "Public history is still available below.";
    time.textContent = "";
    mark.disabled = true;
    forget.hidden = false;
  }
  function render() {
    if (badge) badge.hidden = true;
    var saved;
    try { saved = read(); } catch (error) { unavailable(); return; }
    var seen = new Set(saved ? saved.keys : []);
    var unseen = saved ? records.filter(function (r) { return !seen.has(r.key); }) : [];
    var breakdown = Object.keys(labels).map(function (kind) {
      var count = unseen.filter(function (r) { return r.kind === kind; }).length;
      return count ? count + " " + labels[kind] + (count > 1 && kind !== "unclassified" ? "s" : "") : "";
    }).filter(Boolean).join(" \u00b7 ");
    if (badge && unseen.length) {
      badge.textContent = unseen.length + " unseen " + (unseen.length === 1 ? "record" : "records");
      badge.title = "Added or revised since your saved check: " + breakdown;
      badge.hidden = false;
    }
    if (!panel) return;
    panel.hidden = false;
    status.textContent = !saved ? "No saved check on this browser yet." : unseen.length ?
      unseen.length + " " + (unseen.length === 1 ? "record added or revised." : "records added or revised.") : "No added or revised records since your saved check.";
    detail.textContent = unseen.length ? breakdown + ". Public announcements, not account balances." : "Manual announcement history, not live account status.";
    time.textContent = saved ? "Saved on this browser: " + new Date(saved.checkedAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" }) : "Stored only on this browser; no account sync.";
    mark.disabled = Boolean(saved && !unseen.length);
    forget.hidden = !saved;
  }
  if (mark) mark.addEventListener("click", function () {
    try {
      var saved = read();
      // Retain seen keys from newer snapshots if an older cached page is opened.
      var keys = Array.from(new Set((saved ? saved.keys : []).concat(records.map(function (r) { return r.key; }))));
      if (keys.length > 5000) throw new Error("Saved history is full");
      localStorage.setItem(key, JSON.stringify({ version: 1, checkedAt: new Date().toISOString(), keys: keys }));
      render();
    } catch (error) { unavailable(); }
  });
  if (forget) forget.addEventListener("click", function () {
    try { localStorage.removeItem(key); render(); } catch (error) { unavailable(); }
  });
  window.addEventListener("pageshow", render);
  window.addEventListener("storage", function (event) { if (!event.key || event.key === key) render(); });
  render();
})();
