---
title: "Check an AI Process Guide Against a Workflow"
description: "Review a fictional event signage guide for an early production step, a missing exception, and a handoff assigned to the wrong person."
contentType: "use-case"
workedExample: true
audience: "People checking AI-drafted procedures against an approved workflow."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check a process guide"
practicePreview: "workflow-check-inputs-v1.txt"
practiceDownloads:
  - file: "workflow-check-inputs-v1.txt"
    label: "Process guide test input (TXT)"
  - file: "workflow-check-answer-key-v1.txt"
    label: "Process guide review key (TXT)"
  - file: "workflow-check-worksheet-v1.txt"
    label: "Process guide comparison worksheet (TXT)"
---

## Walk Through The Decisions

A numbered procedure can read well while putting a step before its approval or losing an exception. In this exercise, compare an AI-drafted event signage guide with a fictional team's approved workflow.

## Get The Pack

Give the AI only the test input. Keep the review key and worksheet separate so you can check the first answer before requesting revisions.

{{< resource-download file="workflow-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="workflow-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="workflow-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Compare Three Steps

| Case | Look for | What to preserve |
| --- | --- | --- |
| FLOW-01 | Work sent before the right version is approved | Send only the proof version that the event lead explicitly approved. |
| FLOW-02 | A straight path where the process has an exception | Hold when a venue detail is missing; get the corrected proof approved. |
| FLOW-03 | A handoff assigned to the wrong role | Keep pickup with the venue coordinator and close the task only after their confirmation. |

Walk through the normal path and the exception separately. Check who acts and what evidence lets the process move forward.

## Retest With The Same Workflow

Reuse the same workflow and draft. Note whether each run preserves the approval, exception, and handoff. For a real procedure, confirm each decision with its owner before adopting the rewrite.

Return to the [process guide practice pack](/use-cases/#practice-check-an-ai-process-guide-against-a-workflow) or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).

For another handoff check, try the
[reusable prompt practice](/use-cases/check-an-ai-prompt-template-before-reusing-it/)
to test which details the AI keeps, leaves unknown, or should omit.
