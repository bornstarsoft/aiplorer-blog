# Content Detail Accessibility Audit

Date: 2026-07-26

## Scope

The audit covered the current reviewed guide and use-case detail pages:

- `/guides/how-to-choose-the-right-ai-tool/`
- `/use-cases/how-to-use-ai-to-write-better-emails/`
- `/use-cases/how-to-summarize-long-documents-with-ai/`

Each route was checked at desktop `1440x1000` and mobile `390x844`
viewports. Checks included heading order, article structure, link names and
targets, landmark use, keyboard focus, list rendering, and horizontal overflow.

## Findings

The shared theme single-page template exposed the section label as an `aside`
landmark even though it was only an eyebrow above the title. It also rendered
an empty contextual `aside` and an empty tags list on all three pages.

Heading order, body links, keyboard focus, and mobile width were otherwise
sound. Every page had one H1 followed by H2 sections, all link names were
present, and no horizontal overflow appeared at the tested mobile width.

## Resolution

Guide and use-case detail pages now use a section-scoped local single-page
layout. The local layout:

- renders the section eyebrow as a paragraph instead of a complementary
  landmark
- omits the empty contextual sidebar
- renders the tags partial only when tags exist
- preserves the existing title, content, link, navigation, and route behavior
- remains limited to `guides` and `use-cases`, without changing legacy posts

No guide or use-case claims, recommendations, rankings, ratings, affiliate
behavior, or draft status changed.
