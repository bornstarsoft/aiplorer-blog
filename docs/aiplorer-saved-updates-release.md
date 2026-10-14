# Saved Updates And Worked Examples

ACTIVE_WRITER = NONE

Scope: expose existing announcement records for browser-saved tools on the
homepage and add two editorial worked examples. Preserve all pre-existing WIP.
Use existing shortlist/read keys; never infer that an uncovered tool has not
changed. Do not change source review dates or mark records read automatically.
Examples are fictional exercises, not vendor benchmarks or customer outcomes.

Owner approval: implementation, exact-file commit and GitHub/Cloudflare release.
Last AI / WORK-ID: CODEX / AIPLORER-SAVED-UPDATES. DONE: implementation and
release preparation on main, based on 0826f9c. Existing owner WIP is excluded.

QA PASS: 11 Node tests; isolated Hugo production build; announcement, shortlist,
reading-navigation and 291 legacy URL validators; runnable code example;
Playwright save -> filtered updates -> mark read -> home flow; 1440px and 390px
screenshots; both articles on mobile; home/hub/sitemap links; eight drafts absent.
Existing legacy raw-HTML warning remains. No new vendor claims or source-check
dates were introduced. Announcement coverage remains the existing three records
checked September 12 and is shown with its actual date and partial coverage.

NEXT_SINGLE_TASK: Push this exact-file release and verify Cloudflare and live pages.
BLOCKER: none. Deployment verification is pending at commit time.
