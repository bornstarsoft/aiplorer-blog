---
title: "Google Workspace Studio"
description: "Draft a Google Workspace flow with Gemini, then check what starts it, what it reads, and what a test run will change."
type: "ai-tools"
layout: "tool"
category: "Automation Tools"
searchAliases: ["workspace studio", "google workspace flows", "gemini workflow", "구글 워크스페이스 스튜디오", "워크스페이스 스튜디오"]
bestFor:
  - Drafting a routine workflow across approved Google Workspace apps
  - Checking whether a flow responds only to the intended inputs
  - Retesting when a mailbox, rule, or owner changes
beginnerFriendly: null
freePlan: null
pricingNote: "Check which Google Workspace edition and administrator settings apply to your account before relying on Studio or Gemini steps."
officialUrl: "https://workspace.google.com/studio/"
lastReviewed: "2026-11-19"
lastmod: "2026-11-19"
draft: false
useCases:
  - Draft a flow for a fictional workshop signup inbox
  - Check one message that should match and one that should be ignored
  - Verify what information appears in a private test notification
pros:
  - Google documents generating editable steps from a description with Gemini
  - Testing both matching and nonmatching inputs gives you a way to check the trigger
limitations:
  - A test run can send real messages or change files
  - Generated steps can read more information or choose a broader destination than intended
  - Account access and admin approval can vary; verify what connected services can see
similarTools:
  - Power Automate Copilot
  - Zapier
reviewStatus: "reviewed"
sourceNotes:
  - "Checked https://workspace.google.com/studio/, Google's Gemini flow creation guide, and test-run guidance on 2026-11-19 for editable drafts and real test effects."
  - "Checked https://workspace.google.com/pricing.html and https://workspace.google.com/security/ai-privacy/ on 2026-11-19 without assuming plan access or privacy guarantees."
---

## Check Which Input Starts the Flow

Google's [Gemini flow guide](https://support.google.com/workspace-studio/answer/16448469?hl=en)
describes creating an editable workflow from a description. Start with a
demo inbox and two fictional messages: one workshop signup and one
unrelated announcement. Before testing, check that the flow reads only
the intended message and sends only the necessary information to your
test destination. Google's [test-run guide](https://support.google.com/workspace-studio/answer/16663517?hl=en)
explains why testing can still affect connected apps.

## Recheck After a Connection Changes

Keep the expected input, destination, and result together. If the inbox,
owner, or connected app changes, compare those details again using the
[permission scope practice pack](/use-cases/check-an-ai-automation-for-permission-scope/).
Before testing with real data, review [Workspace pricing](https://workspace.google.com/pricing.html),
[AI privacy](https://workspace.google.com/security/ai-privacy/), and your
organization's rules for mail and shared files.
