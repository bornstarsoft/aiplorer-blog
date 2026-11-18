# Reopen completed recent inputs

WORK-ID: AIP-RECENT-INPUT-REOPEN
ACTIVE_WRITER = NONE

Base: 604ff58. Owner approved one new practice and scoped deployment.
Keep the homepage, stored progress, and review rounds unchanged.

Completed recent packs get a read-only preview shortcut. It returns
focus to its source and does not join unpracticed preview navigation.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Hugo draft and production builds, 234 Node tests, 41 packs,
123 downloads, and byte-identical home HTML. Playwright verified repeat
preview, keyboard return, unchanged records, and 320/390/1280px layouts.
NEXT_SINGLE_TASK: verify the scoped change on Cloudflare Pages.
Blocker: none at local QA. Owner approved scoped production deployment.
