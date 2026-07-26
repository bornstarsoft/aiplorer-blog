# Main Landing Accessibility Audit

Date: 2026-07-26

## Scope

The audit covered these public landing routes:

- `/`
- `/guides/`
- `/use-cases/`

Each route was checked at desktop `1440x1000` and mobile `390x844`
viewports. The checks covered heading hierarchy, landmark continuity, card link
names, keyboard focus visibility, and horizontal overflow.

## Result

All three routes passed without a public-template or content change.

| Route | Cards | H1 | Card title headings |
| --- | ---: | ---: | ---: |
| `/` | 27 | 1 | 27 H3 headings |
| `/guides/` | 4 | 1 | 4 H3 headings |
| `/use-cases/` | 4 | 1 | 4 H3 headings |

The rendered pages confirm:

- one H1 is present on each route
- section headings and H3 card titles follow a consistent hierarchy
- every card link has a concise accessible name matching its visible title
- card accessible names are unique within each route
- the skip link targets `main#main-content`
- the primary and footer navigation landmarks are named
- card focus shows a 3px solid outline with a 3px offset
- the skip link becomes visible when focused
- no page or card has horizontal overflow at the tested mobile width
- no legacy `strong` card title remains

## Content Boundaries

No public copy, routes, rankings, ratings, affiliate behavior, draft visibility,
or legacy posts changed. This audit records the current accessible rendering
baseline for the three main discovery routes.
