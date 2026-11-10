---
title: "Check an AI Incident Timeline Against an Event Log"
description: "Review three fictional incident claims for an inferred start, an unconfirmed cause, and a partial recovery reported as complete."
contentType: "use-case"
workedExample: true
audience: "People reviewing AI-drafted incident notes, status updates, or operational handoffs."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check an incident timeline"
practicePreview: "incident-check-inputs-v1.txt"
practiceDownloads:
  - file: "incident-check-inputs-v1.txt"
    label: "Incident timeline test input (TXT)"
  - file: "incident-check-answer-key-v1.txt"
    label: "Incident timeline review key (TXT)"
  - file: "incident-check-worksheet-v1.txt"
    label: "Incident timeline comparison worksheet (TXT)"
---

## Separate The Observation From The Explanation

A timeline should distinguish the first recorded report from the actual
start, a nearby change from an established cause, and a working check
from full recovery. Match each claim to what the event log records.

This exercise uses a fictional workflow and event log. It does not
describe an actual outage or establish the status of any service.

## Get The Pack

Give the AI only the test input. Keep the review key and worksheet
separate, and retain the first answer before requesting corrections.

{{< resource-download file="incident-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="incident-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="incident-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Timeline Claims

| Case | Draft claim | What the log supports |
| --- | --- | --- |
| INC-01 | The incident began at 09:12 UTC. | The first report was recorded at 09:12 UTC. The onset is unknown. |
| INC-02 | The 09:05 UTC configuration change caused the failures. | The change preceded the first report. Its role has not been established. |
| INC-03 | Service was fully restored at 09:42 UTC. | New jobs passed a sample check, but the earlier backlog had not been verified. |

Keep all verified timestamps and make the gaps explicit. For INC-03,
specify the scope of the passing check instead of deleting useful
evidence or declaring the incident over.

## Compare A Later Review

Reuse the same log and draft. Compare which timestamps, observations
and uncertainties each answer preserves. Record which next check
would turn an open question into evidence.

Return to the [incident timeline pack](/use-cases/#practice-check-an-ai-incident-timeline-against-an-event-log)
or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).

For real work, confirm the timeline with the incident owner before
sharing a status update. The
[automation testing workflow](/use-cases/how-to-test-an-ai-automation-before-relying-on-it/)
covers making errors visible and keeping a manual fallback.
