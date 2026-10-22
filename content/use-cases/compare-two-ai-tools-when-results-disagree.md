---
title: "Compare Two AI Tools When Results Disagree"
description: "Use the same task and a clear acceptance check to turn conflicting AI results into a useful next test."
contentType: "use-case"
workedExample: true
audience: "People comparing saved AI candidates for a repeatable work task."
lastReviewed: "2026-10-23"
reviewStatus: "reviewed"
draft: false
---

## Define The Decision Before The Test

A polished answer and a faithful answer are not always the same answer.
When two candidates disagree, compare their outputs against your source
and acceptance criteria, not against each other as if one must be right.

This is a fictional editorial exercise, not a benchmark of named services.
The task is to draft a short client update from approved project notes.
The acceptance check is simple: preserve the dates, distinguish proposed
work from approved work, and do not invent a commitment.

## Give Both Candidates The Same Input

```text
Source:
The demo is proposed for 12 November, pending client confirmation.
The export fix passed our sample test. Wider testing is still pending.
We have not approved a delivery date.

Task:
Write a client update in no more than 80 words using only these notes.
Keep uncertainty explicit. Do not add promises or a delivery date.
```

Use the same source and instructions for each candidate. Record relevant
settings and any follow-up prompts so a difference in setup does not look
like a difference in product quality. Do not upload real client material
without the required permission.

## Inspect The Difference

| Fictional output | What the source check shows | Decision for this draft |
| --- | --- | --- |
| A: "Your demo is confirmed for 12 November. The export fix is complete." | Turns a proposal into a commitment and omits pending wider testing | Do not send; correct both statements |
| B: "The demo is proposed for 12 November, awaiting confirmation. The export fix passed a sample test; wider testing remains pending." | Preserves the uncertainty and test boundary in this example | Continue human review before sending |

Output B clears this exercise's factual check. That does not establish
that candidate B is generally better, faster or safer. Neither response
establishes privacy suitability, licensing, plan fit or reliability on
different inputs. A completed checklist is not a product score.

## Leave Separate Notes For The Next Visit

Keep detailed evidence in an approved location. Store a short, non-sensitive
reminder with each saved candidate:

```text
Candidate A
Task: proposed-demo update, same source and prompt as B.
Observed: invented confirmation; omitted wider-testing caveat.
Next check: repeat with a different uncertain schedule; inspect commitments.

Candidate B
Task: proposed-demo update, same source and prompt as A.
Observed: kept proposal and testing caveat in this one draft.
Next check: conflicting dates in the source; require a clarification question.
```

Record the actual test date. Keep setup changes and human corrections
visible; do not erase a failure when a follow-up prompt repairs it. If
both candidates fail a required check, keep both under evaluation or stop
the trial rather than picking a winner by default.

## Return With One Unanswered Question

Continue in [your saved comparison](/ai-tools/compare/?view=shortlist).
Open the candidate's evaluation to read the previous note before running
the next task. Browser-local notes are not shared team records or a backup;
avoid storing secrets or private source text in them.

Before extending a small trial, use the
[pilot-result review](/use-cases/check-an-ai-pilot-result-before-expanding/)
to separate what you observed from what remains untested.
