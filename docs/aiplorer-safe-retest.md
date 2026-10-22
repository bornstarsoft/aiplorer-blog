# Safe Retest Restart

ACTIVE_WRITER = NONE

## Scope

- Keep home unchanged; improve the existing saved-candidate Reset action.
- Confirm before clearing one candidate's checks, preserving notes, dates, stages and other candidates.
- Re-read after confirmation and verify persistence; report failures without claiming success.
- Refresh checkboxes on browser return and storage clear.
- Add a short guide for preserving prior evidence before a new evaluation.
- Preserve 28 owner WIP files and unpublished tool pages.
- Owner-approved GitHub web deployment uses the existing Cloudflare integration.

LAST_AI: CODEX (AIP-SAFE-RETEST).
DONE: confirmed, persistence-verified reset and linked evidence-preservation guide.
HEAD/WIP: based on 3fe2b3b; six scoped files; 28 owner WIP files excluded.
QA PASS: 112 Node tests, including cancel, isolated reset, confirmation-time
changes, malformed/blocked storage, quota and silent-write failures, browser
return and storage clear. Hugo draft/production builds, shortlist, reading,
291 legacy post URLs, change/reset validators and XML checks passed. Production
contains the guide and link; eight unpublished tools remain excluded.
Browser QA: native confirmation cancel/accept, note/date/stage/other-candidate
preservation, keyboard focus, 1280/390/320px layouts and guide rendering passed.
No home sections, tool claims or public tool pages changed. Existing raw-HTML
warning in the untouched 2025-11-07 legacy post remains.
NEXT_SINGLE_TASK: verify the new commit and guide on production after GitHub push.
BLOCKER: none. Owner approved implementation, validation and deployment.
