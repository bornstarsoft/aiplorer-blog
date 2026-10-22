# Reliable Candidate Checks

ACTIVE_WRITER = NONE

Base HEAD: ccc367d. Preserve 28 unrelated owner WIP files and keep home unchanged.
Owner approved implementation and deployment under the web GitHub exception.

Scope: verify checkbox writes, merge only the changed check against current
storage, reject unsaved candidates, and show honest feedback on failures.
Add a fictional worked example distinguishing checked steps from accepted results.
No new tools, draft publication, rankings or automatic reminders.

## Validation And Handoff

- LAST_AI: CODEX; WORK_ID: AIP-CHECK-PERSISTENCE; implementation DONE.
- QA PASS: 150 Node tests including current-state check merging, unrelated
  candidate preservation, unsaved-candidate rejection, malformed/blocked storage,
  quota and silent write failure, return refresh and successful retry.
- QA PASS: isolated draft build followed by clean minified production build.
- QA PASS: shortlist, reading navigation, change-watch, reset-history and 291
  legacy post URL validators; sitemap/RSS XML and eight-draft exclusion checks.
- QA PASS: Chromium save/reload, simulated silent failure and retry, visible
  feedback, new article link and seven internal links; 320/390/1280px article
  layouts, mobile checklist screenshot and no console errors.
- Existing raw-HTML warning in an untouched legacy post remains unchanged.
- Limits: localStorage is browser-only, not transactional cross-tab storage or
  a server backup. Each action rereads current state; simultaneous writes can
  still race. Failure feedback does not promise persistence.
- HEAD/WIP: base ccc367d plus this six-file release. Home and all 28 owner WIP
  files unchanged. No draft tools published.
- BLOCKER: none. Production verification pending at commit time.
- NEXT_SINGLE_TASK: push this exact release and verify Cloudflare plus live save feedback.
