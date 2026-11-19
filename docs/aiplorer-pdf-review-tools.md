# Review two AI tools for reading and checking PDFs

WORK-ID: AIP-PDF-REVIEW-TOOLS
ACTIVE_WRITER = NONE

Base: cb0e8dd. Owner approved scoped tool discovery and production deployment.
Use the existing Learning Tools category. Preserve the home structure,
legacy URLs, draft status, reset history, and unrelated working changes.

Official sources checked on 2026-11-19:

- Acrobat AI Assistant: [product](https://www.adobe.com/acrobat/generative-ai-pdf),
  [content usage and attribution FAQ](https://helpx.adobe.com/acrobat/desktop/use-acrobat-ai/understand-usage-policies/user-disclosures.html),
  [plans](https://www.adobe.com/acrobat/pricing.html), and
  [Adobe Privacy Center](https://www.adobe.com/privacy.html).
- Mathpix Snip: [PDF conversion](https://mathpix.com/pdf-conversion),
  [digitizing PDFs](https://mathpix.com/docs/snip/snip-with-pdfs),
  [Snip pricing](https://mathpix.com/pricing/snip), and
  [privacy](https://mathpix.com/privacy).

The Acrobat profile covers verifying an answer against the original
passage even if a citation is present. The Mathpix profile covers checking
converted notation and table cells against a scan. Neither gives plan
entitlements, accuracy benchmarks, or privacy guarantees. No account,
paid feature, or vendor output was tested.

Last AI: Codex. Implementation and local QA: DONE on main, based on cb0e8dd.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 257 Node tests, 291 existing
post URLs, and eight protected drafts. Both tools appear in Learning Tools,
the reviewed directory, shortlist, comparison, and sitemap. Browser checks
covered Korean search, mobile layout, official and practice links, and saving.
Home keeps its existing layout with two new cards and updated counts.
Reset Pulse differs only in the shared navigation count.
NEXT_SINGLE_TASK: verify the scoped deployment on the custom domain.
Blocker: none at local QA.
