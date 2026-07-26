(function () {
  "use strict";

  var finder = document.querySelector("[data-tool-finder]");
  if (!finder) {
    return;
  }

  var lastSearchStorageKey = "aiplorer-last-tool-search-v1";
  var reviewSnapshotStorageKey = "aiplorer-review-snapshot-v1";
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
  var newTokens = new Set();
  var onlyNew = false;

  if (!queryInput || !categorySelect || !resetButton || !resultCount) {
    return;
  }

  function normalize(value) {
    return (value || "").toLocaleLowerCase().trim();
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
      var isVisible = matchesQuery && matchesCategory && matchesNew;

      card.hidden = !isVisible;
      if (isVisible) {
        visibleCount += 1;
      }
    });

    groups.forEach(function (group) {
      var hasVisibleCard = group.querySelector("[data-tool-card]:not([hidden])");
      group.hidden = !hasVisibleCard;
    });

    resultCount.textContent =
      visibleCount +
      (visibleCount === 1 ? " reviewed tool" : " reviewed tools") +
      (onlyNew ? " checked since your checkpoint" : "");
    resetButton.disabled = !query && !category && !onlyNew;
    updateTaskButtons(query, category);

    if (newButton) {
      newButton.classList.toggle("is-active", onlyNew);
      newButton.setAttribute("aria-pressed", String(onlyNew));
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
    clearLastSearch();
    updateResults();
    queryInput.focus();
  }

  var initialParams = new URLSearchParams(window.location.search);
  var reviewSnapshot = readReviewSnapshot();
  if (reviewSnapshot !== null) {
    newTokens = new Set(cards.map(reviewTokenFor).filter(function (token) {
      return !reviewSnapshot.has(token);
    }));
  }
  onlyNew = initialParams.get("new") === "1" && newTokens.size > 0;

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

  updateResults({ syncUrl: false });
})();
