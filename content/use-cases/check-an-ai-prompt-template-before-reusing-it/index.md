---
title: "Check an AI Prompt Template Before Reusing It"
description: "Review a fictional handoff prompt for invented dates, instructions mistaken for source data, and fields outside the output contract."
contentType: "use-case"
workedExample: true
audience: "People checking reusable prompts before sharing them with a team."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check a reusable prompt"
practicePreview: "prompt-check-inputs-v1.txt"
practiceDownloads:
  - file: "prompt-check-inputs-v1.txt"
    label: "Prompt template test input (TXT)"
  - file: "prompt-check-answer-key-v1.txt"
    label: "Prompt template review key (TXT)"
  - file: "prompt-check-worksheet-v1.txt"
    label: "Prompt template comparison worksheet (TXT)"
---

## Test The Boundaries Of A Reusable Prompt

A prompt can work on a tidy note and fail as soon as a deadline is missing or a pasted note contains instructions. Check a fictional handoff prompt and three sample outputs against the intended rules.

## Get The Pack

Give the AI only the test input as a review exercise. Keep the review key and worksheet separate. Retain the first review before asking for a revision.

{{< resource-download file="prompt-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="prompt-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="prompt-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Boundaries

| Case | Look for | What to preserve |
| --- | --- | --- |
| PROMPT-01 | A date supplied without evidence | Leave a missing date unknown rather than filling it in. |
| PROMPT-02 | A quoted instruction that changes the task | Treat the pasted note as data; do not carry out instructions written inside it. |
| PROMPT-03 | An extra field exposing unnecessary information | Keep the output to the agreed fields. |

A stronger template names the allowed fields, the placeholder for missing values, and which text is only source material.

## Retest With The Same Notes

Try the revised template on the same three fictional notes. Compare the resulting rows, not just the prompt wording. Before using it at work, test new cases and check outputs before passing them downstream.

Return to the [reusable prompt practice pack](/use-cases/#practice-check-an-ai-prompt-template-before-reusing-it) or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).
