# Shortlist Restore Safety

ACTIVE_WRITER = NONE

Owner approved exact-file implementation, validation, commit and GitHub /
Cloudflare deployment. Base HEAD: 8fac8c8. Preserve 28 existing owner WIP
files. Home layout, public tool claims, reset history and drafts are unchanged.

Scope: summarize sanitized incoming backup before any replacement, require
confirmation even for an empty shortlist, verify storage writes and attempt
rollback on failure. Explain browser transfer and backup boundaries. No cloud
sync or new account/storage schema. Cross-tab writes are not transactional;
guide advises closing other site tabs during restore.

Last AI: CODEX. DONE: restore summary, verified writes with best-effort rollback,
stale file-read protection, contextual transfer guide and 12 restore tests.

QA PASS: 73 Node tests; isolated Hugo draft build followed by clean minified
production build; shortlist, reading-navigation, production-post-URL,
Change Watch and reset-history validators; sitemap/RSS XML parsing. New guide
is linked from backup controls and present in the sitemap. Eight existing
draft tool routes remain absent from production output and sitemap.

Browser QA PASS: empty-list confirmation, cancellation without mutation,
accepted two-tool restore, reload persistence and JSON backup download with
notes/checks/test dates intact. Guide checked at 1280, 390 and 320 pixels with
no horizontal overflow. Home layout remains unchanged.

The reading-navigation validator must run on the production build, not Hugo
server output: server URL escaping caused an assertion which passed after
restoring clean production output. Existing legacy-post raw-HTML warning
remains unchanged; no legacy post was edited.

HEAD/WIP: release contains only the six files for this task; 28 pre-existing
owner WIP files remain excluded. Owner approved commit and GitHub/Cloudflare
deployment. NEXT_SINGLE_TASK: verify the committed release on production.
BLOCKER: none. Deployment outcome is reported with the final commit hash in
the task result, not assumed from local validation.
