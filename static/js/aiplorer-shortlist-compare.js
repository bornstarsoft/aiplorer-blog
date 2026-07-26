(function () {
  "use strict";

  var storageKey = "aiplorer-shortlist-v1";
  var trialStorageKey = "aiplorer-trial-checks-v1";
  var allowedChecks = ["task", "output", "privacy", "plans"];
  var currentView = "all";
  var memoryList = [];
  var memoryTrialState = {};
  var rows = Array.prototype.slice.call(document.querySelectorAll("[data-compare-row]"));
  var groups = Array.prototype.slice.call(document.querySelectorAll("[data-compare-group]"));
  var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-compare-view]"));
  var categoryLinks = Array.prototype.slice.call(
    document.querySelectorAll("[data-compare-category]")
  ).filter(function (element) {
    return element.matches("a");
  });
  var summary = document.querySelector("[data-compare-summary]");
  var empty = document.querySelector("[data-compare-shortlist-empty]");
  var jumpNav = document.querySelector("[data-compare-jump-nav]");
  var trialSummary = document.querySelector("[data-compare-trial-summary]");
  var trialSummaryCopy = document.querySelector("[data-compare-trial-copy]");
  var compareGroups = document.getElementById("compare-categories");
  var currentCategory = "";

  if (!rows.length || !buttons.length) {
    return;
  }

  function validPath(value) {
    return typeof value === "string" && value.indexOf("/ai-tools/tools/") === 0;
  }

  function uniquePaths(values) {
    return values.filter(validPath).filter(function (value, index, list) {
      return list.indexOf(value) === index;
    });
  }

  function readList() {
    try {
      var stored = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(stored)) {
        memoryList = uniquePaths(stored);
      }
    } catch (error) {
      memoryList = uniquePaths(memoryList);
    }
    return memoryList.slice();
  }

  function cleanChecks(values) {
    if (!Array.isArray(values)) {
      return [];
    }
    return values.filter(function (value, index, list) {
      return allowedChecks.indexOf(value) !== -1 && list.indexOf(value) === index;
    });
  }

  function cleanTrialState(value) {
    var result = {};
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return result;
    }

    Object.keys(value).forEach(function (path) {
      var checks = cleanChecks(value[path]);
      if (validPath(path) && checks.length > 0) {
        result[path] = checks;
      }
    });
    return result;
  }

  function readTrialState() {
    try {
      memoryTrialState = cleanTrialState(
        JSON.parse(window.localStorage.getItem(trialStorageKey) || "{}")
      );
    } catch (error) {
      memoryTrialState = cleanTrialState(memoryTrialState);
    }
    return Object.assign({}, memoryTrialState);
  }

  function renderTrialProgress(saved) {
    var state = readTrialState();
    var savedRows = rows.filter(function (row) {
      return saved.has(row.getAttribute("data-compare-path"));
    });
    var completed = 0;
    var total = savedRows.length * allowedChecks.length;

    rows.forEach(function (row) {
      var path = row.getAttribute("data-compare-path");
      var progress = row.querySelector("[data-compare-trial-progress]");
      var count = row.querySelector("[data-compare-trial-count]");
      var checks = cleanChecks(state[path]);
      var isSaved = saved.has(path);

      if (progress) {
        progress.hidden = !isSaved;
        progress.classList.toggle("is-complete", isSaved && checks.length === allowedChecks.length);
      }
      if (count) {
        count.textContent = checks.length + " of " + allowedChecks.length + " checked";
      }
      if (isSaved) {
        completed += checks.length;
      }
    });

    if (trialSummary) {
      trialSummary.hidden = savedRows.length === 0;
    }
    if (trialSummaryCopy) {
      trialSummaryCopy.textContent =
        completed +
        " of " +
        total +
        " candidate checks complete across " +
        savedRows.length +
        " saved " +
        (savedRows.length === 1 ? "tool" : "tools") +
        ".";
    }
  }

  function cleanCategory(value) {
    var requested = typeof value === "string" ? value.trim().toLowerCase() : "";
    var match = categoryLinks.find(function (link) {
      return (link.getAttribute("data-compare-category") || "").toLowerCase() === requested;
    });
    return match ? match.getAttribute("data-compare-category") || "" : "";
  }

  function setUrl(view, category) {
    var url = new URL(window.location.href);
    if (view === "shortlist") {
      url.searchParams.set("view", "shortlist");
    } else {
      url.searchParams.delete("view");
    }
    if (category) {
      url.searchParams.set("category", category);
    } else {
      url.searchParams.delete("category");
    }
    window.history.replaceState({}, "", url.pathname + url.search);
  }

  function updateButtons(view) {
    buttons.forEach(function (button) {
      var active = button.getAttribute("data-compare-view") === view;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function render(view, paths, category) {
    var saved = new Set(paths || readList());
    var shortlistView = view === "shortlist";
    var visibleRows = 0;

    currentView = shortlistView ? "shortlist" : "all";
    currentCategory = cleanCategory(category);
    updateButtons(currentView);
    renderTrialProgress(saved);

    groups.forEach(function (group) {
      var groupRows = Array.prototype.slice.call(group.querySelectorAll("[data-compare-row]"));
      var groupCategory = group.getAttribute("data-compare-category") || "";
      var categoryMatch = !currentCategory || groupCategory === currentCategory;

      groupRows.forEach(function (row) {
        row.hidden =
          shortlistView && !saved.has(row.getAttribute("data-compare-path"));
      });

      var hasVisibleRows = groupRows.some(function (row) {
        return !row.hidden;
      });
      var show = categoryMatch && hasVisibleRows;

      group.hidden = !show;
      group.classList.remove("is-first-visible");
      if (show) {
        visibleRows += groupRows.filter(function (row) {
          return !row.hidden;
        }).length;
      }
    });

    categoryLinks.forEach(function (link) {
      var linkCategory = link.getAttribute("data-compare-category") || "";
      var active = linkCategory === currentCategory;
      var linkedGroup = groups.find(function (group) {
        return group.getAttribute("data-compare-category") === linkCategory;
      });
      var hasSavedRows =
        !linkedGroup ||
        Array.prototype.some.call(
          linkedGroup.querySelectorAll("[data-compare-row]"),
          function (row) {
            return saved.has(row.getAttribute("data-compare-path"));
          }
        );

      link.hidden =
        shortlistView && Boolean(linkCategory) && !hasSavedRows && !active;
      link.classList.toggle("is-active", active);
      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    var firstVisibleGroup = groups.find(function (group) {
      return !group.hidden;
    });
    if (firstVisibleGroup) {
      firstVisibleGroup.classList.add("is-first-visible");
    }

    if (empty) {
      empty.hidden = !shortlistView || visibleRows > 0;
    }
    if (jumpNav) {
      jumpNav.hidden = shortlistView && saved.size === 0;
    }
    if (summary) {
      var scope = currentCategory
        ? " in " + currentCategory + "."
        : " across all categories.";
      summary.textContent =
        "Showing " +
        visibleRows +
        (shortlistView ? " saved " : " reviewed ") +
        (visibleRows === 1 ? "tool" : "tools") +
        scope;
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var view = button.getAttribute("data-compare-view");
      render(view, undefined, currentCategory);
      setUrl(view, currentCategory);
    });
  });

  categoryLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var category = link.getAttribute("data-compare-category") || "";
      render(currentView, undefined, category);
      setUrl(currentView, currentCategory);
      if (compareGroups) {
        compareGroups.scrollIntoView({ block: "start" });
      }
    });
  });

  window.addEventListener("aiplorer:shortlist-change", function (event) {
    var paths = event.detail && Array.isArray(event.detail.paths) ? event.detail.paths : readList();
    memoryList = uniquePaths(paths);
    render(currentView, memoryList, currentCategory);
  });

  window.addEventListener("storage", function (event) {
    if (event.key === storageKey || event.key === trialStorageKey) {
      render(currentView, undefined, currentCategory);
    }
  });

  var initialParams = new URL(window.location.href).searchParams;
  var initialView = initialParams.get("view") === "shortlist"
    ? "shortlist"
    : "all";
  var initialCategory = cleanCategory(initialParams.get("category") || "");
  render(initialView, undefined, initialCategory);
})();
