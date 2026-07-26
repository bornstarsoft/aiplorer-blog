(function () {
  "use strict";

  var storageKey = "aiplorer-shortlist-v1";
  var trialStorageKey = "aiplorer-trial-checks-v1";
  var candidateStageStorageKey = "aiplorer-candidate-stage-v1";
  var candidateStageViewStorageKey = "aiplorer-shortlist-stage-view-v1";
  var candidateNoteStorageKey = "aiplorer-candidate-notes-v1";
  var candidateTestDateStorageKey = "aiplorer-candidate-test-date-v1";
  var candidateTestDateViewStorageKey = "aiplorer-shortlist-test-date-view-v1";
  var reviewSnapshotStorageKey = "aiplorer-review-snapshot-v1";
  var lastToolSearchStorageKey = "aiplorer-last-tool-search-v1";
  var backupSchema = "aiplorer-shortlist-backup";
  var backupVersion = 1;
  var backupMaxBytes = 262144;
  var candidateNoteMaxLength = 600;
  var allowedChecks = ["task", "output", "privacy", "plans"];
  var allowedCandidateStages = ["researching", "testing", "ready"];
  var allowedCandidateStageViews = ["all", "researching", "testing", "ready", "unset"];
  var allowedCandidateTestDateViews = ["all", "untested", "dated"];
  var memoryList = [];
  var memoryTrialState = {};
  var memoryCandidateStageState = {};
  var memoryCandidateStageView = "all";
  var memoryCandidateNoteState = {};
  var memoryCandidateTestDateState = {};
  var memoryCandidateTestDateView = "all";

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

  function cleanCandidateNote(value) {
    return typeof value === "string"
      ? value
          .replace(/\r\n?/g, "\n")
          .replace(/\u0000/g, "")
          .slice(0, candidateNoteMaxLength)
      : "";
  }

  function cleanCandidateNoteState(value) {
    var result = {};
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return result;
    }

    Object.keys(value).forEach(function (path) {
      var note = cleanCandidateNote(value[path]);
      if (validPath(path) && note.trim()) {
        result[path] = note;
      }
    });
    return result;
  }

  function readCandidateNoteState() {
    try {
      memoryCandidateNoteState = cleanCandidateNoteState(
        JSON.parse(window.localStorage.getItem(candidateNoteStorageKey) || "{}")
      );
    } catch (error) {
      memoryCandidateNoteState = cleanCandidateNoteState(memoryCandidateNoteState);
    }
    return Object.assign({}, memoryCandidateNoteState);
  }

  function writeCandidateNoteState(value) {
    memoryCandidateNoteState = cleanCandidateNoteState(value);
    try {
      window.localStorage.setItem(
        candidateNoteStorageKey,
        JSON.stringify(memoryCandidateNoteState)
      );
    } catch (error) {
      // Keep the current-session fallback when browser storage is unavailable.
    }
  }

  function localIsoDate() {
    var date = new Date();
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0")
    ].join("-");
  }

  function cleanCandidateTestDate(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return "";
    }

    var parsed = new Date(value + "T00:00:00Z");
    if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
      return "";
    }
    return value <= localIsoDate() ? value : "";
  }

  function cleanCandidateTestDateState(value) {
    var result = {};
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return result;
    }

    Object.keys(value).forEach(function (path) {
      var testDate = cleanCandidateTestDate(value[path]);
      if (validPath(path) && testDate) {
        result[path] = testDate;
      }
    });
    return result;
  }

  function readCandidateTestDateState() {
    try {
      memoryCandidateTestDateState = cleanCandidateTestDateState(
        JSON.parse(window.localStorage.getItem(candidateTestDateStorageKey) || "{}")
      );
    } catch (error) {
      memoryCandidateTestDateState = cleanCandidateTestDateState(
        memoryCandidateTestDateState
      );
    }
    return Object.assign({}, memoryCandidateTestDateState);
  }

  function writeCandidateTestDateState(value) {
    memoryCandidateTestDateState = cleanCandidateTestDateState(value);
    try {
      window.localStorage.setItem(
        candidateTestDateStorageKey,
        JSON.stringify(memoryCandidateTestDateState)
      );
    } catch (error) {
      // Keep the current-session fallback when browser storage is unavailable.
    }
  }

  function cleanCandidateTestDateView(value) {
    return allowedCandidateTestDateViews.indexOf(value) !== -1 ? value : "all";
  }

  function readCandidateTestDateView() {
    try {
      memoryCandidateTestDateView = cleanCandidateTestDateView(
        window.localStorage.getItem(candidateTestDateViewStorageKey) || "all"
      );
    } catch (error) {
      memoryCandidateTestDateView = cleanCandidateTestDateView(
        memoryCandidateTestDateView
      );
    }
    return memoryCandidateTestDateView;
  }

  function writeCandidateTestDateView(value) {
    memoryCandidateTestDateView = cleanCandidateTestDateView(value);
    try {
      window.localStorage.setItem(
        candidateTestDateViewStorageKey,
        memoryCandidateTestDateView
      );
    } catch (error) {
      // Keep the current-session fallback when browser storage is unavailable.
    }
  }

  function candidateTestDateViewLabel(value) {
    if (value === "untested") {
      return "Not tested";
    }
    if (value === "dated") {
      return "Date recorded";
    }
    return "All test dates";
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

  function availableShortlistPaths() {
    return new Set(
      Array.prototype.map
        .call(document.querySelectorAll("[data-shortlist-item]"), function (item) {
          return item.getAttribute("data-shortlist-item");
        })
        .filter(validPath)
    );
  }

  function stateForPaths(value, paths, cleaner) {
    var result = {};
    var cleanValue = cleaner(value);

    paths.forEach(function (path) {
      if (Object.prototype.hasOwnProperty.call(cleanValue, path)) {
        result[path] = cleanValue[path];
      }
    });
    return result;
  }

  function shortlistBackupPayload() {
    var shortlist = readList();
    var shortlistSet = new Set(shortlist);

    return {
      schema: backupSchema,
      version: backupVersion,
      exportedAt: new Date().toISOString(),
      shortlist: shortlist,
      checks: stateForPaths(readTrialState(), shortlistSet, cleanTrialState),
      stages: stateForPaths(
        readCandidateStageState(),
        shortlistSet,
        cleanCandidateStageState
      ),
      notes: stateForPaths(
        readCandidateNoteState(),
        shortlistSet,
        cleanCandidateNoteState
      ),
      testDates: stateForPaths(
        readCandidateTestDateState(),
        shortlistSet,
        cleanCandidateTestDateState
      ),
      stageView: readCandidateStageView(),
      testDateView: readCandidateTestDateView()
    };
  }

  function downloadLocalFile(contents, filename, type) {
    var blob = new Blob([contents], { type: type });
    var objectUrl = window.URL.createObjectURL(blob);
    var download = document.createElement("a");
    download.href = objectUrl;
    download.download = filename;
    document.body.appendChild(download);
    download.click();
    download.remove();
    window.setTimeout(function () {
      window.URL.revokeObjectURL(objectUrl);
    }, 0);
  }

  function exportShortlistBackup() {
    var payload = shortlistBackupPayload();
    if (payload.shortlist.length === 0) {
      announce("Save at least one reviewed tool before downloading a backup.");
      return;
    }

    downloadLocalFile(
      JSON.stringify(payload, null, 2) + "\n",
      "aiplorer-shortlist-" + new Date().toISOString().slice(0, 10) + ".json",
      "application/json"
    );

    announce(
      "Downloaded a local backup for " +
        payload.shortlist.length +
        " saved " +
        (payload.shortlist.length === 1 ? "candidate." : "candidates.")
    );
  }

  function briefText(value) {
    return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
  }

  function briefCheckLabel(value) {
    if (value === "task") {
      return "Tested with the category task";
    }
    if (value === "output") {
      return "Reviewed output quality and facts";
    }
    if (value === "privacy") {
      return "Checked privacy, permissions, and rights";
    }
    return "Confirmed current plans and limits";
  }

  function shortlistDecisionBrief() {
    var savedPaths = readList();
    var stageState = readCandidateStageState();
    var trialState = readTrialState();
    var noteState = readCandidateNoteState();
    var testDateState = readCandidateTestDateState();
    var itemsByPath = {};

    document.querySelectorAll("[data-shortlist-item]").forEach(function (item) {
      itemsByPath[item.getAttribute("data-shortlist-item")] = item;
    });

    var candidates = savedPaths
      .map(function (path) {
        return { path: path, item: itemsByPath[path] };
      })
      .filter(function (candidate) {
        return Boolean(candidate.item);
      });

    if (candidates.length === 0) {
      return "";
    }

    var completedChecks = candidates.reduce(function (total, candidate) {
      return total + cleanChecks(trialState[candidate.path]).length;
    }, 0);
    var savedNotes = candidates.reduce(function (total, candidate) {
      return total + (cleanCandidateNote(noteState[candidate.path]).trim() ? 1 : 0);
    }, 0);
    var savedTestDates = candidates.reduce(function (total, candidate) {
      return total + (cleanCandidateTestDate(testDateState[candidate.path]) ? 1 : 0);
    }, 0);
    var lines = [
      "# Aiplorer AI tool decision brief",
      "",
      "Local evaluation summary - not a ranking or recommendation.",
      "",
      "- Generated: " + new Date().toISOString(),
      "- Saved candidates: " + candidates.length,
      "- Candidate checks complete: " +
        completedChecks +
        " of " +
        candidates.length * allowedChecks.length,
      "- Private test notes saved: " + savedNotes,
      "- Local test dates saved: " + savedTestDates,
      "- Order: candidates appear in the order saved, not by score or rank.",
      ""
    ];

    candidates.forEach(function (candidate, index) {
      var item = candidate.item;
      var path = candidate.path;
      var title = briefText(item.getAttribute("data-shortlist-title")) || "Saved tool";
      var category = briefText(
        (item.querySelector("[data-shortlist-category]") || {}).textContent
      );
      var description = briefText(
        (item.querySelector("[data-shortlist-description]") || {}).textContent
      );
      var bestFor = briefText(
        (item.querySelector("[data-shortlist-best-for]") || {}).textContent
      );
      var limitation = briefText(
        (item.querySelector("[data-shortlist-limitation]") || {}).textContent
      );
      var testTask = briefText(
        (item.querySelector("[data-shortlist-test-task]") || {}).textContent
      );
      var testFocus = briefText(
        (item.querySelector("[data-shortlist-test-focus]") || {}).textContent
      );
      var reviewDate = briefText(item.getAttribute("data-shortlist-review-date"));
      var stage = cleanCandidateStage(stageState[path]);
      var completed = cleanChecks(trialState[path]);
      var note = cleanCandidateNote(noteState[path]).trim();
      var testDate = cleanCandidateTestDate(testDateState[path]);

      lines.push("## " + (index + 1) + ". " + title);
      lines.push("");
      if (description) {
        lines.push(description);
        lines.push("");
      }
      lines.push("- Category: " + (category || "Not specified"));
      lines.push("- Decision stage: " + candidateStageLabel(stage));
      lines.push("- Last tested locally: " + (testDate || "Not recorded"));
      lines.push("- Aiplorer review checked: " + (reviewDate || "Date not available"));
      lines.push("- Full review: https://aiplorer.com" + path);
      if (bestFor) {
        lines.push("- May fit: " + bestFor);
      }
      if (limitation) {
        lines.push("- Check first: " + limitation);
      }
      lines.push("");
      if (testTask || testFocus) {
        lines.push("### Same-task test");
        lines.push("");
        if (testTask) {
          lines.push(testTask);
        }
        if (testFocus) {
          lines.push("");
          lines.push("- Review closely: " + testFocus);
        }
        lines.push("");
      }
      lines.push("### Candidate checks");
      lines.push("");
      allowedChecks.forEach(function (check) {
        lines.push(
          "- [" +
            (completed.indexOf(check) === -1 ? " " : "x") +
            "] " +
            briefCheckLabel(check)
        );
      });
      lines.push("");
      lines.push("### Next step");
      lines.push("");
      lines.push(candidateStageNextText(stage));
      lines.push("");
      if (note) {
        lines.push("### Private test note");
        lines.push("");
        note.split("\n").forEach(function (line) {
          lines.push("> " + line);
        });
        lines.push("");
      }
    });

    lines.push("## Before choosing");
    lines.push("");
    lines.push(
      "- Recheck current features, pricing, limits, policies, and availability on official vendor pages."
    );
    lines.push(
      "- Review important outputs and use extra care with sensitive, legal, medical, financial, security, or business-critical work."
    );
    lines.push(
      "- This file reflects private browser notes and Aiplorer review pages; it does not prove that a tool is accurate, secure, suitable, or approved."
    );
    lines.push("");

    return lines.join("\n");
  }

  function exportShortlistBrief() {
    var brief = shortlistDecisionBrief();
    if (!brief) {
      announce("Save at least one reviewed tool before downloading a decision brief.");
      return;
    }

    downloadLocalFile(
      brief,
      "aiplorer-decision-brief-" + new Date().toISOString().slice(0, 10) + ".md",
      "text/markdown"
    );
    announce("Downloaded a readable decision brief for your saved candidates.");
  }

  function cleanShortlistBackup(value) {
    if (
      !value ||
      typeof value !== "object" ||
      Array.isArray(value) ||
      value.schema !== backupSchema ||
      value.version !== backupVersion ||
      !Array.isArray(value.shortlist)
    ) {
      throw new Error("invalid-backup");
    }

    var available = availableShortlistPaths();
    var shortlist = uniquePaths(value.shortlist).filter(function (path) {
      return available.has(path);
    });
    if (shortlist.length === 0) {
      throw new Error("no-current-reviewed-tools");
    }

    var shortlistSet = new Set(shortlist);
    return {
      shortlist: shortlist,
      checks: stateForPaths(value.checks, shortlistSet, cleanTrialState),
      stages: stateForPaths(value.stages, shortlistSet, cleanCandidateStageState),
      notes: stateForPaths(value.notes, shortlistSet, cleanCandidateNoteState),
      testDates: stateForPaths(
        value.testDates,
        shortlistSet,
        cleanCandidateTestDateState
      ),
      stageView: cleanCandidateStageView(value.stageView),
      testDateView: cleanCandidateTestDateView(value.testDateView)
    };
  }

  function restoreShortlistBackup(file, input) {
    if (!file) {
      return;
    }
    if (file.size > backupMaxBytes) {
      announce("That backup is too large. Choose an Aiplorer shortlist JSON file.");
      input.value = "";
      return;
    }

    file
      .text()
      .then(function (contents) {
        var backup = cleanShortlistBackup(JSON.parse(contents));
        if (
          readList().length > 0 &&
          !window.confirm(
            "Restore this backup? It will replace this browser's saved candidates, stages, checklist progress, local test dates, and private test notes."
          )
        ) {
          announce("Backup restore cancelled.");
          return;
        }

        writeList(backup.shortlist);
        writeTrialState(backup.checks);
        writeCandidateStageState(backup.stages);
        writeCandidateNoteState(backup.notes);
        writeCandidateTestDateState(backup.testDates);
        writeCandidateStageView(backup.stageView);
        writeCandidateTestDateView(backup.testDateView);
        cleanupEvaluationState(backup.shortlist);
        render();
        notifyChange(backup.shortlist);
        announce(
          "Restored " +
            backup.shortlist.length +
            " saved " +
            (backup.shortlist.length === 1 ? "candidate" : "candidates") +
            " from the local backup."
        );
      })
      .catch(function () {
        announce(
          "This file could not be restored. Choose a valid Aiplorer shortlist JSON backup."
        );
      })
      .then(function () {
        input.value = "";
      });
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

  function candidateCheckLabel(value) {
    if (value === "task") {
      return "category task";
    }
    if (value === "output") {
      return "output quality and facts";
    }
    if (value === "privacy") {
      return "privacy, permissions, and rights";
    }
    return "current plans and limits";
  }

  function nextIncompleteTestingCandidate(
    saved,
    stageState,
    trialState,
    candidateItems
  ) {
    var items = candidateItems
      ? Array.prototype.slice.call(candidateItems)
      : Array.prototype.slice.call(
          document.querySelectorAll("[data-shortlist-item]")
        );

    for (var index = 0; index < items.length; index += 1) {
      var item = items[index];
      var path =
        item.getAttribute("data-shortlist-item") ||
        item.getAttribute("data-review-path");
      if (
        !saved.has(path) ||
        cleanCandidateStage(stageState[path]) !== "testing"
      ) {
        continue;
      }

      var completed = cleanChecks(trialState[path]);
      var nextCheck = allowedChecks.find(function (check) {
        return completed.indexOf(check) === -1;
      });
      if (nextCheck) {
        return {
          path: path,
          check: nextCheck,
          title:
            item.getAttribute("data-shortlist-title") ||
            item.getAttribute("data-review-title") ||
            "Saved candidate"
        };
      }
    }

    return null;
  }

  function focusShortlistCandidateCheck(path, check) {
    var item = Array.prototype.find.call(
      document.querySelectorAll("[data-shortlist-item]"),
      function (candidate) {
        return candidate.getAttribute("data-shortlist-item") === path;
      }
    );
    var details = item && item.querySelector("details");
    var input =
      item &&
      Array.prototype.find.call(
        item.querySelectorAll("[data-trial-check]"),
        function (candidateCheck) {
          return candidateCheck.value === check;
        }
      );

    if (!item || !input) {
      return "";
    }
    if (details) {
      details.open = true;
    }
    window.requestAnimationFrame(function () {
      var label = input.closest("label");
      input.focus({ preventScroll: true });
      if (label) {
        label.scrollIntoView({ block: "center" });
      }
    });

    return item.getAttribute("data-shortlist-title") || "Saved candidate";
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

  function applyCandidateTestDateViewFromUrl() {
    if (!document.querySelector("[data-shortlist-test-date-filter]")) {
      return;
    }

    try {
      var url = new URL(window.location.href);
      var requestedTestDateView = url.searchParams.get("test");
      if (allowedCandidateTestDateViews.indexOf(requestedTestDateView) === -1) {
        return;
      }

      writeCandidateTestDateView(requestedTestDateView);
      url.searchParams.delete("test");
      window.history.replaceState(
        null,
        "",
        url.pathname + (url.search ? url.search : "") + url.hash
      );
    } catch (error) {
      // Keep the stored view when URL state cannot be read or replaced.
    }
  }

  function applyCandidateCheckFromUrl(saved) {
    if (!document.querySelector("[data-shortlist-stage-filter]")) {
      return;
    }

    try {
      var url = new URL(window.location.href);
      var path = url.searchParams.get("candidate");
      var check = url.searchParams.get("check");
      if (!path && !check) {
        return;
      }

      url.searchParams.delete("candidate");
      url.searchParams.delete("check");
      window.history.replaceState(
        null,
        "",
        url.pathname + (url.search ? url.search : "") + url.hash
      );

      var stageState = readCandidateStageState();
      var completed = cleanChecks(readTrialState()[path]);
      if (
        !saved.has(path) ||
        cleanCandidateStage(stageState[path]) !== "testing" ||
        allowedChecks.indexOf(check) === -1 ||
        completed.indexOf(check) !== -1
      ) {
        return;
      }

      var title = focusShortlistCandidateCheck(path, check);
      if (title) {
        announce(
          title +
            ": opened next unfinished check, " +
            candidateCheckLabel(check) +
            "."
        );
      }
    } catch (error) {
      // Keep the shortlist usable when URL state cannot be read or replaced.
    }
  }

  function cleanupEvaluationState(savedPaths) {
    var saved = new Set(savedPaths);
    var trialState = readTrialState();
    var candidateStageState = readCandidateStageState();
    var candidateNoteState = readCandidateNoteState();
    var candidateTestDateState = readCandidateTestDateState();
    var trialChanged = false;
    var stageChanged = false;
    var noteChanged = false;
    var testDateChanged = false;

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

    Object.keys(candidateNoteState).forEach(function (path) {
      if (!saved.has(path)) {
        delete candidateNoteState[path];
        noteChanged = true;
      }
    });

    Object.keys(candidateTestDateState).forEach(function (path) {
      if (!saved.has(path)) {
        delete candidateTestDateState[path];
        testDateChanged = true;
      }
    });

    if (trialChanged) {
      writeTrialState(trialState);
    }
    if (stageChanged) {
      writeCandidateStageState(candidateStageState);
    }
    if (noteChanged) {
      writeCandidateNoteState(candidateNoteState);
    }
    if (testDateChanged) {
      writeCandidateTestDateState(candidateTestDateState);
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
    var testDateFilter = document.querySelector("[data-shortlist-test-date-filter]");
    var testDateSummary = document.querySelector("[data-shortlist-test-date-summary]");
    var stageNext = document.querySelector("[data-shortlist-stage-next]");
    var stageNextTitle = document.querySelector("[data-shortlist-stage-next-title]");
    var stageNextCopy = document.querySelector("[data-shortlist-stage-next-copy]");
    var stageNextFilter = document.querySelector("[data-shortlist-stage-next-filter]");
    var stageNextCheck = document.querySelector("[data-shortlist-next-check]");
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
    var exportBackup = document.querySelector("[data-shortlist-export]");
    var exportBrief = document.querySelector("[data-shortlist-export-brief]");
    var stageState = readCandidateStageState();
    var stageView = readCandidateStageView();
    var testDateState = readCandidateTestDateState();
    var testDateView = readCandidateTestDateView();
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
    var testDateCounts = {
      all: savedCount,
      untested: 0,
      dated: 0
    };
    var nextTestingCandidate = nextIncompleteTestingCandidate(
      saved,
      stageState,
      trialState
    );

    saved.forEach(function (path) {
      var stage = cleanCandidateStage(stageState[path]);
      var testDate = cleanCandidateTestDate(testDateState[path]);
      stageCounts[stage || "unset"] += 1;
      testDateCounts[testDate ? "dated" : "untested"] += 1;
      if (stage === "testing") {
        testingChecksRemaining += allowedChecks.length - cleanChecks(trialState[path]).length;
      }
    });

    items.forEach(function (item) {
      var path = item.getAttribute("data-shortlist-item");
      var isSaved = saved.has(path);
      var stage = cleanCandidateStage(stageState[path]);
      var testDate = cleanCandidateTestDate(testDateState[path]);
      var reviewDate = item.getAttribute("data-shortlist-review-date") || "";
      var reviewState = reviewStateFor(path, reviewDate, reviewSnapshot);
      var reviewOutput = item.querySelector("[data-shortlist-review-state]");
      var reviewLabel = item.querySelector("[data-shortlist-review-label]");
      var show =
        isSaved &&
        (stageView === "all" ||
          (stageView === "unset" && !stage) ||
          stageView === stage) &&
        (testDateView === "all" ||
          (testDateView === "untested" && !testDate) ||
          (testDateView === "dated" && Boolean(testDate)));

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
    if (testDateFilter) {
      testDateFilter.hidden = savedCount === 0;
    }
    if (stageNext) {
      stageNext.hidden = savedCount === 0;
    }
    if (
      stageNextTitle ||
      stageNextCopy ||
      stageNextFilter ||
      stageNextCheck ||
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
      if (stageNextCheck) {
        var showNextCheck =
          Boolean(nextTestingCandidate) &&
          (stageView === "all" || stageView === "testing");
        stageNextCheck.hidden = !showNextCheck;
        if (showNextCheck) {
          stageNextCheck.setAttribute(
            "data-shortlist-next-check-path",
            nextTestingCandidate.path
          );
          stageNextCheck.setAttribute(
            "data-shortlist-next-check-value",
            nextTestingCandidate.check
          );
          stageNextCheck.setAttribute(
            "aria-label",
            "Open next unfinished check for " +
              nextTestingCandidate.title +
              ": " +
              candidateCheckLabel(nextTestingCandidate.check)
          );
        } else {
          stageNextCheck.removeAttribute("data-shortlist-next-check-path");
          stageNextCheck.removeAttribute("data-shortlist-next-check-value");
          stageNextCheck.removeAttribute("aria-label");
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
      var stageVisibleCount =
        stageView === "all" ? savedCount : stageCounts[stageView] || 0;
      stageSummary.textContent =
        stageView === "all"
          ? "All decision stages selected."
          : stageVisibleCount +
            " of " +
            savedCount +
            " saved " +
            (savedCount === 1 ? "candidate" : "candidates") +
            " match " +
            candidateStageViewLabel(stageView) +
            ".";
    }
    if (testDateSummary) {
      testDateSummary.textContent =
        stageView === "all" && testDateView === "all"
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
            " after both local filters.";
    }
    if (clear) {
      clear.disabled = savedCount === 0;
    }
    if (exportBackup) {
      exportBackup.disabled = savedCount === 0;
    }
    if (exportBrief) {
      exportBrief.disabled = savedCount === 0;
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

    document.querySelectorAll("[data-shortlist-test-date-view]").forEach(function (button) {
      var value = cleanCandidateTestDateView(
        button.getAttribute("data-shortlist-test-date-view")
      );
      var active = value === testDateView;

      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    document.querySelectorAll("[data-shortlist-test-date-count]").forEach(function (count) {
      var value = cleanCandidateTestDateView(
        count.getAttribute("data-shortlist-test-date-count")
      );
      count.textContent = String(testDateCounts[value] || 0);
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
    var nextSummary = section.querySelector("[data-home-evaluation-next]");
    var untestedSummary = section.querySelector("[data-home-evaluation-untested]");
    var reviewSummary = section.querySelector("[data-home-evaluation-review]");
    var primary = section.querySelector("[data-home-evaluation-primary]");
    var primaryLabel = section.querySelector("[data-home-evaluation-primary-label]");
    var reviewLink = section.querySelector("[data-home-evaluation-review-link]");
    var reviewLinkLabel = section.querySelector(
      "[data-home-evaluation-review-link-label]"
    );
    var untestedLink = section.querySelector("[data-home-evaluation-untested-link]");
    var untestedLinkLabel = section.querySelector(
      "[data-home-evaluation-untested-link-label]"
    );
    var state = readTrialState();
    var stageState = readCandidateStageState();
    var testDateState = readCandidateTestDateState();
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
    var untestedCount = 0;
    var stageCounts = {
      researching: 0,
      testing: 0,
      ready: 0,
      unset: 0
    };

    saved.forEach(function (path) {
      completed += cleanChecks(state[path]).length;
      if (!cleanCandidateTestDate(testDateState[path])) {
        untestedCount += 1;
      }
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
    var nextTestingCandidate = nextIncompleteTestingCandidate(
      saved,
      stageState,
      state,
      reviewEntries
    );

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
    if (nextSummary) {
      nextSummary.hidden = !nextTestingCandidate;
      if (nextTestingCandidate) {
        nextSummary.textContent =
          "Next unfinished check: " +
          nextTestingCandidate.title +
          " · " +
          candidateCheckLabel(nextTestingCandidate.check) +
          ".";
      }
    }
    if (untestedSummary) {
      untestedSummary.hidden = untestedCount === 0;
      if (untestedCount > 0) {
        untestedSummary.textContent =
          untestedCount +
          " saved " +
          (untestedCount === 1 ? "candidate has" : "candidates have") +
          " no local test date yet.";
      }
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
    if (untestedLink && untestedLinkLabel) {
      untestedLink.hidden = untestedCount === 0;
      untestedLink.href = "/ai-tools/shortlist/?test=untested";
      untestedLinkLabel.textContent =
        "Review " +
        untestedCount +
        " untested " +
        (untestedCount === 1 ? "candidate" : "candidates");
    }
    if (primary && primaryLabel) {
      if (nextTestingCandidate) {
        primary.href =
          "/ai-tools/shortlist/?stage=testing&test=all&candidate=" +
          encodeURIComponent(nextTestingCandidate.path) +
          "&check=" +
          encodeURIComponent(nextTestingCandidate.check);
        primaryLabel.textContent =
          "Continue " + nextTestingCandidate.title + " check";
      } else {
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
  }

  function updateDirectoryResume(saved) {
    var section = document.querySelector("[data-directory-resume]");
    if (!section) {
      return;
    }

    var heading = section.querySelector("[data-directory-resume-heading]");
    var tools = section.querySelector("[data-directory-resume-tools]");
    var progress = section.querySelector("[data-directory-resume-progress]");
    var primary = section.querySelector("[data-directory-resume-primary]");
    var primaryLabel = section.querySelector("[data-directory-resume-primary-label]");
    var trialState = readTrialState();
    var stageState = readCandidateStageState();
    var titlesByPath = {};
    var completed = 0;
    var stageCounts = {
      researching: 0,
      testing: 0,
      ready: 0,
      unset: 0
    };

    document.querySelectorAll("[data-shortlist-path]").forEach(function (button) {
      var path = button.getAttribute("data-shortlist-path");
      var title = button.getAttribute("data-shortlist-title");
      if (validPath(path) && title && !titlesByPath[path]) {
        titlesByPath[path] = title;
      }
    });

    saved.forEach(function (path) {
      var stage = cleanCandidateStage(stageState[path]);
      stageCounts[stage || "unset"] += 1;
      completed += cleanChecks(trialState[path]).length;
    });

    var savedTitles = Array.from(saved).map(function (path) {
      return titlesByPath[path] || "";
    }).filter(Boolean);
    var visibleTitles = savedTitles.slice(0, 3);
    var hiddenTitleCount = Math.max(saved.size - visibleTitles.length, 0);
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
      return total + (matchesResumeStage ? cleanChecks(trialState[path]).length : 0);
    }, 0);
    var resumeTotal = resumeCount * allowedChecks.length;

    section.hidden = saved.size === 0;
    if (heading) {
      heading.textContent =
        "Continue with " +
        saved.size +
        " saved AI tool " +
        (saved.size === 1 ? "candidate" : "candidates");
    }
    if (tools) {
      tools.textContent = visibleTitles.length
        ? visibleTitles.join(", ") +
          (hiddenTitleCount > 0 ? " +" + hiddenTitleCount + " more" : "")
        : "Saved candidates from this browser.";
    }
    if (progress) {
      progress.textContent =
        "Next queue: " +
        (resumeStage === "unset" ? "Set a stage" : candidateStageLabel(resumeStage)) +
        " · " +
        resumeCount +
        " " +
        (resumeCount === 1 ? "candidate" : "candidates") +
        " · " +
        resumeComplete +
        " of " +
        resumeTotal +
        " checks complete (" +
        completed +
        " of " +
        saved.size * allowedChecks.length +
        " overall).";
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
      var item = control.closest("[data-shortlist-item]");
      var summaryStage = item && item.querySelector("[data-shortlist-evaluation-stage]");

      if (current) {
        current.textContent = candidateStageLabel(stage);
        current.setAttribute("data-stage", stage || "unset");
      }
      if (summaryStage) {
        summaryStage.textContent = "Stage: " + candidateStageLabel(stage);
        summaryStage.setAttribute("data-stage", stage || "unset");
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

  function updateCandidateNotes(saved) {
    var state = readCandidateNoteState();

    document.querySelectorAll("[data-candidate-note]").forEach(function (control) {
      var path = control.getAttribute("data-candidate-note");
      var note = saved.has(path) ? cleanCandidateNote(state[path]) : "";
      var input = control.querySelector("[data-candidate-note-input]");
      var count = control.querySelector("[data-candidate-note-count]");
      var item = control.closest("[data-shortlist-item]");
      var summary = item && item.querySelector("[data-shortlist-evaluation-note]");

      if (input && document.activeElement !== input && input.value !== note) {
        input.value = note;
      }
      if (count) {
        count.textContent = String(note.length);
      }
      if (summary) {
        summary.hidden = !note.trim();
      }
    });
  }

  function updateCandidateTestDates(saved) {
    var state = readCandidateTestDateState();
    var today = localIsoDate();

    document.querySelectorAll("[data-candidate-test-date]").forEach(function (control) {
      var path = control.getAttribute("data-candidate-test-date");
      var testDate = saved.has(path) ? cleanCandidateTestDate(state[path]) : "";
      var input = control.querySelector("[data-candidate-test-date-input]");
      var current = control.querySelector("[data-candidate-test-date-current]");
      var clear = control.querySelector("[data-candidate-test-date-clear]");
      var item = control.closest("[data-shortlist-item]");
      var summary = item && item.querySelector("[data-shortlist-evaluation-tested]");
      var summaryTime = summary && summary.querySelector("time");

      if (input) {
        input.max = today;
        input.disabled = !saved.has(path);
        if (document.activeElement !== input && input.value !== testDate) {
          input.value = testDate;
        }
      }
      if (current) {
        current.textContent = testDate || "Not recorded";
      }
      if (clear) {
        clear.disabled = !testDate;
      }
      if (summary) {
        summary.hidden = !testDate;
      }
      if (summaryTime) {
        summaryTime.dateTime = testDate;
        summaryTime.textContent = testDate;
      }
    });

    document.querySelectorAll("[data-compare-test-date]").forEach(function (output) {
      var row = output.closest("[data-compare-row]");
      var path = row && row.getAttribute("data-compare-path");
      var testDate = saved.has(path) ? cleanCandidateTestDate(state[path]) : "";

      output.textContent = testDate
        ? "Last tested locally " + testDate
        : "Local test date not set";
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
    updateDirectoryResume(saved);
    updateHomeReviewPulse();
    updateCandidateStages(saved);
    updateCandidateNotes(saved);
    updateCandidateTestDates(saved);
    updateHomeSearchResume();
  }

  function announce(message) {
    var status =
      document.querySelector("[data-copy-test-plan-status]") ||
      document.querySelector("[data-shortlist-status]");
    if (status) {
      status.textContent = message;
    }
  }

  function categoryTestPlanText(button) {
    var category = (button.getAttribute("data-copy-test-plan-category") || "AI tools").trim();
    var task = (button.getAttribute("data-copy-test-plan-task") || "").trim();
    var focus = (button.getAttribute("data-copy-test-plan-focus") || "").trim();

    return [
      "Aiplorer same-task test - " + category,
      "",
      "Task:",
      task,
      "",
      "Review closely:",
      focus,
      "",
      "Safety and context:",
      "Use non-sensitive test data, review important outputs, and verify current vendor details, permissions, rights, and workplace requirements before relying on a result."
    ].join("\n");
  }

  function fallbackCopyText(value) {
    return new Promise(function (resolve, reject) {
      var input = document.createElement("textarea");
      input.value = value;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.left = "-9999px";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();

      try {
        if (document.execCommand("copy")) {
          resolve();
        } else {
          reject(new Error("Copy command was not available."));
        }
      } catch (error) {
        reject(error);
      } finally {
        document.body.removeChild(input);
      }
    });
  }

  function writeClipboardText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value).catch(function () {
        return fallbackCopyText(value);
      });
    }
    return fallbackCopyText(value);
  }

  function setCopyTestPlanState(button, copied) {
    var label = button.querySelector("[data-copy-test-plan-label]");
    var category = button.getAttribute("data-copy-test-plan-category") || "AI tools";

    if (button.aiplorerCopyResetTimer) {
      window.clearTimeout(button.aiplorerCopyResetTimer);
    }

    button.classList.toggle("is-copied", copied);
    button.setAttribute(
      "aria-label",
      copied
        ? category + " test plan copied"
        : "Copy the " + category + " same-task test plan"
    );
    if (label) {
      label.textContent = copied ? "Copied" : "Copy test plan";
    }

    if (copied) {
      button.aiplorerCopyResetTimer = window.setTimeout(function () {
        setCopyTestPlanState(button, false);
      }, 2400);
    }
  }

  function copyCategoryTestPlan(button) {
    var category = button.getAttribute("data-copy-test-plan-category") || "AI tools";
    writeClipboardText(categoryTestPlanText(button))
      .then(function () {
        setCopyTestPlanState(button, true);
        announce(category + " test plan copied to the clipboard.");
      })
      .catch(function () {
        setCopyTestPlanState(button, false);
        announce("Could not copy the test plan. Please try again.");
      });
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

  var backupInput = document.querySelector("[data-shortlist-import]");
  if (backupInput) {
    backupInput.addEventListener("change", function () {
      restoreShortlistBackup(backupInput.files && backupInput.files[0], backupInput);
    });
  }

  document.addEventListener("input", function (event) {
    var input = event.target.closest("[data-candidate-note-input]");
    if (!input) {
      return;
    }

    var control = input.closest("[data-candidate-note]");
    var path = control && control.getAttribute("data-candidate-note");
    if (!validPath(path) || readList().indexOf(path) === -1) {
      return;
    }

    var state = readCandidateNoteState();
    var note = cleanCandidateNote(input.value);
    if (input.value !== note) {
      input.value = note;
    }
    if (note.trim()) {
      state[path] = note;
    } else {
      delete state[path];
    }

    writeCandidateNoteState(state);
    updateCandidateNotes(new Set(readList()));
  });

  document.addEventListener("change", function (event) {
    var input = event.target.closest("[data-candidate-note-input]");
    var testDateInput = event.target.closest("[data-candidate-test-date-input]");
    if (!input && !testDateInput) {
      return;
    }

    if (testDateInput) {
      var testDateControl = testDateInput.closest("[data-candidate-test-date]");
      var testDatePath =
        testDateControl && testDateControl.getAttribute("data-candidate-test-date");
      if (!validPath(testDatePath) || readList().indexOf(testDatePath) === -1) {
        return;
      }

      var testDateState = readCandidateTestDateState();
      var testDate = cleanCandidateTestDate(testDateInput.value);
      if (testDateInput.value && !testDate) {
        testDateInput.value = testDateState[testDatePath] || "";
        announce("Choose today or an earlier valid date.");
        return;
      }
      if (testDate) {
        testDateState[testDatePath] = testDate;
      } else {
        delete testDateState[testDatePath];
      }
      writeCandidateTestDateState(testDateState);
      render();
      announce(
        testDateControl.getAttribute("data-candidate-test-date-title") +
          ": local test date " +
          (testDate ? "saved as " + testDate + "." : "cleared.")
      );
      return;
    }

    var control = input.closest("[data-candidate-note]");
    var title =
      (control && control.getAttribute("data-candidate-note-title")) || "Candidate";
    announce(title + ": private test note saved in this browser.");
  });

  document.addEventListener("click", function (event) {
    var homeSearchClear = event.target.closest("[data-home-search-resume-clear]");
    var copyTestPlan = event.target.closest("[data-copy-test-plan]");
    var exportBackup = event.target.closest("[data-shortlist-export]");
    var exportBrief = event.target.closest("[data-shortlist-export-brief]");
    var importBackup = event.target.closest("[data-shortlist-import-trigger]");
    var nextCheckButton = event.target.closest("[data-shortlist-next-check]");
    var candidateStageViewButton = event.target.closest("[data-shortlist-stage-view]");
    var candidateTestDateViewButton = event.target.closest(
      "[data-shortlist-test-date-view]"
    );
    var resetShortlistViews = event.target.closest("[data-shortlist-reset-views]");
    var candidateStageButton = event.target.closest("[data-candidate-stage-value]");
    var candidateStageReset = event.target.closest("[data-candidate-stage-reset]");
    var candidateTestDateToday = event.target.closest("[data-candidate-test-date-today]");
    var candidateTestDateClear = event.target.closest("[data-candidate-test-date-clear]");
    var toggle = event.target.closest("[data-shortlist-path]");
    var clear = event.target.closest("[data-shortlist-clear]");

    if (homeSearchClear) {
      clearLastToolSearch();
      updateHomeSearchResume();
      return;
    }

    if (copyTestPlan) {
      copyCategoryTestPlan(copyTestPlan);
      return;
    }

    if (exportBackup) {
      exportShortlistBackup();
      return;
    }

    if (exportBrief) {
      exportShortlistBrief();
      return;
    }

    if (importBackup && backupInput) {
      backupInput.click();
      return;
    }

    if (nextCheckButton) {
      var nextCheckPath = nextCheckButton.getAttribute(
        "data-shortlist-next-check-path"
      );
      var nextCheckValue = nextCheckButton.getAttribute(
        "data-shortlist-next-check-value"
      );
      if (
        !validPath(nextCheckPath) ||
        allowedChecks.indexOf(nextCheckValue) === -1
      ) {
        return;
      }

      writeCandidateStageView("testing");
      writeCandidateTestDateView("all");
      render();

      var nextCheckTitle =
        focusShortlistCandidateCheck(nextCheckPath, nextCheckValue) ||
        "Saved candidate";
      announce(
        nextCheckTitle +
          ": opened next unfinished check, " +
          candidateCheckLabel(nextCheckValue) +
          "."
      );
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

    if (candidateTestDateViewButton) {
      var candidateTestDateView = cleanCandidateTestDateView(
        candidateTestDateViewButton.getAttribute("data-shortlist-test-date-view")
      );

      writeCandidateTestDateView(candidateTestDateView);
      render();
      announce(
        "Shortlist local test-date view set to " +
          candidateTestDateViewLabel(candidateTestDateView) +
          "."
      );
      return;
    }

    if (resetShortlistViews) {
      writeCandidateStageView("all");
      writeCandidateTestDateView("all");
      render();
      announce("Showing all saved candidates.");
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

    if (candidateTestDateToday || candidateTestDateClear) {
      var candidateTestDateControl = (
        candidateTestDateToday || candidateTestDateClear
      ).closest("[data-candidate-test-date]");
      var candidateTestDatePath =
        candidateTestDateControl &&
        candidateTestDateControl.getAttribute("data-candidate-test-date");
      if (
        !validPath(candidateTestDatePath) ||
        readList().indexOf(candidateTestDatePath) === -1
      ) {
        return;
      }

      var candidateTestDateState = readCandidateTestDateState();
      var candidateTestDateValue = candidateTestDateToday ? localIsoDate() : "";
      if (candidateTestDateValue) {
        candidateTestDateState[candidateTestDatePath] = candidateTestDateValue;
      } else {
        delete candidateTestDateState[candidateTestDatePath];
      }

      writeCandidateTestDateState(candidateTestDateState);
      render();
      announce(
        candidateTestDateControl.getAttribute("data-candidate-test-date-title") +
          ": local test date " +
          (candidateTestDateValue
            ? "saved as " + candidateTestDateValue + "."
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
        writeCandidateTestDateView("all");
      }
      render();
      notifyChange(list);
      return;
    }

    if (clear) {
      writeList([]);
      cleanupEvaluationState([]);
      writeCandidateStageView("all");
      writeCandidateTestDateView("all");
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
      event.key === candidateNoteStorageKey ||
      event.key === candidateTestDateStorageKey ||
      event.key === candidateTestDateViewStorageKey ||
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
  applyCandidateTestDateViewFromUrl();
  render();
  applyCandidateCheckFromUrl(new Set(readList()));
})();
