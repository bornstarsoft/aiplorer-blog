# Aiplorer Reviewed Tools Monitoring Plan

Date: 2026-07-26

This internal plan turns the completed official-source freshness review into a
repeatable maintenance workflow. It does not authorize automatic publication,
ranking, scoring, or unattended content changes.

## Baseline

The monitoring baseline is:

- 55 reviewed public tool pages
- 10 public tool categories
- 3 draft-only pages: SciSpace, Tome, and Example AI Assistant
- current official-source review dates of 2026-07-25 or 2026-07-26
- production canonicals under `https://aiplorer.com/`

Every reviewed page currently has `draft: false`, `reviewStatus: "reviewed"`,
a non-empty `lastReviewed`, an official URL, source notes, and an allowed
category. Production output and the sitemap exclude all three draft pages.

## Monitoring Triggers

Re-review a page before its normal cadence when an official source announces
or clearly shows:

- a product shutdown, wind-down, acquisition, rename, or domain move
- a material change to plans, credits, limits, access, or availability
- a material change to privacy, training, retention, residency, or security
  terms
- a change to licensing, ownership, attribution, consent, or commercial-use
  requirements
- a major shift in product scope, supported workflow, account model, or
  connected-service behavior
- a broken official URL or a redirect to a materially different product

Official product, help, pricing, privacy, security, policy, and legal pages are
the preferred evidence. A command-line access failure alone is not enough to
declare a product unavailable.

## Risk Queue

### Priority 1: Active Transition

- Relay.app: monitor the announced wind-down and preserve the existing public
  URL as transition guidance. Recheck official shutdown and account-access
  information before and after the announced August and September 2026 access
  dates.
- Windsurf: monitor the transition to the Devin Desktop name, the official
  destination URL, and whether the existing Aiplorer page still gives accurate
  identity and migration context.

Check these pages weekly while the transitions are active.

### Priority 2: Fast-Changing Access Or Data Boundaries

Review these areas at least every two months, or sooner when an official change
signal appears:

- Productivity Tools
- Coding Tools
- Automation Tools
- Business Tools
- Canva AI
- DeepL
- ElevenLabs

Focus on account and workspace boundaries, connected services, model or
provider choices, data-use controls, privacy and retention settings, credits,
permissions, and enterprise or organization policy changes. Continue to avoid
copying exact values unless they are necessary and directly verified.

### Priority 3: General Product Freshness

Review the remaining Writing, Image, Video, Audio, Learning, and Presentation
pages at least every four months, or sooner when an official change signal
appears.

Focus on product identity, official URLs, major workflow changes, rights and
consent requirements, source verification, sensitive content, and public
availability. This cadence is an editorial maintenance target, not a claim
about product stability.

## Page Review Procedure

For each page:

1. Confirm the official product identity and canonical product URL.
2. Check official product, help, pricing, privacy, security, policy, and legal
   sources that are relevant to the page.
3. Compare the current page with official positioning and remove stale claims.
4. Keep wording cautious around prices, limits, model access, quality,
   availability, privacy, security, licensing, ownership, and commercial use.
5. Preserve the existing `/ai-tools/tools/<slug>/` URL, including after a
   rename or wind-down.
6. Update `sourceNotes`, `lastReviewed`, and `lastmod` only after the review is
   complete.
7. Keep drafts unpublished unless they independently pass the full official
   source and publishing checklist.

## Validation Gate

Before committing a freshness update:

```bash
hugo --cleanDestinationDir --gc --minify
hugo --buildDrafts
hugo --cleanDestinationDir --gc --minify
git diff --check
git diff --cached --check
git status --short
```

Confirm:

- every intended public route exists in production output
- the production sitemap includes only intended public tool URLs
- SciSpace, Tome, and Example AI Assistant are absent from production output
  and the production sitemap
- the draft build still includes the intended drafts
- no generated output or legacy post is staged

After deployment, verify the changed routes, `/ai-tools/`,
`/ai-tools/tools/`, and `/sitemap.xml`. HTML and XML responses should continue
to avoid stale long-lived cache behavior.

## Review Log

For each monitoring batch, record:

- review date
- tools reviewed
- official sources checked
- material changes found
- publish, retain, transition, or draft decision
- validation result
- deployment and live-route result

The source freshness audit remains the historical review log. This plan governs
the next recurring review cycle.

## Draft Policy

SciSpace and Tome remain draft pending stable, sufficient official sources.
Example AI Assistant remains an internal model page. None of the three should
be linked publicly, submitted for indexing, or added to the production
sitemap.
