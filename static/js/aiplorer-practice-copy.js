(function () {
  "use strict";

  if (!window.isSecureContext || !navigator.clipboard ||
      typeof navigator.clipboard.writeText !== "function") return;

  document.querySelectorAll("[data-practice-preview]").forEach(function (preview) {
    var input = preview.querySelector("pre code");
    var controls = preview.querySelector("[data-practice-copy-controls]");
    var button = preview.querySelector("[data-practice-copy]");
    var status = preview.querySelector("[data-practice-copy-status]");
    if (!input || !input.textContent || !controls || !button || !status) return;

    button.addEventListener("click", async function () {
      if (button.disabled) return;
      button.disabled = true;
      status.textContent = "Copying...";
      try {
        await navigator.clipboard.writeText(input.textContent);
        status.textContent = "Test input copied.";
      } catch (error) {
        status.textContent = "Could not copy. Select the preview text or download the input file.";
      } finally {
        button.disabled = false;
      }
    });
    controls.hidden = false;
  });
}());
