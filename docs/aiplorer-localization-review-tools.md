# Review two AI tools for maintaining translations

WORK-ID: AIP-LOCALIZATION-REVIEW-TOOLS
ACTIVE_WRITER = NONE

Base: 4b41144. Owner approved scoped tool discovery and production deployment.
Use the existing Writing Tools category. Preserve the home layout, legacy
URLs, draft status, reset history, and unrelated working changes.

Official sources checked on 2026-11-19:

- Smartcat: [product](https://www.smartcat.com/),
  [AI translation](https://help.smartcat.com/ai-translation-overview/),
  [translation editor](https://help.smartcat.com/editor-functionalities-overview/),
  [pricing](https://www.smartcat.com/pricing/), and
  [privacy](https://www.smartcat.com/legal/privacy-policy/).
- Lokalise: [product](https://lokalise.com/),
  [AI Translations](https://docs.lokalise.com/en/articles/8011393-ai-translations),
  [placeholders](https://docs.lokalise.com/en/articles/1400511-lokalise-universal-placeholders),
  [pricing](https://lokalise.com/pricing/), and
  [privacy](https://lokalise.com/privacy-policy/).

The Smartcat profile focuses on rechecking reused translations against a
revised document. The Lokalise profile focuses on terminology and
placeholders in interface copy and uses Expert documentation for the AI
workflow. No vendor accounts, translations, or integrations were run.
No exact entitlements, output quality, or data handling guarantees are made.

Last AI: Codex. Implementation and local QA: DONE on main, based on 4b41144.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 257 Node tests, 291 existing
post URLs, and eight protected drafts. Both tools appear in Writing Tools,
the reviewed directory, shortlist, comparison, and sitemap. Browser checks
covered Korean search, mobile layout, official links, practice links, and
saving. Home only gains two cards and updated counts. Reset history is
unchanged.
NEXT_SINGLE_TASK: verify the scoped deployment on the custom domain.
Blocker: none at local QA.
