---
title: "Check an AI Translation Against a Product Glossary"
description: "Review a fictional Spanish quick-start card for a mismatched button label, a reversed safety instruction, and an incorrect measurement."
contentType: "use-case"
workedExample: true
audience: "People reviewing AI-translated product instructions against approved terminology and the source."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check a product translation"
practicePreview: "glossary-check-inputs-v1.txt"
practiceDownloads:
  - file: "glossary-check-inputs-v1.txt"
    label: "Translation test input (TXT)"
  - file: "glossary-check-answer-key-v1.txt"
    label: "Translation review key (TXT)"
  - file: "glossary-check-worksheet-v1.txt"
    label: "Translation comparison worksheet (TXT)"
---

## Review Meaning And Terminology

A translation can read smoothly but send readers to the wrong button or tell them to do the opposite of the source. In this exercise, review three lines from a fictional Spanish quick-start card against the English source and the product glossary.

## Get The Pack

Give the AI only the test input. Keep the review key and worksheet separate, and save the first answer before requesting corrections.

{{< resource-download file="glossary-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="glossary-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="glossary-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Translation Boundaries

| Case | Compare | What to verify |
| --- | --- | --- |
| TERM-01 | Translated button label and glossary | Use the approved label verbatim so the reader can find the control. |
| TERM-02 | Action, negation, and timing | Preserve the prohibition while the indicator is flashing. |
| TERM-03 | Quantity and unit together | Preserve the original distance. Changing the unit label alone changes the instruction. |

An alternative sentence is fine if it preserves the instruction, uses the exact approved button label, and keeps the source measurement.

## Retest With The Same Inputs

Reuse the same glossary and source lines. Compare each answer against the review key and record which errors it missed or introduced. For real releases, confirm labels against the shipped interface and send safety-critical instructions to a qualified reviewer before publishing.

Return to the [product translation practice pack](/use-cases/#practice-check-an-ai-translation-against-a-product-glossary) or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).
