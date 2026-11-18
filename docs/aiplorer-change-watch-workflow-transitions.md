# Verify three workflow changes with follow-up actions

WORK-ID: AIP-WORKFLOW-TRANSITIONS
ACTIVE_WRITER = NONE

Base: 1f7659f. Owner approved a scoped content refresh and deployment.
Keep existing records, homepage structure, and unrelated WIP unchanged.

- [Zapier Help](https://help.zapier.com/hc/en-us/articles/50107501585165-Action-required-for-LeadConnector-users-with-API-key-connections): updated November 9; November 15 deadline for LeadConnector 3.0.4 API-key connections. This is separate from the recorded Next Gen Zaps announcement. Preserve the 2.0.4 OAuth exception.
- [Notion release post](https://www.notion.com/blog/notion-ai-more-for-less) and [usage help](https://www.notion.com/help/track-notion-credits-usage): October 19 announcement, November 2 transition for existing workspaces. Distinguish recurring-work credit sources from prior agent context and access changes. Omit exact allowances and cost claims.
- [Claude Platform Docs](https://platform.claude.com/docs/en/about-claude/model-deprecations): September 30 notice, November 30 Sonnet 4.5 API retirement. Keep platform scope and the partner-schedule caveat. Do not reuse the earlier Claude policy notice.

November 18 is the source-check date, not the announcement date or a full
tool-page review. Keep published dates unchanged so the archive and RSS
sort by the actual notice, not by the day Aiplorer found it.

Last AI: Codex. Source review, implementation, and local QA: DONE on main.
QA: PASS. Hugo draft/production builds, 247 Node tests, 67 unique
announcement records, unchanged prior entries and home structure.
Playwright verified official links, date order, and shortlist follow-ups.
NEXT_SINGLE_TASK: verify the scoped deployment on Cloudflare Pages.
Blocker: none at local QA. Owner approved scoped production deployment.
