#!/usr/bin/env node

import { readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  isSourcePostUrl,
  normalizeTimestamp,
  validateResetHistory,
} from "./reset-history-lib.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..");
const historyPath = resolve(repositoryRoot, "data/codex_reset_history.json");
const trackerPath = resolve(repositoryRoot, "content/ai-tools/reset-tracker.md");

function usage() {
  console.log(`Usage:
  node scripts/update-reset-history.mjs --mark-checked [--checked-at <ISO-UTC>] [--dry-run]
  node scripts/update-reset-history.mjs --at <ISO-UTC> --source <X-status-URL> [--checked-at <ISO-UTC>] [--dry-run]

Use --mark-checked after a source review finds no new reset record.`);
}

function parseArguments(argv) {
  const options = { dryRun: false, markChecked: false };
  const valueOptions = new Map([
    ["--at", "announcedAt"],
    ["--source", "sourceUrl"],
    ["--checked-at", "checkedAt"],
  ]);

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (argument === "--mark-checked") {
      options.markChecked = true;
      continue;
    }
    if (argument === "--help" || argument === "-h") {
      options.help = true;
      continue;
    }
    if (!valueOptions.has(argument)) {
      throw new Error(`Unknown option: ${argument}`);
    }

    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`${argument} requires a value.`);
    }
    options[valueOptions.get(argument)] = value;
    index += 1;
  }

  return options;
}

function writeAtomically(path, content) {
  const temporaryPath = `${path}.tmp`;
  writeFileSync(temporaryPath, content, "utf8");
  renameSync(temporaryPath, path);
}

try {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    usage();
    process.exit(0);
  }

  const addingEvent = Boolean(options.announcedAt || options.sourceUrl);
  if (options.markChecked === addingEvent) {
    throw new Error("Choose either --mark-checked or the --at/--source pair.");
  }
  if (addingEvent && (!options.announcedAt || !options.sourceUrl)) {
    throw new Error("A new record requires both --at and --source.");
  }
  if (addingEvent && !isSourcePostUrl(options.sourceUrl)) {
    throw new Error("--source must be a direct HTTPS X/Twitter status URL.");
  }

  const history = JSON.parse(readFileSync(historyPath, "utf8"));
  validateResetHistory(history);

  const checkedAt = normalizeTimestamp(options.checkedAt || new Date().toISOString(), "checkedAt");
  if (Date.parse(checkedAt) < Date.parse(history.snapshotAt)) {
    throw new Error(`checkedAt cannot be earlier than the current snapshotAt (${history.snapshotAt}).`);
  }

  if (addingEvent) {
    const announcedAt = normalizeTimestamp(options.announcedAt, "announcedAt");
    if (Date.parse(announcedAt) > Date.parse(checkedAt)) {
      throw new Error("announcedAt cannot be later than checkedAt.");
    }
    if (history.events.some((event) => event.announcedAt === announcedAt)) {
      throw new Error(`A record already uses announcedAt ${announcedAt}.`);
    }
    if (history.events.some((event) => event.sourceUrl === options.sourceUrl)) {
      throw new Error(`A record already uses source URL ${options.sourceUrl}.`);
    }

    history.events.push({ announcedAt, sourceUrl: options.sourceUrl });
    history.events.sort((left, right) => Date.parse(right.announcedAt) - Date.parse(left.announcedAt));
  }

  history.snapshotAt = checkedAt;
  history.coverageStartsAt = history.events[history.events.length - 1].announcedAt;
  const result = validateResetHistory(history);

  const tracker = readFileSync(trackerPath, "utf8");
  const lastmod = checkedAt.slice(0, 10);
  if (!/^lastmod:\s*"\d{4}-\d{2}-\d{2}"/m.test(tracker)) {
    throw new Error("Tracker front matter does not contain a recognized lastmod field.");
  }
  const updatedTracker = tracker.replace(/^lastmod:\s*"\d{4}-\d{2}-\d{2}"/m, `lastmod: "${lastmod}"`);

  const action = addingEvent ? `add ${history.events[0].announcedAt}` : "mark the source snapshot checked";
  if (options.dryRun) {
    console.log(`DRY RUN: would ${action}.`);
  } else {
    writeAtomically(historyPath, `${JSON.stringify(history, null, 2)}\n`);
    writeAtomically(trackerPath, updatedTracker);
    console.log(`UPDATED: ${action}.`);
  }
  console.log(`Records: ${result.count}`);
  console.log(`Snapshot checked: ${result.snapshotAt}`);
  console.log("Next: run node scripts/validate-reset-history.mjs and the Hugo production build.");
} catch (error) {
  console.error(`FAIL: ${error.message}`);
  usage();
  process.exit(1);
}
