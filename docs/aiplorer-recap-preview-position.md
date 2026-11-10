# Show position in the review input preview

WORK-ID: AIP-RECAP-POSITION
ACTIVE_WRITER = NONE

Base: 9f94629. Owner approved a new practice, a position indicator
for completed-round previews, and deployment. Preserve home,
saved practice state, completion marks, and unrelated work.

Show the one-based position and total from the completed recap.
Preview navigation updates the label without writing progress.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Isolated Hugo draft and production builds, 221 Node tests,
30 practice packs, and 90 downloads. Home output matched the base
byte for byte. Playwright verified the position in both directions,
return and reset cleanup, responsive fit, and unchanged progress.
NEXT_SINGLE_TASK: verify the listing pack and preview position on Pages.
Blocker: none at local QA. Owner approved scoped deployment only.
