# Surface Change Watch follow-ups in the saved-tools list

WORK-ID: AIP-SHORTLIST-FOLLOW-UP-LINKS
ACTIVE_WRITER = NONE

Base: 0d91479. Owner approved a shortlist improvement and scoped
production deployment. Keep the homepage, RSS, and unrelated WIP unchanged.

Count only follow-ups for currently saved tools, regardless of evaluation
filters on the shortlist. Hide the aggregate and per-tool links when
empty. Link to Change Watch without imposing an unread filter, and never
write to browser storage from the shortlist announcements panel.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Hugo draft/production builds, 247 Node tests, scoped link and
fingerprint validation, and byte-identical home and Change Watch RSS.
Playwright verified read and unread follow-ups, navigation, refresh after
returning, and layout at 320, 390, and 1280 pixels.
NEXT_SINGLE_TASK: verify the scoped deployment on Cloudflare Pages.
Blocker: none at local QA. Owner approved scoped production deployment.
