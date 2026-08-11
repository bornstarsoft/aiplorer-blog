(function () {
  "use strict";

  var pulse = document.querySelector("[data-home-reset-pulse]");
  if (!pulse) {
    return;
  }

  var elapsedNodes = Array.prototype.slice.call(
    document.querySelectorAll("[data-home-reset-elapsed]")
  );
  var localTimeNodes = Array.prototype.slice.call(
    document.querySelectorAll("[data-home-reset-local]")
  );
  var latest = new Date(pulse.getAttribute("data-latest-reset"));

  if (!elapsedNodes.length || Number.isNaN(latest.getTime())) {
    return;
  }

  function render() {
    var duration = Math.max(0, Date.now() - latest.getTime());
    var totalMinutes = Math.floor(duration / 60000);
    var days = Math.floor(totalMinutes / 1440);
    var hours = Math.floor((totalMinutes % 1440) / 60);
    var minutes = totalMinutes % 60;

    var elapsedText = days > 0
      ? days + "d " + hours + "h"
      : hours > 0
        ? hours + "h " + minutes + "m"
        : minutes + "m";
    var localTimeText = latest.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short"
    });
    elapsedNodes.forEach(function (node) {
      node.textContent = elapsedText;
    });
    localTimeNodes.forEach(function (node) {
      node.textContent = localTimeText;
    });
  }

  render();
  window.setInterval(render, 30000);
})();
