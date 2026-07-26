(function () {
  "use strict";

  var storageKey = "aiplorer-review-snapshot-v1";
  var shortlistStorageKey = "aiplorer-shortlist-v1";
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

  function readShortlist() {
    try {
      var stored = JSON.parse(window.localStorage.getItem(shortlistStorageKey) || "[]");
      if (Array.isArray(stored)) {
        return new Set(stored.filter(function (value) {
          return typeof value === "string";
        }));
      }
    } catch (error) {
      return new Set();
    }
    return new Set();
  }

  function setupReviewFilter(newTokens, savedPaths) {
    if (!filterPanel) {
      return;
    }

    var typeButtons = Array.prototype.slice.call(
      filterPanel.querySelectorAll("[data-review-filter-type]")
    );
    var categorySelect = filterPanel.querySelector("[data-review-filter-category]");
    var newButton = filterPanel.querySelector("[data-review-filter-new]");
    var newCount = filterPanel.querySelector("[data-review-filter-new-count]");
    var savedButton = filterPanel.querySelector("[data-review-filter-saved]");
    var savedCount = filterPanel.querySelector("[data-review-filter-saved-count]");
    var count = filterPanel.querySelector("[data-review-filter-count]");
    var empty = document.querySelector("[data-review-filter-empty]");
    var reviewLens = filterPanel.querySelector("[data-review-lens]");
    var reviewLensIcon = filterPanel.querySelector("[data-review-lens-icon]");
    var reviewLensHeading = filterPanel.querySelector("[data-review-lens-heading]");
    var reviewLensTask = filterPanel.querySelector("[data-review-lens-task]");
    var reviewLensFocus = filterPanel.querySelector("[data-review-lens-focus]");
    var reviewLensCategory = filterPanel.querySelector("[data-review-lens-category]");
    var reviewLensDirectory = filterPanel.querySelector("[data-review-lens-directory]");
    var reviewLensCompare = filterPanel.querySelector("[data-review-lens-compare]");
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
    var savedEntryCount = entries.filter(function (entry) {
      return (
        entry.getAttribute("data-review-type") === "tools" &&
        savedPaths.has(entry.getAttribute("data-review-path"))
      );
    }).length;
    var onlySaved = params.get("saved") === "1" && savedEntryCount > 0;

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

    if (activeCategory || onlySaved) {
      activeType = "tools";
    }

    function updateReviewLens() {
      if (!reviewLens || !categorySelect || !activeCategory || activeType !== "tools") {
        if (reviewLens) {
          reviewLens.hidden = true;
        }
        return;
      }

      var option = categorySelect.options[categorySelect.selectedIndex];
      var categoryPath =
        option && option.getAttribute("data-review-category-path");
      var categoryAccent =
        (option && option.getAttribute("data-review-category-accent")) || "blue";
      var categoryTask =
        option && option.getAttribute("data-review-category-task");
      var categoryFocus =
        option && option.getAttribute("data-review-category-focus");

      reviewLens.hidden = false;
      if (reviewLensIcon) {
        reviewLensIcon.setAttribute("data-accent", categoryAccent);
      }
      if (reviewLensHeading) {
        reviewLensHeading.textContent = activeCategory + " review lens";
      }
      if (reviewLensTask) {
        reviewLensTask.textContent = categoryTask || "Use the same scoped task with every candidate.";
      }
      if (reviewLensFocus) {
        reviewLensFocus.textContent =
          categoryFocus || "Review output quality, permissions, limits, and current official details.";
      }
      if (reviewLensCategory && categoryPath) {
        reviewLensCategory.href = categoryPath;
      }
      if (reviewLensDirectory) {
        reviewLensDirectory.href =
          "/ai-tools/tools/?category=" + encodeURIComponent(activeCategory);
      }
      if (reviewLensCompare) {
        reviewLensCompare.href =
          "/ai-tools/compare/?category=" + encodeURIComponent(activeCategory);
      }
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

      if (onlySaved) {
        url.searchParams.set("saved", "1");
      } else {
        url.searchParams.delete("saved");
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
        var matchesSaved =
          !onlySaved || savedPaths.has(entry.getAttribute("data-review-path"));
        var visible = matchesType && matchesCategory && matchesNew && matchesSaved;

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
      updateReviewLens();

      if (newButton) {
        newButton.setAttribute("aria-pressed", String(onlyNew));
        newButton.classList.toggle("is-active", onlyNew);
      }

      if (savedButton) {
        savedButton.setAttribute("aria-pressed", String(onlySaved));
        savedButton.classList.toggle("is-active", onlySaved);
      }

      resetButtons.forEach(function (button) {
        button.disabled = !activeType && !activeCategory && !onlyNew && !onlySaved;
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
          onlySaved = false;
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

    if (savedButton && savedEntryCount > 0) {
      savedButton.hidden = false;
      if (savedCount) {
        savedCount.textContent = String(savedEntryCount);
      }
      savedButton.addEventListener("click", function () {
        onlySaved = !onlySaved;
        if (onlySaved) {
          activeType = "tools";
        }
        update();
      });
    }

    resetButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        activeType = "";
        activeCategory = "";
        onlyNew = false;
        onlySaved = false;
        update();
      });
    });

    filterPanel.hidden = false;
    update();
  }

  var current = entries.map(tokenFor);
  var previous = readSnapshot();
  var newTokens = new Set();
  var savedPaths = readShortlist();
  var savedEntries = entries.filter(function (entry) {
    return (
      entry.getAttribute("data-review-type") === "tools" &&
      savedPaths.has(entry.getAttribute("data-review-path"))
    );
  });
  var returnLink = panel.querySelector("[data-review-return-link]");

  if (previous === null) {
    label.textContent = "First review checkpoint";
    heading.textContent = "Your return-visit checkpoint starts here";
    copy.textContent =
      "The latest recorded check is " + latestReview +
      ". On your next visit, this browser can identify review entries that were added or checked again.";
    if (returnLink && savedEntries.length > 0) {
      returnLink.href = "?view=tools&saved=1";
      returnLink.textContent = "View saved reviews";
    }
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

    var savedNewEntries = savedEntries.filter(function (entry) {
      return newTokens.has(tokenFor(entry));
    });

    if (savedNewEntries.length > 0) {
      label.textContent = "Saved candidate activity";
      heading.textContent =
        savedNewEntries.length +
        " saved " +
        (savedNewEntries.length === 1 ? "candidate has" : "candidates have") +
        " a newer review check";
      copy.textContent =
        "Aiplorer checked these saved candidates again since this browser's previous snapshot. Review the page, then verify current product details at the official source.";
      if (returnLink) {
        returnLink.href = "?view=tools&saved=1&new=1";
        returnLink.textContent = "Review saved activity";
      }
    } else if (newTokens.size > 0) {
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
      if (returnLink && savedEntries.length > 0) {
        returnLink.href = "?view=tools&saved=1";
        returnLink.textContent = "View saved reviews";
      }
    }
  }

  setupReviewFilter(newTokens, savedPaths);
  writeSnapshot(current);
})();
