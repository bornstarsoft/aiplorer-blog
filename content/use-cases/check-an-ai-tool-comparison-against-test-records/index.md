---
title: "Check an AI Tool Comparison Against Test Records"
description: "Review a fictional comparison for unequal test inputs, an unrun check reported as a failure, and a stale result presented as current."
contentType: "use-case"
workedExample: true
audience: "People reviewing AI-generated comparisons before choosing or retesting a tool."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check a tool comparison"
practicePreview: "comparison-check-inputs-v1.txt"
practiceDownloads:
  - file: "comparison-check-inputs-v1.txt"
    label: "Comparison test input (TXT)"
  - file: "comparison-check-answer-key-v1.txt"
    label: "Comparison review key (TXT)"
  - file: "comparison-check-worksheet-v1.txt"
    label: "Comparison review worksheet (TXT)"
---

## Review The Evidence Before The Conclusion

A comparison can look complete even if the candidates did different
work, a required test never ran, or a passing result belongs to an
earlier setup. Check the records behind each claim before repeating it.

This exercise uses invented tools and test records. It is not a product
ranking or a benchmark.

## Get The Pack

Give the AI only the test input. Keep the review key and worksheet
separate, and retain the first answer before requesting corrections.

{{< resource-download file="comparison-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="comparison-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="comparison-check-worksheet-v1.txt" label="Download review worksheet (.txt)" >}}

## Check Three Comparison Claims

| Case | Claim to check | What the records support |
| --- | --- | --- |
| CMP-01 | Cedar is faster than Slate. | Both times were observed, but for different input sizes. Rerun the same task with the same input before comparing speed. |
| CMP-02 | Slate failed the content check. | The input could not be submitted. There is no Slate output to evaluate. |
| CMP-03 | Cedar passes with the current preset. | The pass was recorded with the earlier preset only. Test the current preset before claiming a current pass. |

Keep the measured times, the access blocker, and the historical pass.
Correcting the comparison does not require throwing out the underlying
evidence or declaring a winner.

## Compare A Later Review

Use the same input on a later run. Compare which records the AI preserved,
which claims it limited, and which next tests it proposed. Without a
comparable earlier answer, start a baseline.

Return to the [comparison practice pack](/use-cases/#practice-check-an-ai-tool-comparison-against-test-records)
or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).

For a real evaluation, keep original outputs and test conditions in an
approved location. See the [two-tool comparison workflow](/use-cases/compare-two-ai-tools-when-results-disagree/)
for a repeatable way to investigate different outputs.
