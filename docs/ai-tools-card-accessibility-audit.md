# AI Tools Card Accessibility Audit

Date: 2026-07-26

## Scope

The audit covered these representative routes:

- `/ai-tools/`
- `/ai-tools/tools/`
- `/ai-tools/coding-tools/`

Checks included heading structure, card link names, landmark continuity,
keyboard focus behavior, and horizontal overflow at desktop and mobile widths.

## Result

The existing H1 and H2 structure, skip link, named navigation, and mobile card
layout were working without horizontal overflow. Card titles were visually
prominent but used `strong` elements, so they did not appear in heading
navigation. Each card link also inherited its complete label, title,
description, and metadata as one long accessible name.

The shared card templates now:

- expose each card title as an H3 under its section or category H2
- give each card link a concise accessible name based on the card title
- use block-level card body containers for valid, predictable markup
- preserve existing visible copy, routes, categories, and reviewed status

The card title CSS now resets heading margin and keeps the established visual
weight. The stylesheet cache key was updated so the small CSS change reaches
production without relying on an expired static-asset cache.

## Content Boundaries

No tool claims, rankings, ratings, affiliate behavior, public routes, or legacy
posts changed. Draft tools remain excluded from production output and the
sitemap.

## Full Category Smoke Audit

The follow-up audit covered every public AI Tools category at desktop
`1440x1000` and mobile `390x844` viewports:

| Category | Reviewed cards |
| --- | ---: |
| Audio Tools | 6 |
| Automation Tools | 7 |
| Business Tools | 6 |
| Coding Tools | 5 |
| Image Tools | 9 |
| Learning Tools | 4 |
| Presentation Tools | 4 |
| Productivity Tools | 12 |
| Video Tools | 5 |
| Writing Tools | 7 |

All ten category pages passed the smoke audit:

- one H1 is present on each page
- card titles are H3 headings under category content headings
- every card link has a concise accessible name matching its visible title
- the skip link, main landmark, and named primary navigation are present
- card focus shows a 3px solid outline with a 3px offset
- no page or card has horizontal overflow at the tested mobile width
- no legacy `strong` card title or inline card body wrapper remains

The category pages contain 65 unique reviewed-tool links in total. That link set
matches the 65 entries in `/ai-tools/tools/` exactly, with no missing, duplicate,
or extra tool links. No additional template or public-content change was needed
after this full-category pass.
