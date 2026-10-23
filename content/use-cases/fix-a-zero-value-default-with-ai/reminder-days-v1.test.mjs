// Run locally with: node reminder-days-v1.test.mjs
// The original function must fail the first check. Keep these tests unchanged.
import assert from "node:assert/strict";
import { reminderDays } from "./reminder-days-v1.mjs";

assert.equal(reminderDays(0), 0, "preserve a valid zero");
assert.equal(reminderDays(1), 1, "preserve one day");
assert.equal(reminderDays(14), 14, "preserve fourteen days");
assert.equal(reminderDays(null), 7, "default null to seven");
assert.equal(reminderDays(), 7, "default an omitted argument to seven");
console.log("PASS: all five checks passed for this contract only.");
