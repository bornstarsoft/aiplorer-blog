(function () {
  "use strict";

  var storageKey = "aiplorer-trial-checks-v1";
  var allowedChecks = ["task", "output", "privacy", "plans"];
  var memoryState = {};

  function validPath(value) {
    return typeof value === "string" && value.indexOf("/ai-tools/tools/") === 0;
  }

  function cleanChecks(values) {
    if (!Array.isArray(values)) {
      return [];
    }
    return values.filter(function (value, index, list) {
      return allowedChecks.indexOf(value) !== -1 && list.indexOf(value) === index;
    });
  }

  function cleanState(value) {
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

  function readState() {
    try {
      memoryState = cleanState(JSON.parse(window.localStorage.getItem(storageKey) || "{}"));
    } catch (error) {
      memoryState = cleanState(memoryState);
    }
    return Object.assign({}, memoryState);
  }

  function writeState(value) {
    memoryState = cleanState(value);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(memoryState));
    } catch (error) {
      // Keep the current-session fallback when browser storage is unavailable.
    }
  }

  function announce(message) {
    var status = document.querySelector("[data-shortlist-status]");
    if (status) {
      status.textContent = message;
    }
  }

  function notifyChange() {
    window.dispatchEvent(new CustomEvent("aiplorer:trial-checks-change"));
  }

  function resetSnapshot(path) {
    var saved = JSON.parse(window.localStorage.getItem("aiplorer-shortlist-v1") || "[]");
    var state = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
    if (!Array.isArray(saved) || !state || typeof state !== "object" || Array.isArray(state)) {
      throw new Error("invalid-checklist-storage");
    }
    return saved.indexOf(path) !== -1 ? state : null;
  }

  function resetStatus(checklist, message) {
    var status = checklist.querySelector("[data-trial-status]");
    if (status) status.textContent = message;
    announce(checklist.getAttribute("data-trial-title") + ": " + message);
  }

  function renderChecklist(checklist, state) {
    var path = checklist.getAttribute("data-trial-checklist");
    var checked = new Set(cleanChecks(state[path]));
    var complete = checklist.querySelector("[data-trial-complete]");
    var reset = checklist.querySelector("[data-trial-reset]");
    var item = checklist.closest("[data-shortlist-item]");
    var summaryChecks = item && item.querySelector("[data-shortlist-evaluation-checks]");

    checklist.querySelectorAll("[data-trial-check]").forEach(function (input) {
      input.checked = checked.has(input.value);
    });

    if (complete) {
      complete.textContent = checked.size + " of " + allowedChecks.length;
    }
    if (summaryChecks) {
      summaryChecks.textContent = checked.size + " of " + allowedChecks.length + " checks";
    }
    if (reset) {
      reset.disabled = checked.size === 0;
    }
  }

  function render() {
    var state = readState();
    document.querySelectorAll("[data-trial-checklist]").forEach(function (checklist) {
      renderChecklist(checklist, state);
    });
  }

  document.addEventListener("change", function (event) {
    var input = event.target.closest("[data-trial-check]");
    if (!input) {
      return;
    }

    var checklist = input.closest("[data-trial-checklist]");
    var path = checklist && checklist.getAttribute("data-trial-checklist");
    if (!validPath(path) || allowedChecks.indexOf(input.value) === -1) {
      return;
    }

    try {
      var state = resetSnapshot(path);
      if (!state) {
        render();
        resetStatus(checklist, "This tool is no longer saved. Save it again before recording checks.");
        return;
      }

      // Merge only this action; another tab may have changed the other checks.
      var checked = cleanChecks(state[path]).filter(function (value) {
        return value !== input.value;
      });
      if (input.checked) checked.push(input.value);
      if (checked.length > 0) state[path] = checked;
      else delete state[path];

      var serialized = JSON.stringify(state);
      window.localStorage.setItem(storageKey, serialized);
      if (window.localStorage.getItem(storageKey) !== serialized) {
        throw new Error("check-write-unverified");
      }
      memoryState = cleanState(state);
      renderChecklist(checklist, memoryState);
      notifyChange();
      resetStatus(checklist, "Saved in this browser. " + checked.length + " of " + allowedChecks.length + " checks recorded.");
    } catch (error) {
      render();
      resetStatus(checklist, "Could not verify this check was saved. Check the displayed boxes and try again before leaving.");
    }
  });

  document.addEventListener("click", function (event) {
    var reset = event.target.closest("[data-trial-reset]");
    if (!reset) {
      return;
    }

    var checklist = reset.closest("[data-trial-checklist]");
    var path = checklist && checklist.getAttribute("data-trial-checklist");
    if (!validPath(path)) {
      return;
    }

    try {
      var state = resetSnapshot(path);
      if (!state || cleanChecks(state[path]).length === 0) {
        render();
        resetStatus(checklist, "No saved checks to reset.");
        return;
      }
      if (!window.confirm(
        "Reset candidate checks for " + checklist.getAttribute("data-trial-title") +
        "?\n\nOnly this tool's checked boxes will be cleared. Your note, last test date, " +
        "decision stage and other saved tools will stay unchanged. This does not create a history backup."
      )) {
        resetStatus(checklist, "Reset cancelled. Checks kept.");
        return;
      }

      // Another tab may have changed saved candidates while confirmation was open.
      state = resetSnapshot(path);
      if (!state || cleanChecks(state[path]).length === 0) {
        render();
        resetStatus(checklist, "No saved checks to reset.");
        return;
      }
      delete state[path];
      var serialized = JSON.stringify(state);
      window.localStorage.setItem(storageKey, serialized);
      if (window.localStorage.getItem(storageKey) !== serialized) {
        throw new Error("reset-write-unverified");
      }
      memoryState = cleanState(state);
      render();
      notifyChange();
      resetStatus(checklist, "Checks reset. Your note, test date and decision stage were kept.");
      var firstCheck = checklist.querySelector("[data-trial-check]");
      if (firstCheck) firstCheck.focus();
    } catch (error) {
      render();
      resetStatus(checklist, "Could not verify the reset in browser storage. Check the displayed boxes before leaving; do not assume the reset was saved.");
    }
  });

  window.addEventListener("storage", function (event) {
    if (event.key === null || event.key === storageKey) {
      render();
    }
  });

  window.addEventListener("pageshow", render);

  window.addEventListener("aiplorer:shortlist-change", function (event) {
    var saved = new Set((event.detail && event.detail.paths) || []);
    var state = readState();
    var changed = false;

    Object.keys(state).forEach(function (path) {
      if (!saved.has(path)) {
        delete state[path];
        changed = true;
      }
    });

    if (changed) {
      writeState(state);
      render();
    }
  });

  render();
})();
