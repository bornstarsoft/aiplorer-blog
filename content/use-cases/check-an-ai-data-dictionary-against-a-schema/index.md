---
title: "Check an AI Data Dictionary Against a Schema"
description: "Review a fictional equipment-loan data dictionary for the wrong unit, an invented meaning for a blank, and a misread status code."
contentType: "use-case"
workedExample: true
audience: "People checking AI-written field descriptions before sharing a dataset."
lastReviewed: "2026-11-18"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check a data dictionary"
practicePreview: "dictionary-check-inputs-v1.txt"
practiceDownloads:
  - file: "dictionary-check-inputs-v1.txt"
    label: "Data dictionary test input (TXT)"
  - file: "dictionary-check-answer-key-v1.txt"
    label: "Data dictionary review key (TXT)"
  - file: "dictionary-check-worksheet-v1.txt"
    label: "Data dictionary comparison worksheet (TXT)"
---

## Check What Each Field Means

A field description can sound reasonable without matching what the data records. In this exercise, compare three draft descriptions for a fictional equipment-loan export with its schema and sample rows.

## Get The Pack

Give the AI only the test input. Use the separate review key to check its first answer, then use the worksheet to compare a second run.

{{< resource-download file="dictionary-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="dictionary-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="dictionary-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Descriptions

| Case | Look for | What to verify |
| --- | --- | --- |
| FIELD-01 | A duration described in the wrong unit | Preserve the unit named in the schema. |
| FIELD-02 | A blank treated as a deadline decision | State what the blank records without guessing its cause. |
| FIELD-03 | A numeric code interpreted as a count | Use the schema's code mapping. |

For real work, use the schema for the exact export version. Sample rows can illustrate a definition, but they do not replace it.

Return to the [data dictionary practice pack](/use-cases/#practice-check-an-ai-data-dictionary-against-a-schema) or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).
