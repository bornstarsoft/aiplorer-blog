---
title: "Check AI Captions Against a Reference"
description: "Three fictional caption checks for a missing negation, a changed identifier, and a speaker who cannot be verified."
contentType: "use-case"
workedExample: true
audience: "People reviewing captions or transcript excerpts before sharing a recording or using it for follow-up."
lastReviewed: "2026-11-10"
reviewStatus: "reviewed"
draft: false
practiceTask: "Check captions"
practicePreview: "caption-check-inputs-v1.txt"
practiceDownloads:
  - file: "caption-check-inputs-v1.txt"
    label: "Caption test input (TXT)"
  - file: "caption-check-answer-key-v1.txt"
    label: "Caption review key (TXT)"
  - file: "caption-check-worksheet-v1.txt"
    label: "Caption comparison worksheet (TXT)"
---

## Correct The Caption, Not The Speaker

A fluent caption can reverse an instruction or attach it to the wrong
person. Review the wording and the speaker label separately. When the
reference does not resolve a detail, keep the uncertainty visible.

This text-only exercise uses fictional, timestamped excerpts and a reference
transcript supplied with the input. There is no audio file or captured model
run. It checks whether a reviewer preserves evidence, not how well a tool
recognizes speech or synchronizes captions.

## Get The Pack

Send only the input file. Keep the review key and worksheet separate, and
save the first response before requesting a correction.

{{< resource-download file="caption-check-inputs-v1.txt" label="Download test input (.txt)" >}}

{{< resource-download file="caption-check-answer-key-v1.txt" label="Download review key (.txt)" >}}

{{< resource-download file="caption-check-worksheet-v1.txt" label="Download comparison worksheet (.txt)" >}}

## Review Three Caption Errors

| Case | Draft caption | What to check |
| --- | --- | --- |
| CAP-01 | "Do publish the sample today." | The reference says "Do not publish the sample today." Restore the negation. |
| CAP-02 | "Use test ticket Q-510." | The reference says Q-501. Copy the identifier exactly. |
| CAP-03 | "Mara: I will check the export." | The words are verified, but the speaker is not. Use an unknown-speaker label; do not assign the work to Mara. |

For CAP-03, an acceptable caption is **"Unknown speaker: I will check the
export."** Leave the attribution unresolved until there is better evidence.
Removing the whole caption would also lose verified words.

Keep the supplied time ranges in all three cases. They identify where to
inspect the recording; without audio, there is no basis to shift them.

## Return With The Same Input

Keep the exact input and first output with your worksheet. Record any later
corrections separately. After changing tools or instructions, repeat the same
pack and compare each error type. Without a comparable earlier answer,
record a baseline instead of claiming improvement.

Return to the [caption practice shelf entry](/use-cases/#practice-check-ai-captions-against-a-reference)
and [choose your next check](/use-cases/retest-a-saved-ai-tool-after-an-update/#choose-your-next-check)
based on the evidence you have.

## Review The Recording Before Sharing

For a real caption file, replay the affected segment with the approved
recording and check timing, speaker changes and important sounds. Verify the
export in the intended player before sharing. The text exercise cannot
establish speech-recognition accuracy or the readability of the actual file.

Use only approved recordings and destinations. See the
[meeting tool review guide](/guides/how-to-use-ai-meeting-tools-responsibly/)
before uploading or sharing a transcript.
