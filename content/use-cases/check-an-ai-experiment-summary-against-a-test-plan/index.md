---
title: "Check an AI Experiment Summary Against a Test Plan"
description: "Use a fictional signup test to catch a cohort mix-up, an unsupported conclusion, and a rollout recommendation that ignores a stop rule."
contentType: "use-case"
workedExample: true
audience: "People checking an AI-written experiment recap before deciding what to ship."
lastReviewed: "2026-11-18"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check an experiment summary"
practicePreview: "experiment-check-inputs-v1.txt"
practiceDownloads:
  - file: "experiment-check-inputs-v1.txt"
    label: "Experiment summary test input (TXT)"
  - file: "experiment-check-answer-key-v1.txt"
    label: "Experiment summary review key (TXT)"
  - file: "experiment-check-worksheet-v1.txt"
    label: "Experiment summary comparison worksheet (TXT)"
---

## Check The Plan Before The Verdict

A recap can report a real improvement and still recommend the wrong next step. Compare three claims about a fictional workshop signup test with the plan and the results. The plan specifies who counts, which outcome matters, and when to pause.

## Get The Pack

Give the AI only the test input. Use the separate review key to check its first answer, then compare it with a second run using the worksheet.

{{< resource-download file="experiment-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="experiment-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="experiment-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Claims

| Case | Look for | What to verify |
| --- | --- | --- |
| TEST-01 | Staff trial traffic counted as eligible | Compare the groups named in the plan. |
| TEST-02 | More confirmations reported as more attendance | Name the measured outcome and what is not known. |
| TEST-03 | Rollout recommended despite a stop rule | Apply the guardrail before proposing a rollout. |

For real work, keep observed results separate from the decision. Confirm the eligible group, primary outcome, and stop rules with the test owner before sharing a recommendation.

Return to the [experiment summary practice pack](/use-cases/#practice-check-an-ai-experiment-summary-against-a-test-plan) or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).
