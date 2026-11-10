---
title: "Check AI Release Notes Against a Change Log"
description: "Review three fictional release notes for an overstated rollout, a workaround mistaken for a fix, and planned work reported as shipped."
contentType: "use-case"
workedExample: true
audience: "People reviewing an AI-drafted product update or deciding what their team needs to retest."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check release notes"
practicePreview: "release-check-inputs-v1.txt"
practiceDownloads:
  - file: "release-check-inputs-v1.txt"
    label: "Release notes test input (TXT)"
  - file: "release-check-answer-key-v1.txt"
    label: "Release notes review key (TXT)"
  - file: "release-check-worksheet-v1.txt"
    label: "Release notes comparison worksheet (TXT)"
---

## Check What Actually Changed

A release summary should distinguish who can use a change, what problem
remains, and what has not shipped. Match each claim to the latest
applicable entry in the supplied change log.

This exercise uses a fictional product and records. It is not an actual
release announcement or a test of any AI provider.

## Get The Pack

Give the AI only the test input. Keep the review key and worksheet
separate, and retain the first answer before requesting corrections.

{{< resource-download file="release-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="release-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="release-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Check Three Release Claims

| Case | Draft claim | What the change log supports |
| --- | --- | --- |
| REL-01 | Everyone can use the new layout. | Only invited test workspaces with the preview enabled have it. No general rollout date was announced. |
| REL-02 | Batch export has been fixed. | Batch export still fails on the recorded sample. Individual export is the documented temporary workaround for that sample. |
| REL-03 | Scheduled summaries shipped in the release. | They remain planned and are not in this release. No date is confirmed. |

Keep the useful part of the notice. For REL-02, report both the open
problem and the temporary option; do not promise that the option works
for every workflow.

## Repeat With The Same Change Log

Reuse the three records on a later run. Compare whether each answer
preserves rollout scope, unresolved issues, and planned status. Record
a baseline if no comparable earlier answer exists.

Return to the [release notes practice pack](/use-cases/#practice-check-ai-release-notes-against-a-change-log)
or [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check).

For real announcements, verify the current official notice and the
scope for your account before acting. Use the
[team check-in workflow](/use-cases/turn-ai-tool-updates-into-a-team-check-in/)
to decide what your team should verify or retest.
