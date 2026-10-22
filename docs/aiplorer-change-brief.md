# Public Announcement Brief

ACTIVE_WRITER = NONE

Owner approved implementation, validation, exact-file commit and GitHub /
Cloudflare deployment. Base HEAD: dbcaa35. Preserve 28 owner WIP files.
Home, tool claims, reset data, drafts and legacy posts are out of scope.

Scope: download only currently visible announcements as a plain-text brief,
including public dates, summaries, checks and official-source links. Do not
include private notes, write reading state or imply that checks were performed.
Add a clearly fictional team check-in example. No new storage, account,
automatic monitoring or email service.

Last AI: CODEX. WORK-ID: AIPLORER-CHANGE-BRIEF. DONE: implementation and local
validation. Export reads rendered public fields, preserves month-only dates,
and distinguishes export time from source-check dates. It exports exactly
the visible records in order, with public source and record links plus a blank
next-step prompt. It neither reads private notes nor writes browser storage.
The plain-text download uses the existing site's Blob/download pattern,
cleans up temporary resources, and reports request/failure rather than
claiming the user saved the file. Empty views disable export.

The worked example is explicitly fictional: slide export and repository
permission notices become questions, evidence requirements and an unresolved
next step. No new vendor facts, rankings or automatic decisions were added.

QA PASS: 61 unit tests; isolated Hugo 0.152.2 production build; shortlist,
reading navigation, 291 legacy post routes, 61 announcement records and
64 reset records validators. Actual browser downloads contained only the
selected three/two records, source links and unchanged reading state.
Desktop/mobile screenshots reviewed. An initial 320px table overflow was
fixed by replacing the four-column table with two short example sections;
320px article/watch recheck passed. Existing legacy raw-HTML warning remains.
The exact staged snapshot passed all 61 tests, draft build, clean production
restore, XML validation and eight-draft exclusion checks. Production record
URLs resolve to https://aiplorer.com/ rather than the local test server.

HEAD/WIP: based on dbcaa35; seven intended files await release commit.
All 28 owner WIP files excluded. NEXT_SINGLE_TASK: push and verify Cloudflare
plus public download and example.
BLOCKER: none. Owner approved deployment.
