# Review two AI tools for project intake and status updates

WORK-ID: AIP-PROJECT-REVIEW-TOOLS
ACTIVE_WRITER = NONE

Base: 0d707d5. Owner approved scoped tool discovery and production
deployment. Use the existing Productivity Tools category. Preserve the
home layout, legacy URLs, draft status, reset history, and unrelated
working changes.

Official sources checked on 2026-11-19:

- Linear: [product](https://linear.app/),
  [Triage Intelligence](https://linear.app/docs/triage-intelligence),
  [Triage](https://linear.app/docs/triage), [pricing](https://linear.app/pricing),
  and [privacy](https://linear.app/privacy).
- Asana AI: [product](https://asana.com/product/ai),
  [Smart status](https://help.asana.com/s/article/smart-status?language=en),
  [AI admin controls](https://help.asana.com/s/article/asana-ai-features-and-admin-controls?language=en_US),
  [pricing](https://asana.com/pricing), and
  [privacy](https://asana.com/terms/privacy-statement).

The Linear profile distinguishes a suggested relationship from a confirmed
duplicate. The Asana AI profile checks a status draft against recent
evidence and open blockers. Both use fictional examples and avoid plan
entitlements, accuracy, and data handling guarantees. No vendor accounts
or live workspace data were used.

Last AI: Codex. Implementation and local QA: DONE on main, based on 0d707d5.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 257 Node tests, 291 existing
post URLs, and eight protected drafts. Both tools appear in Productivity
Tools, the reviewed directory, shortlist, comparison, and sitemap.
Browser checks covered Korean search, mobile layout, official links,
practice links, and saving. Only the two cards and counts changed on
the home page. Reset history is unchanged.
NEXT_SINGLE_TASK: verify the scoped deployment on the custom domain.
Blocker: none at local QA.
