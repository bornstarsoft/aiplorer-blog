# Aiplorer Reviewed Tool Discovery Link Audit

Date: 2026-07-26

This audit compares Aiplorer's 60 reviewed public tool pages with the rendered
AI Tools landing, reviewed index, and category pages. It checks discoverability
without changing tool content, rankings, routes, categories, or draft status.

## Discovery Result

The production build contains 60 reviewed tool routes and three draft-only tool
files.

The rendered discovery paths match the reviewed front matter inventory:

- `/ai-tools/` links to all 60 reviewed tools exactly once.
- `/ai-tools/tools/` links to all 60 reviewed tools exactly once.
- `/ai-tools/` links to each of the ten public category pages exactly once.
- Every reviewed tool link resolves to its generated production route.
- No reviewed tool is missing from its assigned category page.
- No category page links to a reviewed tool assigned to another category.
- No reviewed tool appears more than once on its category page.

The site homepage remains a deliberately smaller bookmark selection. It is not
expected to link to all 60 reviewed tools.

## Category Result

| Category | Expected links | Rendered links |
| --- | ---: | ---: |
| Productivity Tools | 11 | 11 |
| Automation Tools | 7 | 7 |
| Writing Tools | 7 | 7 |
| Audio Tools | 6 | 6 |
| Image Tools | 6 | 6 |
| Business Tools | 5 | 5 |
| Coding Tools | 5 | 5 |
| Video Tools | 5 | 5 |
| Learning Tools | 4 | 4 |
| Presentation Tools | 4 | 4 |
| **Total** | **60** | **60** |

The reviewed index groups pages automatically from `category` front matter.
The AI Tools landing and category pages use manually maintained cards. All
three discovery layers currently agree.

## Draft Safety

The production build contains no links to:

- `/ai-tools/tools/scispace/`
- `/ai-tools/tools/tome/`
- `/ai-tools/tools/example-ai-assistant/`

A sitewide scan of rendered production HTML found zero anchors targeting those
draft routes. Their production output files remain absent.

## Maintenance Rule

When a reviewed tool is published or its category changes:

1. Keep the tool route under `/ai-tools/tools/<slug>/`.
2. Add or update its card on `/ai-tools/`.
3. Add or move its card on the matching category page.
4. Let `/ai-tools/tools/` group the reviewed page automatically from front
   matter.
5. Confirm the tool appears exactly once in all three discovery layers.
6. Confirm no draft route is linked anywhere in production.

The full reviewed index is the authoritative browse-all destination. Category
and landing cards should remain descriptive and non-ranking.

## Audit Decision

No public content or layout change was required. The current discovery
structure is complete, category-consistent, and draft-safe for all 60 reviewed
tool pages.
