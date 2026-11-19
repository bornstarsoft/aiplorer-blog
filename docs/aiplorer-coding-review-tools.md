# Review two coding agents for small, testable changes

WORK-ID: AIP-CODING-REVIEW-TOOLS
ACTIVE_WRITER = NONE

Base: 6ca1cd0. Owner approved scoped tool discovery and production deployment.
Use the existing Coding Tools category. Preserve the home structure,
legacy URLs, draft status, reset history, and unrelated working changes.

Official sources checked on 2026-11-19:

- OpenAI Codex: [product](https://openai.com/codex/),
  [plans and usage](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan),
  [approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security),
  and [privacy](https://openai.com/policies/privacy-policy/).
- Claude Code: [overview](https://code.claude.com/docs/en/overview),
  [permissions and security](https://code.claude.com/docs/en/security),
  [costs](https://code.claude.com/docs/en/costs),
  [data usage](https://code.claude.com/docs/en/data-usage),
  and [privacy](https://www.anthropic.com/legal/privacy).

Both pages use small fictional repository tasks with independent checks.
Neither profile compares benchmark performance, quotes specific costs or
quotas, or claims that permission controls replace review. The Codex page
links to existing public reset history without implying account coverage or
forecasting. No external accounts or paid tool sessions were used for QA.

Last AI: Codex. Implementation and local QA: DONE on main, based on 6ca1cd0.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 257 Node tests, 291 existing
post URLs, and eight protected drafts. The directory, Coding Tools,
shortlist, comparison, and sitemap contain both tools. Browser checks
covered Korean search, mobile layout, official and practice links, saving
and comparison, and navigation from Codex to Reset Pulse. The home gains
two directory cards and updated counts, with no new section. Reset Pulse
differs only in the shared navigation count.
NEXT_SINGLE_TASK: verify the scoped deployment on the custom domain.
Blocker: none at local QA.
