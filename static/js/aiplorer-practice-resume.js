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
  const practicedCount = shelf.querySelector("[data-practice-count]");
  const filterControls = shelf.querySelector("[data-practice-filter-controls]");
  const filter = shelf.querySelector("[data-practice-filter]");
  const filterEmpty = shelf.querySelector("[data-practice-empty]");
  const taskNav = shelf.querySelector("[data-practice-tasks]");
  const chooser = shelf.querySelector("[data-practice-chooser]");
  const choice = shelf.querySelector("[data-practice-choice]");
  const choiceLabel = shelf.querySelector("[data-practice-choice-label]");
  const choiceDetails = shelf.querySelector("[data-practice-choice-details]");
  const choiceDescription = shelf.querySelector("[data-practice-choice-description]");
  const choiceLink = shelf.querySelector("[data-practice-choice-link]");
  const choiceEmpty = shelf.querySelector("[data-practice-choice-empty]");
  const choiceGroups = choice ? [...choice.querySelectorAll("optgroup")] : [];
  const plan = shelf.querySelector("[data-practice-plan]");
  const planTitle = shelf.querySelector("[data-practice-plan-title]");
  const planStart = shelf.querySelector("[data-practice-plan-start]");
  const planDone = shelf.querySelector("[data-practice-plan-done]");
  const planClear = shelf.querySelector("[data-practice-plan-clear]");
  const planSave = shelf.querySelector("[data-practice-plan-save]");
  const planStatus = shelf.querySelector("[data-practice-plan-status]");
  const planReady = choice && plan && planTitle && planStart && planDone && planClear && planSave && planStatus;
  if (!resume || !link || !title || !nextStep || !nextStatus) return;

  const key = "aiplorer-practice-resume-v1";
  const practicedKey = "aiplorer-practiced-packs-v1";
  const planKey = "aiplorer-practice-next-pack-v1";
  const taskLinks = new Map([...shelf.querySelectorAll("[data-practice-task]")]
    .map(link => [link.getAttribute("href"), link]));
  const packs = new Map();
  shelf.querySelectorAll("[data-practice-pack]").forEach(pack => {
    const heading = pack.querySelector("[data-practice-heading]");
    const controls = pack.querySelector("[data-practice-save-controls]");
    const button = pack.querySelector("[data-practice-save]");
    const status = pack.querySelector("[data-practice-save-status]");
    if (!heading || !/^practice-[a-z0-9-]+$/.test(heading.id) || !controls || !button || !status) return;
    packs.set(heading.id, {
      element: pack, heading, controls, button, status,
      task: taskLinks.get("#" + heading.id),
      description: pack.querySelector("[data-practice-description]"),
      downloads: pack.querySelectorAll("[data-practice-download]"),
      mark: pack.querySelector("[data-practice-mark]"),
      practiced: pack.querySelector("[data-practice-practiced]"),
      finish: pack.querySelector("[data-practice-finish]"),
      restart: pack.querySelector("[data-practice-restart]"),
    });
  });

  // The shelf lists the input, review material and worksheet in that order.
  const downloadIndex = new Map([["input", 0], ["review", 1], ["compare", 2]]);
  const steps = new Set(["", ...downloadIndex.keys()]);
  const empty = { id: null, step: "" };
  let shownId = null;
  let plannedId = null;
  let startedId = null;
  let reviewingId = null;
  let reviewChoices = false;

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

  function readPracticed() {
    const raw = localStorage.getItem(practicedKey);
    if (raw === null) return new Set();
    try {
      const ids = JSON.parse(raw);
      return new Set(Array.isArray(ids) ? ids.filter(id => packs.has(id)) : []);
    } catch {
      return new Set();
    }
  }

  function setPracticed(id, checked) {
    const ids = readPracticed();
    if (ids.has(id) === checked) return;
    if (checked) ids.add(id);
    else ids.delete(id);
    const value = ids.size ? JSON.stringify([...ids]) : null;
    if (value === null) localStorage.removeItem(practicedKey);
    else localStorage.setItem(practicedKey, value);
    if (localStorage.getItem(practicedKey) !== value) throw new Error("Practice mark did not persist");
  }

  function refreshPracticed() {
    if (!practicedCount) return;
    let ids;
    try { ids = readPracticed(); } catch { /* Storage is unavailable. */ }
    practicedCount.hidden = !ids?.size;
    practicedCount.textContent = ids?.size ? `${ids.size} of ${packs.size} practiced in this browser` : "";
    for (const [id, pack] of packs) {
      const practiced = ids?.has(id) ?? false;
      if (pack.restart) pack.restart.hidden = !practiced;
      if (!pack.practiced || !pack.mark) continue;
      pack.mark.hidden = !ids;
      pack.practiced.checked = practiced;
    }
    renderFilter(ids);
    renderChooser(ids);
    renderPlan(ids);
  }

  function renderPlan(ids) {
    if (!planReady) return;
    planStatus.textContent = "";
    let saved;
    try { if (ids) saved = localStorage.getItem(planKey); } catch { /* Storage is unavailable. */ }
    const pack = packs.get(saved);
    const practiced = Boolean(pack && ids?.has(saved));
    plannedId = pack ? saved : null;
    plan.hidden = !pack;
    planTitle.textContent = pack?.heading.textContent.trim() ?? "";
    planStart.hidden = !pack || practiced;
    planDone.hidden = !practiced;
    if (pack && !practiced) planStart.setAttribute("href", "#" + saved);
    else planStart.removeAttribute("href");
    planSave.hidden = saved === undefined || !packs.has(choice.value) || ids.has(choice.value);
    if (ids && !ids.has(reviewingId)) reviewingId = null;
    for (const [id, entry] of packs) {
      if (!entry.finish) continue;
      const active = Boolean(ids) && (id === plannedId || id === startedId || id === reviewingId);
      entry.finish.hidden = !active;
      if (!active) continue;
      if (id === reviewingId) entry.finish.textContent = "Finish review and choose next";
      else entry.finish.textContent = ids.has(id) ? "Choose next practice" : "Finish and choose next";
    }
  }

  function finishPractice(id, pack) {
    const review = id === reviewingId;
    try {
      if (review && !readPracticed().has(id)) {
        refreshPracticed();
        pack.status.textContent = "The practice mark changed.";
        return;
      }
      if (!review && id !== startedId && localStorage.getItem(planKey) !== id) {
        refreshPracticed();
        pack.status.textContent = "The saved next practice changed.";
        return;
      }
      if (review) reviewingId = null;
      else setPracticed(id, true);
      pack.status.textContent = "";
      choice.value = "";
      refreshPracticed();
      (choice.disabled ? choiceEmpty : choice).focus();
      planStatus.textContent = review ? "Review finished." : "Marked as practiced.";
    } catch {
      refreshPracticed();
      pack.status.textContent = review ? "Could not finish this review." : "Could not mark this practice as finished.";
    }
  }

  function updatePlan(id) {
    try {
      const saved = localStorage.getItem(planKey);
      // Do not clear a different pack saved in another tab.
      if (id === null ? saved !== plannedId : !packs.has(id) || readPracticed().has(id)) {
        refreshPracticed();
        planStatus.textContent = "Next practice changed. Choose again.";
        return;
      }
      if (id === null) localStorage.removeItem(planKey);
      else if (saved !== id) localStorage.setItem(planKey, id);
      if (localStorage.getItem(planKey) !== id) throw new Error("Next practice did not persist");
      refreshPracticed();
      if (id === null) (choice.disabled ? filter : choice)?.focus();
      planStatus.textContent = id === null ? "Next practice cleared." : "Saved for next visit.";
    } catch {
      refreshPracticed();
      planStatus.textContent = "Could not save the next practice.";
    }
  }

  function renderChooser(ids) {
    if (!chooser || !choice || !choiceDetails || !choiceDescription || !choiceLink || !choiceEmpty) return;
    chooser.hidden = !ids;
    if (!ids) return;
    const allPracticed = packs.size > 0 && ids.size === packs.size;
    if (allPracticed !== reviewChoices) choice.value = "";
    reviewChoices = allPracticed;
    if (choiceLabel) choiceLabel.textContent = reviewChoices ? "Choose a practice to review" : "Choose next practice";
    choiceLink.textContent = reviewChoices ? "Start review" : "Start selected practice";
    let available = 0;
    for (const group of choiceGroups) {
      let groupAvailable = 0;
      for (const option of group.querySelectorAll("option")) {
        const show = packs.has(option.value) && ids.has(option.value) === reviewChoices;
        option.hidden = option.disabled = !show;
        if (show) groupAvailable++;
      }
      group.hidden = group.disabled = groupAvailable === 0;
      available += groupAvailable;
    }
    choice.disabled = available === 0;
    choiceEmpty.hidden = !reviewChoices;
    const pack = packs.get(choice.value);
    if (pack && ids.has(choice.value) === reviewChoices) {
      choiceDescription.textContent = pack.description?.textContent.trim() ?? "";
      choiceLink.setAttribute("href", "#" + pack.heading.id);
      choiceDetails.hidden = false;
    } else {
      choice.value = "";
      if (document.activeElement === choiceLink && available) choice.focus();
      choiceDescription.textContent = "";
      choiceLink.removeAttribute("href");
      choiceDetails.hidden = true;
    }
  }

  function renderFilter(ids) {
    if (!filterControls || !filter || !filterEmpty || !taskNav) return;
    const mode = filter.value;
    const filtered = Boolean(ids) && (mode === "practiced" || mode === "unpracticed");
    filterControls.hidden = !ids;
    let visible = 0;
    for (const [id, pack] of packs) {
      const hidden = Boolean(filtered && ids.has(id) !== (mode === "practiced"));
      if (hidden && (pack.element.contains(document.activeElement) || pack.task === document.activeElement)) {
        filter.focus();
      }
      pack.element.hidden = hidden;
      if (pack.task) pack.task.hidden = hidden;
      if (!hidden) visible++;
    }
    const empty = filtered && visible === 0;
    taskNav.hidden = empty;
    filterEmpty.hidden = !empty;
    filterEmpty.textContent = empty
      ? (mode === "practiced" ? "No practiced packs yet." : "All packs have been practiced.")
      : "";
  }

  function revealPack(hash) {
    const pack = hash && packs.get(hash.slice(1));
    if (!filter || !pack?.element.hidden) return null;
    filter.value = "all";
    refreshPracticed();
    return pack.heading;
  }

  function openPracticeInput(hash, focusPreview = false) {
    const pack = hash?.startsWith("#") && packs.get(hash.slice(1));
    if (!pack) return;
    revealPack(hash);
    const preview = pack.element.querySelector("[data-practice-preview]");
    if (preview) {
      preview.open = true;
      if (focusPreview) preview.querySelector("summary")?.focus();
    }
    return pack.heading.id;
  }

  function beginReview(id) {
    reviewingId = id;
    if (startedId === id) startedId = null;
    refreshPracticed();
  }

  try { render(read()); }
  catch { return; }
  refreshPracticed();
  if (choice && choiceLink) {
    choice.addEventListener("change", refreshPracticed);
    choiceLink.addEventListener("click", () => {
      const review = reviewChoices;
      const id = openPracticeInput(choiceLink.getAttribute("href"));
      if (!id) return;
      if (review) beginReview(id);
      else {
        startedId = id;
        refreshPracticed();
      }
    });
  }
  if (planReady) {
    planSave.addEventListener("click", () => updatePlan(choice.value));
    planClear.addEventListener("click", () => updatePlan(null));
    planStart.addEventListener("click", () => openPracticeInput(planStart.getAttribute("href")));
  }
  if (filterControls && filter && filterEmpty && taskNav) {
    filter.addEventListener("change", refreshPracticed);
    link.addEventListener("click", () => revealPack(link.getAttribute("href")));
    window.addEventListener("hashchange", () => {
      const heading = revealPack(window.location.hash);
      if (heading) {
        heading.focus({ preventScroll: true });
        heading.scrollIntoView();
      }
    });
  }

  for (const [id, pack] of packs) {
    pack.controls.hidden = false;
    pack.restart?.addEventListener("click", () => {
      if (pack.restart.hidden || !openPracticeInput("#" + id, true)) return;
      beginReview(id);
    });
    if (planReady && choiceEmpty && pack.finish) {
      pack.finish.addEventListener("click", () => finishPractice(id, pack));
    }
    if (practicedCount && pack.practiced && pack.mark) {
      pack.practiced.addEventListener("change", () => {
        try {
          setPracticed(id, pack.practiced.checked);
          pack.status.textContent = "";
        } catch {
          pack.status.textContent = "Could not update the practice mark.";
        }
        refreshPracticed();
      });
    }
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
  window.addEventListener("pageshow", () => {
    refresh();
    refreshPracticed();
  });
  window.addEventListener("storage", event => {
    if (event.key === key || event.key === null) refresh();
    if (event.key === practicedKey || event.key === planKey || event.key === null) refreshPracticed();
  });
})();
