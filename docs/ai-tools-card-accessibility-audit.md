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
