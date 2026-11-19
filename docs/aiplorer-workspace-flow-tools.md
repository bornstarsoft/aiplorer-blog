# Review two AI tools for drafting workplace flows

WORK-ID: AIP-WORKSPACE-FLOW-TOOLS
ACTIVE_WRITER = NONE

Base: 0d8d825. Owner approved scoped tool discovery and production deployment.
Use the existing Automation Tools category. Preserve the home structure,
legacy URLs, draft status, reset history, and unrelated working changes.

Official sources checked on 2026-11-19:

- Google Workspace Studio: [product](https://workspace.google.com/studio/),
  [creating a flow with Gemini](https://support.google.com/workspace-studio/answer/16448469?hl=en),
  [test runs](https://support.google.com/workspace-studio/answer/16663517?hl=en),
  [plans](https://workspace.google.com/pricing.html), and
  [Workspace AI privacy](https://workspace.google.com/security/ai-privacy/).
- Power Automate Copilot: [cloud-flow guide](https://learn.microsoft.com/en-us/power-automate/create-cloud-flow-using-copilot),
  [cloud flows FAQ](https://learn.microsoft.com/en-us/power-automate/faq-copilot-cloud-flows),
  [pricing](https://www.microsoft.com/en/power-platform/products/power-automate/pricing),
  and [Power Platform data security and privacy](https://learn.microsoft.com/en-us/power-platform/faqs-copilot-data-security-privacy).

Both profiles examine AI-assisted flow drafting in existing workplace
accounts. Google's example covers checking which inputs match and why
test runs should use demo data. Microsoft's covers checking the target
and rerunning a flow only after checking for prior side effects.
No pricing promises, account entitlements, security guarantees, or live
workflow test results are reported. No accounts or connectors were used.

Last AI: Codex. Implementation and local QA: DONE on main, based on 0d8d825.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 257 Node tests, 291 existing
post URLs, and eight protected drafts. Both tools appear in Automation
Tools, the reviewed directory, shortlist, comparison, and sitemap.
Browser checks covered Korean search, mobile layout, practice links,
official destinations, and saving. Home keeps the existing layout;
only the two directory cards and counts changed. Reset history is unchanged.
NEXT_SINGLE_TASK: verify the scoped deployment on the custom domain.
Blocker: none at local QA.
