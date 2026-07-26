(function () {
  "use strict";

  var storageKey = "aiplorer-review-snapshot-v1";
  var panel = document.querySelector("[data-review-return]");
  var entries = Array.prototype.slice.call(document.querySelectorAll("[data-review-entry]"));
  var filterPanel = document.querySelector("[data-review-filter]");
  var groups = Array.prototype.slice.call(document.querySelectorAll("[data-review-group]"));

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

  function setupReviewFilter(newTokens) {
    if (!filterPanel) {
      return;
    }

    var typeButtons = Array.prototype.slice.call(
      filterPanel.querySelectorAll("[data-review-filter-type]")
    );
    var categorySelect = filterPanel.querySelector("[data-review-filter-category]");
    var newButton = filterPanel.querySelector("[data-review-filter-new]");
    var newCount = filterPanel.querySelector("[data-review-filter-new-count]");
    var count = filterPanel.querySelector("[data-review-filter-count]");
    var empty = document.querySelector("[data-review-filter-empty]");
    var resetButtons = Array.prototype.slice.call(
      document.querySelectorAll("[data-review-filter-reset]")
    );
    var params = new URLSearchParams(window.location.search);
    var validTypes = typeButtons.map(function (button) {
      return button.getAttribute("data-review-filter-type") || "";
    });
    var activeType = params.get("view") || "";
    var activeCategory = params.get("category") || "";
    var onlyNew = params.get("new") === "1" && newTokens.size > 0;

    if (validTypes.indexOf(activeType) === -1) {
      activeType = "";
    }

    if (
      !categorySelect ||
      !Array.prototype.some.call(categorySelect.options, function (option) {
        return option.value === activeCategory;
      })
    ) {
      activeCategory = "";
    }

    if (activeCategory) {
      activeType = "tools";
    }

    function syncUrl() {
      var url = new URL(window.location.href);

      if (activeType) {
        url.searchParams.set("view", activeType);
      } else {
        url.searchParams.delete("view");
      }

      if (activeCategory) {
        url.searchParams.set("category", activeCategory);
      } else {
        url.searchParams.delete("category");
      }

      if (onlyNew) {
        url.searchParams.set("new", "1");
      } else {
        url.searchParams.delete("new");
      }

      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    }

    function update(options) {
      var visibleCount = 0;

      entries.forEach(function (entry) {
        var matchesType =
          !activeType || entry.getAttribute("data-review-type") === activeType;
        var matchesCategory =
          !activeCategory ||
          entry.getAttribute("data-review-category") === activeCategory;
        var matchesNew = !onlyNew || newTokens.has(tokenFor(entry));
        var visible = matchesType && matchesCategory && matchesNew;

        entry.hidden = !visible;
        if (visible) {
          visibleCount += 1;
        }
      });

      groups.forEach(function (group) {
        var visibleEntries = group.querySelectorAll("[data-review-entry]:not([hidden])");
        var groupCount = group.querySelector("[data-review-group-count]");
        group.hidden = visibleEntries.length === 0;
        if (groupCount) {
          groupCount.textContent =
            visibleEntries.length +
            (visibleEntries.length === 1 ? " review check" : " review checks");
        }
      });

      typeButtons.forEach(function (button) {
        var type = button.getAttribute("data-review-filter-type") || "";
        var active = type === activeType;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });

      if (categorySelect) {
        categorySelect.value = activeCategory;
        categorySelect.disabled = Boolean(activeType && activeType !== "tools");
      }

      if (newButton) {
        newButton.setAttribute("aria-pressed", String(onlyNew));
        newButton.classList.toggle("is-active", onlyNew);
      }

      resetButtons.forEach(function (button) {
        button.disabled = !activeType && !activeCategory && !onlyNew;
      });

      if (count) {
        count.textContent =
          visibleCount + (visibleCount === 1 ? " review check" : " review checks");
      }

      if (empty) {
        empty.hidden = visibleCount !== 0;
      }

      if (!options || options.syncUrl !== false) {
        syncUrl();
      }
    }

    typeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        activeType = button.getAttribute("data-review-filter-type") || "";
        if (activeType !== "tools") {
          activeCategory = "";
        }
        update();
      });
    });

    if (categorySelect) {
      categorySelect.addEventListener("change", function () {
        activeCategory = categorySelect.value;
        if (activeCategory) {
          activeType = "tools";
        }
        update();
      });
    }

    if (newButton && newTokens.size > 0) {
      newButton.hidden = false;
      if (newCount) {
        newCount.textContent = String(newTokens.size);
      }
      newButton.addEventListener("click", function () {
        onlyNew = !onlyNew;
        update();
      });
    }

    resetButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        activeType = "";
        activeCategory = "";
        onlyNew = false;
        update();
      });
    });

    filterPanel.hidden = false;
    update();
  }

  var current = entries.map(tokenFor);
  var previous = readSnapshot();
  var newTokens = new Set();

  if (previous === null) {
    label.textContent = "First review checkpoint";
    heading.textContent = "Your return-visit checkpoint starts here";
    copy.textContent =
      "The latest recorded check is " + latestReview +
      ". On your next visit, this browser can identify review entries that were added or checked again.";
  } else {
    var previousSet = new Set(previous);
    newTokens = new Set(current.filter(function (token) {
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

  setupReviewFilter(newTokens);
  writeSnapshot(current);
})();
