---
title: "Airtable AI"
description: "AI features inside Airtable for suggesting categories or drafting text from records in a shared workflow."
type: "ai-tools"
layout: "tool"
category: "Business Tools"
searchAliases: ["airtable omni", "airtable assistant", "airtable field agents", "request triage", "에어테이블", "에어테이블 AI"]
bestFor:
  - Testing suggested categories on a small request queue
  - Drafting a short summary beside the original record
  - Comparing AI suggestions with human-approved labels before reuse
beginnerFriendly: null
freePlan: null
pricingNote: "Check Airtable's plan, workspace AI settings, and usage charges before running field agents across many records."
officialUrl: "https://www.airtable.com/platform/ai"
lastReviewed: "2026-11-19"
lastmod: "2026-11-19"
draft: false
useCases:
  - Assign suggested labels to fictional incoming requests
  - Keep generated output separate from source fields and final labels
  - Rerun the same sample after adding a category or changing instructions
pros:
  - AI-enabled fields can put a suggestion next to its source record for review
  - Keeping reviewed labels in a separate field makes corrections easier to compare
limitations:
  - Generated labels can be wrong, inconsistent, or overconfident about an unclear request
  - Visible AI output may reveal information from referenced fields that are hidden from the viewer
  - Confirm permissions, model data handling, and cost before running on live records
similarTools:
  - Dovetail
  - Notion AI
reviewStatus: "reviewed"
sourceNotes:
  - "Checked https://www.airtable.com/platform/ai and https://support.airtable.com/articles/8052242094-using-airtable-ai-in-fields on 2026-11-19 for field agents, suggested categories, and visibility of generated text."
  - "Checked https://airtable.com/pricing, https://support.airtable.com/articles/3378106230-airtable-ai-billing, and https://www.airtable.com/company/privacy for plan, credit, and data-use context."
---

## Test One Field With Fictional Requests

Airtable's [AI fields guide](https://support.airtable.com/articles/8052242094-using-airtable-ai-in-fields)
describes field agents that work with individual records. In a separate
test base, make a few fictional requests that fit your categories and
one that does not. Decide how an unclear record should be handled before
checking the output. Keep the suggestion in a separate field; let a
person confirm the final label. Do not route or send anything from the test.

## Recheck When Fields or Instructions Change

Compare the next run against the same sample and the approved field
definitions. Verify that renamed categories and blank fields still behave
as intended. The [data dictionary practice pack](/use-cases/check-an-ai-data-dictionary-against-a-schema/)
helps you test what a field means before using it in a workflow.

Airtable's guide warns that AI-generated text can surface information
from fields that are hidden elsewhere in the interface. Do not reference
restricted fields in output intended for a wider audience. Check the
[plans](https://airtable.com/pricing), [AI billing guide](https://support.airtable.com/articles/3378106230-airtable-ai-billing),
and [privacy policy](https://www.airtable.com/company/privacy) before
working with real requests or increasing the volume.
