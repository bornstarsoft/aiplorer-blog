---
title: "Check Whether a Citation Supports a Claim"
description: "Three fictional claims to check against source excerpts: supported evidence, overstated scope and a missing source."
contentType: "use-case"
workedExample: true
audience: "People reviewing AI-assisted research and source-backed work notes."
lastReviewed: "2026-10-23"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check a citation"
practiceDownloads:
  - file: "citation-check-inputs-v1.txt"
    label: "Citation test input (TXT)"
  - file: "citation-check-answer-key-v1.txt"
    label: "Citation review key (TXT)"
  - file: "citation-check-worksheet-v1.txt"
    label: "Citation comparison worksheet (TXT)"
---

## A Reference Is Not The Evidence

A citation can look convincing without supporting the sentence beside it.
Check the claim against the actual passage, including its population, limits
and uncertainty. A missing source needs follow-up, not an invented quotation.

This is a fictional editorial exercise, not a vendor benchmark or a captured
AI run. Source IDs below refer only to this pack; they are not real papers,
URLs or academic references. No external browsing is needed for the exercise.

## Get The Pack

Send only the input file to the tool you are checking. It includes the
instruction, two source excerpts and three claims. Keep the review key and
worksheet outside the AI conversation. Save the first answer before asking
for corrections.

{{< resource-download file="citation-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="citation-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="citation-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Different Evidence Problems

| Case | Claim to inspect | Review question |
| --- | --- | --- |
| C-01 | Eight volunteers participated in the pilot [SOURCE-A]. | Does the excerpt directly support this limited claim? |
| C-02 | The workflow cut completion time by 40% for every team [SOURCE-B]. | Does the source establish the number and the scope? |
| C-03 | The workflow passed an independent security audit [SOURCE-C]. | Is the cited source actually available in the pack? |

The input contains these exact excerpts:

```text
SOURCE-A: Eight volunteers from the documentation team participated in the pilot. Participation was optional. No other team took part.
SOURCE-B: Two participants said the workflow felt faster. Completion times were not measured, and no comparison group was used.
```

The bounded request is:

```text
For each claim, use only the supplied source excerpts.
Return: Claim ID | Cited source | Outcome | Exact supporting passage or evidence gap | Narrower wording or next check.
Use one outcome: supported / not supported / source missing.
Quote only text present in the cited excerpt. Do not invent a source or fetch one.
If a source is missing, say what is unavailable; do not label the claim false.
Keep all three claim IDs, and check numbers and scope as well as the citation ID.
```

## Inspect The Reason, Not Just The Label

For C-01, the first sentence of SOURCE-A supports the stated participant
count. It does not establish that the pilot represents other teams.

For C-02, SOURCE-B reports two people's impressions, not a measured 40%
improvement or a result for every team. A narrower statement is:

> Two participants said the workflow felt faster; completion times were not measured.

For C-03, SOURCE-C was not supplied. The appropriate next step is to obtain
and inspect it before using the audit claim. Do not convert "not available
here" into "no audit exists" or "the workflow is unsafe."

These are the editorial review expectations, not observed tool results.
Accept equivalent wording when the evidence and limitations are preserved.
Reject a correct-looking label accompanied by an invented quote or an
unsupported replacement claim. The separate key lists the case checks.

## Compare A Later Run Without Losing The First

After reviewing the three cases, [choose your next check based on the result](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).

Use the worksheet to record the exact input, first output, visible settings
and a passage or gap for each case. Keep any repair prompt and corrected
answer separate. If there is no saved earlier output, this is a baseline,
not evidence of improvement after an update.

On a later visit, reuse the unchanged input when a relevant tool change or
workflow question gives you a reason to check again. Record differences in
settings or instructions. A three-case result is not a research accuracy
score, a ranking or evidence that a product update caused a change.

## Before Using Real Sources

Open the original source and verify the cited passage, context and version.
An excerpt exercise does not test source discovery, access to a full paper,
retractions, source credibility or real-world truth. A source can support a
claim while being unreliable itself. Check quotations and citations yourself
before submitting academic or professional work, following the applicable
academic integrity and workplace rules.

Use approved material and keep private documents, personal data and secrets
out of unapproved services. Academic, legal, medical, financial and other
high-stakes claims require appropriate expert review beyond this exercise.

Return to the [practice shelf](/use-cases/#practice-check-whether-a-citation-supports-a-claim)
for the same files next time, or use the
[retest workflow](/use-cases/retest-a-saved-ai-tool-after-an-update/)
to plan a comparison. Keep a short, non-sensitive reminder in
[your shortlist](/ai-tools/shortlist/); retain the full evidence in your own
approved location, not in a browser-only note.
