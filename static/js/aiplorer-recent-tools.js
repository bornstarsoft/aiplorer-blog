(function () {
  "use strict";

  var storageKey = "aiplorer-recent-tools-v1";
  var maximumItems = 6;
  var memoryList = [];

  function validPath(value) {
    return typeof value === "string" && value.indexOf("/ai-tools/tools/") === 0;
  }

  function validItem(item) {
    return (
      item &&
      validPath(item.path) &&
      typeof item.title === "string" &&
      typeof item.category === "string"
    );
  }

  function normalize(values) {
    var seen = new Set();
    return values
      .filter(validItem)
      .filter(function (item) {
        if (seen.has(item.path)) {
          return false;
        }
        seen.add(item.path);
        return true;
      })
      .slice(0, maximumItems);
  }

  function readList() {
    try {
      var stored = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(stored)) {
        memoryList = normalize(stored);
      }
    } catch (error) {
      memoryList = normalize(memoryList);
    }
    return memoryList.slice();
  }

  function writeList(values) {
    memoryList = normalize(values);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(memoryList));
    } catch (error) {
      // Keep the current-session fallback when browser storage is unavailable.
    }
  }

  function currentTool() {
    var source = document.querySelector("[data-recent-tool]");
    if (!source) {
      return null;
    }
    return {
      path: source.getAttribute("data-recent-path") || "",
      title: source.getAttribute("data-recent-title") || "",
      category: source.getAttribute("data-recent-category") || "",
      description: source.getAttribute("data-recent-description") || "",
      reviewed: source.getAttribute("data-recent-reviewed") || "",
      fit: source.getAttribute("data-recent-fit") || ""
    };
  }

  function recordCurrentTool() {
    var tool = currentTool();
    if (!validItem(tool)) {
      return;
    }
    var list = readList().filter(function (item) {
      return item.path !== tool.path;
    });
    list.unshift(tool);
    writeList(list);
  }

  function createCard(item) {
    var link = document.createElement("a");
    var category = document.createElement("span");
    var title = document.createElement("strong");
    var description = document.createElement("small");
    var fit = document.createElement("span");
    var fitLabel = document.createElement("span");
    var fitText = document.createElement("strong");
    var meta = document.createElement("span");
    var arrow = document.createElement("span");

    link.className = "aiplorer-recent-card";
    link.href = item.path;
    category.className = "aiplorer-recent-card__category";
    category.textContent = item.category;
    title.textContent = item.title;
    description.textContent = item.description;
    fit.className = "aiplorer-recent-card__fit";
    fitLabel.textContent = "May fit";
    fitText.textContent = item.fit || "";
    meta.className = "aiplorer-recent-card__meta";
    meta.textContent = item.reviewed ? "Checked " + item.reviewed : "Open full review";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "\u2192";
    meta.appendChild(arrow);

    link.appendChild(category);
    link.appendChild(title);
    link.appendChild(description);
    if (item.fit) {
      fit.appendChild(fitLabel);
      fit.appendChild(fitText);
      link.appendChild(fit);
    }
    link.appendChild(meta);
    return link;
  }

  function render() {
    var list = readList();
    document.querySelectorAll("[data-recent-section]").forEach(function (section) {
      var grid = section.querySelector("[data-recent-grid]");
      if (!grid) {
        return;
      }
      grid.replaceChildren();
      list.forEach(function (item) {
        grid.appendChild(createCard(item));
      });
      section.hidden = list.length === 0;
    });
  }

  function announce(message) {
    document.querySelectorAll("[data-recent-status]").forEach(function (status) {
      status.textContent = message;
    });
  }

  document.addEventListener("click", function (event) {
    var clear = event.target.closest("[data-recent-clear]");
    if (!clear) {
      return;
    }
    writeList([]);
    announce("Recently viewed tools cleared.");
    render();
  });

  window.addEventListener("storage", function (event) {
    if (event.key === storageKey) {
      render();
    }
  });

  recordCurrentTool();
  render();
})();
