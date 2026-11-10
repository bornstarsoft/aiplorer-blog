---
title: "Check an AI FAQ Against a Support Policy"
description: "Review a fictional customer support FAQ for a superseded return window, a missing exception, and an unsupported refund promise."
contentType: "use-case"
workedExample: true
audience: "People reviewing AI-drafted help content against approved support policies."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check a support FAQ"
practicePreview: "faq-check-inputs-v1.txt"
practiceDownloads:
  - file: "faq-check-inputs-v1.txt"
    label: "Support FAQ test input (TXT)"
  - file: "faq-check-answer-key-v1.txt"
    label: "Support FAQ review key (TXT)"
  - file: "faq-check-worksheet-v1.txt"
    label: "Support FAQ comparison worksheet (TXT)"
---

## Check What The FAQ Promises

A clear support answer can still quote an outdated rule or promise an outcome the support team has not approved. In this exercise, compare three draft answers with the current policy for a fictional stationery store.

## Get The Pack

Give the AI only the test input. Keep the review key and worksheet separate so you can check the first answer before asking for revisions.

{{< resource-download file="faq-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="faq-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="faq-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Compare Three Answers

| Case | What to check | What a corrected answer should do |
| --- | --- | --- |
| FAQ-01 | Which policy version applies? | Use the current return window and count from delivery. |
| FAQ-02 | Does a general rule have an exception? | Preserve the separate review path for damaged custom items. |
| FAQ-03 | Is a remedy guaranteed or decided after review? | Tell the customer what to submit without promising a refund. |

Different phrasing is fine. The answer should preserve the rule, its exceptions, and who decides the outcome.

## Retest With The Same Policy

Use the same sources and questions for each run. Record whether the answer identifies the current rule, preserves the exception, and avoids inventing a promise. For real help content, confirm the version with the policy owner and use fictional order details during testing.

Return to the [support FAQ practice pack](/use-cases/#practice-check-an-ai-faq-against-a-support-policy) or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).

For a related check on claims made from customer feedback, try the
[survey summary practice](/use-cases/check-an-ai-survey-summary-against-response-counts/).
