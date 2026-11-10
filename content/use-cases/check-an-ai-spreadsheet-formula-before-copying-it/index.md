---
title: "Check an AI Spreadsheet Formula Before Copying It"
description: "Three fictional spreadsheet checks for a blank versus zero, an inclusive threshold, and a reference that drifts when filled down."
contentType: "use-case"
workedExample: true
audience: "People reviewing an AI-generated formula before applying it to a shared sheet."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check a formula"
practicePreview: "formula-check-inputs-v1.txt"
practiceDownloads:
  - file: "formula-check-inputs-v1.txt"
    label: "Formula test input (TXT)"
  - file: "formula-check-answer-key-v1.txt"
    label: "Formula review key (TXT)"
  - file: "formula-check-worksheet-v1.txt"
    label: "Formula comparison worksheet (TXT)"
---

## Test The Rows Most Likely To Break

A formula can produce a plausible answer in the first row and silently
use the wrong threshold after copying. Start in a disposable sheet with
made-up inputs and known results. This exercise uses Excel notation, not a
captured AI run or a general spreadsheet benchmark.

## Get The Pack

Give the AI only the test input. Keep the review key and worksheet separate.
Inspect the proposed formula before entering it in a blank test workbook.

{{< resource-download file="formula-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="formula-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="formula-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Boundary Cases

The sample requires review at 10 or more. The threshold is in F1, and
the count on each row comes from column B.

| Case | Sample | Expected |
| --- | --- | --- |
| FORM-01 | B2 is genuinely empty; B3 contains the number 0 | C2 is Missing; C3 is Within limit. |
| FORM-02 | B4 equals the threshold, 10 | C4 is Review, not Within limit. |
| FORM-03 | B5 is 12 and the adjacent value F4 is 99 | C5 is Review; the threshold must still come from F1. |

Check both the displayed result and the copied formula. The count
reference should move to B5 in the last row, but the threshold should
still refer to `$F$1`. Excel documents [empty-cell checks](https://support.microsoft.com/en-us/excel/functions/is-functions)
and [relative and absolute references](https://support.microsoft.com/en-us/excel/switch-between-relative-absolute-and-mixed-references).

This fixture does not cover cells with a formula returning an empty string,
text that looks numeric, spreadsheet errors or different locale syntax.
Test those separately if your real data can contain them.

## Compare Your Next Run

Keep the original proposal and the same sample rows. If you change the
tool or instructions, repeat these checks and record which row or reference
changed. Without a comparable first run, record a baseline instead.

Return to the [formula practice pack](/use-cases/#practice-check-an-ai-spreadsheet-formula-before-copying-it)
or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).
Keep test evidence in an approved location. Verify the formula with the
people responsible for the workbook before using it for real decisions.
