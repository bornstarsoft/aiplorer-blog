# Review two AI tools for recurring report and metric checks

WORK-ID: AIP-METRIC-REVIEW-TOOLS
ACTIVE_WRITER = NONE

Base: e39852f. Owner approved scoped tool discovery and production deployment.
Use the existing Business Tools category. Preserve the home layout, legacy
URLs, draft status, reset history, and unrelated working changes.

Official sources checked on 2026-11-19:

- Power BI Copilot: [report summary guide](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-pane-summarize-content),
  [enablement](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-enable-power-bi),
  [pricing](https://www.microsoft.com/en-us/microsoft-fabric/features/power-bi/pricing),
  and [Fabric Copilot privacy and security](https://learn.microsoft.com/en-us/fabric/fundamentals/copilot-privacy-security).
- Tableau Pulse: [product](https://www.tableau.com/products/tableau-pulse),
  [following metrics](https://help.tableau.com/current/online/en-us/pulse_explore_metrics.htm),
  [site settings](https://help.tableau.com/current/online/en-us/pulse_set_up.htm),
  [pricing](https://www.tableau.com/pricing), and
  [Tableau AI data usage](https://help.tableau.com/current/tableau/en-us/tableau_gai_data.htm).

Power BI covers matching report answers to source visuals and checking
their filter scope. Tableau Pulse covers comparing periods and checking
whether a definition or denominator changed. The Tableau profile
distinguishes AI wording from metric calculation. No vendor account,
private data, or analytics result was tested. Neither profile assumes
licensing entitlements, statistical accuracy, or privacy guarantees.

Last AI: Codex. Implementation and local QA: DONE on main, based on e39852f.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 257 Node tests, 291 existing
post URLs, and eight protected drafts. Both tools appear in Business Tools,
the reviewed directory, shortlist, comparison, and sitemap. Browser checks
covered Korean search, mobile layout, official links, practice links, and
saving. Only the two cards and counts changed on the home page. Reset
history is unchanged.
NEXT_SINGLE_TASK: verify the scoped deployment on the custom domain.
Blocker: none at local QA.
