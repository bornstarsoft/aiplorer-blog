---
title: "Check an AI Troubleshooting Guide Against a Runbook"
description: "Review a fictional photo export help article for a risky first step, repeated retries, and the wrong escalation instructions."
contentType: "use-case"
workedExample: true
audience: "People reviewing AI-written troubleshooting articles before sharing them with customers."
lastReviewed: "2026-11-18"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check a troubleshooting guide"
practicePreview: "runbook-check-inputs-v1.txt"
practiceDownloads:
  - file: "runbook-check-inputs-v1.txt"
    label: "Troubleshooting guide test input (TXT)"
  - file: "runbook-check-answer-key-v1.txt"
    label: "Troubleshooting guide review key (TXT)"
  - file: "runbook-check-worksheet-v1.txt"
    label: "Troubleshooting guide comparison worksheet (TXT)"
---

## Check the Step and the Stop Rule

A troubleshooting article can sound decisive while sending readers down the wrong branch. Compare an AI-written export guide for a fictional photo library with its approved support runbook. Look for the first safe step, when a retry is allowed, and what support actually needs.

## Get the Pack

Give the AI only the test input. Use the separate review key to check the answer and the worksheet to compare another run.

{{< resource-download file="runbook-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="runbook-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="runbook-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

| Case | What to verify |
| --- | --- |
| HELP-01 | The first check preserves existing exports and source files. |
| HELP-02 | A temporary error gets at most one retry. |
| HELP-03 | A write error goes to support with non-sensitive diagnostics, not a photo archive. |

For a real help article, confirm the procedure against the runbook for the product version and test it with a disposable sample project.

Return to the [troubleshooting guide practice pack](/use-cases/#practice-check-an-ai-troubleshooting-guide-against-a-runbook) or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).
