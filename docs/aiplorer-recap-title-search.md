# Find a reviewed input by title

WORK-ID: AIP-RECAP-TITLE-SEARCH
ACTIVE_WRITER = NONE

Base: 10a0028. Owner approved one practice, title search within the
completed review recap, and deployment. Preserve home, stored
practice state, completion marks, and unrelated work.

Match title words case-insensitively in recap order. A unique match
can be opened with Enter; no match never changes the active input.
Search stays local to the preview and does not write progress.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Isolated Hugo draft and production builds, 223 Node tests,
32 practice packs, and 96 downloads. Home output matched the base
byte for byte. Playwright verified title filtering, empty results,
keyboard activation, responsive fit, and unchanged progress.
NEXT_SINGLE_TASK: verify the transcript practice and search on Pages.
Blocker: none at local QA. Owner approved scoped deployment only.
