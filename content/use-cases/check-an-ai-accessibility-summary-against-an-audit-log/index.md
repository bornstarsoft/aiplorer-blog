---
title: "Check an AI Accessibility Summary Against an Audit Log"
description: "Use a fictional sign-up form audit to catch a clean automated scan reported as a pass, a fix marked verified without a retest, and an untested screen reader claim."
contentType: "use-case"
workedExample: true
audience: "People reviewing AI-written accessibility test summaries before handing them to a team."
lastReviewed: "2026-11-18"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check an accessibility summary"
practicePreview: "audit-check-inputs-v1.txt"
practiceDownloads:
  - file: "audit-check-inputs-v1.txt"
    label: "Accessibility summary test input (TXT)"
  - file: "audit-check-answer-key-v1.txt"
    label: "Accessibility summary review key (TXT)"
  - file: "audit-check-worksheet-v1.txt"
    label: "Accessibility summary comparison worksheet (TXT)"
---

## Match Each Claim To A Test

An accessibility recap can sound reassuring while omitting a manual finding or claiming a check that nobody ran. Compare three draft claims about a fictional workshop sign-up form against the audit log.

## Get The Pack

Give the AI only the test input. Use the separate review key to check the first answer, then compare a second run using the worksheet.

{{< resource-download file="audit-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="audit-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="audit-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Claims

| Case | Look for | What to preserve |
| --- | --- | --- |
| AUDIT-01 | An automated result presented as a complete pass | State what the scan covered and include the manual failure. |
| AUDIT-02 | A change marked verified before a retest | Distinguish a proposed fix from an observed pass on the specified build. |
| AUDIT-03 | Untested behavior reported as working | Say which checks were not run. Do not assume that the result was a pass or a fail. |

For real work, keep the build, test method, observed result, and next check together. A summary of a limited audit is not proof that every user can complete the task.

Return to the [accessibility summary practice pack](/use-cases/#practice-check-an-ai-accessibility-summary-against-an-audit-log) or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).
