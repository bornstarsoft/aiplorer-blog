# Review two AI tools for enlarging and improving existing images

WORK-ID: AIP-PHOTO-ENHANCEMENT-TOOLS
ACTIVE_WRITER = NONE

Base: 137e6f7. Owner approved scoped tool discovery and production deployment.
Use the existing Image Tools category. Preserve the home structure, legacy
URLs, draft status, reset history, and unrelated working changes.

Official sources checked on 2026-11-19:

- Upscayl Desktop: [desktop download and processing](https://upscayl.org/download),
  [source and hardware guidance](https://github.com/upscayl/upscayl),
  [Cloud pricing](https://upscayl.org/pricing), and
  [Cloud privacy terms](https://upscayl.org/privacy).
- Topaz Photo: [product](https://www.topazlabs.com/topaz-photo),
  [quick start](https://docs.topazlabs.com/topaz-photo/quick-start),
  [cloud rendering](https://docs.topazlabs.com/topaz-photo/cloud-rendering),
  [pricing](https://www.topazlabs.com/pricing), and
  [privacy](https://www.topazlabs.com/privacy).

Upscayl focuses on checking a resized image against the source. Topaz
Photo focuses on checking what changed after reducing noise or sharpening.
Both are documented separately from their cloud features or products.
Neither review assumes commercial rights, hardware compatibility, output
accuracy, or data handling guarantees. No external product was run.

Last AI: Codex. Implementation and local QA: DONE on main, based on 137e6f7.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 257 Node tests, 291 existing
post URLs, and eight protected drafts. Both tools appear in Image Tools,
the reviewed directory, shortlist, comparison, and sitemap. Browser checks
covered Korean search, mobile layout, official links, practice and retest
links, and saving. Home keeps its layout with two new cards and updated
counts. The reset history is unchanged.
NEXT_SINGLE_TASK: verify the scoped deployment on the custom domain.
Blocker: none at local QA.
