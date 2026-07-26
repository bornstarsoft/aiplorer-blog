(function () {
  "use strict";

  var finder = document.querySelector("[data-tool-finder]");
  if (!finder) {
    return;
  }

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

  if (!queryInput || !categorySelect || !resetButton || !resultCount) {
    return;
  }

  function normalize(value) {
    return (value || "").toLocaleLowerCase().trim();
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
      var isVisible = matchesQuery && matchesCategory;

      card.hidden = !isVisible;
      if (isVisible) {
        visibleCount += 1;
      }
    });

    groups.forEach(function (group) {
      var hasVisibleCard = group.querySelector("[data-tool-card]:not([hidden])");
      group.hidden = !hasVisibleCard;
    });

    resultCount.textContent = visibleCount + (visibleCount === 1 ? " reviewed tool" : " reviewed tools");
    resetButton.disabled = !query && !category;
    updateTaskButtons(query, category);

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }

    if (!options || options.syncUrl !== false) {
      syncUrl(queryInput.value.trim(), category);
    }
  }

  function clearFilters() {
    queryInput.value = "";
    categorySelect.value = "";
    updateResults();
    queryInput.focus();
  }

  var initialParams = new URLSearchParams(window.location.search);
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
