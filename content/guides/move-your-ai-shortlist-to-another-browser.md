---
title: "Move Your AI Shortlist to Another Browser"
description: "Keep your saved tools and evaluation notes when changing browsers, without mistaking a local backup for account sync."
contentType: "guide"
audience: "People returning to saved AI tool evaluations on a different browser or device."
lastReviewed: "2026-10-23"
reviewStatus: "reviewed"
draft: false
---

## Keep The Original Until You Have Checked The Copy

Aiplorer's shortlist lives in browser storage, not an account. A different
browser does not automatically have your saved tools or notes. Before clearing
site data or moving devices, open [your shortlist](/ai-tools/shortlist/) in
the original browser and expand **Backup and restore**.

Choose **Download backup** for a restorable JSON file. **Download brief**
creates a readable decision document, not a restorable backup. Keep the
original browser data until the restored copy has been checked.

## Know What Moves

The shortlist backup contains saved tool paths, candidate checks, decision
stages, private test notes, local test dates and the shortlist's stage/date
views. It does not contain:

- Announcement read checks or Change Watch filter preferences.
- Reset-history checkpoints or recent search state.
- Vendor accounts, projects, subscriptions or tool outputs.

The file is not encrypted by Aiplorer. It may contain notes and reveal which
tools you are evaluating. Keep it in an approved location and transfer it using
a method appropriate for that information. Do not place secrets, customer
data or confidential content in shortlist notes or in a shared backup.

## Inspect The Restore Before Accepting

In the destination browser, open [the shortlist](/ai-tools/shortlist/) and
expand **Backup and restore**. If that browser already has useful data,
download its own backup first. Close other Aiplorer tabs during the restore
to avoid competing edits to the same browser storage.

Choose **Restore backup**, select your JSON file, then inspect the confirmation:

- Incoming saved-tool count and a sample of tool names.
- Counts of notes, test dates and completed candidate checks.
- Tools omitted because they are not in the current reviewed directory.
- The current saved-tool count that will be replaced.

Accept only if this is the intended file and destination. Restore replaces
the local evaluation data; it does not merge two shortlists. Cancel if you
need to preserve the destination data first. A file with no currently
recognized tools cannot be restored.

## Check One Known Candidate

After a successful restore, choose a tool whose previous note you recognize.
Expand its candidate evaluation and compare the note, stage, checks and local
test date with your original. Reload the page and confirm the data remains.
If a restored filter hides a candidate, clear the shortlist filters.

For example, a fictional two-tool shortlist might have one candidate in
Testing with a short sample-result note, and one still Researching. Confirm
those distinctions survived; do not turn all checks on just to match a count.
Restored dates and checks are your own records, not new tests or fresh vendor
verification.

If storage is blocked or full, do not assume a restore succeeded. Keep the
backup and follow the error message. If recovery cannot be verified, inspect
the destination data before retrying or clearing anything. A local file is
still useful even when a browser cannot save it.

## Continue From The Unresolved Question

Return to the candidate's next test, not just its saved status. Use the
[small retest exercise](/use-cases/retest-a-saved-ai-tool-after-an-update/)
if an announcement affects your workflow.

Your announcement read checks are separate from this backup, so a new browser
may show notices as unread. Review [Change Watch](/ai-tools/review-updates/#tool-changes)
without treating that count as a new vendor event or a failed restore.
