# Aiplorer Reviewed Tool Metadata Consistency Audit

Date: 2026-07-26

This audit checks the front matter and rendered metadata for Aiplorer's 60
reviewed public tool pages and three draft-only tool pages. It does not change
tool claims, public routes, categories, review decisions, or draft exposure.

## Front Matter Result

All 63 tool files parsed successfully as YAML:

- 60 pages use `draft: false` and `reviewStatus: "reviewed"`.
- SciSpace and Tome remain `draft: true` with
  `reviewStatus: "needs-official-review"`.
- Example AI Assistant remains an internal archetype-style draft with
  `reviewStatus: "draft"`.
- All reviewed pages have unique titles and official URLs.
- Every reviewed official URL uses HTTPS.
- All reviewed pages use `type: "ai-tools"` and `layout: "tool"`.
- Every category is one of the ten allowed Aiplorer categories.
- Required descriptive fields and the Overview, Useful For, and Notes sections
  are present.

Category counts remain:

| Category | Reviewed pages |
| --- | ---: |
| Productivity Tools | 11 |
| Automation Tools | 7 |
| Writing Tools | 7 |
| Audio Tools | 6 |
| Image Tools | 6 |
| Business Tools | 5 |
| Coding Tools | 5 |
| Video Tools | 5 |
| Learning Tools | 4 |
| Presentation Tools | 4 |
| **Total** | **60** |

## Last-Modified Result

The initial audit found 23 reviewed pages without explicit `lastmod` front
matter. Each page already had a completed official-source review dated
2026-07-25 or 2026-07-26. The missing values were added using the existing
`lastReviewed` date without changing page copy or advancing any review date.

All 60 reviewed pages now have both:

- a non-empty `lastReviewed`
- a `lastmod` that represents a completed publication or material re-review

The content model and publishing checklist now state that `lastmod` should be
added only after a real publication, source review, or content change. It must
not be advanced merely to make a page appear fresh.

## Rendered Metadata Result

The production output contained all 60 reviewed tool routes. For every route:

- one canonical tag used the expected
  `https://aiplorer.com/ai-tools/tools/<slug>/` URL
- the canonical used the apex host and a trailing slash
- the rendered title and description matched front matter
- `robots` was `index, follow`
- Open Graph title, description, and URL matched the page
- the official website link matched `officialUrl`
- the category and review date rendered on the page

The production sitemap contained exactly the same 60 reviewed tool URLs and no
draft tool URL.

## Draft Safety

Production output and the production sitemap continue to exclude:

- `/ai-tools/tools/scispace/`
- `/ai-tools/tools/tome/`
- `/ai-tools/tools/example-ai-assistant/`

The draft build continues to include all three pages. This audit does not
authorize publishing any draft.

## Maintenance Rule

Future reviewed tool updates should keep `lastReviewed` and `lastmod`
intentional:

- use `lastReviewed` for the date official sources were manually checked
- use `lastmod` for a real publication or material re-review reflected in the
  page
- do not update either field solely for sitemap freshness
- preserve the existing Aiplorer slug and canonical after a rename, acquisition,
  or shutdown unless a separate URL-preservation decision is approved
