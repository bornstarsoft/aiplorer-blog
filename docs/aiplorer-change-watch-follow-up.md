# Keep Change Watch notices for follow-up

WORK-ID: AIP-CHANGE-WATCH-FOLLOW-UP
ACTIVE_WRITER = NONE

Base: 419bf36. Owner approved this focused improvement and production
deployment. Keep home, announcement/RSS data, and unrelated WIP unchanged.

Track follow-ups independently of read status. Use the stable notice ID
so a revision can become unread again without losing its follow-up flag.
The optional filter combines with the existing saved, unread, tool, and
topic filters. Store flags only in the current browser.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Hugo draft/production builds, 244 Node tests, 64 announcement
records, and byte-identical home and Change Watch RSS. Playwright checked
revisit restoration, independent read state, direct links, and keyboard
flow at 320, 390, and 1280 pixels.
NEXT_SINGLE_TASK: verify this scoped release on Cloudflare Pages.
Blocker: none at local QA. Owner approved scoped production deployment.
