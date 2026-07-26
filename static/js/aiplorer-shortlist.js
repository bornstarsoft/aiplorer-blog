(function () {
  "use strict";

  var storageKey = "aiplorer-shortlist-v1";
  var trialStorageKey = "aiplorer-trial-checks-v1";
  var allowedChecks = ["task", "output", "privacy", "plans"];
  var memoryList = [];
  var memoryTrialState = {};

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

  function writeList(values) {
    memoryList = uniquePaths(values);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(memoryList));
    } catch (error) {
      // Keep the current-session fallback when browser storage is unavailable.
    }
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

  function updateButtons(saved) {
    document.querySelectorAll("[data-shortlist-path]").forEach(function (button) {
      var path = button.getAttribute("data-shortlist-path");
      var title = button.getAttribute("data-shortlist-title") || "tool";
      var isSaved = saved.has(path);
      var label = button.querySelector("[data-shortlist-label]");
      var visibleLabel = isSaved
        ? button.getAttribute("data-label-saved") || "Saved"
        : button.getAttribute("data-label-save") || "Save";

      button.classList.toggle("is-saved", isSaved);
      button.setAttribute("aria-pressed", String(isSaved));
      button.setAttribute(
        "aria-label",
        isSaved ? "Remove " + title + " from shortlist" : "Save " + title + " to shortlist"
      );
      if (label) {
        label.textContent = visibleLabel;
      }
    });
  }

  function updateShortlistPage(saved) {
    var items = document.querySelectorAll("[data-shortlist-item]");
    var grid = document.querySelector("[data-shortlist-grid]");
    var empty = document.querySelector("[data-shortlist-empty]");
    var clear = document.querySelector("[data-shortlist-clear]");
    var visibleCount = 0;

    items.forEach(function (item) {
      var show = saved.has(item.getAttribute("data-shortlist-item"));
      item.hidden = !show;
      if (show) {
        visibleCount += 1;
      }
    });

    if (grid) {
      grid.hidden = visibleCount === 0;
    }
    if (empty) {
      empty.hidden = visibleCount > 0;
    }
    if (clear) {
      clear.disabled = visibleCount === 0;
    }
  }

  function updateHomeEvaluation(saved) {
    var section = document.querySelector("[data-home-evaluation]");
    if (!section) {
      return;
    }

    var heading = section.querySelector("[data-home-evaluation-heading]");
    var progress = section.querySelector("[data-home-evaluation-progress]");
    var state = readTrialState();
    var completed = 0;

    saved.forEach(function (path) {
      completed += cleanChecks(state[path]).length;
    });

    section.hidden = saved.size === 0;
    if (heading) {
      heading.textContent =
        "Resume " +
        saved.size +
        " saved AI tool " +
        (saved.size === 1 ? "candidate" : "candidates");
    }
    if (progress) {
      progress.textContent =
        completed +
        " of " +
        saved.size * allowedChecks.length +
        " private candidate checks complete.";
    }
  }

  function render() {
    var list = readList();
    var saved = new Set(list);

    document.querySelectorAll("[data-shortlist-count]").forEach(function (count) {
      count.textContent = String(saved.size);
    });

    updateButtons(saved);
    updateShortlistPage(saved);
    updateHomeEvaluation(saved);
  }

  function announce(message) {
    var status = document.querySelector("[data-shortlist-status]");
    if (status) {
      status.textContent = message;
    }
  }

  function notifyChange(list) {
    window.dispatchEvent(
      new CustomEvent("aiplorer:shortlist-change", {
        detail: { paths: list.slice() }
      })
    );
  }

  document.documentElement.classList.add("aiplorer-shortlist-ready");

  document.addEventListener("click", function (event) {
    var toggle = event.target.closest("[data-shortlist-path]");
    var clear = event.target.closest("[data-shortlist-clear]");

    if (toggle) {
      var path = toggle.getAttribute("data-shortlist-path");
      var title = toggle.getAttribute("data-shortlist-title") || "Tool";
      var list = readList();
      var index = list.indexOf(path);

      if (index === -1) {
        list.push(path);
        announce(title + " saved to your shortlist.");
      } else {
        list.splice(index, 1);
        announce(title + " removed from your shortlist.");
      }

      writeList(list);
      render();
      notifyChange(list);
      return;
    }

    if (clear) {
      writeList([]);
      announce("Shortlist cleared.");
      render();
      notifyChange([]);
    }
  });

  window.addEventListener("storage", function (event) {
    if (event.key === storageKey || event.key === trialStorageKey) {
      render();
    }
  });

  render();
})();
