---
title: "Fix a Zero-Value Bug With a Small Test"
description: "A runnable JavaScript example: preserve a valid zero, inspect a proposed fix, and test the missing-value cases."
contentType: "use-case"
workedExample: true
audience: "Developers practising a small, reviewable AI-assisted code change."
relatedTools:
  - "/ai-tools/tools/github-copilot/"
  - "/ai-tools/tools/cursor/"
relatedCategories:
  - "/ai-tools/coding-tools/"
lastReviewed: "2026-10-23"
reviewStatus: "reviewed"
draft: false
practiceDownloads:
  - file: "reminder-days-v1.mjs"
    label: "Buggy sample function (MJS)"
  - file: "reminder-days-v1.test.mjs"
    label: "Local regression tests (MJS)"
  - file: "code-check-worksheet-v1.txt"
    label: "Code comparison worksheet (TXT)"
---

## The Task

A fictional delivery form allows a customer to enter zero reminder days.
The application silently changes zero to seven. Fix that behavior without
changing how an omitted value works.

This is an editorial worked exercise, not a comparison of assistant quality.
The JavaScript test below was run locally for this example. The prompt is a
reusable request; the proposed response is illustrative, not a captured vendor run.

## Input: The Bug And Its Contract

The original expression is `value || 7`. JavaScript treats zero as falsy,
so the fallback replaces a valid value.

For this exercise, the caller supplies a non-negative integer, `null`, or
`undefined`. Preserve integers including zero; use seven only for missing
values. Parsing form strings and rejecting other input belong to the caller
and are outside this patch.

## Download A Repeatable Local Test

Keep these two code files in the same empty local folder. Inspect them before
running them with Node.js; neither file installs packages, accesses the
network or writes files. The site does not run submitted code.

{{< resource-download file="reminder-days-v1.mjs" label="Download buggy function (.mjs)" >}}

{{< resource-download file="reminder-days-v1.test.mjs" label="Download regression tests (.mjs)" >}}

From that folder, run:

```sh
node reminder-days-v1.test.mjs
```

**The first run should fail on zero.** That reproduces the bug, not a broken
download. Preserve this result, then ask for a change to the function file
only. Keep the tests unchanged and run the same command again. A valid fix
passes all five checks; the complete example below shows the expected behavior.
No package installation is needed if Node.js is already available.

{{< resource-download file="code-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

Keep a separate copy of the original files and each candidate's proposed
change. Record failures as well as passes. Do not put private repositories,
credentials or customer code into this fictional exercise.

## Give The Assistant A Bounded Request

```text
Fix reminderDays(value), currently implemented as return value || 7.
Input contract: non-negative integer, null, or undefined.
Preserve 0 and positive integers. Default null and undefined to 7.
Return one minimal change, explain the behavior, and provide tests.
Do not add a dependency or change input parsing. List assumptions.
```

## Inspect A Proposed Change

A tempting suggestion is `value === 0 ? 0 : value || 7`. It handles the reported
zero, but leaves the original broad fallback in place. A more direct expression
of this contract is `value ?? 7`: default only `null` and `undefined`.

Neither expression validates arbitrary form input. For example, the new one
preserves an empty string. If your real application expects an empty string to
mean missing, update the contract and tests before applying this patch.

## Run The Reproduction And Regression Tests

Run the following as a Node.js `.mjs` file using the built-in assertion module.
It first demonstrates the old behavior, then checks the intended replacement.

```javascript
import assert from "node:assert/strict";

const original = (value) => value || 7;
const reminderDays = (value) => value ?? 7;

assert.equal(original(0), 7); // Reproduces the bug.
for (const [input, expected] of [
  [0, 0], [1, 1], [14, 14], [null, 7], [undefined, 7]
]) {
  assert.equal(reminderDays(input), expected);
}
console.log("PASS: zero is preserved; missing values default to seven.");
```

Expected output: `PASS: zero is preserved; missing values default to seven.`
In the sample run, all five replacement cases passed. That result covers this
function's stated contract, not an entire application or its security.

The downloadable runner tests the imported function instead of embedding the
fixed expression. It checks zero first, then positive values, null and an
omitted argument. A failing assertion stops that run; it does not mean later
checks passed. Do not edit the expected values to make a candidate look correct.

When revisiting a coding tool after an update, begin from the unchanged buggy
file, use the same request and preserve the actual diff and first test result.
If you change the contract or tests, record that as a different experiment.
The [comparison worksheet](code-check-worksheet-v1.txt) is a blank local record,
not an automatic test history or a tool score.

## Before Merging In A Real Project

- Find the caller and confirm whether it sends numbers or strings.
- Check that the project's runtime supports the syntax.
- Run the surrounding form and notification tests, including a manual zero input.
- Inspect the final diff for unrelated changes and keep private data out of prompts.

The deliverable is a one-line behavior change plus focused tests. Record the
actual results in your change description, including anything you did not test.

## Continue

Use the [code review checklist](/use-cases/how-to-review-ai-generated-code-before-merging/)
for a larger change, or [compare Coding Tools](/ai-tools/compare/?category=Coding%20Tools).
Save candidates in [your shortlist](/ai-tools/shortlist/) to revisit their
announcement checks on the homepage.
