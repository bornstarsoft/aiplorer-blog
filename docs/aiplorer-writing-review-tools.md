# Review two AI tools for editing drafts

WORK-ID: AIP-WRITING-REVIEW-TOOLS
ACTIVE_WRITER = NONE

Base: b7d4b7e. Owner approved scoped tool discovery and production deployment.
Use the existing Writing Tools category. Preserve the home structure,
legacy URLs, draft status, and unrelated working changes.

Official sources checked on 2026-11-19:

- LanguageTool: [product](https://languagetool.org/),
  [web editor](https://help.languagetool.org/hc/en-us/articles/39254517614999-What-is-the-LanguageTool-Editor),
  [language coverage](https://help.languagetool.org/hc/en-us/articles/39254526141463-What-languages-does-LanguageTool-support),
  [plans](https://languagetool.org/premium), and [privacy](https://languagetool.org/legal/privacy).
- Paperpal: [product](https://paperpal.com/),
  [language editing](https://support.paperpal.com/support/solutions/articles/3000126441-how-does-paperpal-work-),
  [pricing](https://paperpal.com/pricing), and [privacy](https://paperpal.com/privacy-policy).

Reviewed LanguageTool for grammar and style suggestions on existing drafts
and Paperpal for language editing on academic drafts. Language aliases are
for Aiplorer discovery and do not imply vendor support for Korean text.
No vendor accounts, real documents, or output quality were tested. The
profiles do not make price, mode entitlement, privacy, or acceptance guarantees.

Last AI: Codex. Implementation and local QA: DONE on main, based on b7d4b7e.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 257 Node tests, 291 legacy
post URLs, and eight protected drafts. Both tools appear in Writing Tools,
the directory, shortlist, comparison, and sitemap. Browser checks covered
Korean search, mobile layout, official links, practice links, and saving.
Home keeps its existing layout; only two directory cards and counts changed.
NEXT_SINGLE_TASK: verify the scoped deployment on the custom domain.
Blocker: none at local QA.
