# Focused Announcement Views

ACTIVE_WRITER = NONE

Owner approval: implementation, exact-file validation, commit and GitHub /
Cloudflare deployment. Keep the homepage unchanged and preserve all existing WIP.

Scope: a tool selector and bookmarkable announcement filters using the existing
change records. Add a vendor-neutral service-change exit checklist, without
claiming that any particular service supports export or migration.

Last AI / WORK-ID: CODEX / AIPLORER-CHANGE-FOCUS.
DONE: implementation and release preparation on main, based on b3d2200.
The 28 existing WIP files remain excluded. The guide hub has owner WIP, so the
new guide is linked from Change Watch, review activity, the existing retest
example and sitemap without editing that hub.

QA PASS: 32 Node tests; isolated Hugo production build; shortlist, reading
navigation, 291 legacy post URL, change-watch and reset-history validators;
sitemap XML parse; eight drafts absent. Playwright checked tool/topic filtering,
bookmark reload, visible-only read actions, empty/reset states, saved-empty
reload, shortlist deep links, the guide and desktop/390px/320px layouts.
No page errors. Existing legacy raw-HTML warning remains unchanged.

Announcement filters preserve unrelated URL parameters. `changesSaved` avoids
overwriting the lower review-activity panel's `saved` parameter; old saved links
remain supported. Read state stays browser-local, and filtering never marks
records read. No home section, provider claims or source review dates changed.
The guide is an editorial checklist with a clearly fictional handoff exercise.

NEXT_SINGLE_TASK: push this exact-file release and verify Cloudflare and live
Change Watch, shortlist and guide. Report deployment evidence in the task result.
BLOCKER: none. Owner approval includes production deployment.
