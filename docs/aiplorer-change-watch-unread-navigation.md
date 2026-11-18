# Navigate unread Change Watch records without marking them read

WORK-ID: AIP-CHANGE-WATCH-UNREAD-NAV
ACTIVE_WRITER = NONE

Base: 7640e70. Owner approved a scoped quality-of-life change and
production deployment. Keep home, announcement data, and unrelated WIP unchanged.

Start with the first visible unread record and advance to later unread
records within the current filters. Navigation is temporary and does not
edit the URL, the remembered view, the shortlist, or read status.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Hugo draft/production builds, 236 Node tests, 61 Change Watch
records, valid RSS, and unchanged home HTML. Playwright verified filtered
keyboard navigation, return focus, unchanged records, and 320/390/1280px.
NEXT_SINGLE_TASK: verify the scoped deployment on Cloudflare Pages.
Blocker: none at local QA. Owner approved scoped production deployment.
