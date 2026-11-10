(function () {
  "use strict";

  const shelf = document.querySelector("[data-practice-shelf]");
  if (!shelf) return;
  const resume = shelf.querySelector("[data-practice-resume]");
  const link = shelf.querySelector("[data-practice-resume-link]");
  const title = shelf.querySelector("[data-practice-resume-title]");
  const nextStep = shelf.querySelector("[data-practice-next-step]");
  const nextStatus = shelf.querySelector("[data-practice-next-status]");
  const stepDownload = shelf.querySelector("[data-practice-step-download]");
  if (!resume || !link || !title || !nextStep || !nextStatus) return;

  const key = "aiplorer-practice-resume-v1";
  const packs = new Map();
  shelf.querySelectorAll("[data-practice-pack]").forEach(pack => {
    const heading = pack.querySelector("[data-practice-heading]");
    const controls = pack.querySelector("[data-practice-save-controls]");
    const button = pack.querySelector("[data-practice-save]");
    const status = pack.querySelector("[data-practice-save-status]");
    if (!heading || !/^practice-[a-z0-9-]+$/.test(heading.id) || !controls || !button || !status) return;
    packs.set(heading.id, { heading, controls, button, status, downloads: pack.querySelectorAll("[data-practice-download]") });
  });

  // The shelf lists the input, review material and worksheet in that order.
  const downloadIndex = new Map([["input", 0], ["review", 1], ["compare", 2]]);
  const steps = new Set(["", ...downloadIndex.keys()]);
  const empty = { id: null, step: "" };
  let shownId = null;

  function read() {
    const value = localStorage.getItem(key);
    // Older saves contain only the public anchor. Leave them intact until a click.
    if (packs.has(value)) return { id: value, step: "" };
    if (value === null) return empty;
    try {
      const saved = JSON.parse(value);
      if (packs.has(saved?.id)) return { id: saved.id, step: steps.has(saved.step) ? saved.step : "" };
    } catch {
      // Invalid or removed entries do not become links.
    }
    return empty;
  }

  function write(id, step = "") {
    const value = step ? JSON.stringify({ id, step }) : id;
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
    if (localStorage.getItem(key) !== value) throw new Error("Practice selection did not persist");
  }

  function render({ id, step }) {
    const selected = packs.get(id);
    shownId = id;
    resume.hidden = !selected;
    if (selected) link.setAttribute("href", "#" + selected.heading.id);
    else link.removeAttribute("href");
    title.textContent = selected ? selected.heading.textContent.trim() : "";
    nextStep.value = step;
    nextStatus.textContent = "";
    if (stepDownload) {
      const resource = selected?.downloads.length === downloadIndex.size
        ? selected.downloads[downloadIndex.get(step)]
        : null;
      const href = resource?.getAttribute("href");
      const folder = "/use-cases/" + id?.slice("practice-".length) + "/";
      const file = href?.startsWith(folder) ? href.slice(folder.length) : "";
      const valid = /^[a-z0-9][a-z0-9.-]*\.(txt|mjs)$/.test(file) && resource.getAttribute("download") === file;
      stepDownload.hidden = !valid;
      if (valid) {
        stepDownload.setAttribute("href", href);
        stepDownload.setAttribute("download", file);
        stepDownload.textContent = "Download: " + resource.textContent.trim();
      } else {
        stepDownload.removeAttribute("href");
        stepDownload.removeAttribute("download");
        stepDownload.textContent = "";
      }
    }
    for (const [packId, pack] of packs) {
      pack.button.setAttribute("aria-pressed", String(id === packId));
      pack.status.textContent = "";
    }
  }

  function refresh() {
    try { render(read()); }
    catch { render(empty); }
  }

  try { render(read()); }
  catch { return; }

  for (const [id, pack] of packs) {
    pack.controls.hidden = false;
    pack.button.addEventListener("click", () => {
      try {
        const next = read().id === id ? null : id;
        write(next);
        render({ id: next, step: "" });
        pack.status.textContent = next === null ? "Saved pack removed." : "Saved for this browser.";
      } catch {
        refresh();
        pack.status.textContent = "Could not update the saved pack.";
      }
    });
  }
  nextStep.addEventListener("change", () => {
    const step = nextStep.value;
    try {
      const current = read();
      if (!current.id || current.id !== shownId || !steps.has(step)) {
        render(current);
        return;
      }
      write(current.id, step);
      render({ id: current.id, step });
      nextStatus.textContent = step ? "Next step saved." : "Next step cleared.";
    } catch {
      refresh();
      nextStatus.textContent = "Could not update the next step.";
    }
  });
  window.addEventListener("pageshow", refresh);
  window.addEventListener("storage", event => {
    if (event.key === key || event.key === null) refresh();
  });
})();
