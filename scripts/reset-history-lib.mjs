const X_STATUS_URL_PATTERN = /^https:\/\/(?:www\.)?(?:x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/\d+\/?$/;

export function normalizeTimestamp(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${label} must be a non-empty timestamp.`);
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`${label} is not a valid timestamp: ${value}`);
  }

  return parsed.toISOString();
}

export function isSourcePostUrl(value) {
  return typeof value === "string" && X_STATUS_URL_PATTERN.test(value);
}

export function validateResetHistory(history) {
  const errors = [];
  const fail = (message) => errors.push(message);

  if (!history || typeof history !== "object" || Array.isArray(history)) {
    throw new Error("Reset history must be a JSON object.");
  }

  if (history.provider !== "Codex") {
    fail('provider must be "Codex".');
  }

  if (typeof history.sourceName !== "string" || history.sourceName.trim() === "") {
    fail("sourceName must be a non-empty string.");
  }

  try {
    const sourceUrl = new URL(history.sourceUrl);
    if (sourceUrl.protocol !== "https:") {
      fail("sourceUrl must use HTTPS.");
    }
  } catch {
    fail("sourceUrl must be a valid URL.");
  }

  let snapshotAt;
  try {
    snapshotAt = normalizeTimestamp(history.snapshotAt, "snapshotAt");
    if (snapshotAt !== history.snapshotAt) {
      fail(`snapshotAt must use canonical UTC ISO format: ${snapshotAt}`);
    }
  } catch (error) {
    fail(error.message);
  }

  let coverageStartsAt;
  try {
    coverageStartsAt = normalizeTimestamp(history.coverageStartsAt, "coverageStartsAt");
    if (coverageStartsAt !== history.coverageStartsAt) {
      fail(`coverageStartsAt must use canonical UTC ISO format: ${coverageStartsAt}`);
    }
  } catch (error) {
    fail(error.message);
  }

  if (!Array.isArray(history.events) || history.events.length === 0) {
    fail("events must be a non-empty array.");
  }

  const eventTimes = new Set();
  const sourceUrls = new Set();
  let previousTime = Number.POSITIVE_INFINITY;

  for (const [index, event] of (history.events || []).entries()) {
    const prefix = `events[${index}]`;
    if (!event || typeof event !== "object" || Array.isArray(event)) {
      fail(`${prefix} must be an object.`);
      continue;
    }

    let announcedAt;
    try {
      announcedAt = normalizeTimestamp(event.announcedAt, `${prefix}.announcedAt`);
      if (announcedAt !== event.announcedAt) {
        fail(`${prefix}.announcedAt must use canonical UTC ISO format: ${announcedAt}`);
      }
    } catch (error) {
      fail(error.message);
    }

    if (!isSourcePostUrl(event.sourceUrl)) {
      fail(`${prefix}.sourceUrl must be a direct HTTPS X/Twitter status URL.`);
    }
    if (!["usage", "banked", "both", "unclassified"].includes(event.kind)) {
      fail(`${prefix}.kind must be usage, banked, both, or unclassified.`);
    }

    if (announcedAt) {
      const timestamp = Date.parse(announcedAt);
      if (timestamp >= previousTime) {
        fail(`${prefix}.announcedAt must be strictly older than the preceding record.`);
      }
      previousTime = timestamp;

      if (eventTimes.has(announcedAt)) {
        fail(`${prefix}.announcedAt duplicates an existing record.`);
      }
      eventTimes.add(announcedAt);

      if (snapshotAt && timestamp > Date.parse(snapshotAt)) {
        fail(`${prefix}.announcedAt is later than snapshotAt.`);
      }
    }

    if (sourceUrls.has(event.sourceUrl)) {
      fail(`${prefix}.sourceUrl duplicates an existing record.`);
    }
    sourceUrls.add(event.sourceUrl);
  }

  if (history.events?.length) {
    const oldest = history.events[history.events.length - 1].announcedAt;
    if (coverageStartsAt && coverageStartsAt !== oldest) {
      fail(`coverageStartsAt must equal the oldest event timestamp: ${oldest}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  return {
    count: history.events.length,
    latest: history.events[0].announcedAt,
    oldest: history.events[history.events.length - 1].announcedAt,
    snapshotAt: history.snapshotAt,
  };
}
