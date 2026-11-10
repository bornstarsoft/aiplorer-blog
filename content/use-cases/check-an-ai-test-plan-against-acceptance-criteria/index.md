---
title: "Check an AI Test Plan Against Acceptance Criteria"
description: "Review three fictional test cases for a hidden default assumption, a missing reload check, and a cancel test that ignores stored state."
contentType: "use-case"
workedExample: true
audience: "People checking an AI-generated test plan before relying on it for a release or pilot."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check a test plan"
practicePreview: "test-plan-check-inputs-v1.txt"
practiceDownloads:
  - file: "test-plan-check-inputs-v1.txt"
    label: "Test plan review input (TXT)"
  - file: "test-plan-check-answer-key-v1.txt"
    label: "Test plan review key (TXT)"
  - file: "test-plan-check-worksheet-v1.txt"
    label: "Test plan comparison worksheet (TXT)"
---

## Check The Test, Not Just Its Name

A test called "settings saved" can pass without showing that anything
persisted. For each acceptance criterion, check the starting state,
the action, and the observable result that would detect a failure.

This exercise uses a fictional preference screen and test plan. It
does not run tests against a real application.

## Get The Pack

Give the AI only the test input. Keep the review key and worksheet
separate, and retain the first answer before requesting corrections.

{{< resource-download file="test-plan-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="test-plan-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="test-plan-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Review Three Acceptance Checks

| Case | What the draft checks | What would detect the failure |
| --- | --- | --- |
| TEST-01 | A profile with an existing saved preference opens with notifications off. | Open a fresh profile with no saved preference and verify that notifications default to off. |
| TEST-02 | The switch appears on immediately after Save. | Start with off, turn it on, save, reload the same profile, and verify it still shows on. |
| TEST-03 | The dialog closes after Cancel. | Start with a saved on setting, change it to off without saving, cancel, and verify that reopening and reloading still show on. |

For TEST-03, the dialog can close even if the draft change was
incorrectly applied. Check the state the user returns to.

## Compare A Later Review

Reuse the same acceptance criteria and draft cases. Compare which
checks each answer adds and whether those checks could catch the
specified failure. Keep the proposed test separate from an actual
test result.

Return to the [test plan pack](/use-cases/#practice-check-an-ai-test-plan-against-acceptance-criteria)
or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).

For a real pilot, run the verified cases in the intended environment
and record actual results and gaps. The
[pilot-result review](/use-cases/check-an-ai-pilot-result-before-expanding/)
helps distinguish that evidence from a broader release decision.
