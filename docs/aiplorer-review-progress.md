# Review round progress

WORK-ID: AIP-REVIEW-PROGRESS
ACTIVE_WRITER = NONE

Base: f0e1e3e. Owner approved one new practice, visible round progress,
and deployment. Preserve the home page, resume data, and practice marks.

Count distinct finished reviews in the current round. Remaining reviews
are the currently practiced packs not yet reviewed in that round.
Show both counts on the active review and in the review chooser.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Isolated Hugo draft and production builds, 216 Node tests,
24 practice packs and 72 downloads. Production home output matched the
base byte for byte. Playwright verified count changes, keyboard reset,
and unchanged storage at mobile and desktop widths.
NEXT_SINGLE_TASK: verify the new practice and round counts on Pages.
Blocker: none at local QA. Owner approved scoped deployment only.
