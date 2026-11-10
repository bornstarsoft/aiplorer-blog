# Jump to a reviewed input

WORK-ID: AIP-RECAP-PICKER
ACTIVE_WRITER = NONE

Base: 3fdb5e0. Owner approved one new practice, a selector for completed
round previews, and deployment. Preserve home, stored practice state,
completion marks, and unrelated work.

List only the entries in the completed recap. Selection is local to the
preview; the Open input command navigates without writing progress.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Isolated Hugo draft and production builds, 222 Node tests,
31 practice packs, and 93 downloads. Production home output matched
the base byte for byte. Playwright verified direct jumps, keyboard
activation, responsive fit, return focus, and unchanged progress.
NEXT_SINGLE_TASK: verify the manifest pack and recap picker on Pages.
Blocker: none at local QA. Owner approved scoped deployment only.
