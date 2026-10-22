# Focused Decision Brief

ACTIVE_WRITER = NONE

Base HEAD: 4db8201. Keep home unchanged and preserve 28 unrelated owner WIP files.
Allow a readable brief of all saved candidates or just the current stage/date
view. Show scope/count, retain private-note opt-in and full JSON backups, and
never change evaluation or read state on export. Add a small review-session
example. No new vendor claims, tools or draft publication.

Owner approved implementation, validation and deployment using the established
web GitHub/Cloudflare exception.

## Validation And Handoff

- LAST_AI: CODEX; WORK_ID: AIP-FOCUSED-BRIEF; implementation DONE.
- QA PASS: 136 Node tests including seven new focused-export cases. Stage/date
  intersection, empty scope, all-list fallback, return refresh, no data writes,
  private-note exclusion and full backup behavior are covered.
- QA PASS: isolated Hugo draft build followed by clean minified production build.
- QA PASS: shortlist, reading navigation, 291 legacy post URLs, change-watch and
  reset-history validators; XML sitemap/RSS parse; eight draft tools excluded.
- QA PASS: actual Chromium downloads include only the intended scope and omit
  private notes by default; export leaves browser data unchanged.
- QA PASS: desktop 1280px and mobile 390px/320px screenshots, no horizontal
  overflow, empty-view disable, new case links returning 200 and no console errors.
- Existing legacy raw-HTML warning unchanged. Home and legacy posts unchanged.
- HEAD/WIP: base 4db8201 plus this exact eight-file change; 28 owner files excluded.
- BLOCKER: none. Production verification pending at commit time.
- NEXT_SINGLE_TASK: push this release and verify Cloudflare plus live downloads.
