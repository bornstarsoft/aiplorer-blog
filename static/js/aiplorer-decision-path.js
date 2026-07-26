(function () {
  "use strict";

  var workflowButtons = Array.prototype.slice.call(document.querySelectorAll("[data-decision-workflow]"));
  var priorityButtons = Array.prototype.slice.call(document.querySelectorAll("[data-decision-priority]"));
  var resultPanels = Array.prototype.slice.call(document.querySelectorAll("[data-decision-result]"));
  var results = document.querySelector("[data-decision-results]");
  var status = document.querySelector("[data-decision-status]");
  var reset = document.querySelector("[data-decision-reset]");
  var resultTitle = document.querySelector("[data-decision-result-title]");
  var resultDescription = document.querySelector("[data-decision-result-description]");
  var workflowCheckpoint = document.querySelector("[data-decision-workflow-checkpoint]");
  var priorityHeading = document.querySelector("[data-decision-priority-heading]");
  var priorityCopy = document.querySelector("[data-decision-priority-copy]");
  var selectedWorkflow = "";
  var selectedPriority = "";

  if (!workflowButtons.length || !priorityButtons.length || !results) {
    return;
  }

  function findButton(buttons, attribute, value) {
    return buttons.find(function (button) {
      return button.getAttribute(attribute) === value;
    });
  }

  function updateUrl() {
    var url = new URL(window.location.href);

    if (selectedWorkflow) {
      url.searchParams.set("workflow", selectedWorkflow);
    } else {
      url.searchParams.delete("workflow");
    }

    if (selectedPriority) {
      url.searchParams.set("priority", selectedPriority);
    } else {
      url.searchParams.delete("priority");
    }

    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  }

  function updateButtons() {
    workflowButtons.forEach(function (button) {
      var active = button.getAttribute("data-decision-workflow") === selectedWorkflow;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    priorityButtons.forEach(function (button) {
      var active = button.getAttribute("data-decision-priority") === selectedPriority;
      button.disabled = !selectedWorkflow;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function render() {
    var workflowButton = findButton(workflowButtons, "data-decision-workflow", selectedWorkflow);
    var priorityButton = findButton(priorityButtons, "data-decision-priority", selectedPriority);
    var selectedPanel = resultPanels.find(function (panel) {
      return panel.getAttribute("data-decision-result") === selectedWorkflow;
    });
    var complete = Boolean(workflowButton && priorityButton && selectedPanel);

    updateButtons();

    resultPanels.forEach(function (panel) {
      panel.hidden = panel !== selectedPanel || !complete;
    });
    results.hidden = !complete;
    reset.disabled = !selectedWorkflow && !selectedPriority;

    if (!workflowButton) {
      status.textContent = "Choose a workflow to continue.";
      return;
    }

    if (!priorityButton) {
      status.textContent =
        workflowButton.getAttribute("data-decision-workflow-title") +
        " selected. Now choose the review priority that matters most.";
      return;
    }

    var workflowTitle = selectedPanel.getAttribute("data-result-title");
    var priorityTitle = priorityButton.getAttribute("data-decision-priority-title");

    resultTitle.textContent = workflowTitle + " with " + priorityTitle.toLowerCase();
    resultDescription.textContent = selectedPanel.getAttribute("data-result-description");
    workflowCheckpoint.textContent = selectedPanel.getAttribute("data-result-checkpoint");
    priorityHeading.textContent = priorityTitle;
    priorityCopy.textContent = priorityButton.getAttribute("data-decision-priority-checkpoint");
    status.textContent =
      "Starting path ready for " + workflowTitle + ". Review the candidate set and checkpoints below.";
  }

  workflowButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedWorkflow = button.getAttribute("data-decision-workflow");
      render();
      updateUrl();
    });
  });

  priorityButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedPriority = button.getAttribute("data-decision-priority");
      render();
      updateUrl();
    });
  });

  reset.addEventListener("click", function () {
    selectedWorkflow = "";
    selectedPriority = "";
    render();
    updateUrl();
    workflowButtons[0].focus();
  });

  var initialUrl = new URL(window.location.href);
  var requestedWorkflow = initialUrl.searchParams.get("workflow") || "";
  var requestedPriority = initialUrl.searchParams.get("priority") || "";

  if (findButton(workflowButtons, "data-decision-workflow", requestedWorkflow)) {
    selectedWorkflow = requestedWorkflow;
  }
  if (selectedWorkflow && findButton(priorityButtons, "data-decision-priority", requestedPriority)) {
    selectedPriority = requestedPriority;
  }

  render();
})();
