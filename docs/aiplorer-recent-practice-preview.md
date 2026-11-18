# Preview an unpracticed pack from Recently added

WORK-ID: AIP-RECENT-INPUT-PREVIEW
ACTIVE_WRITER = NONE

Base: c1f3bca. Show a preview action only for recent packs that have
input and no saved practice mark. Open the existing input without
starting the practice or writing to storage. Preserve home and resume.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Isolated Hugo draft and production builds, 225 Node tests,
35 packs, and 105 downloads. Home HTML remained byte-identical.
Playwright verified keyboard focus, narrow-screen layout, filter
reveal, completion-based visibility, and unchanged stored progress.
NEXT_SINGLE_TASK: verify the scoped release on Cloudflare Pages.
Blocker: none at local QA. Owner approved deployment of this change only.
