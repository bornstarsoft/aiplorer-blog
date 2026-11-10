---
title: "Check an AI Redaction Before Sharing"
description: "Three fictional checks for identifiers left in headings, details that identify someone in combination, and identifiers hidden in link targets."
contentType: "use-case"
workedExample: true
audience: "People reviewing an AI-redacted draft before sending it to another audience."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check redactions"
practicePreview: "redaction-check-inputs-v1.txt"
practiceDownloads:
  - file: "redaction-check-inputs-v1.txt"
    label: "Redaction test input (TXT)"
  - file: "redaction-check-answer-key-v1.txt"
    label: "Redaction review key (TXT)"
  - file: "redaction-check-worksheet-v1.txt"
    label: "Redaction comparison worksheet (TXT)"
---

## Review What The Recipient Can See

Replacing a name in the body does not necessarily remove the information
that identifies a person or record. Check the entire proposed output
against what this particular recipient needs.

This text-only exercise uses invented records, sharing rules and draft
outputs. It is not an anonymization test or an observed product result.
Do not send real private records to try it.

## Get The Pack

Send only the fictional test input to the AI. Keep the review key and
worksheet separate. Save the first response before asking for corrections.

{{< resource-download file="redaction-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="redaction-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="redaction-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Places A Detail Can Survive

| Case | What the draft missed | What the recipient needs |
| --- | --- | --- |
| RED-01 | The same account code remains in the title and footer even though the body was cleaned. | A generic title and the fact that a sample export timed out. |
| RED-02 | The named person is gone, but the combination of site and shift identifies one person in the sample roster. | The shift and the scanner issue; the site is not needed. |
| RED-03 | The label looks harmless but the Markdown link target still includes an internal record code. | A plain-text status with no link or code. |

For RED-02, removing the site is enough for the rules of this exercise.
That does not establish that the remaining details are safe in a different
audience or alongside other records.

## Compare Your Next Run

Repeat the same input after a tool or instruction changes. Compare what
the first output missed, which details it retained, and what needed a
manual correction. Record a baseline when no comparable earlier run exists.

Return to the [redaction pack](/use-cases/#practice-check-an-ai-redaction-before-sharing)
or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).

Before sending a real file, inspect what the recipient can actually open,
including link destinations, metadata, comments and embedded content as
applicable. This text exercise does not inspect those file properties.
Use the [decision brief review guide](/guides/review-an-ai-tool-decision-brief-before-sharing/)
for a related handoff checklist.
