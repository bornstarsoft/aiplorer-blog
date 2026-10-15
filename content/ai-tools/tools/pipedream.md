---
title: "Pipedream"
description: "Pipedream Workflows and String close March 31, 2027. Plan existing workflow migrations; Pipedream Connect is unaffected."
type: "ai-tools"
layout: "tool"
category: "Automation Tools"
bestFor:
  - Planning existing workflow migrations
  - Documenting automation dependencies
  - Testing replacement workflows
  - Connecting apps, APIs, and everyday work tools
  - Reviewing credits, permissions, and workflow risks before rollout
beginnerFriendly: null
freePlan: null
pricingNote: "Workflows no longer accepts new signups or subscriptions. Check the official sunset notice for existing-account billing and migration guidance. Connect is a separate offering."
officialUrl: "https://pipedream.com/"
lastReviewed: "2026-07-25"
lastmod: "2026-07-25"
draft: false
useCases:
  - Inventory existing workflow dependencies
  - Prepare a migration checklist
  - Test replacement automations before cutover
  - Compare ongoing integration needs separately from Workflows
  - Document workflow risks and connected-account permissions
pros:
  - Existing workflows can provide a reference when documenting a replacement
  - Migration planning can help expose hidden app and data dependencies
limitations:
  - Workflows is in maintenance mode; do not choose it for a new long-term workflow deployment
  - Automated workflows should be tested before relying on them
  - Connected accounts, app permissions, customer data, and business data should be handled carefully
  - Workflow errors, missing data, duplicate actions, and permission issues can affect real operations
  - Plans, pricing, credits, limits, integrations, AI-related features, API details, security details, enterprise options, and exact availability may change
similarTools:
  - Zapier
  - Make
  - n8n
reviewStatus: "reviewed"
sourceNotes:
  - "Targeted sunset/export check on 2026-10-15: https://pipedream.com/docs/workflows and https://pipedream.com/docs/workflows/export-workflows. No notice publication date inferred. Earlier review notes below are historical."
  - "Checked https://pipedream.com/ on 2026-07-25 for current official Pipedream positioning around workflows, apps, APIs, integrations, AI-related use cases, and its announced relationship with Workday."
  - "Checked https://pipedream.com/docs and https://pipedream.com/docs/workflows/limits on 2026-07-25 for current official workflow, API, integration, credit, and limit context."
  - "Checked https://pipedream.com/pricing and https://pipedream.com/docs/pricing on 2026-07-25 for current plan, pricing, credit, workflow, Connect, and usage context without copying exact prices, plan comparisons, credit limits, API limits, or feature availability into this page."
  - "Checked https://pipedream.com/docs/privacy-and-security and https://pipedream.com/docs/privacy-and-security/best-practices on 2026-07-25 for current official privacy, security, credential, logging, and workflow-code guidance. Security guarantees, compliance details, data retention guarantees, API details, and exact feature availability were not copied into this page."
---

## Overview

Checked October 15, 2026: [Pipedream's official notice](https://pipedream.com/docs/workflows) schedules Workflows and String shutdown for **March 31, 2027**, with Workflows data deletion by **April 30, 2027**. Connect is unaffected. This page remains available for migration planning.

### Prepare A Workflow Migration

The [export guide](https://pipedream.com/docs/workflows/export-workflows) describes per-project JSON archives for rebuilding elsewhere, not a one-click import. Download the archive from File Store, check manifest warnings and skipped workflows, and verify that the export is complete. The export requires File Store access; ask support if your account cannot use it.

Credentials, environment variables, event history, data stores, File Store files and private multi-file component code are excluded from the archive. Preserve needed data and source separately, reconnect accounts on the replacement platform, and test with non-sensitive inputs. Protect exports as business data, and check duplicate actions before switching live triggers.

## Useful For

Existing users can document app connections, failure handling and operational dependencies before moving a workflow. Evaluate replacement tools on the same small test rather than assuming exports reproduce behavior unchanged.

Automation tools should be treated as workflow support, not as a guarantee that a process is complete, reliable, secure, correctly permissioned, or appropriate for every team.

## Notes

Features, plans, pricing, integrations, limits, AI-related features, API options, security details, and availability can change. Check official Pipedream pages for current details before choosing a plan or relying on a specific capability.

Be careful with sensitive, customer, business, account, or confidential data. Review connected accounts, app permissions, workplace policies, data handling requirements, security requirements, and failure cases before depending on an automated workflow.
