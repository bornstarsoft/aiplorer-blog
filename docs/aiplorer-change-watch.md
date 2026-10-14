# Aiplorer Change Watch and Decision Guides

ACTIVE_WRITER = NONE

## Broader Coverage (2026-10-14)

- WORK-ID: AIPLORER-WATCH-EXPANSION; last AI: CODEX; implementation DONE.
- Added Notion AI, Claude, and Perplexity: ten events across six tools.
  This remains selected announcement coverage, not a full tool re-review.
- Official sources read on October 14:
  - https://www.notion.com/releases : October 13 Notion 3.8 section.
    The dated permalink could not be opened in the research tool, so the
    readable official release index is cited. Scope: edit attribution and
    column permissions, not pricing, security guarantees, or every 3.8 feature.
  - https://www.anthropic.com/news/2026-usage-policy-update :
    October 8 announcement; November 12 effective date stays explicitly future.
    Existing high-risk requirements are described as clarified, not newly added.
  - https://www.perplexity.ai/changelog/automations-inline-visualizations-and-gpt-6-1-sol :
    October 5 announcement; selected inline CSV visualization for practical
    source-data checks. No model benchmarks or financial advice added.
- Extended the validator with exact official hosts for these three providers.
  Existing event IDs, read revisions, and tool full-review dates are unchanged.
- QA PASS: isolated staged-source Hugo production build; ten-record validator;
  11 saved-update/finder tests; RSS/sitemap XML; 75-tool shortlist validation;
  291 post URLs; new homepage records; all eight draft exclusions.
  The pre-existing legacy raw-HTML warning is unchanged.
- Baseline HEAD: 530b365. Owner WIP: 28 files excluded and preserved.
- Owner approval: this update only, including commit and deployment.
- NEXT_SINGLE_TASK: push and verify Cloudflare plus live home/watch/RSS.
  Deployment evidence is reported in the final chat result.
- BLOCKER: none.

## Official-Source Refresh (2026-10-14)

- WORK-ID: AIPLORER-CHANGE-WATCH-OCT14; last AI: CODEX.
- DONE: four new announcements, seven total across the existing three tools.
  This is selected coverage, not a full review of all 75 published tools.
- Sources read on October 14:
  - Replit, October 9: https://docs.replit.com/updates/2026/10/09/changelog
  - GitHub, October 7: https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available/
  - Cursor, October 6: https://cursor.com/changelog/remote-control-local-agents
  - GitHub, September 18: https://github.blog/changelog/2026-09-18-upcoming-deprecation-of-selected-github-copilot-models-in-mid-october/
- Selection: cross-project work, local execution permissions, remote agent
  access, and a scheduled model-retirement deadline. Each has a practical
  follow-up check. Broad model-launch news and private-preview waitlists were
  not added simply to increase the count.
- October 19 retirement is still scheduled at this check, not completed.
  Source announcement dates are preserved. Tool full-review dates and the
  three original event IDs, revisions, and check dates are unchanged.
- Homepage saved-tool updates and RSS use these same records. New event IDs
  surface as unread without resetting readers' existing read state.
- QA PASS: isolated staged-source production build, seven-record validator,
  11 saved-update/finder tests, RSS/sitemap XML, 75-tool shortlist validator,
  291 legacy post URLs, four new homepage entries, eight draft exclusions.
  Existing legacy raw-HTML warning remains unrelated.
- HEAD baseline: 578b70b; 28 owner WIP files excluded from the staged release.
- Owner approved: validate, commit, and deploy only this update.
- NEXT_SINGLE_TASK: push this verified release and confirm Cloudflare success
  and the new live HTML/RSS entries. Deployment result is reported in chat.
- BLOCKER: none.

Implementation phase: 2026-09-12. Local changes prepared for review; deployment
is a separate step.

## Product Scope

The existing `/ai-tools/review-updates/` route now starts with selected official
product announcements and their practical implications. Its existing editorial
review log, filters, and review-checkpoint storage remain available below it.
The homepage previews recent announcements and three task-based decision
guides. Relevant tool pages link to their latest tracked announcement.

Initial coverage is three tools and three announcements, not a full re-review
of the 65 reviewed tools. Their full-review dates are unchanged. No price,
privacy, licensing, or availability change is inferred from silence.

## Evidence Checked

- GitHub, 2026-09-11: https://github.blog/changelog/2026-09-11-auto-resolution-and-analysis-updates-in-copilot-code-review/
- Replit, 2026-09-11: https://docs.replit.com/updates/2026/09/11/changelog
- Cursor, 2026-09-10: https://cursor.com/changelog/projects
- Coding guide link checks: https://cursor.com/pricing and https://github.com/features/copilot/plans

Announcement pages were read on 2026-09-12. Summaries attribute changes to the
vendor; check-before-use text is Aiplorer's editorial advice. Announced date,
source-check date, and full tool-review date are separate concepts.

## Updating The Watch

1. Open an official dated announcement and verify the exact claim and scope.
2. Add an entry to `data/ai_tool_changes.json` with a stable ID, tool route,
   announcement date, check date, topic, brief summary, practical check,
   official source title and URL, and related guide.
3. Preserve older events. Increase `revision` for material corrections so
   previously read records can reappear as unread. Explain corrections in
   the record itself. Never change a date simply to suggest freshness.
4. Advance `checkedAt` only after actually checking the source. Extend the
   validator's official-host map when covering a new provider.
5. Run the build, record validator, RSS XML validation, and production guards.

No fetching job, scheduler, login, notification sender, analytics collector,
or auto-publisher is installed. RSS updates after a reviewed data update is
built and deployed. Reader polling determines when subscribers receive it.

The shared Hugo data partial excludes draft or unreviewed tool references
even during a draft build. The validator rejects missing production routes,
duplicate IDs, future or invalid dates, and unapproved source hosts.

## Return Visits

- Saved-tool filtering reads the existing `aiplorer-shortlist-v1` browser list.
- Read state uses `aiplorer-change-read-v1`, with event ID and revision tokens.
- Reading a page does not silently mark everything read. The user explicitly
  marks visible updates read. Topic, saved, and unread filters compose.
- Malformed or unavailable storage leaves the public log readable. Failed
  writes show a session-only status. Cross-tab storage changes refresh the view.
- `/ai-tools/review-updates/index.xml` contains the same eligible events and
  links to durable event anchors. It is separate from the general site feed.

## Content Strategy Applied

Three decision guides add reusable sample tasks, evidence tables, failure
conditions, and decision-note templates:

- Cursor vs GitHub Copilot for repository work
- Choosing AI for sensitive document research
- AI presentation client handoff checklist

These are editorial evaluation protocols, not performed product benchmarks,
privacy certifications, export guarantees, or rankings. Only the coding guide
makes narrow, attributed product-change statements supported by the official
announcements above. Other guides use task methodology without asserting
provider-specific capabilities. Related tool cards retain their original
review dates and link to official details via existing reviews.

## Validation Commands

```sh
hugo --cleanDestinationDir --gc --minify
node scripts/validate-change-watch.mjs
xmllint --noout public/ai-tools/review-updates/index.xml
node scripts/validate-production-post-urls.mjs
node scripts/validate-reset-history.mjs
git diff --check
```

Before release, check desktop/mobile layout, filtering, explicit mark-read and
reload, storage failures, RSS item links, and draft exclusion. Continue with
additional official-source checks in manageable batches; do not imply the
initial watch covers every tool or every vendor update.

## Validation Result (2026-09-12)

- Production and draft builds passed with Hugo 0.152.2; production was restored.
- Change Watch record validation, RSS/sitemap XML parsing, internal links and
  anchors, RSS autodiscovery, and apex canonical checks passed.
- All eight existing drafts stayed outside production routes and sitemap.
- The existing post validator passed for 291 published source URLs. The reset
  history validator passed for the existing 52 records.
- Playwright checks passed at 390px and 1440px: watch, homepage, and all three
  guide pages; topic/saved/unread filters; explicit mark-read and reload;
  blocked storage fallback; and JavaScript-disabled reading.
- Existing legacy-post raw-HTML warning remains; no legacy post was changed.
- The homepage shows each new decision guide once; its later practical section
  continues with three use cases.
