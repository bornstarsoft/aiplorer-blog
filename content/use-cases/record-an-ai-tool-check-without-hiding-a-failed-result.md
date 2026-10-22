---
title: "Record an AI Tool Check Without Hiding a Failed Result"
description: "A worked example of keeping completed review steps separate from passing results, so a later visit starts with useful evidence."
contentType: "use-case"
audience: "People evaluating saved AI tools and returning to unfinished decisions."
lastReviewed: "2026-10-23"
reviewStatus: "reviewed"
draft: false
---

## The Situation

You return to a saved tool and see three checked boxes. What actually worked?
The boxes record steps you performed, not a score or approval. A review can be
complete and still uncover a reason not to use the output.

This fictional example uses invented project notes, not a test of any named
service. It shows what to leave behind for your next visit.

## Use An Input With A Visible Failure Case

Give a candidate the same short task: turn these notes into action items without
inventing a commitment.

> Morgan may review the draft on Thursday. The launch date is not agreed.
> Casey owns the checklist. No owner has been assigned to the final approval.

Suppose the generated result says:

> Morgan will approve the launch on Thursday. Casey owns final approval.

You have performed the task and reviewed its output, but the output failed:
possibility became certainty, review became approval, and ownership was invented.

## Record The Step And Its Result Separately

In [your shortlist](/ai-tools/shortlist/), open the candidate evaluation. If you
actually performed the category task and reviewed the output, those two steps
can be checked. Do not check privacy or plans merely to complete the set.

Leave a short private test note such as:

```text
Task: extract actions from invented project notes.
Observed: turned a possible review into a firm approval and invented an owner.
Decision: not suitable for sending without line-by-line review.
Next: repeat with an explicit rule to preserve uncertainty and unassigned owners.
```

Record your actual local test date. Keep the candidate in Testing if you still
have an unresolved question. A stage or four checked boxes is not evidence of
security, accuracy or fitness for production.

## Leave A Reliable Return Point

After changing a box, check its local save feedback. If the page cannot verify
the save, inspect the displayed boxes and retry when browser storage is available.
Do not assume an unsaved action will survive a reload. Saving here is local to
this browser, not account sync or a server backup.

Keep only non-sensitive observations. A downloaded backup is a separate file;
protect it, and do not assume it contains an action the page could not save.
For longer evidence, use your own approved records rather than putting private
source material in the short note.

On the next visit, read the failure and next question before resetting anything.
Use the [safe restart guide](/guides/restart-an-ai-tool-evaluation-without-losing-context/)
to preserve the earlier result, or prepare a
[focused review brief](/use-cases/prepare-a-focused-ai-tool-review/).

## A Useful Follow-Up Is Narrow

Repeat the same invented input with the revised instruction. Compare each
commitment and owner against the source. Record what changed and what still
fails; one corrected example is not general proof of reliability.

You now have a reason to return: answer the specific unresolved question, not
collect another check mark.
