# Practice status in Recently added

WORK-ID: AIP-RECENT-PRACTICE-STATUS
ACTIVE_WRITER = NONE

Base: feac2e9. Owner approved a new practice, recent-pack status,
and deployment without changing home, resume, or progress.

Show the existing completion mark next to each recent link. Do not
store a second status. Hide labels when browser storage is unavailable.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Isolated Hugo draft and production builds, 224 Node tests,
34 packs, and 102 downloads. Home HTML remained byte-identical.
Playwright verified both labels, immediate mark changes, responsive fit,
and preserved resume and stored state after opening the article.
NEXT_SINGLE_TASK: verify the scoped release on Cloudflare Pages.
Blocker: none at local QA. Owner approved deployment of this change only.
