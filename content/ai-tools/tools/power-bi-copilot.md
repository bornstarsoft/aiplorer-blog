---
title: "Power BI Copilot"
description: "Ask questions about a Power BI report, then check the referenced visual, filters, and date range before sharing the answer."
type: "ai-tools"
layout: "tool"
category: "Business Tools"
searchAliases: ["copilot for power bi", "microsoft fabric copilot power bi", "power bi report summary", "파워 BI 코파일럿", "파워비아이 코파일럿"]
bestFor:
  - Drafting an explanation of an existing report
  - Checking which visual, date range, or report filter supports an answer
  - Rechecking the same question after the report is refreshed
beginnerFriendly: null
freePlan: null
pricingNote: "Check current Power BI and Fabric pricing, workspace eligibility, capacity, and tenant settings before relying on Copilot."
officialUrl: "https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-pane-summarize-content"
lastReviewed: "2026-11-19"
lastmod: "2026-11-19"
draft: false
useCases:
  - Ask for a short explanation of a fictional request dashboard
  - Check whether the cited visual covers all offices or only one office
  - Compare a rerun with the original report date and filter scope
pros:
  - Microsoft documents generating report summaries and referencing visuals in report answers
  - Recording the visual and filter scope makes a result easier to verify later
limitations:
  - Not all filters or visual types are handled in the same way
  - A reply can omit data or describe a broader scope than the cited visual shows
  - Check workspace permissions and applicable data policies before sharing reports or answers
similarTools:
  - Tableau Pulse
  - Zoho Zia
reviewStatus: "reviewed"
sourceNotes:
  - "Checked Microsoft's Power BI report summary and Fabric enablement documentation on 2026-11-19 for report answers, visual references, and access requirements."
  - "Checked https://www.microsoft.com/en-us/microsoft-fabric/features/power-bi/pricing and https://learn.microsoft.com/en-us/fabric/fundamentals/copilot-privacy-security on 2026-11-19 without assuming plan access or privacy guarantees."
---

## Check the Scope of the Referenced Visual

Microsoft's [report guide](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-pane-summarize-content)
describes summarizing reports and linking answers to visuals. Try a
fictional dashboard with request counts for two offices. If the cited
visual shows only one office, do not reuse its number as the total
for both. Check the displayed filters and reporting period directly.

## Keep the Question for the Next Refresh

Record the report and visual, filters, date range, and data refresh time.
When the report changes, recheck the answer using the
[dashboard summary practice pack](/use-cases/check-an-ai-dashboard-summary-against-metric-definitions/).
Before using company data, review [Power BI pricing](https://www.microsoft.com/en-us/microsoft-fabric/features/power-bi/pricing),
[workspace enablement](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-enable-power-bi),
and the [Fabric Copilot privacy guidance](https://learn.microsoft.com/en-us/fabric/fundamentals/copilot-privacy-security).
