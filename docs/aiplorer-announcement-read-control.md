# Individual Announcement Reading

ACTIVE_WRITER = NONE

Owner approval: implement, validate, commit exact files and deploy through
GitHub / Cloudflare. Preserve 28 existing WIP files; leave home unchanged.

Scope: reuse the current browser-local announcement read key, allow individual
read/unread decisions, and add an official-source-backed permission checklist.
No account access, account-setting changes, notification or new tracking.

Last AI: CODEX. WORK-ID: AIPLORER-READ-CONTROL. DONE: implementation and
release validation on main, based on 87fcd2b. Only the eight files belonging
to this release are intended for staging; all 28 pre-existing WIP files are
excluded. No drafts, tool claims, reset records or legacy post URLs changed.

The read checkbox updates one announcement revision at a time and can be
unchecked. Existing home and shortlist unread counts use the same local key.
Other-tab and newer-page read keys are preserved; blocked browser storage
falls back to the current session. Keyboard focus moves to the next result
when an unread-only result disappears. No server account or sync is implied.

Official sources checked for the connected-app permission guide:
- https://support.google.com/accounts/answer/13533235?hl=en
- https://docs.github.com/en/apps/using-github-apps/reviewing-and-modifying-installed-github-apps
- https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/reviewing-your-authorized-oauth-apps

QA PASS: 39 automated tests; isolated Hugo 0.152.2 production build with
--cleanDestinationDir --gc --minify; shortlist, reading-navigation, legacy
post URL, change-watch and reset-history validators; XML sitemap parsing;
61 individual controls; all eight existing drafts excluded. Playwright
checks covered read/unread persistence, home and shortlist counts, keyboard
focus, empty results, contextual guide links, desktop and mobile layouts,
and 320px overflow. Existing legacy raw-HTML build warning is unchanged.

HEAD/WIP: release files await exact-file commit; owner WIP preserved.
NEXT_SINGLE_TASK: push the validated commit and verify Cloudflare Pages plus
the public change watch and guide. BLOCKER: none. Owner approved deployment.
