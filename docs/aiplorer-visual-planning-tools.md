# Review two AI tools for visual planning

WORK-ID: AIP-VISUAL-PLANNING-TOOLS
ACTIVE_WRITER = NONE

Base: 7c56e0f. Owner approved scoped tool discovery and production deployment.
Use the existing Productivity Tools category. Preserve the home structure,
legacy URLs, draft status, and unrelated working changes.

Official sources checked on 2026-11-19:

- Miro AI: [product](https://miro.com/ai/ai-overview/),
  [sticky notes](https://help.miro.com/hc/en-us/articles/28781881506834-Miro-AI-with-Sticky-notes),
  [AI credits](https://help.miro.com/hc/en-us/articles/19756209116178-Miro-AI-credits),
  [plans](https://miro.com/pricing/), [privacy](https://miro.com/legal/privacy-policy/),
  and [AI data settings](https://help.miro.com/hc/en-us/articles/22874000865554-Miro-AI-quality-improvements).
- Whimsical AI: [diagrams](https://whimsical.com/diagrams),
  [built-in agent](https://whimsical.com/learn/ai/whimsical-ai),
  [pricing](https://whimsical.com/pricing), [privacy](https://whimsical.com/terms/privacy),
  and [AI terms](https://whimsical.com/terms/ai-terms).

Both passed narrow official-source editorial review. Miro's page covers
checking grouped workshop notes against the originals; Whimsical's covers
checking an editable flowchart against a process brief. No vendor
accounts, live workspace data, or output accuracy were tested.

Last AI: Codex. Implementation and local QA: DONE on main, based on 7c56e0f.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 257 Node tests, 291 legacy
post URLs, and eight protected drafts. Both tools appear in the directory,
Productivity Tools, shortlist, comparison, and sitemap. Browser checks
covered Korean search, mobile layout, official links, and saving.
Home keeps its existing layout; only two directory cards and counts changed.
NEXT_SINGLE_TASK: verify the scoped deployment on the custom domain.
Blocker: none at local QA.
