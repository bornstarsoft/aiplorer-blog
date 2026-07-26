(function () {
  "use strict";

  var storageKey = "aiplorer-review-snapshot-v1";
  var panel = document.querySelector("[data-review-return]");
  var entries = Array.prototype.slice.call(document.querySelectorAll("[data-review-entry]"));

  if (!panel || !entries.length) {
    return;
  }

  var label = panel.querySelector("[data-review-return-label]");
  var heading = panel.querySelector("[data-review-return-heading]");
  var copy = panel.querySelector("[data-review-return-copy]");
  var latestReview = panel.getAttribute("data-latest-review") || "the latest recorded date";

  function tokenFor(entry) {
    return entry.getAttribute("data-review-path") + "|" + entry.getAttribute("data-review-date");
  }

  function readSnapshot() {
    try {
      var stored = JSON.parse(window.localStorage.getItem(storageKey));
      if (Array.isArray(stored)) {
        return stored.filter(function (value) {
          return typeof value === "string";
        });
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  function writeSnapshot(values) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(values));
    } catch (error) {
      // The server-rendered latest-review message remains when storage is unavailable.
    }
  }

  var current = entries.map(tokenFor);
  var previous = readSnapshot();

  if (previous === null) {
    label.textContent = "First review checkpoint";
    heading.textContent = "Your return-visit checkpoint starts here";
    copy.textContent =
      "The latest recorded check is " + latestReview +
      ". On your next visit, this browser can identify review entries that were added or checked again.";
  } else {
    var previousSet = new Set(previous);
    var newTokens = new Set(current.filter(function (token) {
      return !previousSet.has(token);
    }));

    entries.forEach(function (entry) {
      var isNew = newTokens.has(tokenFor(entry));
      var badge = entry.querySelector("[data-review-new]");
      entry.classList.toggle("is-new-since-visit", isNew);
      if (badge) {
        badge.hidden = !isNew;
      }
    });

    if (newTokens.size > 0) {
      label.textContent = "Since your last visit";
      heading.textContent =
        newTokens.size + " review " + (newTokens.size === 1 ? "check" : "checks") + " to revisit";
      copy.textContent =
        "Entries added or checked again since this browser's previous snapshot are marked below. Verify current product details at the official source.";
    } else {
      label.textContent = "Review checkpoint";
      heading.textContent = "You are caught up with Aiplorer reviews";
      copy.textContent =
        "No newer review checks are recorded since this browser's previous visit. The latest recorded check remains " + latestReview + ".";
    }
  }

  writeSnapshot(current);
})();
