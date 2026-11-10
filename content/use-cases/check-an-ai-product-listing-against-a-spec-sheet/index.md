---
title: "Check an AI Product Listing Against a Spec Sheet"
description: "Review a fictional product listing for a specification copied from another variant, an incorrect unit, and unsupported compatibility."
contentType: "use-case"
workedExample: true
audience: "People checking AI-drafted catalog listings before publishing them."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check a product listing"
practicePreview: "listing-check-inputs-v1.txt"
practiceDownloads:
  - file: "listing-check-inputs-v1.txt"
    label: "Product listing test input (TXT)"
  - file: "listing-check-answer-key-v1.txt"
    label: "Product listing review key (TXT)"
  - file: "listing-check-worksheet-v1.txt"
    label: "Product listing comparison worksheet (TXT)"
---

## Check The Exact Variant

A listing can borrow a real detail from the wrong product. In this exercise, compare three AI-drafted claims about a fictional drawer organizer with the approved specification for the exact SKU.

## Get The Pack

Give the AI only the test input. Keep the review key and worksheet separate to check the first answer before trying a correction.

{{< resource-download file="listing-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="listing-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="listing-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Claims

| Case | Look for | What to preserve |
| --- | --- | --- |
| SPEC-01 | A pack quantity from a neighboring SKU | Use the quantity for the exact listed variant. |
| SPEC-02 | A number with a different unit | Keep the width and unit together as stated in the sheet. |
| SPEC-03 | An unsupported fit claim | Use the verified fit only. Do not infer fit for untested drawers. |

Keep the SKU next to each fact during review. Shared branding or a similar name does not make variants interchangeable.

## Retest With The Same Sheet

Compare which claims each run corrects and whether it introduces new ones. For a real listing, confirm that the source sheet is current and leave unverified details out until the product owner confirms them.

Return to the [product listing practice pack](/use-cases/#practice-check-an-ai-product-listing-against-a-spec-sheet) or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).

For another check on matching a draft to its source, try the
[document index practice](/use-cases/check-an-ai-document-index-against-a-file-manifest/).
