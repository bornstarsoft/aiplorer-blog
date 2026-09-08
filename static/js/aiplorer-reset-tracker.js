(function () {
  "use strict";

  var root = document.querySelector("[data-reset-tracker]");
  if (!root) {
    return;
  }

  var statusCards = Array.prototype.slice.call(root.querySelectorAll("[data-provider-status]"));
  var statusRefresh = root.querySelector("[data-reset-status-refresh]");
  var statusChecked = root.querySelector("[data-reset-status-checked]");
  var historyDataElement = root.querySelector("[data-reset-history-data]");
  var historyElapsedSummary = root.querySelector("[data-history-elapsed-summary]");
  var historyLatestLocal = root.querySelector("[data-history-latest-local]");
  var historyElapsedDays = root.querySelector("[data-history-elapsed-days]");
  var historyElapsedHours = root.querySelector("[data-history-elapsed-hours]");
  var historyElapsedMinutes = root.querySelector("[data-history-elapsed-minutes]");
  var historyElapsedSeconds = root.querySelector("[data-history-elapsed-seconds]");
  var historyPulseStrip = root.querySelector("[data-history-pulse-strip]");
  var historyRhythmRead = root.querySelector("[data-history-rhythm-read]");
  var historyHourStrip = root.querySelector("[data-history-hour-strip]");
  var historyHourInsight = root.querySelector("[data-history-hour-insight]");
  var historyTimeZoneNote = root.querySelector("[data-history-timezone-note]");
  var historyNowTime = root.querySelector("[data-history-now-time]");
  var historyTimeZoneButtons = Array.prototype.slice.call(
    root.querySelectorAll("[data-history-timezone]")
  );
  var historyIntervalChart = root.querySelector("[data-history-interval-chart]");
  var historyWeekdayChart = root.querySelector("[data-history-weekday-chart]");
  var historyToggle = root.querySelector("[data-history-toggle]");
  var historyEvents = [];
  var allHistoryEvents = [];
  var selectedHistoryDay = null;
  var historyDays = [];
  var historyCheckedAt = null;
  var activeScope = "all";
  var activeTimeZone = "local";
  var historyTimer = null;
  var activeAxisContext = null;

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function formatLocalWithZone(date) {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short"
    });
  }

  function formatDuration(duration, detailed) {
    if (!Number.isFinite(duration) || duration < 0) {
      return "Unavailable";
    }
    var totalHours = duration / 3600000;
    if (detailed) {
      var wholeDays = Math.floor(totalHours / 24);
      var remainingHours = Math.floor(totalHours % 24);
      if (wholeDays > 0) {
        return wholeDays + "d " + remainingHours + "h";
      }
      return Math.floor(totalHours) + "h " + Math.floor((duration % 3600000) / 60000) + "m";
    }
    return (duration / 86400000).toFixed(1) + "d";
  }

  function median(values) {
    if (!values.length) {
      return null;
    }
    var sorted = values.slice().sort(function (left, right) {
      return left - right;
    });
    var middle = Math.floor(sorted.length / 2);
    return sorted.length % 2
      ? sorted[middle]
      : (sorted[middle - 1] + sorted[middle]) / 2;
  }

  function historyIntervals(events) {
    return events.slice(0, -1).map(function (event, index) {
      return event.date.getTime() - events[index + 1].date.getTime();
    });
  }

  function setHistoryMetric(selector, value) {
    var element = root.querySelector(selector);
    if (element) {
      element.textContent = value;
    }
  }

  function historyWindow(days) {
    var latestTime = allHistoryEvents[0].date.getTime();
    var cutoff = latestTime - days * 86400000;
    var events = historyEvents.filter(function (event) {
      return event.date.getTime() >= cutoff;
    });
    var intervals = historyIntervals(events);
    return {
      count: events.length,
      mean: intervals.length
        ? intervals.reduce(function (total, value) { return total + value; }, 0) / intervals.length
        : null,
      median: median(intervals)
    };
  }

  function utcDateKey(date) {
    return [
      date.getUTCFullYear(),
      pad(date.getUTCMonth() + 1),
      pad(date.getUTCDate())
    ].join("-");
  }

  function eventKindLabel(kind) {
    return {usage: "Usage reset", banked: "Reset credit", both: "Reset + credit", unclassified: "Type unconfirmed"}[kind] || "Type unconfirmed";
  }

  function selectHistoryDay(key, focus) {
    var selected = historyDays.find(function (day) { return day.key === key; });
    if (!selected) return;
    selectedHistoryDay = key;
    historyDays.forEach(function (day) {
      day.button.setAttribute("aria-pressed", String(day === selected));
      day.button.tabIndex = day === selected ? 0 : -1;
    });
    if (focus) selected.button.focus({preventScroll: true});
    revealHistoryDay(selected.button);

    var detail = root.querySelector("[data-history-day-detail]");
    var list = root.querySelector("[data-history-day-list]");
    detail.hidden = false;
    setHistoryMetric("[data-history-day-heading]", selected.date.toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric", timeZone: "UTC"
    }) + " (UTC)");
    setHistoryMetric("[data-history-day-count]", selected.events.length + " announcement" + (selected.events.length === 1 ? "" : "s"));
    root.querySelector("[data-history-day-empty]").hidden = selected.events.length > 0;
    list.textContent = "";
    selected.events.forEach(function (event) {
      var row = document.createElement("li");
      var info = document.createElement("div");
      var type = document.createElement("span");
      var time = document.createElement("time");
      var local = document.createElement("small");
      var link = document.createElement("a");
      type.className = "aiplorer-reset-type";
      type.dataset.kind = event.kind;
      type.textContent = eventKindLabel(event.kind);
      time.dateTime = event.announcedAt;
      time.textContent = event.date.toLocaleTimeString("en-GB", {hour: "2-digit", minute: "2-digit", timeZone: "UTC"}) + " UTC";
      local.textContent = formatLocalWithZone(event.date);
      info.append(type, time, local);
      link.href = event.sourceUrl;
      link.target = "_blank";
      link.rel = "noopener nofollow";
      link.title = "Original announcement";
      link.setAttribute("aria-label", eventKindLabel(event.kind) + " announcement at " + time.textContent);
      link.appendChild(root.querySelector("[data-history-record-icon]").content.cloneNode(true));
      row.append(info, link);
      list.appendChild(row);
    });
    var cutoff = new Date(allHistoryEvents[0].date.getTime() - 30 * 86400000);
    var boundary = root.querySelector("[data-history-day-boundary]");
    boundary.hidden = key !== utcDateKey(cutoff);
    boundary.textContent = "Window starts at " + cutoff.toLocaleTimeString("en-GB", {
      hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "UTC"
    }) + " UTC on this date; earlier records are outside this window.";
  }

  function revealHistoryDay(button) {
    var scroll = historyPulseStrip.parentElement;
    var buttonRect = button.getBoundingClientRect();
    var scrollRect = scroll.getBoundingClientRect();
    if (buttonRect.right > scrollRect.right) scroll.scrollLeft += buttonRect.right - scrollRect.right + 4;
    if (buttonRect.left < scrollRect.left) scroll.scrollLeft -= scrollRect.left - buttonRect.left + 4;
  }

  function renderPulseStrip() {
    if (!historyPulseStrip || !allHistoryEvents.length) {
      return;
    }

    var latest = allHistoryEvents[0].date;
    var latestDay = Date.UTC(latest.getUTCFullYear(), latest.getUTCMonth(), latest.getUTCDate());
    var cutoff = latest.getTime() - 30 * 86400000;
    var counts = historyEvents.filter(function (event) { return event.date.getTime() >= cutoff; }).reduce(function (result, event) {
      var key = utcDateKey(event.date);
      if (!result[key]) result[key] = [];
      result[key].push(event);
      return result;
    }, {});

    historyPulseStrip.textContent = "";
    historyDays = [];
    setHistoryMetric("[data-history-calendar-range]", new Date(cutoff).toLocaleDateString("en-US", {
      month: "short", day: "numeric", timeZone: "UTC"
    }) + " - " + latest.toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric", timeZone: "UTC"
    }) + " (UTC)");
    for (var offset = 30; offset >= 0; offset -= 1) {
      var date = new Date(latestDay - offset * 86400000);
      var key = utcDateKey(date);
      var dailyEvents = counts[key] || [];
      var count = dailyEvents.length;
      var cell = document.createElement("button");
      var weekday = document.createElement("small");
      var day = document.createElement("strong");
      var pulse = document.createElement("i");
      var dateLabel = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC"
      });

      cell.className = "aiplorer-reset-pulse-calendar__day";
      cell.type = "button";
      cell.dataset.historyDay = key;
      cell.setAttribute("aria-controls", "reset-day-records");
      cell.setAttribute("aria-pressed", "false");
      cell.tabIndex = -1;
      if (count > 0) {
        cell.classList.add("has-event");
        var kinds = Array.from(new Set(dailyEvents.map(function (event) { return event.kind; })));
        cell.dataset.kind = kinds.length === 1 ? kinds[0] : "mixed";
      }
      if (count && historyEvents.length && key === utcDateKey(historyEvents[0].date)) {
        cell.classList.add("is-latest");
      }
      cell.setAttribute(
        "aria-label",
        dateLabel + ": " + count + " announcement" + (count === 1 ? "" : "s") +
        (count ? " (" + dailyEvents.map(function (event) {
          return eventKindLabel(event.kind);
        }).join(", ") + ")" : "")
      );
      cell.title = cell.getAttribute("aria-label");
      weekday.textContent = date.toLocaleDateString("en-US", {
        weekday: "narrow",
        timeZone: "UTC"
      });
      day.textContent = String(date.getUTCDate());
      pulse.setAttribute("aria-hidden", "true");
      cell.appendChild(weekday);
      cell.appendChild(day);
      cell.appendChild(pulse);
      cell.addEventListener("click", function (event) {
        selectHistoryDay(event.currentTarget.dataset.historyDay, false);
      });
      cell.addEventListener("keydown", function (event) {
        var index = historyDays.findIndex(function (day) { return day.key === event.currentTarget.dataset.historyDay; });
        var next;
        if (event.key === "ArrowRight") next = Math.min(index + 1, historyDays.length - 1);
        if (event.key === "ArrowLeft") next = Math.max(index - 1, 0);
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = historyDays.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          selectHistoryDay(historyDays[next].key, true);
        }
      });
      historyPulseStrip.appendChild(cell);
      historyDays.push({key: key, date: date, events: dailyEvents, button: cell});
    }
    if (!selectedHistoryDay) {
      var latestInWindow = historyEvents.find(function (event) { return event.date.getTime() >= cutoff; });
      selectedHistoryDay = utcDateKey(latestInWindow ? latestInWindow.date : latest);
    }
    root.querySelector("[data-history-mixed-legend]").hidden = !historyDays.some(function (day) { return day.button.dataset.kind === "mixed"; });
    selectHistoryDay(selectedHistoryDay, false);
  }

  function renderRhythm(latestInterval, recentMedian, fullMedian) {
    var values = [latestInterval, recentMedian, fullMedian];
    var maximum = Math.max.apply(null, values.filter(Number.isFinite).concat([1]));
    ["latest", "recent", "full"].forEach(function (name, index) {
      var fill = root.querySelector('[data-history-rhythm-fill="' + name + '"]');
      if (fill) {
        fill.style.width = (Number.isFinite(values[index]) ? Math.max(4, (values[index] / maximum) * 100) : 0) + "%";
      }
    });

    if (!historyRhythmRead) {
      return;
    }
    if (!Number.isFinite(recentMedian) || !Number.isFinite(fullMedian) || !fullMedian) {
      historyRhythmRead.textContent = "Not enough announcements in this window to compare intervals.";
      return;
    }
    var difference = Math.round(Math.abs(recentMedian / fullMedian - 1) * 100);
    if (difference < 5) {
      historyRhythmRead.textContent =
        "The latest 30-day median is close to the full-history median. This describes past spacing only.";
    } else if (recentMedian < fullMedian) {
      historyRhythmRead.textContent =
        "The latest 30-day median is " + difference + "% shorter than the full-history median, showing a tighter recent cluster. This is not a forecast.";
    } else {
      historyRhythmRead.textContent =
        "The latest 30-day median is " + difference + "% longer than the full-history median, showing wider recent spacing. This is not a forecast.";
    }
  }

  function timeZoneOffsetMinutes(date, timeZone) {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).formatToParts(date);
    var values = {};
    parts.forEach(function (part) {
      if (part.type !== "literal") {
        values[part.type] = Number(part.value);
      }
    });
    var zonedAsUtc = Date.UTC(
      values.year,
      values.month - 1,
      values.day,
      values.hour,
      values.minute
    );
    var sourceUtc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes()
    );
    return Math.round((zonedAsUtc - sourceUtc) / 60000);
  }

  function timeZoneAbbreviation(date, timeZone) {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone,
      timeZoneName: "short"
    }).formatToParts(date);
    var zonePart = parts.find(function (part) { return part.type === "timeZoneName"; });
    return zonePart ? zonePart.value : timeZone;
  }

  function formatUtcOffset(offsetMinutes) {
    if (!offsetMinutes) {
      return "UTC";
    }
    var sign = offsetMinutes > 0 ? "+" : "-";
    var absolute = Math.abs(offsetMinutes);
    var hours = Math.floor(absolute / 60);
    var minutes = absolute % 60;
    return "UTC" + sign + hours + (minutes ? ":" + pad(minutes) : "");
  }

  function formatAxisMinute(totalMinutes) {
    var normalized = Math.floor(((totalMinutes % 1440) + 1440) % 1440);
    return pad(Math.floor(normalized / 60)) + ":" + pad(normalized % 60);
  }

  function renderCurrentTimeMarker() {
    if (!historyHourStrip || !historyNowTime || !activeAxisContext) {
      return;
    }
    var marker = historyHourStrip.querySelector("[data-history-now-marker]");
    if (!marker) {
      marker = document.createElement("span");
      marker.className = "aiplorer-reset-clock__now-marker";
      marker.setAttribute("data-history-now-marker", "");
      marker.setAttribute("aria-hidden", "true");
      historyHourStrip.appendChild(marker);
    }
    var now = new Date();
    var utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes() + now.getUTCSeconds() / 60;
    var axisTime = formatAxisMinute(utcMinutes + activeAxisContext.offsetMinutes);
    marker.style.left = (utcMinutes / 1440) * 100 + "%";
    marker.title = "Current time: " + axisTime + " in " + activeAxisContext.label;
    historyNowTime.textContent = axisTime;
    historyNowTime.parentElement.setAttribute(
      "aria-label",
      "Current time: " + axisTime + " in " + activeAxisContext.label
    );
  }

  function axisContext(mode) {
    var referenceDate = allHistoryEvents[0].date;
    if (mode === "utc") {
      return {
        offsetMinutes: 0,
        label: "UTC",
        note: historyEvents.length +
          " selected records in 24 UTC buckets. Changing the time zone shifts labels only."
      };
    }
    if (mode === "los-angeles") {
      var laOffset = timeZoneOffsetMinutes(referenceDate, "America/Los_Angeles");
      var laAbbreviation = timeZoneAbbreviation(referenceDate, "America/Los_Angeles");
      return {
        offsetMinutes: laOffset,
        label: "Los Angeles time",
        note: historyEvents.length +
          " selected records in 24 UTC buckets. Only the axis shifts to Los Angeles using " + laAbbreviation +
          " (" + formatUtcOffset(laOffset) + "), the offset on the latest record date."
      };
    }

    var localZone = "browser time";
    try {
      localZone = Intl.DateTimeFormat().resolvedOptions().timeZone || localZone;
    } catch (error) {
      localZone = "browser time";
    }
    var localOffset = -referenceDate.getTimezoneOffset();
    return {
      offsetMinutes: localOffset,
      label: "your browser time",
      note: historyEvents.length +
        " selected records in 24 UTC buckets. Only the axis shifts to " + localZone + " (" +
        formatUtcOffset(localOffset) + ")."
    };
  }

  function renderTimeOfDay(mode) {
    if (!historyHourStrip || !allHistoryEvents.length) {
      return;
    }
    activeTimeZone = mode;

    var counts = Array.from({ length: 24 }, function () { return 0; });
    historyEvents.forEach(function (event) {
      counts[event.date.getUTCHours()] += 1;
    });
    var maximum = Math.max.apply(null, counts.concat([1]));
    var context = axisContext(mode);
    activeAxisContext = context;

    historyHourStrip.textContent = "";
    counts.forEach(function (count, hour) {
      var cell = document.createElement("span");
      var value = document.createElement("strong");
      var track = document.createElement("i");
      var fill = document.createElement("b");
      var label = document.createElement("small");
      var hourLabel = formatAxisMinute(hour * 60 + context.offsetMinutes);

      cell.className = "aiplorer-reset-clock__hour";
      if (count === maximum && count > 0) {
        cell.classList.add("is-peak");
      }
      if (count === 0) {
        cell.classList.add("is-empty");
      }
      cell.setAttribute(
        "aria-label",
        hourLabel + ": " + count + " observed record" + (count === 1 ? "" : "s")
      );
      cell.title = cell.getAttribute("aria-label");
      value.textContent = String(count);
      fill.style.height = (count ? Math.max(12, (count / maximum) * 100) : 0) + "%";
      track.appendChild(fill);
      label.textContent = hourLabel.slice(-3) === ":00" ? hourLabel.slice(0, 2) : hourLabel;
      cell.appendChild(value);
      cell.appendChild(track);
      cell.appendChild(label);
      historyHourStrip.appendChild(cell);
    });
    renderCurrentTimeMarker();

    var bands = [
      { start: 0, count: counts.slice(0, 6).reduce(sum, 0) },
      { start: 6, count: counts.slice(6, 12).reduce(sum, 0) },
      { start: 12, count: counts.slice(12, 18).reduce(sum, 0) },
      { start: 18, count: counts.slice(18, 24).reduce(sum, 0) }
    ];
    var strongest = bands.reduce(function (current, band) {
      return band.count > current.count ? band : current;
    }, bands[0]);
    var strongestStart = strongest.start * 60 + context.offsetMinutes;
    var strongestLabel = formatAxisMinute(strongestStart) + "-" +
      formatAxisMinute(strongestStart + 359);

    historyTimeZoneNote.textContent = context.note;
    historyHourStrip.setAttribute(
      "aria-label",
      "Fixed UTC hourly distribution with axis labels shown in " + context.label
    );
    historyHourInsight.textContent =
      historyEvents.length ? "Strongest historical band: " + strongestLabel + " with " + strongest.count +
      " records in " + context.label + ". Historical distribution only, not a forecast." : "No announcements in this view.";
    historyTimeZoneButtons.forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        String(button.getAttribute("data-history-timezone") === mode)
      );
    });
  }

  function sum(total, value) {
    return total + value;
  }

  function renderDistribution(container, items) {
    if (!container) {
      return;
    }
    var maximum = Math.max.apply(null, items.map(function (item) { return item.value; }).concat([1]));
    container.textContent = "";
    items.forEach(function (item) {
      var row = document.createElement("div");
      var label = document.createElement("span");
      var track = document.createElement("span");
      var fill = document.createElement("span");
      var value = document.createElement("strong");
      row.className = "aiplorer-reset-history__distribution-row";
      label.textContent = item.label;
      track.className = "aiplorer-reset-history__distribution-track";
      fill.style.width = (item.value ? Math.max(3, (item.value / maximum) * 100) : 0) + "%";
      track.appendChild(fill);
      value.textContent = String(item.value);
      row.setAttribute("aria-label", item.label + ": " + item.value + " announcements");
      row.appendChild(label);
      row.appendChild(track);
      row.appendChild(value);
      container.appendChild(row);
    });
  }

  function renderIntervalChart(intervals) {
    if (!historyIntervalChart) {
      return;
    }
    var recent = intervals.slice(0, 14);
    var maximum = Math.max.apply(null, recent.concat([1]));
    historyIntervalChart.textContent = "";
    recent.forEach(function (duration, index) {
      var row = document.createElement("div");
      var label = document.createElement("time");
      var track = document.createElement("span");
      var fill = document.createElement("span");
      var value = document.createElement("strong");
      var event = historyEvents[index];
      row.className = "aiplorer-reset-history__interval-row";
      label.dateTime = event.date.toISOString();
      label.textContent = event.date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC"
      });
      track.className = "aiplorer-reset-history__interval-track";
      fill.style.width = Math.max(3, (duration / maximum) * 100) + "%";
      track.appendChild(fill);
      value.textContent = formatDuration(duration, false);
      row.setAttribute(
        "aria-label",
        label.textContent + ": " + formatDuration(duration, true) + " since the prior announcement"
      );
      row.appendChild(label);
      row.appendChild(track);
      row.appendChild(value);
      historyIntervalChart.appendChild(row);
    });
  }

  function renderHistoryTimeline(intervals) {
    var eventRows = Array.prototype.slice.call(root.querySelectorAll("[data-history-event]"));
    root.classList.remove("is-history-expanded");
    eventRows.forEach(function (row) {
      var timeElement = row.querySelector("[data-history-event-time]");
      var localElement = row.querySelector("[data-history-event-local]");
      var intervalElement = row.querySelector("[data-history-event-interval]");
      var event = allHistoryEvents[Number(row.dataset.historyIndex)];
      var index = historyEvents.indexOf(event);
      row.hidden = index < 0;
      row.classList.toggle("aiplorer-reset-history-event--additional", index >= 6);
      if (index < 0) {
        return;
      }
      timeElement.textContent = event.date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC"
      }) + " UTC";
      localElement.textContent = formatLocalWithZone(event.date);
      intervalElement.textContent = index < intervals.length
        ? formatDuration(intervals[index], true) + " after prior in view"
        : "Coverage start";
    });

    if (historyToggle) {
      root.classList.add("is-history-enhanced");
      historyToggle.hidden = historyEvents.length <= 6;
      historyToggle.textContent = "Show all " + historyEvents.length;
      historyToggle.setAttribute("aria-expanded", "false");
      historyToggle.onclick = function () {
        var expanded = root.classList.toggle("is-history-expanded");
        historyToggle.setAttribute("aria-expanded", String(expanded));
        historyToggle.textContent = expanded
          ? "Show latest 6"
          : "Show all " + historyEvents.length;
      };
    }
  }

  function renderHistoryElapsed() {
    renderHistoryChecked();
    if (!allHistoryEvents.length) {
      return;
    }
    var elapsed = Math.max(0, Date.now() - allHistoryEvents[0].date.getTime());
    var totalSeconds = Math.floor(elapsed / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    historyElapsedDays.textContent = pad(days);
    historyElapsedHours.textContent = pad(hours);
    historyElapsedMinutes.textContent = pad(minutes);
    historyElapsedSeconds.textContent = pad(seconds);
    historyElapsedSummary.textContent = days > 0
      ? days + "d " + hours + "h since the latest record"
      : hours > 0
        ? hours + "h " + minutes + "m since the latest record"
        : minutes + "m " + seconds + "s since the latest record";
    root.querySelectorAll("[data-kind-elapsed]").forEach(function (node) {
      node.textContent = formatDuration(Math.max(0, Date.now() - Date.parse(node.dataset.kindElapsed)), true) + " since announcement";
    });
    renderCurrentTimeMarker();
  }

  function renderHistoryChecked() {
    var age = root.querySelector("[data-history-checked-age]");
    if (!age || !historyCheckedAt || Number.isNaN(historyCheckedAt.getTime())) return;
    var elapsed = Date.now() - historyCheckedAt.getTime();
    age.hidden = false;
    age.textContent = elapsed < 0 ? "Check time is ahead of this device's clock" :
      elapsed < 60000 ? "Checked less than a minute ago" : "Checked " + formatDuration(elapsed, true) + " ago";
  }

  function renderEventKinds() {
    root.querySelectorAll("[data-kind-median]").forEach(function (node) {
      var events = allHistoryEvents.filter(function (event) { return event.kind === node.dataset.kindMedian; });
      var intervals = historyIntervals(events);
      node.textContent = intervals.length ? formatDuration(median(intervals), true) : "Not enough records";
    });
    root.querySelectorAll("[data-kind-local]").forEach(function (node) {
      node.textContent = formatLocalWithZone(new Date(node.dateTime));
    });
    var credits = allHistoryEvents.filter(function (event) { return event.kind === "banked" || event.kind === "both"; });
    var intervals = historyIntervals(credits);
    root.querySelectorAll("[data-credit-event]").forEach(function (row, index) {
      row.querySelector("[data-credit-local]").textContent = formatLocalWithZone(new Date(row.dataset.creditEvent));
      row.querySelector("[data-credit-interval]").textContent = index < intervals.length
        ? formatDuration(intervals[index], true) : "First recorded credit";
    });
  }

  function initializeHistory() {
    if (!historyDataElement) {
      return;
    }
    try {
      var payload = JSON.parse(historyDataElement.textContent);
      historyCheckedAt = new Date(payload.snapshotAt);
      if (!Number.isNaN(historyCheckedAt.getTime())) {
        setHistoryMetric("[data-history-checked-local]", formatLocalWithZone(historyCheckedAt));
      }
      historyEvents = (payload.events || [])
        .map(function (event) {
          return {
            announcedAt: event.announcedAt,
            sourceUrl: event.sourceUrl,
            kind: event.kind,
            date: new Date(event.announcedAt)
          };
        })
        .filter(function (event) {
          return !Number.isNaN(event.date.getTime());
        })
        .sort(function (left, right) {
          return right.date.getTime() - left.date.getTime();
        });
    } catch (error) {
      historyEvents = [];
    }

    allHistoryEvents = historyEvents;
    if (!allHistoryEvents.length) {
      return;
    }
    historyLatestLocal.textContent = formatLocalWithZone(allHistoryEvents[0].date);
    renderEventKinds();
    renderHistoryElapsed();
    root.querySelector("[data-history-scope-controls]").hidden = false;
    root.querySelectorAll("[data-history-scope]").forEach(function (button) {
      button.addEventListener("click", function () {
        activeScope = button.dataset.historyScope;
        renderHistoryScope();
      });
    });
    renderHistoryScope();
  }

  function renderHistoryScope() {
    historyEvents = allHistoryEvents.filter(function (event) {
      return activeScope === "all" || event.kind === activeScope || event.kind === "both";
    });
    var label = {all:"All announcements",usage:"Usage resets",banked:"Reset credits"}[activeScope];
    setHistoryMetric("[data-history-scope-label]", label);
    setHistoryMetric("[data-history-timeline-label]", label + " - " + historyEvents.length + " records");
    setHistoryMetric("[data-history-scope-note]", historyEvents.length + " announcements. " +
      (activeScope === "all" ? "Each public record is counted once, including unconfirmed types." :
        "Includes reset + credit announcements once. Unconfirmed types are excluded."));
    root.querySelectorAll("[data-history-scope]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.historyScope === activeScope));
    });

    var intervals = historyIntervals(historyEvents);
    var fullMean = intervals.length ? intervals.reduce(function (total, value) { return total + value; }, 0) / intervals.length : null;
    var fullMedian = median(intervals);
    var latest30 = historyWindow(30);
    var latest90 = historyWindow(90);
    var longest = intervals.length ? Math.max.apply(null, intervals) : null;
    var coverage = historyEvents.length ? historyEvents[0].date.getTime() - historyEvents[historyEvents.length - 1].date.getTime() : null;
    var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(function (label, day) {
      return {
        label: label,
        value: historyEvents.filter(function (event) { return event.date.getUTCDay() === day; }).length
      };
    });
    setHistoryMetric("[data-history-latest-interval]", formatDuration(intervals[0], true));
    setHistoryMetric("[data-history-median]", formatDuration(fullMedian, false));
    setHistoryMetric("[data-history-30-count]", String(latest30.count));
    setHistoryMetric("[data-history-30-table-count]", String(latest30.count));
    setHistoryMetric("[data-history-30-median]", formatDuration(latest30.median, false));
    setHistoryMetric("[data-history-30-table-median]", formatDuration(latest30.median, false));
    setHistoryMetric("[data-history-30-table-mean]", formatDuration(latest30.mean, false));
    setHistoryMetric("[data-history-90-count]", String(latest90.count));
    setHistoryMetric("[data-history-90-median]", formatDuration(latest90.median, false));
    setHistoryMetric("[data-history-90-mean]", formatDuration(latest90.mean, false));
    setHistoryMetric("[data-history-total-count]", String(historyEvents.length));
    setHistoryMetric("[data-history-full-table-median]", formatDuration(fullMedian, false));
    setHistoryMetric("[data-history-mean]", formatDuration(fullMean, false));
    setHistoryMetric("[data-history-longest]", formatDuration(longest, false));
    setHistoryMetric("[data-history-coverage]", historyEvents.length ? formatDuration(coverage, false) + " of source coverage" : "No records in this view");
    renderPulseStrip();
    renderRhythm(intervals[0], latest30.median, fullMedian);
    renderTimeOfDay(activeTimeZone);
    renderIntervalChart(intervals);
    renderDistribution(historyWeekdayChart, weekdays);
    renderHistoryTimeline(intervals);
  }

  function statusStateFor(indicator) {
    if (indicator === "none") {
      return { key: "operational", label: "Operational" };
    }
    if (indicator === "minor" || indicator === "maintenance") {
      return { key: "attention", label: "Check status" };
    }
    if (indicator === "major" || indicator === "critical") {
      return { key: "incident", label: "Incident" };
    }
    return { key: "unavailable", label: "Check source" };
  }

  function loadStatusCard(card) {
    var endpoint = card.getAttribute("data-status-endpoint");
    var name = card.getAttribute("data-status-name");
    var stateElement = card.querySelector("[data-provider-status-state]");
    var description = card.querySelector("[data-provider-status-description]");
    var updated = card.querySelector("[data-provider-status-updated]");

    stateElement.setAttribute("data-provider-status-state", "loading");
    stateElement.textContent = "Checking";
    description.textContent = "Loading the official status summary.";
    updated.textContent = "Checking official API";

    return window
      .fetch(endpoint, { cache: "no-store", headers: { Accept: "application/json" } })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Status request failed");
        }
        return response.json();
      })
      .then(function (payload) {
        var officialStatus = payload && payload.status ? payload.status : {};
        var renderedState = statusStateFor(officialStatus.indicator || "unknown");
        stateElement.setAttribute("data-provider-status-state", renderedState.key);
        stateElement.textContent = renderedState.label;
        description.textContent = officialStatus.description || "Open the official status page for details.";
        updated.textContent = "Official API checked " + new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit"
        });
        return true;
      })
      .catch(function () {
        stateElement.setAttribute("data-provider-status-state", "unavailable");
        stateElement.textContent = "Open source";
        description.textContent =
          "The live summary could not be loaded. Use the official " + name + " status link.";
        updated.textContent = "Live summary unavailable";
        return false;
      });
  }

  function refreshStatuses() {
    if (!statusCards.length) {
      return;
    }
    statusRefresh.disabled = true;
    statusRefresh.setAttribute("aria-busy", "true");
    statusChecked.textContent = "Checking official status feeds.";
    Promise.all(statusCards.map(loadStatusCard)).then(function (results) {
      var successful = results.filter(Boolean).length;
      statusChecked.textContent =
        successful === results.length
          ? "Both official status summaries were checked just now."
          : successful + " of " + results.length + " official summaries loaded. Use the source links for the rest.";
      statusRefresh.disabled = false;
      statusRefresh.removeAttribute("aria-busy");
    });
  }

  statusRefresh.addEventListener("click", refreshStatuses);
  historyTimeZoneButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      renderTimeOfDay(button.getAttribute("data-history-timezone"));
    });
  });
  initializeHistory();
  window.addEventListener("resize", function () {
    var selected = historyDays.find(function (day) { return day.key === selectedHistoryDay; });
    if (selected) revealHistoryDay(selected.button);
  });
  refreshStatuses();
  historyTimer = window.setInterval(renderHistoryElapsed, 1000);

  window.addEventListener("pagehide", function () {
    if (historyTimer) {
      window.clearInterval(historyTimer);
    }
  });
})();
