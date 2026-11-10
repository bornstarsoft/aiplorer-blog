---
title: "Check an AI Schedule Across Time Zones"
description: "Three fictional scheduling checks for a date rollover, a repeated local hour, and elapsed time across a clock change."
contentType: "use-case"
workedExample: true
audience: "People reviewing AI-drafted meeting times and handoffs across time zones."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check time zones"
practicePreview: "schedule-check-inputs-v1.txt"
practiceDownloads:
  - file: "schedule-check-inputs-v1.txt"
    label: "Schedule test input (TXT)"
  - file: "schedule-check-answer-key-v1.txt"
    label: "Schedule review key (TXT)"
  - file: "schedule-check-worksheet-v1.txt"
    label: "Schedule comparison worksheet (TXT)"
---

## Check The Date As Well As The Time

A schedule can look right while landing on the wrong day or lasting longer
than expected. For each confirmed time, record the calendar date, named
time zone and UTC offset. If the source gives two possible instants, leave
the time unconfirmed rather than picking the more convenient one.

This fictional exercise uses supplied offsets for specific dates, not a live
calendar or a captured AI run. Use a text-only conversation with no calendar
connection. Do not send invites or change events for this exercise.

## Get The Pack

Give the AI only the test input. Keep the review key separate, and retain the
first response before asking for a correction.

{{< resource-download file="schedule-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="schedule-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="schedule-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Review Three Scheduling Traps

| Case | Draft error | What the evidence supports |
| --- | --- | --- |
| SCH-01 | Friday at 09:00 in Seoul | Friday 17:00 in Los Angeles on November 6 is Saturday, November 7 at 10:00 in Seoul. |
| SCH-02 | One confirmed New York time at 01:30 | November 1 at 01:30 can be 05:30 or 06:30 UTC. Ask which occurrence was intended. |
| SCH-03 | A one-hour New York handoff | 00:30 at UTC-04:00 to 01:30 at UTC-05:00 on November 1 spans two hours. |

In SCH-03, compare the corresponding UTC times, 04:30 and 06:30. Subtracting
the local clock readings would miss the repeated hour. In SCH-02, neither
candidate is confirmed, so calculating both does not resolve the ambiguity.

## Compare Your Next Run

When the tool or prompt changes, repeat the same input and check each
outcome separately. Keep the output and worksheet in an approved location.
If you have no comparable previous run, record a baseline.

Return to the [schedule practice pack](/use-cases/#practice-check-an-ai-schedule-across-time-zones)
or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).

For real appointments, verify time-zone conversions for the actual date
using an up-to-date calendar, confirm ambiguous times with the organizer,
and check recurrence and invite recipients before sending. Do not reuse
the offsets from this example for other dates.
