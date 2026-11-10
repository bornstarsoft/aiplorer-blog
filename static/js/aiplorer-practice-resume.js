(function () {
  "use strict";

  const shelf = document.querySelector("[data-practice-shelf]");
  if (!shelf) return;
  const resume = shelf.querySelector("[data-practice-resume]");
  const link = shelf.querySelector("[data-practice-resume-link]");
  const title = shelf.querySelector("[data-practice-resume-title]");
  if (!resume || !link || !title) return;

  const key = "aiplorer-practice-resume-v1";
  const packs = new Map();
  shelf.querySelectorAll("[data-practice-pack]").forEach(pack => {
    const heading = pack.querySelector("[data-practice-heading]");
    const controls = pack.querySelector("[data-practice-save-controls]");
    const button = pack.querySelector("[data-practice-save]");
    const status = pack.querySelector("[data-practice-save-status]");
    if (!heading || !/^practice-[a-z0-9-]+$/.test(heading.id) || !controls || !button || !status) return;
    packs.set(heading.id, { heading, controls, button, status });
  });

  function render(id) {
    const selected = packs.get(id);
    resume.hidden = !selected;
    if (selected) link.setAttribute("href", "#" + selected.heading.id);
    else link.removeAttribute("href");
    title.textContent = selected ? selected.heading.textContent.trim() : "";
    for (const [packId, pack] of packs) {
      pack.button.setAttribute("aria-pressed", String(id === packId));
      pack.status.textContent = "";
    }
  }

  function refresh() {
    try { render(localStorage.getItem(key)); }
    catch { render(null); }
  }

  try { render(localStorage.getItem(key)); }
  catch { return; }

  for (const [id, pack] of packs) {
    pack.controls.hidden = false;
    pack.button.addEventListener("click", () => {
      try {
        const next = localStorage.getItem(key) === id ? null : id;
        if (next === null) localStorage.removeItem(key);
        else localStorage.setItem(key, next);
        const saved = localStorage.getItem(key);
        render(saved);
        if (saved !== next) throw new Error("Saved pack did not persist");
        pack.status.textContent = next === null ? "Saved pack removed." : "Saved for this browser.";
      } catch {
        refresh();
        pack.status.textContent = "Could not update the saved pack.";
      }
    });
  }
  window.addEventListener("pageshow", refresh);
  window.addEventListener("storage", event => {
    if (event.key === key || event.key === null) refresh();
  });
})();
