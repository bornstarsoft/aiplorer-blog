---
title: "Check an AI Survey Summary Against Response Counts"
description: "Review a fictional survey summary for a wrong denominator, double-counted respondents, and a claim that goes beyond the sample."
contentType: "use-case"
workedExample: true
audience: "People reviewing AI summaries of survey results before sharing them."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check a survey summary"
practicePreview: "survey-check-inputs-v1.txt"
practiceDownloads:
  - file: "survey-check-inputs-v1.txt"
    label: "Survey summary test input (TXT)"
  - file: "survey-check-answer-key-v1.txt"
    label: "Survey summary review key (TXT)"
  - file: "survey-check-worksheet-v1.txt"
    label: "Survey summary comparison worksheet (TXT)"
---

## Trace Each Claim To Its Count

A survey summary can quote real numbers and still describe the wrong group. In this exercise, compare three draft claims with the response counts from a fictional pilot of a shared project planner.

## Get The Pack

Give the AI only the test input. Use the separate review key to check the first answer before asking for corrections. Keep the worksheet for comparing two runs.

{{< resource-download file="survey-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="survey-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="survey-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Claims

| Case | Look for | What to preserve |
| --- | --- | --- |
| SURV-01 | A share reported for the wrong group | Name the question, the number who answered it, and the missing responses. |
| SURV-02 | People counted twice in a multiple-choice question | Report each choice separately unless the overlap is known. |
| SURV-03 | A claim about people who were not surveyed | Keep the observation within the group that answered the question. |

Prefer a count with its group over a percentage without a denominator. Leave an unknown overlap unknown.

## Retest With The Same Response Table

Reuse the same counts and draft claims. Note whether each run corrects the numbers without overstating the result. For real reports, check how respondents were recruited and use approved aggregate data instead of raw comments or respondent identifiers.

Return to the [survey summary practice pack](/use-cases/#practice-check-an-ai-survey-summary-against-response-counts) or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).
