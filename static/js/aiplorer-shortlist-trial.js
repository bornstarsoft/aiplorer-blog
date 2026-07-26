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

  function renderChecklist(checklist, state) {
    var path = checklist.getAttribute("data-trial-checklist");
    var checked = new Set(cleanChecks(state[path]));
    var complete = checklist.querySelector("[data-trial-complete]");
    var reset = checklist.querySelector("[data-trial-reset]");

    checklist.querySelectorAll("[data-trial-check]").forEach(function (input) {
      input.checked = checked.has(input.value);
    });

    if (complete) {
      complete.textContent = checked.size + " of " + allowedChecks.length;
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
    if (!validPath(path)) {
      return;
    }

    var state = readState();
    var checked = Array.from(checklist.querySelectorAll("[data-trial-check]:checked")).map(
      function (item) {
        return item.value;
      }
    );

    if (checked.length > 0) {
      state[path] = checked;
    } else {
      delete state[path];
    }

    writeState(state);
    renderChecklist(checklist, state);
    notifyChange();
    announce(
      checklist.getAttribute("data-trial-title") +
        ": " +
        checked.length +
        " of " +
        allowedChecks.length +
        " candidate checks complete."
    );
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

    var state = readState();
    delete state[path];
    writeState(state);
    renderChecklist(checklist, state);
    notifyChange();
    announce(checklist.getAttribute("data-trial-title") + ": candidate checks reset.");
  });

  window.addEventListener("storage", function (event) {
    if (event.key === storageKey) {
      render();
    }
  });

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
