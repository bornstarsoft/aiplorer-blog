---
title: "Test AI Data Extraction With Missing Values"
description: "Check whether an AI-generated table preserves missing fields, tentative dates and the difference between a requester and an owner."
contentType: "use-case"
workedExample: true
audience: "People turning messages or project notes into structured work records."
lastReviewed: "2026-10-23"
reviewStatus: "reviewed"
draft: false
---

## A Complete Table Can Still Be Wrong

Before using an AI tool to turn messages into a table, include a few examples
with missing or uncertain information. A filled cell is not evidence that the
source supplied a value. An empty-looking field may be the correct result.

This is a fictional editorial exercise, not a measured result from a named
service. It uses three invented requests, with no customer or private data.

## Keep The Source Small Enough To Check

```text
R-01: Mia requests a new export button. No owner or deadline has been agreed.
R-02: Leo will check the login error by 14 November 2026.
R-03: Priya suggests 18 November 2026 for the demo; the date is not confirmed.
```

Give a candidate tool the same source and instructions each time:

```text
Extract one row per request with these columns:
ID | Requester | Assigned owner | Confirmed due date | Uncertainty

Use "Not stated" when a field is absent. Do not infer an owner from a
requester or speaker. Keep proposed dates in Uncertainty, not Confirmed due
date. Preserve every request ID. Use only the supplied text.
```

## Write The Expected Rows Before Running The Test

### R-01: A Request Is Not An Assignment

- Requester: Mia.
- Assigned owner: Not stated.
- Confirmed due date: Not stated.
- Uncertainty: No owner or deadline agreed.

### R-02: An Explicit Assignment

- Requester: Not stated.
- Assigned owner: Leo.
- Confirmed due date: 14 November 2026.
- Uncertainty: None stated.

### R-03: A Proposal Is Not A Confirmed Date

- Requester: Not stated.
- Assigned owner: Not stated.
- Confirmed due date: Not stated.
- Uncertainty: Priya proposed 18 November 2026 for the demo; unconfirmed.

Here, "None stated" means only that the sample states no uncertainty. It does
not certify the real-world schedule. Priya's suggestion does not establish
that she requested the work or was assigned to deliver it.

## Catch The Plausible Mistakes

An invented failure might look like this:

```text
R-01 | Mia | Mia | Not stated | None
R-02 | Leo | Leo | 14 November 2026 | None
R-03 | Priya | Priya | 18 November 2026 | None
```

This table looks orderly but assigns responsibilities the source did not
assign. It also promotes the proposed demo date to a confirmed deadline.
Do not pass it into a task list or send it to another person as an agreed plan.

Check each row against the source:

- Every source ID appears once, without added or merged requests.
- Requester and assigned owner stay distinct.
- Missing fields remain explicitly missing.
- Tentative dates retain their uncertainty.
- No extra deadline, priority or commitment appears.

If a follow-up prompt repairs the table, record both the original failure
and the correction. A repaired example does not establish that future
requests will be extracted correctly.

## Leave A Specific Next Check

Use an actual run to fill in a short private evaluation note. Do not copy
the fictional failure above as if it were your own observation.

```text
Task: extract three invented requests into five specified columns.
Expected: preserve IDs; no inferred owners or confirmed dates.
Observed: [record the actual output, corrections, or could not test].
Next check: two messages that revise the same request; preserve the revision.
```

Keep real messages and complete test evidence in an approved location. Use
non-sensitive reminders in [your saved evaluations](/ai-tools/shortlist/).
When returning after an update, compare against the same expected rows
before relying on the workflow again. One small successful exercise is
not a general accuracy claim or permission to process sensitive documents.

Continue with the [retest workflow](/use-cases/retest-a-saved-ai-tool-after-an-update/)
or the [two-candidate comparison](/use-cases/compare-two-ai-tools-when-results-disagree/).
To check explicitly corrected facts against unresolved disagreement, try the
[downloadable summary reference pack](/use-cases/retest-ai-summaries-with-a-reference-pack/).
