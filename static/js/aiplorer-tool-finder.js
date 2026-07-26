(function () {
  "use strict";

  var finder = document.querySelector("[data-tool-finder]");
  if (!finder) {
    return;
  }

  var lastSearchStorageKey = "aiplorer-last-tool-search-v1";
  var reviewSnapshotStorageKey = "aiplorer-review-snapshot-v1";
  var shortlistStorageKey = "aiplorer-shortlist-v1";
  var directoryViewStorageKey = "aiplorer-tool-directory-view-v1";
  var queryInput = finder.querySelector("[data-tool-finder-query]");
  var categorySelect = finder.querySelector("[data-tool-finder-category]");
  var resetButton = finder.querySelector("[data-tool-finder-reset]");
  var emptyResetButton = document.querySelector("[data-tool-finder-empty-reset]");
  var resultCount = finder.querySelector("[data-tool-finder-count]");
  var emptyState = document.querySelector("[data-tool-finder-empty]");
  var taskButtons = Array.prototype.slice.call(finder.querySelectorAll("[data-tool-finder-task]"));
  var cards = Array.prototype.slice.call(document.querySelectorAll("[data-tool-card]"));
  var groups = Array.prototype.slice.call(document.querySelectorAll("[data-tool-group]"));
  var categoryLinks = Array.prototype.slice.call(document.querySelectorAll("[data-tool-category-link]"));
  var checkpoint = finder.querySelector("[data-tool-finder-checkpoint]");
  var newButton = finder.querySelector("[data-tool-finder-new]");
  var newCount = finder.querySelector("[data-tool-finder-new-count]");
  var savedControl = finder.querySelector("[data-tool-finder-saved]");
  var savedButton = finder.querySelector("[data-tool-finder-saved-button]");
  var savedCount = finder.querySelector("[data-tool-finder-saved-count]");
  var viewButtons = Array.prototype.slice.call(
    finder.querySelectorAll("[data-tool-finder-view]")
  );
  var resultsRoot = document.querySelector("[data-tool-results]");
  var newTokens = new Set();
  var savedPaths = new Set();
  var onlyNew = false;
  var onlySaved = false;

  if (!queryInput || !categorySelect || !resetButton || !resultCount) {
    return;
  }

  function normalize(value) {
    return (value || "").toLocaleLowerCase().trim();
  }

  function cleanDirectoryView(value) {
    return value === "compact" ? "compact" : "cards";
  }

  function readDirectoryView() {
    try {
      return cleanDirectoryView(window.localStorage.getItem(directoryViewStorageKey));
    } catch (error) {
      return "cards";
    }
  }

  function writeDirectoryView(value) {
    try {
      window.localStorage.setItem(directoryViewStorageKey, value);
    } catch (error) {
      // The selected view still works for the current page.
    }
  }

  function applyDirectoryView(value) {
    var view = cleanDirectoryView(value);

    if (resultsRoot) {
      resultsRoot.setAttribute("data-directory-view", view);
    }

    viewButtons.forEach(function (button) {
      var isActive = button.getAttribute("data-tool-finder-view") === view;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function cleanSearchValue(value, maxLength) {
    return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
  }

  function writeLastSearch(query, category) {
    var state = {
      query: cleanSearchValue(query, 120),
      category: cleanSearchValue(category, 80)
    };

    if (!state.query && !state.category) {
      return;
    }

    try {
      window.localStorage.setItem(lastSearchStorageKey, JSON.stringify(state));
    } catch (error) {
      // Filtering still works when browser storage is unavailable.
    }
  }

  function clearLastSearch() {
    try {
      window.localStorage.removeItem(lastSearchStorageKey);
    } catch (error) {
      // Filtering still works when browser storage is unavailable.
    }
  }

  function readReviewSnapshot() {
    try {
      var stored = JSON.parse(window.localStorage.getItem(reviewSnapshotStorageKey));
      if (Array.isArray(stored)) {
        return new Set(stored.filter(function (value) {
          return typeof value === "string";
        }));
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  function isToolPath(value) {
    return typeof value === "string" && /^\/ai-tools\/tools\/[^/]+\/$/.test(value);
  }

  function readSavedPaths() {
    try {
      var stored = JSON.parse(window.localStorage.getItem(shortlistStorageKey) || "[]");
      if (Array.isArray(stored)) {
        return stored.filter(isToolPath);
      }
    } catch (error) {
      return [];
    }
    return [];
  }

  function setSavedPaths(paths) {
    savedPaths = new Set((Array.isArray(paths) ? paths : []).filter(isToolPath));

    if (savedControl && savedButton) {
      savedControl.hidden = savedPaths.size === 0;
      if (savedCount) {
        savedCount.textContent = String(savedPaths.size);
      }
    }

    if (savedPaths.size === 0) {
      onlySaved = false;
    }
  }

  function reviewTokenFor(card) {
    return (
      (card.getAttribute("data-tool-path") || "") +
      "|" +
      (card.getAttribute("data-tool-review-date") || "")
    );
  }

  function syncUrl(query, category) {
    var url = new URL(window.location.href);

    if (query) {
      url.searchParams.set("q", query);
    } else {
      url.searchParams.delete("q");
    }

    if (category) {
      url.searchParams.set("category", category);
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

  function updateTaskButtons(query, category) {
    taskButtons.forEach(function (button) {
      var taskQuery = normalize(button.getAttribute("data-task-query"));
      var taskCategory = button.getAttribute("data-task-category") || "";
      var isActive = query === taskQuery && category === taskCategory && Boolean(taskQuery || taskCategory);

      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function updateResults(options) {
    var query = normalize(queryInput.value);
    var category = categorySelect.value;
    var visibleCount = 0;

    cards.forEach(function (card) {
      var matchesQuery = !query || normalize(card.dataset.toolSearch).indexOf(query) !== -1;
      var matchesCategory = !category || card.dataset.toolCategory === category;
      var matchesNew = !onlyNew || newTokens.has(reviewTokenFor(card));
      var matchesSaved =
        !onlySaved || savedPaths.has(card.getAttribute("data-tool-path") || "");
      var isVisible = matchesQuery && matchesCategory && matchesNew && matchesSaved;

      card.hidden = !isVisible;
      if (isVisible) {
        visibleCount += 1;
      }
    });

    groups.forEach(function (group) {
      var hasVisibleCard = group.querySelector("[data-tool-card]:not([hidden])");
      group.hidden = !hasVisibleCard;
    });

    var resultQualifiers = [];
    if (onlySaved) {
      resultQualifiers.push("saved in this browser");
    }
    if (onlyNew) {
      resultQualifiers.push("checked since your checkpoint");
    }
    resultCount.textContent =
      visibleCount +
      (visibleCount === 1 ? " reviewed tool" : " reviewed tools") +
      (resultQualifiers.length ? " " + resultQualifiers.join(" and ") : "");
    resetButton.disabled = !query && !category && !onlyNew && !onlySaved;
    updateTaskButtons(query, category);

    if (newButton) {
      newButton.classList.toggle("is-active", onlyNew);
      newButton.setAttribute("aria-pressed", String(onlyNew));
    }

    if (savedButton) {
      savedButton.classList.toggle("is-active", onlySaved);
      savedButton.setAttribute("aria-pressed", String(onlySaved));
    }

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }

    if (!options || options.syncUrl !== false) {
      syncUrl(queryInput.value.trim(), category);
    }

    writeLastSearch(queryInput.value, category);
  }

  function clearFilters() {
    queryInput.value = "";
    categorySelect.value = "";
    onlyNew = false;
    onlySaved = false;
    clearLastSearch();
    updateResults();
    queryInput.focus();
  }

  var initialParams = new URLSearchParams(window.location.search);
  var reviewSnapshot = readReviewSnapshot();
  setSavedPaths(readSavedPaths());
  if (reviewSnapshot !== null) {
    newTokens = new Set(cards.map(reviewTokenFor).filter(function (token) {
      return !reviewSnapshot.has(token);
    }));
  }
  onlyNew = initialParams.get("new") === "1" && newTokens.size > 0;
  onlySaved = initialParams.get("saved") === "1" && savedPaths.size > 0;

  if (checkpoint && newButton && newTokens.size > 0) {
    checkpoint.hidden = false;
    if (newCount) {
      newCount.textContent = String(newTokens.size);
    }
    newButton.addEventListener("click", function () {
      onlyNew = !onlyNew;
      updateResults();
    });
  }

  if (savedControl && savedButton && savedPaths.size > 0) {
    savedButton.addEventListener("click", function () {
      onlySaved = !onlySaved;
      updateResults();
    });
  }

  queryInput.value = initialParams.get("q") || "";

  var initialCategory = initialParams.get("category") || "";
  if (Array.prototype.some.call(categorySelect.options, function (option) {
    return option.value === initialCategory;
  })) {
    categorySelect.value = initialCategory;
  }

  queryInput.addEventListener("input", function () {
    updateResults();
  });

  categorySelect.addEventListener("change", function () {
    updateResults();
  });

  finder.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    updateResults();
  });

  resetButton.addEventListener("click", clearFilters);
  if (emptyResetButton) {
    emptyResetButton.addEventListener("click", clearFilters);
  }

  taskButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      queryInput.value = button.getAttribute("data-task-query") || "";
      categorySelect.value = button.getAttribute("data-task-category") || "";
      updateResults();
    });
  });

  categoryLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      queryInput.value = "";
      categorySelect.value = link.dataset.toolCategoryLink || "";
      updateResults();

      var target = document.querySelector(link.getAttribute("href"));
      if (target) {
        var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    });
  });

  viewButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var view = cleanDirectoryView(button.getAttribute("data-tool-finder-view"));
      applyDirectoryView(view);
      writeDirectoryView(view);
    });
  });

  window.addEventListener("aiplorer:shortlist-change", function (event) {
    var paths =
      event.detail && Array.isArray(event.detail.paths)
        ? event.detail.paths
        : readSavedPaths();
    setSavedPaths(paths);
    updateResults();
  });

  window.addEventListener("storage", function (event) {
    if (event.key === shortlistStorageKey) {
      setSavedPaths(readSavedPaths());
      updateResults();
    }
    if (event.key === directoryViewStorageKey) {
      applyDirectoryView(readDirectoryView());
    }
  });

  applyDirectoryView(readDirectoryView());
  updateResults({ syncUrl: false });
})();
