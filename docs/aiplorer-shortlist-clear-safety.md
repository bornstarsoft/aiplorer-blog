# Shortlist Clear Safety

ACTIVE_WRITER = NONE

Keep home unchanged. Confirm the full scope before clearing saved candidates,
including hidden candidates and evaluation data. Cancel without writes; reject
intervening data changes; reuse the verified restore transaction for clearing.
Keep read status and reset checkpoints separate. Add a short cleanup guide.

Base HEAD: e084f45. Preserve and exclude 28 owner WIP files. Owner approved
implementation, validation and production deployment via the existing web
GitHub/Cloudflare exception. No new tools or draft publication.

## Validation And Handoff

- LAST_AI: CODEX; WORK_ID: AIP-SAFE-CLEAR; implementation DONE.
- QA PASS: 129 Node tests, including nine clear-confirmation, cancellation,
  concurrent-edit, blocked-storage and rollback tests.
- QA PASS: isolated Hugo draft build and clean production build using 0.152.2.
- QA PASS: shortlist, reading navigation, 291 legacy post URLs, change-watch
  and reset-history validators; sitemap/RSS XML parsing.
- QA PASS: new guide in production sitemap; eight existing draft tools absent.
- QA PASS: real Chromium native dialog cancellation preserves data; confirmed
  clear persists after reload and leaves announcement read state unchanged.
- QA PASS: 1280px, 390px and 320px layouts without horizontal overflow;
  screenshots inspected; guide links return 200.
- Existing raw-HTML warning in an untouched legacy post remains unchanged.
- HEAD/WIP: base e084f45 plus this exact six-file release; 28 owner WIP files
  excluded. Home markup, tool content and legacy posts unchanged.
- BLOCKER: none. Production verification pending at commit time.
- NEXT_SINGLE_TASK: push this release and verify Cloudflare plus live behavior.
