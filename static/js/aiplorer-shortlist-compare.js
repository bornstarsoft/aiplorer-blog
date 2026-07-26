(function () {
  "use strict";

  var storageKey = "aiplorer-shortlist-v1";
  var currentView = "all";
  var memoryList = [];
  var rows = Array.prototype.slice.call(document.querySelectorAll("[data-compare-row]"));
  var groups = Array.prototype.slice.call(document.querySelectorAll("[data-compare-group]"));
  var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-compare-view]"));
  var summary = document.querySelector("[data-compare-summary]");
  var empty = document.querySelector("[data-compare-shortlist-empty]");
  var jumpNav = document.querySelector("[data-compare-jump-nav]");

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

  function setUrl(view) {
    var url = new URL(window.location.href);
    if (view === "shortlist") {
      url.searchParams.set("view", "shortlist");
    } else {
      url.searchParams.delete("view");
    }
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  }

  function updateButtons(view) {
    buttons.forEach(function (button) {
      var active = button.getAttribute("data-compare-view") === view;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function render(view, paths) {
    var saved = new Set(paths || readList());
    var shortlistView = view === "shortlist";
    var visibleRows = 0;
    var visibleGroups = 0;

    currentView = shortlistView ? "shortlist" : "all";
    updateButtons(currentView);

    rows.forEach(function (row) {
      var show = !shortlistView || saved.has(row.getAttribute("data-compare-path"));
      row.hidden = !show;
      if (show) {
        visibleRows += 1;
      }
    });

    groups.forEach(function (group) {
      var groupRows = Array.prototype.slice.call(group.querySelectorAll("[data-compare-row]"));
      var show = !shortlistView || groupRows.some(function (row) {
        return !row.hidden;
      });
      var category = group.getAttribute("data-compare-group");
      var jump = document.querySelector('[data-compare-jump="' + category + '"]');

      group.hidden = !show;
      group.classList.remove("is-first-visible");
      if (jump) {
        jump.hidden = !show;
      }
      if (show) {
        visibleGroups += 1;
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
      jumpNav.hidden = shortlistView && visibleGroups === 0;
    }
    if (summary) {
      summary.textContent = shortlistView
        ? "Showing " + visibleRows + " saved " + (visibleRows === 1 ? "tool" : "tools") + " in this browser."
        : "Showing " + rows.length + " reviewed tools across all categories.";
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var view = button.getAttribute("data-compare-view");
      render(view);
      setUrl(view);
    });
  });

  window.addEventListener("aiplorer:shortlist-change", function (event) {
    var paths = event.detail && Array.isArray(event.detail.paths) ? event.detail.paths : readList();
    memoryList = uniquePaths(paths);
    render(currentView, memoryList);
  });

  window.addEventListener("storage", function (event) {
    if (event.key === storageKey) {
      render(currentView);
    }
  });

  var initialView = new URL(window.location.href).searchParams.get("view") === "shortlist"
    ? "shortlist"
    : "all";
  render(initialView);
})();
