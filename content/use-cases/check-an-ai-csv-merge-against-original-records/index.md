---
title: "Check an AI CSV Merge Against Original Records"
description: "Review three fictional CSV merges for a lost leading zero, a conflicting duplicate, and a row dropped because it has no match."
contentType: "use-case"
workedExample: true
audience: "People checking AI-merged CSVs before using the result in a report or importing it."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check a CSV merge"
practicePreview: "merge-check-inputs-v1.txt"
practiceDownloads:
  - file: "merge-check-inputs-v1.txt"
    label: "CSV merge test input (TXT)"
  - file: "merge-check-answer-key-v1.txt"
    label: "CSV merge review key (TXT)"
  - file: "merge-check-worksheet-v1.txt"
    label: "CSV merge comparison worksheet (TXT)"
---

## Check The Rows That Do Not Join Cleanly

A merged table can look tidy while combining separate IDs or dropping
records. Compare the result against the exact key values and the rule
for missing or conflicting matches.

This exercise uses fictional CSV snippets and a stated merge rule.
It does not run an import or use real records.

## Get The Pack

Give the AI only the test input. Keep the review key and worksheet
separate, and retain the first answer before requesting corrections.

{{< resource-download file="merge-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="merge-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="merge-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Merge Boundaries

| Case | Draft error | What to preserve |
| --- | --- | --- |
| MERGE-01 | IDs 007 and 7 were treated as the same number. | Match exact text. Keep both original rows and their distinct owners. |
| MERGE-02 | The merge chose one of two conflicting owners for K12. | Keep the base row with the owner unresolved and flag the conflict for review. |
| MERGE-03 | L3 was dropped because the owner table had no match. | Keep L3 and leave the owner blank. A missing match is not a reason to drop a base row. |

Check the keys and the affected fields, not just the total row count.
An unchanged count can still hide an owner assigned to the wrong ID.

## Compare A Later Review

Reuse the same records and merge rule. Compare which IDs, blanks and
conflicts each answer preserves. Keep the original response before
asking for a repair.

Return to the [CSV merge pack](/use-cases/#practice-check-an-ai-csv-merge-against-original-records)
or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).

For a real import, use an approved sample and inspect the resulting IDs
and row count in the destination. The
[data extraction practice](/use-cases/test-ai-data-extraction-with-missing-values/)
offers a related check for missing values before a merge.
