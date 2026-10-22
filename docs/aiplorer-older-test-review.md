# Revisit Older Local Tests

ACTIVE_WRITER = NONE

Base HEAD: 17565a1. Keep home unchanged and preserve 28 unrelated owner WIP files.
Add a neutral 30-calendar-day local-test view, shared with focused exports,
restore/view preferences and return refresh. Missing dates remain distinct.
Add guidance for deciding whether old test evidence needs another check.
No vendor claims, rankings, automatic reminders, new tools or draft publication.

Owner approved implementation, validation and deployment under the established
web GitHub/Cloudflare exception.

## Validation And Handoff

- LAST_AI: CODEX; WORK_ID: AIP-OLDER-TESTS; implementation DONE.
- QA PASS: 144 Node tests including age boundaries, invalid/future/missing
  dates, stage intersection, calendar-date transitions, return refresh,
  focused export without state writes, and backup restoration of the new view.
- QA PASS: isolated Hugo draft build followed by clean minified production build.
- QA PASS: shortlist, reading navigation, 291 legacy post URLs, change-watch,
  reset-history and XML validators; new guide present and eight drafts excluded.
- QA PASS: Chromium filtering, persisted view on reload and actual focused
  download; 1280px, 390px and 320px layouts without horizontal overflow.
- QA PASS: screenshots inspected, guide links return 200, no console errors.
- Existing raw-HTML warning in an untouched legacy post remains unchanged.
- HEAD/WIP: base 17565a1 plus this exact seven-file release; home and 28 owner
  WIP files unchanged. No automatic reminders or assertions of tool staleness.
- BLOCKER: none. Production verification pending at commit time.
- NEXT_SINGLE_TASK: push this release and verify Cloudflare plus the live filter.
