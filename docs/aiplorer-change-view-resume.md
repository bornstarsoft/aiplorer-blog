# Returning To Change Watch

ACTIVE_WRITER = NONE

Owner approved implementation, exact-file commit and GitHub / Cloudflare
production deployment. Base HEAD: 0ad3524. Preserve 28 existing WIP files.
Home, tool claims, reset history, drafts and legacy post URLs are out of scope.

Plan: remember explicitly changed announcement filters locally. Explicit
filter links and direct announcement anchors take priority over remembered
filters. Clear filters removes the preference, not saved tools or read state.
Add a short guide to the existing public RSS feed, including coverage and
read-state limitations. No new subscription backend, scheduled job or account.

Last AI: CODEX. WORK-ID: AIPLORER-CHANGE-RESUME. DONE: implementation and
local release validation. The new aiplorer-change-view-v1 key contains only
version, tool, topic, saved-only and unread-only filters. It is written only
after a filter interaction, not from opening a shared link. Clear filters
removes this preference without touching shortlist or read-state keys.
Unknown options are ignored; unavailable storage leaves controls usable.
Other tabs do not unexpectedly switch the view. Browser history follows its
URL, and direct announcement anchors bypass the saved preference.

The RSS guide documents the existing feed implementation, not a new service:
all recorded tools, revision-specific identifiers, month-only events without
invented publication days, and independent reader/browser read state.
No external reader endorsements or new vendor/product claims were added.

QA PASS: all 55 repository test cases; isolated Hugo 0.152.2 production build using
--cleanDestinationDir --gc --minify; shortlist, reading navigation, 291 post
URLs, 61 change records, 64 reset records and XML feed/sitemap validators.
Playwright verified leave/return persistence, explicit-link precedence,
direct-record visibility, clear, RSS loading and 320/390px layouts.
Screenshots reviewed at desktop and mobile sizes; no page errors. The exact
staged snapshot also passed a draft build followed by a clean production
build, with all eight existing draft tool routes and sitemap entries absent.
Existing legacy raw-HTML build warning is unchanged.

HEAD/WIP: based on 0ad3524; this six-file release awaits commit. The 28 owner
WIP files remain excluded and unchanged.
NEXT_SINGLE_TASK: push the exact-file release and verify Cloudflare and the
public watch, RSS guide and feed. BLOCKER: none. Owner approved deployment.
