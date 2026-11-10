---
title: "Check an AI Slide Chart Before Sharing"
description: "Three fictional slide checks for the right denominator, percentage-point changes, and observations that must not become forecasts."
contentType: "use-case"
workedExample: true
audience: "People reviewing AI-assisted slides or reports before sharing them with a team or client."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Review a slide chart"
practicePreview: "chart-check-inputs-v1.txt"
practiceDownloads:
  - file: "chart-check-inputs-v1.txt"
    label: "Chart test input (TXT)"
  - file: "chart-check-answer-key-v1.txt"
    label: "Chart review key (TXT)"
  - file: "chart-check-worksheet-v1.txt"
    label: "Chart comparison worksheet (TXT)"
---

## Review The Claim Behind The Chart

A chart can use the right numbers and still make the wrong claim. Check
who was counted, which unit describes the change, and which points were
actually measured. Do this before refining the slide's design.

This text-only exercise uses fictional data, not a captured product test.
It checks how an assistant reviews a draft chart description; it does not
measure export compatibility or chart rendering.

## Get The Pack

Send only the test input. Keep the review key and worksheet outside the
conversation. Save the first response before requesting corrections.

{{< resource-download file="chart-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="chart-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="chart-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Slide Claims

| Case | Draft claim | What the source supports |
| --- | --- | --- |
| V-01 | 60% of invitees finished onboarding. | 12 of 20 respondents reported finishing (60%). There were 50 invitees; the other 30 outcomes are unknown. |
| V-02 | Completion rose by 10%. | The measured share moved from 40% to 50%, a rise of 10 percentage points. No cause was established. |
| V-03 | December had 36 requests. | October had 24 and November had 30. December was not measured, so omit it from the observed series. |

An acceptable correction for V-02 is **"Completion rose from 40% to 50%,
up 10 percentage points."** A relative increase of 25% is also
mathematically valid when clearly labeled, but it is not the requested
percentage-point headline. Neither form establishes why completion changed.

Check the values and labels together. For example, replacing "invitees"
with "respondents" in V-01 does not help if the chart still labels its
denominator as 50. For V-03, an unknown value is not zero.

## Return With The Same Input

Use the worksheet to retain the first output, visible settings and evidence
for each case. Repeat the same pack after a relevant change to the tool or
instructions. If you have no comparable earlier output, record a baseline
instead of an improvement.

Return to the [practice shelf entry](/use-cases/#practice-check-an-ai-slide-chart-before-sharing)
for the same input. Then [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check)
based on what the output preserved or changed.

## Check The Actual Export Separately

Open the exported slide in the recipient's application. Check chart labels,
axis units, missing values, readable source notes and whether the data can
be edited as required. A passing text review does not prove the file will
open or that the graphic matches the reviewed description.

Use the [presentation handoff checklist](/guides/ai-presentation-client-handoff-checklist/)
for that test. Keep private data out of unapproved services and retain your
completed worksheet in an approved location.
