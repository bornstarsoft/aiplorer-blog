# Review two AI tools for revising presentation material

WORK-ID: AIP-PRESENTATION-REVIEW-TOOLS
ACTIVE_WRITER = NONE

Base: d5dda7a. Owner approved scoped tool discovery and production deployment.
Use the existing Presentation Tools category. Preserve the home layout,
legacy URLs, draft status, reset history, and unrelated working changes.

Official sources checked on 2026-11-19:

- Napkin AI: [product](https://www.napkin.ai/),
  [visuals generation](https://help.napkin.ai/en/articles/15923699-visuals-generation),
  [visual export](https://help.napkin.ai/en/articles/15924383-visuals-export-png-svg-ppt-or-pdf),
  [pricing](https://www.napkin.ai/pricing/), and
  [privacy](https://www.napkin.ai/privacy-policy/).
- Plus AI: [product](https://plusai.com/),
  [Remix guide](https://guide.plusai.com/ai-for-presentations/remix-slides),
  [pricing](https://plusai.com/pricing), [privacy](https://plusai.com/privacy-policy),
  and [security](https://plusai.com/security).

The Napkin profile focuses on Visuals rather than a full deck: check
the labels, values, and denominator after converting text. The Plus AI
profile focuses on trying one copy of a slide in an existing editor:
check which statements and conditions survived the layout change.
No vendor accounts or integrations were used. Feature entitlements,
commercial rights, and output or privacy guarantees were not assumed.

Last AI: Codex. Implementation and local QA: DONE on main, based on d5dda7a.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 257 Node tests, 291 existing
post URLs, and eight protected drafts. Both tools appear in Presentation
Tools, the reviewed directory, shortlist, comparison, and sitemap.
Browser checks covered Korean search, mobile layout, official and
practice links, and saving. Home changes are limited to two cards and
tool counts. Reset history is unchanged.
NEXT_SINGLE_TASK: verify the scoped deployment on the custom domain.
Blocker: none at local QA.
