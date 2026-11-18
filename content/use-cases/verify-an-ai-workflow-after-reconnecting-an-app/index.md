---
title: "Verify an AI Workflow After Reconnecting an App"
description: "Check the account and destination, test one sample, and decide what to do with missed work. Includes a reusable reconnection checklist."
contentType: "use-case"
workedExample: true
audience: "People restarting an approved workflow after replacing or renewing an app connection."
lastReviewed: "2026-11-18"
reviewStatus: "reviewed"
draft: false
---

## A Connected App Is Not a Verified Workflow

In this fictional example, an AI-assisted workflow copies office supply
requests into a shared order queue. It stopped when its connection expired.
After the team reconnected the app, the workflow said it was ready. That
does not tell the team which queue will receive new requests or which
requests from the outage already made it there.

Keep automated processing paused until the owner approves the checks and
any replay. Use fictional data in an approved test destination. If no safe
test is available, record that the workflow was not verified.

### 1. Confirm the Account and Destination

Check the trigger source, connected account, destination, and allowed
actions against the approved setup. Two workspaces may show queues with the
same name. Confirm the workspace and queue, not just the label. Do not
broaden access to get past an error.

**Try it:** [Check an AI automation for permission scope](/use-cases/check-an-ai-automation-for-permission-scope/).

### 2. Test One Request and Check Both Sides

Before the run, write down what should happen: test request `TEST-04`
should produce exactly one row in the test queue and nothing in the live
queue. Compare the run log with the actual destination. Confirm that the
expected row arrived and check the live destination through an approved
read-only view or ask its owner to confirm. An AI summary of the run is
not a substitute for either check.

**Try it:** [Check an AI incident timeline against an event log](/use-cases/check-an-ai-incident-timeline-against-an-event-log/).

### 3. Reconcile Missed Work Before Replaying It

Use a stable request ID to compare the backlog with the destination. Mark
each item as already written, missing, or uncertain. Do not replay items
already written. Review missing items with the owner before replaying
them, and hold uncertain items until there is evidence of what happened.

**Try it:** [Check an automation before retrying](/use-cases/check-an-automation-before-retrying/).

## Example: The Run Failed, but the Request Arrived

The log shows a timeout for `REQ-018`, but the intended queue already
contains that request. **Do not replay it.** `REQ-019` does not appear in
the queue, but the team cannot yet verify whether a pending run will write
it. **Hold that item.** Ask the workflow owner to check pending runs
before processing it again.

## Leave a Note for the Next Reconnection

Record the tested destination, evidence, backlog decision, and who will
check anything unresolved. Decide separately whether scheduled processing
can resume and whether each backlog item can be replayed. Use your team's
approved storage for the record, and leave out secrets and private request data.

{{< resource-download file="reconnection-checklist-v1.txt" label="Download the reconnection checklist (.txt)" >}}

The practice packs use separate fictional datasets. Start with one check or
[return to the practice packs](/use-cases/#practice-downloads) to choose another.
