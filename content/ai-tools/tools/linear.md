---
title: "Linear"
description: "Review AI suggestions about incoming issues and check whether a possible duplicate describes the same problem."
type: "ai-tools"
layout: "tool"
category: "Productivity Tools"
searchAliases: ["linear triage", "triage intelligence", "issue intake", "issue duplicate review", "리니어 이슈 분류", "리니어"]
bestFor:
  - Reviewing newly reported work before sending it to a team
  - Checking duplicate suggestions against the original reports
  - Revisiting a suggested link when new details arrive
beginnerFriendly: null
freePlan: null
pricingNote: "Check current Linear pricing and whether your workspace has access to Triage Intelligence."
officialUrl: "https://linear.app/"
lastReviewed: "2026-11-19"
lastmod: "2026-11-19"
draft: false
useCases:
  - Review two fictional reports with the same short title
  - Compare what users did and what happened before linking them
  - Note why a suggestion was accepted or left open for more evidence
pros:
  - Linear documents suggesting related issues and showing why a match was suggested
  - A linked report gives reviewers a place to compare conditions and outcomes
limitations:
  - Similar titles can refer to different steps, symptoms, or owners
  - Marking a duplicate can move attachments, so check the target and its access before merging
  - Check which teams and data the AI feature can consider before using sensitive reports
similarTools:
  - Asana AI
  - Airtable AI
reviewStatus: "reviewed"
sourceNotes:
  - "Checked https://linear.app/, https://linear.app/docs/triage-intelligence, and https://linear.app/docs/triage on 2026-11-19 for relationship suggestions and duplicate handling."
  - "Checked https://linear.app/pricing and https://linear.app/privacy on 2026-11-19 without assuming plan entitlement, accuracy, or privacy guarantees."
---

## Check Both Reports Before Marking a Duplicate

Linear's [Triage Intelligence guide](https://linear.app/docs/triage-intelligence)
describes suggestions for related issues and possible duplicates. Try two
fictional reports titled "Export failed." In one, no file was created.
In the other, the file was created but could not be opened. Compare the
steps and observed results rather than treating matching titles as evidence
of the same problem.

## Revisit the Link When You Have More Evidence

Keep the report IDs and the reason you kept them separate or linked
them. When another report arrives, check the exact sequence again. The
[incident timeline practice pack](/use-cases/check-an-ai-incident-timeline-against-an-event-log/)
offers a way to practice distinguishing observations from explanations.

Before marking a real issue as a duplicate, review
[how Triage handles attachments](https://linear.app/docs/triage), the
destination issue's visibility, [pricing](https://linear.app/pricing),
and the workspace's [privacy](https://linear.app/privacy) requirements.
