# Open input from the review recap

WORK-ID: AIP-RECAP-PREVIEW
ACTIVE_WRITER = NONE

Base: 66d0a6b. Owner approved one new practice, input preview from
the completed review recap, and deployment. Preserve home, stored
practice state, completion marks, and unrelated work.

Recap links open the existing input preview and focus its summary.
They do not start a review or write practice progress.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Isolated Hugo draft and production builds, 218 Node tests,
26 practice packs, and 78 downloads. Production home output matched
the base byte for byte. Playwright verified mouse and keyboard previews,
filtered card reveal, and unchanged saved and in-round progress.
NEXT_SINGLE_TASK: verify the survey pack and recap links on Pages.
Blocker: none at local QA. Owner approved scoped deployment only.
