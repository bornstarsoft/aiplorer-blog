---
title: "Check an AI File Rename Plan Before Applying It"
description: "Review three fictional rename proposals for a destination collision, an extension changed without conversion, and a file outside the approved folder."
contentType: "use-case"
workedExample: true
audience: "People reviewing an AI-generated batch rename before applying it to files."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check a file rename plan"
practicePreview: "rename-check-inputs-v1.txt"
practiceDownloads:
  - file: "rename-check-inputs-v1.txt"
    label: "Rename plan test input (TXT)"
  - file: "rename-check-answer-key-v1.txt"
    label: "Rename plan review key (TXT)"
  - file: "rename-check-worksheet-v1.txt"
    label: "Rename plan comparison worksheet (TXT)"
---

## Compare Before And After Paths

An orderly rename list can still overwrite a file, mislabel its format,
or affect an item outside the approved folder. Review the source and
destination together before applying changes.

This text-only exercise uses fictional file paths. Do not run commands
or rename real files for this exercise.

## Get The Pack

Give the AI only the test input. Keep the review key and worksheet
separate, and retain the first answer before requesting corrections.

{{< resource-download file="rename-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="rename-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="rename-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Rename Boundaries

| Case | What the draft missed | What to verify |
| --- | --- | --- |
| NAME-01 | Two source files would take the same destination name. | Preserve both originals. Confirm distinct names and check existing destinations before applying the plan. |
| NAME-02 | A PNG would get a JPG extension without conversion. | Keep the PNG extension. Treat format conversion as a separate operation that needs approval. |
| NAME-03 | The plan includes a file in an unapproved archive folder. | Exclude it. Check each full path against the approved scope, not just the filename. |

Check the plan as a whole. A destination can be valid for one row
and still collide with another proposed row.

## Compare A Later Review

Reuse the same mapping and approval rules. Compare which changes
each answer would block, correct, or leave pending. Do not record
a proposed mapping as a completed rename.

Return to the [rename plan practice pack](/use-cases/#practice-check-an-ai-file-rename-plan-before-applying-it)
or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).

For real work, review a dry run on an approved sample and confirm how
to recover the original names before changing files. See the
[file handoff practice](/use-cases/check-an-ai-file-handoff-before-switching-tools/)
for a related check on preserving originals and verifying the destination.

For a similar check on whether wording matches the source, try the
[product translation practice](/use-cases/check-an-ai-translation-against-a-product-glossary/).
