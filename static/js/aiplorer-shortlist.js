(function () {
  "use strict";

  var storageKey = "aiplorer-shortlist-v1";
  var trialStorageKey = "aiplorer-trial-checks-v1";
  var candidateStageStorageKey = "aiplorer-candidate-stage-v1";
  var candidateStageViewStorageKey = "aiplorer-shortlist-stage-view-v1";
  var reviewSnapshotStorageKey = "aiplorer-review-snapshot-v1";
  var lastToolSearchStorageKey = "aiplorer-last-tool-search-v1";
  var allowedChecks = ["task", "output", "privacy", "plans"];
  var allowedCandidateStages = ["researching", "testing", "ready"];
  var allowedCandidateStageViews = ["all", "researching", "testing", "ready", "unset"];
  var memoryList = [];
  var memoryTrialState = {};
  var memoryCandidateStageState = {};
  var memoryCandidateStageView = "all";

  function cleanSearchValue(value, maxLength) {
    return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
  }

  function cleanLastToolSearch(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return { query: "", category: "" };
    }
    return {
      query: cleanSearchValue(value.query, 120),
      category: cleanSearchValue(value.category, 80)
    };
  }

  function readLastToolSearch() {
    try {
      return cleanLastToolSearch(
        JSON.parse(window.localStorage.getItem(lastToolSearchStorageKey) || "{}")
      );
    } catch (error) {
      return { query: "", category: "" };
    }
  }

  function writeLastToolSearch(query, category) {
    var state = cleanLastToolSearch({ query: query, category: category });
    if (!state.query && !state.category) {
      return;
    }
    try {
      window.localStorage.setItem(lastToolSearchStorageKey, JSON.stringify(state));
    } catch (error) {
      // The homepage search still works when browser storage is unavailable.
    }
  }

  function clearLastToolSearch() {
    try {
      window.localStorage.removeItem(lastToolSearchStorageKey);
    } catch (error) {
      // The homepage search still works when browser storage is unavailable.
    }
  }

  function updateHomeSearchResume() {
    var resume = document.querySelector("[data-home-search-resume]");
    if (!resume) {
      return;
    }

    var state = readLastToolSearch();
    var link = resume.querySelector("[data-home-search-resume-link]");
    var label = resume.querySelector("[data-home-search-resume-label]");
    var hasSearch = Boolean(state.query || state.category);

    resume.hidden = !hasSearch;
    if (!hasSearch || !link || !label) {
      return;
    }

    var url = new URL("/ai-tools/tools/", window.location.origin);
    if (state.query) {
      url.searchParams.set("q", state.query);
    }
    if (state.category) {
      url.searchParams.set("category", state.category);
    }
    link.setAttribute("href", url.pathname + url.search);

    if (state.query && state.category) {
      label.textContent = "Resume “" + state.query + "” in " + state.category;
    } else if (state.query) {
      label.textContent = "Resume “" + state.query + "”";
    } else {
      label.textContent = "Resume " + state.category;
    }
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

  function reviewStateFor(path, date, snapshot) {
    if (snapshot === null) {
      return "checkpoint";
    }
    return snapshot.has(path + "|" + date) ? "current" : "updates";
  }

  function candidateStageViewLabel(value) {
    return value === "all" ? "All stages" : candidateStageLabel(value);
  }

  function candidateStageNextText(value) {
    if (value === "researching") {
      return "Next: review the full page and current official details.";
    }
    if (value === "testing") {
      return "Next: run a real task and complete the candidate checks.";
    }
    if (value === "ready") {
      return "Next: compare remaining trade-offs before deciding.";
    }
    return "Next: choose a decision stage.";
  }

  function shortlistStageNextAction(value, stageCounts, testingChecksRemaining) {
    if (value === "all" && stageCounts.testing > 0) {
      return {
        title:
          "Continue " +
          stageCounts.testing +
          " active " +
          (stageCounts.testing === 1 ? "test" : "tests"),
        copy:
          testingChecksRemaining > 0
            ? testingChecksRemaining +
              " private candidate " +
              (testingChecksRemaining === 1 ? "check remains" : "checks remain") +
              " across the testing stage."
            : "Candidate checks are complete; review the outcomes before moving candidates forward.",
        target: "testing",
        label: "Show testing"
      };
    }
    if (value === "all" && stageCounts.ready > 0) {
      return {
        title:
          "Review " +
          stageCounts.ready +
          " ready " +
          (stageCounts.ready === 1 ? "candidate" : "candidates"),
        copy: "Compare remaining trade-offs and recheck official details before deciding.",
        target: "ready",
        label: "Show ready"
      };
    }
    if (value === "all" && stageCounts.researching > 0) {
      return {
        title:
          "Continue research for " +
          stageCounts.researching +
          " " +
          (stageCounts.researching === 1 ? "candidate" : "candidates"),
        copy: "Review the full Aiplorer pages and current official details before testing.",
        target: "researching",
        label: "Show research"
      };
    }
    if (value === "all" && stageCounts.unset > 0) {
      return {
        title:
          "Set a stage for " +
          stageCounts.unset +
          " saved " +
          (stageCounts.unset === 1 ? "candidate" : "candidates"),
        copy: "Assign a stage so the next unfinished evaluation step remains easy to resume.",
        target: "unset",
        label: "Show not set"
      };
    }
    if (value === "researching") {
      return {
        title: "Check current evidence",
        copy: "Review each full Aiplorer page and current official details before testing.",
        target: "",
        label: ""
      };
    }
    if (value === "testing") {
      return {
        title: "Run a comparable real-world test",
        copy:
          testingChecksRemaining > 0
            ? testingChecksRemaining +
              " private candidate " +
              (testingChecksRemaining === 1 ? "check remains" : "checks remain") +
              " in this testing view."
            : "Candidate checks are complete; review the outcomes before moving candidates forward.",
        target: "",
        label: ""
      };
    }
    if (value === "ready") {
      return {
        title: "Review final trade-offs",
        copy: "Compare the remaining differences and recheck official details before choosing.",
        target: "",
        label: ""
      };
    }
    if (value === "unset") {
      return {
        title: "Set the next decision stage",
        copy: "Assign a stage so the next unfinished step remains easy to resume.",
        target: "",
        label: ""
      };
    }
    return {
      title: "Move each candidate one step forward",
      copy: "Choose a stage for each candidate, then work through the same four checks.",
      target: "",
      label: ""
    };
  }

  function applyCandidateStageViewFromUrl() {
    if (!document.querySelector("[data-shortlist-stage-filter]")) {
      return;
    }

    try {
      var url = new URL(window.location.href);
      var requestedStageView = url.searchParams.get("stage");
      if (allowedCandidateStageViews.indexOf(requestedStageView) === -1) {
        return;
      }

      writeCandidateStageView(requestedStageView);
      url.searchParams.delete("stage");
      window.history.replaceState(
        null,
        "",
        url.pathname + (url.search ? url.search : "") + url.hash
      );
    } catch (error) {
      // Keep the stored view when URL state cannot be read or replaced.
    }
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
      var accessibleLabel = isSaved
        ? "Remove " + title + " from shortlist"
        : "Save " + title + " to shortlist";

      button.classList.toggle("is-saved", isSaved);
      button.setAttribute("aria-pressed", String(isSaved));
      button.setAttribute("aria-label", accessibleLabel);
      if (button.hasAttribute("data-shortlist-tooltip")) {
        button.setAttribute("title", accessibleLabel);
      }
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
    var stageNext = document.querySelector("[data-shortlist-stage-next]");
    var stageNextTitle = document.querySelector("[data-shortlist-stage-next-title]");
    var stageNextCopy = document.querySelector("[data-shortlist-stage-next-copy]");
    var stageNextFilter = document.querySelector("[data-shortlist-stage-next-filter]");
    var stageNextProgressWrap = document.querySelector(
      "[data-shortlist-stage-next-progress-wrap]"
    );
    var stageNextProgress = document.querySelector(
      "[data-shortlist-stage-next-progress]"
    );
    var stageNextProgressBar = document.querySelector(
      "[data-shortlist-stage-next-progress-bar]"
    );
    var stageNextProgressLabel = document.querySelector(
      "[data-shortlist-stage-next-progress-label]"
    );
    var reviewPulse = document.querySelector("[data-shortlist-review-pulse]");
    var reviewPulseTitle = document.querySelector("[data-shortlist-review-pulse-title]");
    var reviewPulseCopy = document.querySelector("[data-shortlist-review-pulse-copy]");
    var reviewPulseLink = document.querySelector("[data-shortlist-review-pulse-link]");
    var reviewPulseLinkLabel = document.querySelector(
      "[data-shortlist-review-pulse-link-label]"
    );
    var clear = document.querySelector("[data-shortlist-clear]");
    var stageState = readCandidateStageState();
    var stageView = readCandidateStageView();
    var trialState = readTrialState();
    var reviewSnapshot = readReviewSnapshot();
    var savedCount = saved.size;
    var visibleCount = 0;
    var savedReviewCount = 0;
    var savedReviewUpdates = 0;
    var testingChecksRemaining = 0;
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
      if (stage === "testing") {
        testingChecksRemaining += allowedChecks.length - cleanChecks(trialState[path]).length;
      }
    });

    items.forEach(function (item) {
      var path = item.getAttribute("data-shortlist-item");
      var isSaved = saved.has(path);
      var stage = cleanCandidateStage(stageState[path]);
      var reviewDate = item.getAttribute("data-shortlist-review-date") || "";
      var reviewState = reviewStateFor(path, reviewDate, reviewSnapshot);
      var reviewOutput = item.querySelector("[data-shortlist-review-state]");
      var reviewLabel = item.querySelector("[data-shortlist-review-label]");
      var show =
        isSaved &&
        (stageView === "all" ||
          (stageView === "unset" && !stage) ||
          stageView === stage);

      item.hidden = !show;
      if (show) {
        visibleCount += 1;
      }
      if (isSaved) {
        savedReviewCount += 1;
        if (reviewState === "updates") {
          savedReviewUpdates += 1;
        }
      }
      if (reviewOutput) {
        reviewOutput.setAttribute("data-review-state", reviewState);
      }
      if (reviewLabel) {
        reviewLabel.textContent =
          reviewState === "updates"
            ? "Newer Aiplorer check"
            : reviewState === "current"
              ? "Review checkpoint current"
              : "Start review tracking";
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
    if (stageNext) {
      stageNext.hidden = savedCount === 0;
    }
    if (
      stageNextTitle ||
      stageNextCopy ||
      stageNextFilter ||
      stageNextProgress ||
      stageNextProgressLabel
    ) {
      var stageNextAction = shortlistStageNextAction(
        stageView,
        stageCounts,
        testingChecksRemaining
      );
      var progressStage = stageView === "all" ? stageNextAction.target : stageView;
      var progressPaths = Array.from(saved).filter(function (path) {
        var stage = cleanCandidateStage(stageState[path]);
        return (
          progressStage === "all" ||
          (progressStage === "unset" && !stage) ||
          progressStage === stage
        );
      });
      var progressComplete = progressPaths.reduce(function (total, path) {
        return total + cleanChecks(trialState[path]).length;
      }, 0);
      var progressTotal = progressPaths.length * allowedChecks.length;

      if (stageNextTitle) {
        stageNextTitle.textContent = stageNextAction.title;
      }
      if (stageNextCopy) {
        stageNextCopy.textContent = stageNextAction.copy;
      }
      if (stageNextFilter) {
        stageNextFilter.hidden = !stageNextAction.target;
        if (stageNextAction.target) {
          stageNextFilter.setAttribute(
            "data-shortlist-stage-view",
            stageNextAction.target
          );
          stageNextFilter.textContent = stageNextAction.label;
        } else {
          stageNextFilter.removeAttribute("data-shortlist-stage-view");
        }
      }
      if (stageNextProgressWrap) {
        stageNextProgressWrap.hidden = progressTotal === 0;
      }
      if (stageNextProgress) {
        stageNextProgress.setAttribute("aria-valuemax", String(progressTotal));
        stageNextProgress.setAttribute("aria-valuenow", String(progressComplete));
      }
      if (stageNextProgressBar) {
        stageNextProgressBar.style.width =
          progressTotal > 0
            ? Math.round((progressComplete / progressTotal) * 100) + "%"
            : "0%";
      }
      if (stageNextProgressLabel) {
        stageNextProgressLabel.textContent =
          progressComplete +
          " of " +
          progressTotal +
          " private candidate checks complete in this queue.";
      }
    }
    if (reviewPulse) {
      reviewPulse.hidden = savedReviewCount === 0;
      var pulseState =
        reviewSnapshot === null
          ? "checkpoint"
          : savedReviewUpdates > 0
            ? "updates"
            : "current";
      reviewPulse.setAttribute("data-review-state", pulseState);

      if (reviewPulseTitle) {
        reviewPulseTitle.textContent =
          pulseState === "updates"
            ? savedReviewUpdates +
              " saved " +
              (savedReviewUpdates === 1 ? "candidate has" : "candidates have") +
              " a newer review check"
            : pulseState === "current"
              ? "Saved review checks are current"
              : "Start a review checkpoint";
      }
      if (reviewPulseCopy) {
        reviewPulseCopy.textContent =
          pulseState === "updates"
            ? "Revisit the changed Aiplorer reviews before continuing your comparison."
            : pulseState === "current"
              ? "These saved candidates match this browser's last Review Updates checkpoint."
              : "Open Review Updates once to track later Aiplorer checks for these saved candidates.";
      }
      if (reviewPulseLink && reviewPulseLinkLabel) {
        reviewPulseLink.href =
          pulseState === "updates"
            ? "/ai-tools/review-updates/?view=tools&saved=1&new=1"
            : "/ai-tools/review-updates/?view=tools&saved=1";
        reviewPulseLinkLabel.textContent =
          pulseState === "updates"
            ? "Review " +
              savedReviewUpdates +
              " saved " +
              (savedReviewUpdates === 1 ? "update" : "updates")
            : "Check saved reviews";
      }
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
    var progressbar = section.querySelector("[data-home-evaluation-progressbar]");
    var progressbarFill = section.querySelector(
      "[data-home-evaluation-progressbar-fill]"
    );
    var stageSummary = section.querySelector("[data-home-evaluation-stage]");
    var reviewSummary = section.querySelector("[data-home-evaluation-review]");
    var primary = section.querySelector("[data-home-evaluation-primary]");
    var primaryLabel = section.querySelector("[data-home-evaluation-primary-label]");
    var reviewLink = section.querySelector("[data-home-evaluation-review-link]");
    var reviewLinkLabel = section.querySelector(
      "[data-home-evaluation-review-link-label]"
    );
    var state = readTrialState();
    var stageState = readCandidateStageState();
    var reviewSnapshot = readReviewSnapshot();
    var reviewEntries = Array.prototype.slice.call(
      section.querySelectorAll("[data-home-review-entry]")
    );
    var savedReviewEntries = reviewEntries.filter(function (entry) {
      return saved.has(entry.getAttribute("data-review-path"));
    });
    var savedReviewUpdates =
      reviewSnapshot === null
        ? []
        : savedReviewEntries.filter(function (entry) {
            var token =
              entry.getAttribute("data-review-path") +
              "|" +
              entry.getAttribute("data-review-date");
            return !reviewSnapshot.has(token);
          });
    var completed = 0;
    var stageCounts = {
      researching: 0,
      testing: 0,
      ready: 0,
      unset: 0
    };

    saved.forEach(function (path) {
      completed += cleanChecks(state[path]).length;
      var stage = cleanCandidateStage(stageState[path]);
      if (stage) {
        stageCounts[stage] += 1;
      } else {
        stageCounts.unset += 1;
      }
    });

    var totalChecks = saved.size * allowedChecks.length;
    var resumeStage = stageCounts.testing
      ? "testing"
      : stageCounts.ready
        ? "ready"
        : stageCounts.researching
          ? "researching"
          : "unset";
    var resumeCount = stageCounts[resumeStage];
    var resumeComplete = Array.from(saved).reduce(function (total, path) {
      var stage = cleanCandidateStage(stageState[path]);
      var matchesResumeStage =
        resumeStage === "unset" ? !stage : stage === resumeStage;
      return total + (matchesResumeStage ? cleanChecks(state[path]).length : 0);
    }, 0);
    var resumeTotal = resumeCount * allowedChecks.length;

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
        totalChecks +
        " private candidate checks complete.";
    }
    if (progressbar) {
      progressbar.setAttribute("aria-valuemax", String(totalChecks));
      progressbar.setAttribute("aria-valuenow", String(completed));
    }
    if (progressbarFill) {
      progressbarFill.style.width =
        totalChecks > 0 ? Math.round((completed / totalChecks) * 100) + "%" : "0%";
    }
    if (stageSummary) {
      var resumeStageLabel =
        resumeStage === "unset" ? "set a stage" : candidateStageLabel(resumeStage);
      stageSummary.textContent =
        "Next queue: " +
        resumeStageLabel +
        " · " +
        resumeCount +
        " " +
        (resumeCount === 1 ? "candidate" : "candidates") +
        " · " +
        resumeComplete +
        " of " +
        resumeTotal +
        " checks complete.";
    }
    if (reviewSummary) {
      reviewSummary.hidden = savedReviewEntries.length === 0;
      if (reviewSnapshot === null) {
        reviewSummary.textContent =
          "Open Review Updates once to start tracking later checks for saved candidates.";
        reviewSummary.setAttribute("data-review-state", "checkpoint");
      } else if (savedReviewUpdates.length > 0) {
        reviewSummary.textContent =
          savedReviewUpdates.length +
          " saved " +
          (savedReviewUpdates.length === 1 ? "candidate has" : "candidates have") +
          " a newer Aiplorer review check.";
        reviewSummary.setAttribute("data-review-state", "updates");
      } else {
        reviewSummary.textContent =
          "Saved candidate reviews are caught up with your last checkpoint.";
        reviewSummary.setAttribute("data-review-state", "current");
      }
    }
    if (reviewLink && reviewLinkLabel) {
      if (savedReviewUpdates.length > 0) {
        reviewLink.href = "/ai-tools/review-updates/?view=tools&saved=1&new=1";
        reviewLinkLabel.textContent =
          "Review " +
          savedReviewUpdates.length +
          " saved " +
          (savedReviewUpdates.length === 1 ? "update" : "updates");
      } else {
        reviewLink.href = "/ai-tools/review-updates/?view=tools&saved=1";
        reviewLinkLabel.textContent = "Check saved reviews";
      }
    }
    if (primary && primaryLabel) {
      var resumeLabels = {
        testing: "Continue testing",
        ready: "Review ready candidates",
        researching: "Continue research",
        unset: "Set candidate stages"
      };

      primary.href = "/ai-tools/shortlist/?stage=" + resumeStage;
      primaryLabel.textContent =
        resumeLabels[resumeStage] + (resumeCount ? " " + resumeCount : "");
    }
  }

  function updateHomeReviewPulse() {
    var section = document.querySelector("[data-home-review-pulse]");
    if (!section) {
      return;
    }

    var label = section.querySelector("[data-home-review-pulse-label]");
    var heading = section.querySelector("[data-home-review-pulse-heading]");
    var copy = section.querySelector("[data-home-review-pulse-copy]");
    var link = section.querySelector("[data-home-review-pulse-link]");
    var linkLabel = section.querySelector("[data-home-review-pulse-link-label]");
    var latestReview =
      section.getAttribute("data-latest-review") || "the latest recorded date";
    var reviewSnapshot = readReviewSnapshot();
    var reviewEntries = Array.prototype.slice.call(
      document.querySelectorAll("[data-home-review-entry]")
    );
    var newerEntries =
      reviewSnapshot === null
        ? []
        : reviewEntries.filter(function (entry) {
            var token =
              entry.getAttribute("data-review-path") +
              "|" +
              entry.getAttribute("data-review-date");
            return !reviewSnapshot.has(token);
          });

    if (reviewSnapshot === null) {
      section.setAttribute("data-review-state", "checkpoint");
      if (label) {
        label.textContent = "Return visit";
      }
      if (heading) {
        heading.textContent = "Track reviewed AI tool checks";
      }
      if (copy) {
        copy.textContent =
          "Open Review Updates to set a private browser checkpoint. Aiplorer can then highlight tools added or checked again when you return.";
      }
      if (link && linkLabel) {
        link.href = "/ai-tools/review-updates/?view=tools";
        linkLabel.textContent = "Start review checkpoint";
      }
      return;
    }

    if (newerEntries.length > 0) {
      section.setAttribute("data-review-state", "updates");
      if (label) {
        label.textContent = "Since your last checkpoint";
      }
      if (heading) {
        heading.textContent =
          newerEntries.length +
          " AI tool review " +
          (newerEntries.length === 1 ? "check" : "checks") +
          " to revisit";
      }
      if (copy) {
        copy.textContent =
          "These tools were added or checked again by Aiplorer since this browser's checkpoint. Revisit the reviews, then verify current details at official sources.";
      }
      if (link && linkLabel) {
        link.href = "/ai-tools/review-updates/?view=tools&new=1";
        linkLabel.textContent = "Review new tool checks";
      }
      return;
    }

    section.setAttribute("data-review-state", "current");
    if (label) {
      label.textContent = "Review pulse";
    }
    if (heading) {
      heading.textContent = "Reviewed AI tool checks are caught up";
    }
    if (copy) {
      copy.textContent =
        "No newer Aiplorer tool checks are recorded since this browser's checkpoint. The latest recorded check remains " +
        latestReview +
        ".";
    }
    if (link && linkLabel) {
      link.href = "/ai-tools/review-updates/?view=tools";
      linkLabel.textContent = "Open review activity";
    }
  }

  function updateCandidateStages(saved) {
    var state = readCandidateStageState();
    var testingCount = 0;

    saved.forEach(function (path) {
      if (cleanCandidateStage(state[path]) === "testing") {
        testingCount += 1;
      }
    });

    document.querySelectorAll("[data-candidate-stage]").forEach(function (control) {
      var path = control.getAttribute("data-candidate-stage");
      var stage = saved.has(path) ? cleanCandidateStage(state[path]) : "";
      var current = control.querySelector("[data-candidate-stage-current]");
      var reset = control.querySelector("[data-candidate-stage-reset]");
      var next = control.querySelector("[data-candidate-stage-next]");

      if (current) {
        current.textContent = candidateStageLabel(stage);
        current.setAttribute("data-stage", stage || "unset");
      }
      if (next) {
        next.textContent = candidateStageNextText(stage);
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

    document.querySelectorAll("[data-compare-testing-link]").forEach(function (link) {
      link.hidden = testingCount === 0;
    });
    document.querySelectorAll("[data-compare-testing-count]").forEach(function (count) {
      count.textContent = String(testingCount);
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
    updateHomeReviewPulse();
    updateCandidateStages(saved);
    updateHomeSearchResume();
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

  var homeToolFinder = document.querySelector("[data-home-tool-finder]");
  if (homeToolFinder) {
    homeToolFinder.addEventListener("submit", function () {
      var query = homeToolFinder.querySelector("[data-home-tool-query]");
      var category = homeToolFinder.querySelector("[data-home-tool-category]");
      writeLastToolSearch(query ? query.value : "", category ? category.value : "");
    });
  }

  document.addEventListener("click", function (event) {
    var homeSearchClear = event.target.closest("[data-home-search-resume-clear]");
    var candidateStageViewButton = event.target.closest("[data-shortlist-stage-view]");
    var candidateStageButton = event.target.closest("[data-candidate-stage-value]");
    var candidateStageReset = event.target.closest("[data-candidate-stage-reset]");
    var toggle = event.target.closest("[data-shortlist-path]");
    var clear = event.target.closest("[data-shortlist-clear]");

    if (homeSearchClear) {
      clearLastToolSearch();
      updateHomeSearchResume();
      return;
    }

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
      event.key === candidateStageViewStorageKey ||
      event.key === reviewSnapshotStorageKey ||
      event.key === lastToolSearchStorageKey
    ) {
      render();
    }
  });

  window.addEventListener("aiplorer:trial-checks-change", function () {
    render();
  });

  applyCandidateStageViewFromUrl();
  render();
})();
