---
title: "Check an AI Image Edit Against a Brief"
description: "Review three fictional image edits for a change outside the approved area, an altered label, and an object invented during background expansion."
contentType: "use-case"
workedExample: true
audience: "People reviewing AI-assisted edits before using a product image or publishing a design."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check an image edit"
practicePreview: "image-edit-check-inputs-v1.txt"
practiceDownloads:
  - file: "image-edit-check-inputs-v1.txt"
    label: "Image edit test input (TXT)"
  - file: "image-edit-check-answer-key-v1.txt"
    label: "Image edit review key (TXT)"
  - file: "image-edit-check-worksheet-v1.txt"
    label: "Image edit comparison worksheet (TXT)"
---

## Check What Was Supposed To Stay The Same

A polished image can still be wrong for its brief. Compare the output
with the approved source, including the areas that were meant to stay
unchanged. A corrected blemish does not excuse a changed product detail.

This text-only exercise uses invented briefs and review notes. There are
no actual images or observed model results.

## Get The Pack

Give the AI only the test input. Keep the review key and worksheet
separate, and retain the first answer before requesting corrections.

{{< resource-download file="image-edit-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="image-edit-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="image-edit-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Edit Boundaries

| Case | What the draft changed | What the brief allows |
| --- | --- | --- |
| IMG-01 | The scuff disappeared, but the product's blue trim became gray. | Remove only the scuff on the background. Preserve the trim. |
| IMG-02 | Glare was reduced, but the label changed from Batch 04 to Batch 40. | Reduce glare without changing any label text. |
| IMG-03 | The right margin was extended and a cable appeared. | Extend only the plain background. The source had no cable. |

Separate the edit that worked from the change that still needs correction.
For IMG-02, readable lettering is not enough; compare it character by
character with the approved source.

## Repeat With The Same Brief

Reuse the same brief and review notes. Compare which changes each
response accepted, rejected, or left unverified. Start a baseline if
you do not have an earlier comparable review.

Return to the [image edit practice pack](/use-cases/#practice-check-an-ai-image-edit-against-a-brief)
or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).

For real work, inspect the source and actual export side by side, including
text, borders and the intended crop. Confirm approval for the specific
assets and destination. See the
[creative workflow guide](/guides/how-to-plan-a-multimodal-ai-creative-workflow/)
for broader source and rights checks.
