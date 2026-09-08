#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validateResetHistory } from "./reset-history-lib.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..");
const historyPath = resolve(repositoryRoot, "data/codex_reset_history.json");

function runSelfTest() {
  const valid = {
    provider: "Codex",
    snapshotAt: "2026-08-12T00:00:00.000Z",
    coverageStartsAt: "2026-08-10T00:00:00.000Z",
    sourceName: "Fixture",
    sourceUrl: "https://example.com/",
    events: [
      {
        announcedAt: "2026-08-11T00:00:00.000Z",
        sourceUrl: "https://x.com/example/status/2",
        kind: "usage",
      },
      {
        announcedAt: "2026-08-10T00:00:00.000Z",
        sourceUrl: "https://x.com/example/status/1",
        kind: "banked",
      },
    ],
  };

  validateResetHistory(valid);

  for (const kind of ["usage", "banked", "both", "unclassified"]) {
    const typed = structuredClone(valid);
    typed.events[0].kind = kind;
    validateResetHistory(typed);
  }
  for (const kind of [undefined, "regular", "predicted"]) {
    const invalidKind = structuredClone(valid);
    invalidKind.events[0].kind = kind;
    let rejected = false;
    try { validateResetHistory(invalidKind); } catch { rejected = true; }
    if (!rejected) throw new Error(`Self-test accepted invalid kind: ${kind}`);
  }

  const invalid = structuredClone(valid);
  invalid.events[1].sourceUrl = invalid.events[0].sourceUrl;
  try {
    validateResetHistory(invalid);
  } catch {
    console.log("PASS: reset history validator self-test.");
    return;
  }

  throw new Error("Self-test failed to reject a duplicate source URL.");
}

try {
  if (process.argv.includes("--self-test")) {
    runSelfTest();
    process.exit(0);
  }

  const history = JSON.parse(readFileSync(historyPath, "utf8"));
  const result = validateResetHistory(history);
  console.log(`PASS: ${result.count} Codex reset records are valid, unique, and newest-first.`);
  console.log(`Latest observed: ${result.latest}`);
  console.log(`Snapshot checked: ${result.snapshotAt}`);
} catch (error) {
  console.error(`FAIL: ${error.message}`);
  process.exit(1);
}
