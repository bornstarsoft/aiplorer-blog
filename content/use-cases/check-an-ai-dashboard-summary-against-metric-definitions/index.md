---
title: "Check an AI Dashboard Summary Against Metric Definitions"
description: "Use fictional dashboard figures to catch a shifted denominator, confused percentage points, and an incomplete reporting period."
contentType: "use-case"
workedExample: true
audience: "People reviewing AI-written summaries of team dashboards before sharing them."
lastReviewed: "2026-11-18"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check a dashboard summary"
practicePreview: "metric-check-inputs-v1.txt"
practiceDownloads:
  - file: "metric-check-inputs-v1.txt"
    label: "Dashboard summary test input (TXT)"
  - file: "metric-check-answer-key-v1.txt"
    label: "Dashboard summary review key (TXT)"
  - file: "metric-check-worksheet-v1.txt"
    label: "Dashboard summary comparison worksheet (TXT)"
---

## Read The Definition Before The Number

A dashboard summary can get the arithmetic right and still get the story wrong. In this exercise, compare three claims from a fictional booking dashboard with the definitions and dates supplied by its owner.

## Get The Pack

Give the AI only the test input. Use the separate review key to check its first answer, then use the worksheet to compare a second run.

{{< resource-download file="metric-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="metric-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="metric-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Claims

| Case | Look for | What to preserve |
| --- | --- | --- |
| METRIC-01 | A rate that uses the wrong group | Divide by the eligible group named in the definition. |
| METRIC-02 | A difference between rates described as relative growth | Use percentage points for subtraction; name the base if giving a relative change. |
| METRIC-03 | A partial week compared with a full week | Label the partial period and wait for comparable data before claiming a trend. |

Before sharing a real dashboard summary, check the metric definition, filters, dates, and data cutoff. Do not fill in missing daily totals or infer the cause of a change from the chart alone.

Return to the [dashboard summary practice pack](/use-cases/#practice-check-an-ai-dashboard-summary-against-metric-definitions) or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).
