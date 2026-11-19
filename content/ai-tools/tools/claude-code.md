---
title: "Claude Code"
description: "Inspect and revise a small repository task with Claude Code, then match the proposed tests to the acceptance criteria."
type: "ai-tools"
layout: "tool"
category: "Coding Tools"
searchAliases: ["anthropic claude code", "claude cli", "claude terminal", "클로드 코드", "클로드코드"]
bestFor:
  - Finding the files relevant to a small code change
  - Reviewing a proposed test plan before editing
  - Rechecking test coverage when an acceptance criterion changes
beginnerFriendly: null
freePlan: null
pricingNote: "Check Anthropic's current account terms and cost guidance for how you connect Claude Code."
officialUrl: "https://code.claude.com/docs/en/overview"
lastReviewed: "2026-11-19"
lastmod: "2026-11-19"
draft: false
useCases:
  - Review a fictional draft form's acceptance criteria before any edits
  - Identify where the plan tests saving a draft separately from submitting it
  - Review the eventual diff and check that each changed criterion still has a test
pros:
  - Anthropic documents reading project files, editing, and running commands
  - Walking through requirements before an edit makes missed cases easier to spot
limitations:
  - A proposed test plan can miss an important branch or check the wrong result
  - Check command permissions and review dependency, license, and file changes before accepting a patch
  - A local terminal session is not the same as offline processing; check the applicable data policy before sharing private code
similarTools:
  - OpenAI Codex
  - Cursor
reviewStatus: "reviewed"
sourceNotes:
  - "Checked https://code.claude.com/docs/en/overview and https://code.claude.com/docs/en/security on 2026-11-19 for project workflows and permissions."
  - "Checked https://code.claude.com/docs/en/costs, https://code.claude.com/docs/en/data-usage, and https://www.anthropic.com/legal/privacy on 2026-11-19 without assuming entitlements, offline processing, or privacy guarantees."
---

## Check the Plan Before Changing Code

Anthropic's [Claude Code overview](https://code.claude.com/docs/en/overview)
describes inspecting code, making edits, and running commands. Start with
a fictional request form and keep the first pass read-only. If the
requirements say saving a draft must not submit it, check that the test
plan would catch a change that makes those actions behave the same way.
The [acceptance criteria practice pack](/use-cases/check-an-ai-test-plan-against-acceptance-criteria/)
lets you compare a proposed plan with its original requirements.

## Recheck Coverage When Requirements Change

Keep the requirement and its test together. When a rule changes, update
the relevant test and review the actual diff before accepting edits. Use
demo data for trials. Before connecting private code, review Anthropic's
[permissions guide](https://code.claude.com/docs/en/security),
[pricing and cost guidance](https://code.claude.com/docs/en/costs),
[data usage](https://code.claude.com/docs/en/data-usage), and
[privacy policy](https://www.anthropic.com/legal/privacy).
