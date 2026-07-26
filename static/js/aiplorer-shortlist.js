(function () {
  "use strict";

  var storageKey = "aiplorer-shortlist-v1";
  var trialStorageKey = "aiplorer-trial-checks-v1";
  var candidateStageStorageKey = "aiplorer-candidate-stage-v1";
  var candidateStageViewStorageKey = "aiplorer-shortlist-stage-view-v1";
  var allowedChecks = ["task", "output", "privacy", "plans"];
  var allowedCandidateStages = ["researching", "testing", "ready"];
  var allowedCandidateStageViews = ["all", "researching", "testing", "ready", "unset"];
  var memoryList = [];
  var memoryTrialState = {};
  var memoryCandidateStageState = {};
  var memoryCandidateStageView = "all";

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

  function writeTrialState(value) {
    memoryTrialState = cleanTrialState(value);
    try {
      window.localStorage.setItem(trialStorageKey, JSON.stringify(memoryTrialState));
    } catch (error) {
      // Keep the current-session fallback when browser storage is unavailable.
    }
  }

  function cleanCandidateStage(value) {
    return allowedCandidateStages.indexOf(value) !== -1 ? value : "";
  }

  function cleanCandidateStageState(value) {
    var result = {};
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return result;
    }

    Object.keys(value).forEach(function (path) {
      var stage = cleanCandidateStage(value[path]);
      if (validPath(path) && stage) {
        result[path] = stage;
      }
    });
    return result;
  }

  function readCandidateStageState() {
    try {
      memoryCandidateStageState = cleanCandidateStageState(
        JSON.parse(window.localStorage.getItem(candidateStageStorageKey) || "{}")
      );
    } catch (error) {
      memoryCandidateStageState = cleanCandidateStageState(memoryCandidateStageState);
    }
    return Object.assign({}, memoryCandidateStageState);
  }

  function writeCandidateStageState(value) {
    memoryCandidateStageState = cleanCandidateStageState(value);
    try {
      window.localStorage.setItem(
        candidateStageStorageKey,
        JSON.stringify(memoryCandidateStageState)
      );
    } catch (error) {
      // Keep the current-session fallback when browser storage is unavailable.
    }
  }

  function candidateStageLabel(value) {
    if (value === "researching") {
      return "Researching";
    }
    if (value === "testing") {
      return "Testing";
    }
    if (value === "ready") {
      return "Ready to decide";
    }
    return "Not set";
  }

  function cleanCandidateStageView(value) {
    return allowedCandidateStageViews.indexOf(value) !== -1 ? value : "all";
  }

  function readCandidateStageView() {
    try {
      memoryCandidateStageView = cleanCandidateStageView(
        window.localStorage.getItem(candidateStageViewStorageKey) || "all"
      );
    } catch (error) {
      memoryCandidateStageView = cleanCandidateStageView(memoryCandidateStageView);
    }
    return memoryCandidateStageView;
  }

  function writeCandidateStageView(value) {
    memoryCandidateStageView = cleanCandidateStageView(value);
    try {
      window.localStorage.setItem(candidateStageViewStorageKey, memoryCandidateStageView);
    } catch (error) {
      // Keep the current-session fallback when browser storage is unavailable.
    }
  }

  function candidateStageViewLabel(value) {
    return value === "all" ? "All stages" : candidateStageLabel(value);
  }

  function cleanupEvaluationState(savedPaths) {
    var saved = new Set(savedPaths);
    var trialState = readTrialState();
    var candidateStageState = readCandidateStageState();
    var trialChanged = false;
    var stageChanged = false;

    Object.keys(trialState).forEach(function (path) {
      if (!saved.has(path)) {
        delete trialState[path];
        trialChanged = true;
      }
    });

    Object.keys(candidateStageState).forEach(function (path) {
      if (!saved.has(path)) {
        delete candidateStageState[path];
        stageChanged = true;
      }
    });

    if (trialChanged) {
      writeTrialState(trialState);
    }
    if (stageChanged) {
      writeCandidateStageState(candidateStageState);
    }
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
    var stageEmpty = document.querySelector("[data-shortlist-stage-empty]");
    var stageFilter = document.querySelector("[data-shortlist-stage-filter]");
    var stageSummary = document.querySelector("[data-shortlist-stage-summary]");
    var clear = document.querySelector("[data-shortlist-clear]");
    var stageState = readCandidateStageState();
    var stageView = readCandidateStageView();
    var savedCount = saved.size;
    var visibleCount = 0;
    var stageCounts = {
      all: savedCount,
      researching: 0,
      testing: 0,
      ready: 0,
      unset: 0
    };

    saved.forEach(function (path) {
      var stage = cleanCandidateStage(stageState[path]);
      stageCounts[stage || "unset"] += 1;
    });

    items.forEach(function (item) {
      var path = item.getAttribute("data-shortlist-item");
      var isSaved = saved.has(path);
      var stage = cleanCandidateStage(stageState[path]);
      var show =
        isSaved &&
        (stageView === "all" ||
          (stageView === "unset" && !stage) ||
          stageView === stage);

      item.hidden = !show;
      if (show) {
        visibleCount += 1;
      }
    });

    if (grid) {
      grid.hidden = visibleCount === 0;
    }
    if (empty) {
      empty.hidden = savedCount > 0;
    }
    if (stageEmpty) {
      stageEmpty.hidden = savedCount === 0 || visibleCount > 0;
    }
    if (stageFilter) {
      stageFilter.hidden = savedCount === 0;
    }
    if (stageSummary) {
      stageSummary.textContent =
        stageView === "all"
          ? "Showing all " +
            savedCount +
            " saved " +
            (savedCount === 1 ? "candidate" : "candidates") +
            "."
          : "Showing " +
            visibleCount +
            " of " +
            savedCount +
            " saved " +
            (savedCount === 1 ? "candidate" : "candidates") +
            ": " +
            candidateStageViewLabel(stageView) +
            ".";
    }
    if (clear) {
      clear.disabled = savedCount === 0;
    }

    document.querySelectorAll("[data-shortlist-stage-view]").forEach(function (button) {
      var value = cleanCandidateStageView(button.getAttribute("data-shortlist-stage-view"));
      var active = value === stageView;

      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    document.querySelectorAll("[data-shortlist-stage-count]").forEach(function (count) {
      var value = cleanCandidateStageView(
        count.getAttribute("data-shortlist-stage-count")
      );
      count.textContent = String(stageCounts[value] || 0);
    });
  }

  function updateHomeEvaluation(saved) {
    var section = document.querySelector("[data-home-evaluation]");
    if (!section) {
      return;
    }

    var heading = section.querySelector("[data-home-evaluation-heading]");
    var progress = section.querySelector("[data-home-evaluation-progress]");
    var stageSummary = section.querySelector("[data-home-evaluation-stage]");
    var state = readTrialState();
    var stageState = readCandidateStageState();
    var completed = 0;
    var stageCounts = {
      researching: 0,
      testing: 0,
      ready: 0
    };

    saved.forEach(function (path) {
      completed += cleanChecks(state[path]).length;
      var stage = cleanCandidateStage(stageState[path]);
      if (stage) {
        stageCounts[stage] += 1;
      }
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
    if (stageSummary) {
      var stageParts = allowedCandidateStages
        .filter(function (stage) {
          return stageCounts[stage] > 0;
        })
        .map(function (stage) {
          return stageCounts[stage] + " " + candidateStageLabel(stage).toLowerCase();
        });

      stageSummary.textContent = stageParts.length
        ? "Decision stages: " + stageParts.join(" · ") + "."
        : "Set a decision stage in your shortlist to keep the next step visible.";
    }
  }

  function updateCandidateStages(saved) {
    var state = readCandidateStageState();

    document.querySelectorAll("[data-candidate-stage]").forEach(function (control) {
      var path = control.getAttribute("data-candidate-stage");
      var stage = saved.has(path) ? cleanCandidateStage(state[path]) : "";
      var current = control.querySelector("[data-candidate-stage-current]");
      var reset = control.querySelector("[data-candidate-stage-reset]");

      if (current) {
        current.textContent = candidateStageLabel(stage);
        current.setAttribute("data-stage", stage || "unset");
      }
      if (reset) {
        reset.disabled = !stage;
      }

      control.querySelectorAll("[data-candidate-stage-value]").forEach(function (button) {
        var active = button.getAttribute("data-candidate-stage-value") === stage;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    });

    document.querySelectorAll("[data-compare-candidate-stage]").forEach(function (output) {
      var row = output.closest("[data-compare-row]");
      var path = row && row.getAttribute("data-compare-path");
      var stage = saved.has(path) ? cleanCandidateStage(state[path]) : "";

      output.textContent = stage ? candidateStageLabel(stage) : "Stage not set";
      output.setAttribute("data-stage", stage || "unset");
    });
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
    updateCandidateStages(saved);
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
    var candidateStageViewButton = event.target.closest("[data-shortlist-stage-view]");
    var candidateStageButton = event.target.closest("[data-candidate-stage-value]");
    var candidateStageReset = event.target.closest("[data-candidate-stage-reset]");
    var toggle = event.target.closest("[data-shortlist-path]");
    var clear = event.target.closest("[data-shortlist-clear]");

    if (candidateStageViewButton) {
      var candidateStageView = cleanCandidateStageView(
        candidateStageViewButton.getAttribute("data-shortlist-stage-view")
      );

      writeCandidateStageView(candidateStageView);
      render();
      announce("Shortlist stage view set to " + candidateStageViewLabel(candidateStageView) + ".");
      return;
    }

    if (candidateStageButton || candidateStageReset) {
      var candidateStageControl = (candidateStageButton || candidateStageReset).closest(
        "[data-candidate-stage]"
      );
      var candidateStagePath =
        candidateStageControl && candidateStageControl.getAttribute("data-candidate-stage");
      if (!validPath(candidateStagePath)) {
        return;
      }

      var candidateStageState = readCandidateStageState();
      var candidateStageValue = candidateStageButton
        ? cleanCandidateStage(candidateStageButton.getAttribute("data-candidate-stage-value"))
        : "";

      if (candidateStageValue) {
        candidateStageState[candidateStagePath] = candidateStageValue;
      } else {
        delete candidateStageState[candidateStagePath];
      }

      writeCandidateStageState(candidateStageState);
      var savedCandidatePaths = new Set(readList());
      updateCandidateStages(savedCandidatePaths);
      updateShortlistPage(savedCandidatePaths);
      updateHomeEvaluation(savedCandidatePaths);
      announce(
        candidateStageControl.getAttribute("data-candidate-stage-title") +
          ": decision stage " +
          (candidateStageValue
            ? "set to " + candidateStageLabel(candidateStageValue) + "."
            : "cleared.")
      );
      return;
    }

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
      cleanupEvaluationState(list);
      if (list.length === 0) {
        writeCandidateStageView("all");
      }
      render();
      notifyChange(list);
      return;
    }

    if (clear) {
      writeList([]);
      cleanupEvaluationState([]);
      writeCandidateStageView("all");
      announce("Shortlist cleared.");
      render();
      notifyChange([]);
    }
  });

  window.addEventListener("storage", function (event) {
    if (event.key === storageKey) {
      cleanupEvaluationState(readList());
    }
    if (
      event.key === storageKey ||
      event.key === trialStorageKey ||
      event.key === candidateStageStorageKey ||
      event.key === candidateStageViewStorageKey
    ) {
      render();
    }
  });

  render();
})();
