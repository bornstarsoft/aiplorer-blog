---
title: "Check an Automation Before Retrying"
description: "Three fictional ticket-routing cases to check whether an AI assistant distinguishes a duplicate, an unknown result, and a genuinely new request."
contentType: "use-case"
workedExample: true
audience: "People reviewing app-connected automations before enabling retries or expanding a pilot."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check an automation retry"
practicePreview: "retry-check-inputs-v1.txt"
practiceDownloads:
  - file: "retry-check-inputs-v1.txt"
    label: "Retry test input (TXT)"
  - file: "retry-check-answer-key-v1.txt"
    label: "Retry review key (TXT)"
  - file: "retry-check-worksheet-v1.txt"
    label: "Retry comparison worksheet (TXT)"
---

## A Timeout Is Not A Failed Write

An automation tries to create a ticket, but the response times out. It may
have created the ticket before the response was lost. Retrying blindly can
create a duplicate; suppressing every similar-looking request can lose work.
Before either action, check which request the evidence belongs to.

This fictional exercise checks an assistant's reasoning about three records.
It does not run an automation, call a connector, or test a real ticket system.
Use a text-only conversation without connected actions.

## Get The Pack

Send only the input file. It contains the simulated request records and the
task. Keep the review key and worksheet separate, and save the first response
before requesting a correction.

{{< resource-download file="retry-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="retry-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="retry-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Review Three Cases

In this exercise, the action key is the request ID plus the action name.
Two deliveries with different delivery IDs can still represent one action.
Matching titles alone do not establish that two requests are the same.

| Case | Supplied evidence | Expected decision |
| --- | --- | --- |
| R-01 | The same request was redelivered. Its action key already maps to mock ticket T-401. | Reuse T-401. Do not propose another creation. |
| R-02 | The write timed out. There is no reliable record of whether it landed. | Hold the retry. Verify the destination by action key; escalate if the result stays uncertain. |
| R-03 | A different approved request has the same title as T-401 but its own key and no previous attempt. | Recommend one simulated creation for that key. Do not reuse T-401. |

Check the evidence, not just the decision label. An answer that says
"verify first" but claims it already checked the destination is still wrong:
the file contains no such result. Likewise, a missing result in a delayed
search index would not by itself prove that a write failed.

## Repeat The Same Check Later

Use the worksheet to record the original input, first response, visible
settings and decision for each case. On a later visit, repeat the unchanged
pack after a relevant change to your assistant or workflow instructions.
Keep corrected responses separate. If you have no previous output, record
a baseline rather than calling the new result an improvement.

[Choose your next check based on the result](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).
Bookmark the [practice shelf entry](/use-cases/#practice-check-an-automation-before-retrying)
to reopen the same inputs, or leave a non-sensitive reminder in
[My Shortlist](/ai-tools/shortlist/). Keep full evidence in an approved location.

## Before Enabling Real Retries

A passing answer does not prove the workflow prevents duplicate writes.
In an isolated test destination, simulate repeated delivery, overlapping
workers and a timeout after a write. Inspect the actual number of created
records. Use a destination-supported duplicate-prevention control or an
atomic reservation for the action key; a separate lookup followed by a write
can still race. Confirm recovery behavior before enabling automatic retries.

Start with the [automation test checklist](/use-cases/how-to-test-an-ai-automation-before-relying-on-it/).
Keep real customers, credentials, payments and production write permissions
out of the exercise.
