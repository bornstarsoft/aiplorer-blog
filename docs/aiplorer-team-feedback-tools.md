# Review two AI tools for team feedback and intake

WORK-ID: AIP-TEAM-FEEDBACK-TOOLS
ACTIVE_WRITER = NONE

Base: 95b8e48. Owner approved scoped tool discovery and production deployment.
Use the existing Business Tools category. Preserve the home structure,
legacy URLs, draft status, and unrelated working changes.

Official sources checked on 2026-11-19:

- Airtable AI: [product](https://www.airtable.com/platform/ai),
  [AI fields](https://support.airtable.com/articles/8052242094-using-airtable-ai-in-fields),
  [AI billing](https://support.airtable.com/articles/3378106230-airtable-ai-billing),
  [plans](https://airtable.com/pricing) and [privacy](https://www.airtable.com/company/privacy).
- Dovetail: [product](https://dovetail.com/),
  [Channels](https://dovetail.com/product/ai-channels/),
  [Channels 2.0 release](https://dovetail.com/changelog/channels-2-generally-available/),
  [pricing](https://dovetail.com/pricing/), [privacy](https://dovetail.com/privacy/privacy-policy/),
  and [legal and account terms](https://dovetail.com/legal/).

Both passed narrow official-source editorial review. Airtable covers suggested
categories on individual records, with a specific warning about hidden
fields appearing in generated text. Dovetail covers tracing grouped feedback
back to source evidence, with no claim of representative results. No vendor
accounts, live data, classification accuracy, or integrations were tested.

Last AI: Codex. Implementation and local QA: DONE on main, based on 95b8e48.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 257 Node tests, 291 legacy
post URLs and eight protected drafts. The Business Tools pages, directory,
shortlist, compare view, and sitemap contain both routes. Browser checks
covered Korean search, mobile layout, official destinations, and saving.
Home has no new section; only the two directory cards and counts changed.
NEXT_SINGLE_TASK: verify the scoped deployment on the custom domain.
Blocker: none at local QA.
