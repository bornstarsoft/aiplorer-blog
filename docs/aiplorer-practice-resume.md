# Practice shelf return path

WORK-ID: AIP-PRACTICE-RESUME
ACTIVE_WRITER = NONE

Base: fb64a63. Preserve 28 unrelated working changes and all drafts.
Owner approved content, return-visit improvements and production deployment.

## Scope

Add a fictional slide-chart review pack, linked from the presentation guide
and retest task table. Add one explicit saved-pack choice on the use-cases
shelf. Keep only the selected public anchor in browser storage. Do not store
inputs, notes, outputs or completion dates. Keep home and saved-tool state
unchanged.

Last AI: CODEX. DONE: content, shelf resume and local release validation.

QA PASS:

- Isolated production / draft / restored production: 1472 / 1480 / 1472
  pages. Home HTML SHA-256 matches the unchanged base build.
- 164 Node tests including eight for saved-pack behavior, seven pack
  previews, 21 exact downloads, article and retest entry links, 291 legacy
  post URLs, sitemap XML and eight protected draft exclusions.
- Playwright: keyboard save, leaving and returning, link to the right
  pack, cross-tab replace and clear, blocked storage fallback to native
  preview/download, and no horizontal overflow at 1280px/390px/320px.
- Existing legacy raw-HTML warning remains unchanged.

BLOCKER: none. Owner approved the exact-file production release.
NEXT_SINGLE_TASK: deploy and verify the chart pack, three downloads and
browser resume behavior in production.
