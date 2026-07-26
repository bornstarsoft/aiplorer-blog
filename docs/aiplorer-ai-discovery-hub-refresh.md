# Aiplorer AI Discovery Hub Refresh

Date: 2026-07-26

## Goal

Make Aiplorer faster to understand and more useful for repeat visits without
turning it into a ranking site, adding paid placement, or introducing a
JavaScript search application.

## Information Architecture

The refreshed experience starts from user intent:

- research and learning
- coding and debugging
- workflow automation
- writing and communication
- visual creation
- audio work
- presentations
- business workflows

This reflects the continued shift from isolated prompts toward agent-supported
workflows, coding assistance, research, and multimodal creation. The direction
was checked against:

- Google Cloud, AI Agent Trends 2026:
  https://cloud.google.com/resources/content/ai-agent-trends-2026
- Microsoft, 2026 Work Trend Index:
  https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization
- Anthropic, 2026 Agentic Coding Trends Report:
  https://resources.anthropic.com/ty-2026-agentic-coding-trends-report

The site does not turn these themes into unsupported popularity claims or
rankings. They are navigation paths into existing reviewed categories.

## Dynamic Discovery

The homepage and AI Tools landing now derive reviewed tool totals, category
totals, and recently reviewed cards from Hugo content metadata. This removes
the stale manual bookmark list and keeps discovery surfaces synchronized as
reviewed pages are added or updated.

The reviewed index keeps all tools visible, groups them in a stable category
order, and provides an HTML-only category jump bar. There is no client-side
search, tracking dependency, or large JavaScript bundle.

## Trust And Performance

- Reviewed status remains the publication gate.
- Draft tool pages remain excluded from production.
- Official-source and change-over-time cautions remain visible.
- There are no paid rankings, ratings, or affiliate placements.
- Category and workflow icons are inline, dependency-free SVG.
- The redesign adds no JavaScript.
- Existing public routes and legacy post URLs are unchanged.

## Validation Gate

```bash
node scripts/validate-production-post-urls.mjs
hugo --cleanDestinationDir --gc --minify
hugo --buildDrafts --cleanDestinationDir --gc --minify
hugo --cleanDestinationDir --gc --minify
git diff --check
git diff --cached --check
```

Visual QA should cover the homepage, `/ai-tools/`, and `/ai-tools/tools/` at
desktop and 360-pixel mobile widths. Confirm one H1 per page, no document-level
horizontal overflow, all reviewed cards present, and no browser console errors.
