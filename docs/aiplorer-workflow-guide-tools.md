# Review two AI tools for documenting workflows

WORK-ID: AIP-WORKFLOW-GUIDE-TOOLS
ACTIVE_WRITER = NONE

Base: 8eecf97. Owner approved scoped tool discovery and production deployment.
Use the existing Productivity Tools category. Preserve the home structure,
legacy URLs, draft status, and unrelated working changes.

Official sources checked on 2026-11-19:

- Scribe: [Scribe AI](https://scribe.com/scribe-ai/),
  [features](https://scribe.com/features),
  [security](https://scribe.com/security),
  [pricing](https://scribe.com/pricing), and [privacy](https://scribe.com/legal/privacy).
- Guidde: [Guidde Create](https://www.guidde.com/guidde-create),
  [video editor](https://help.guidde.com/en/articles/9790578-editing-guidde-videos),
  [speaker editor](https://help.guidde.com/en/articles/10200246-speaker-editor-edit-the-ai-generated-voiceover-or-record-upload-your-own),
  [pricing](https://www.guidde.com/pricing), and [privacy](https://www.guidde.com/privacy-policy).

Reviewed the screenshot-to-guide workflow and AI title/description
features separately for Scribe. Reviewed step-based video documentation
and editable AI narration for Guidde. No vendor accounts, real recordings,
or output quality were tested. No capture, redaction, or access guarantees
are made.

Last AI: Codex. Implementation and local QA: DONE on main, based on 8eecf97.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 257 Node tests, 291 legacy
post URLs, and eight protected drafts. Both tools appear in Productivity
Tools, the reviewed directory, shortlist, comparison, and sitemap.
Browser checks covered Korean search, mobile layout, official and practice
links, and saving. Home keeps its existing layout with two new directory
cards and updated counts.
NEXT_SINGLE_TASK: verify the scoped deployment on the custom domain.
Blocker: none at local QA.
