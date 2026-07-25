# Aiplorer Reviewed Tools Source Freshness Audit

Date: 2026-07-25

This read-only content audit establishes the next official-source review order
for Aiplorer's reviewed tool pages. It does not re-verify product claims and
does not change any public tool page.

## Scope

The audit covered front matter in `content/ai-tools/tools/` and the current
editorial model. It checked:

- publication and review status
- `lastReviewed` dates
- primary categories
- official URL presence
- source-note presence
- alignment between the category taxonomy and internal documentation

## Current Inventory

Aiplorer has 55 reviewed public tool pages and three draft-only pages.

| Last reviewed | Reviewed pages |
| --- | ---: |
| 2026-06-02 | 19 |
| 2026-06-06 | 5 |
| 2026-07-25 | 31 |
| **Total** | **55** |

All 55 reviewed pages have:

- `draft: false`
- `reviewStatus: "reviewed"`
- a non-empty `lastReviewed`
- an `officialUrl`
- `sourceNotes`
- an allowed primary category

The three draft-only pages remain SciSpace, Tome, and Example AI Assistant.
SciSpace and Tome require stable official-source review before publication.
Example AI Assistant remains an internal content-model example.

## Documentation Alignment

The public taxonomy has ten categories. `Presentation Tools` was added to the
content model during this audit because it was already a live category but was
missing from the documented allowed-category list.

All ten category pages now include reviewed links or cards and cautious
category-specific guidance. No category needs a bulk tool batch merely to have
a reviewed representative.

## Completed First Freshness Batch

The first re-review batch covered Productivity Tools:

- ChatGPT
- Claude
- Gemini
- Perplexity
- Microsoft Copilot
- Notion AI

All six pages passed conservative official-source re-review on 2026-07-25.
Their high-level public descriptions remained accurate enough to keep. Review
dates and source notes were refreshed, and sensitive-information cautions were
strengthened for ChatGPT, Claude, and Gemini.

A preliminary command-line URL reachability check returned:

- HTTP 200: Gemini, Microsoft Copilot, Notion AI
- HTTP 403 from command-line requests: ChatGPT, Claude, Perplexity

The 403 results did not establish that the official URLs were invalid. The
official product and documentation pages were subsequently reviewed through
browser-accessible sources.

## Review Priorities

The Productivity Tools review rechecked:

- official product identity and current official URL
- pricing and plan pages without copying exact prices or limits unless needed
- model and feature availability without assuming access is uniform
- privacy, data handling, connected workspace, and account cautions
- source and citation cautions where search or research features are involved
- generated text, code, and factual output review requirements

Wording remains cautious. The review did not introduce rankings, ratings,
affiliate links, unsupported "best" claims, or privacy and security
guarantees.

## Later Batches

Continue with this order:

1. Automation Tools
2. Coding Tools
3. Learning Tools
4. Presentation Tools
5. Audio, Image, Video, Writing, and Business Tools reviewed on 2026-07-25

Automation, Coding, Learning, and Presentation Tools were reviewed in early
June and include fast-changing limits, integrations, models, rights, or product
scope. The July batches are newer and can follow unless a product announces a
major change first.

## Draft Policy

Do not publish SciSpace or Tome merely to complete a batch. Revisit them only
when current official product, help, pricing, privacy, security, and legal
sources are reachable and sufficient for conservative wording.

Production builds and the production sitemap must continue to exclude:

- `/ai-tools/tools/scispace/`
- `/ai-tools/tools/tome/`
- `/ai-tools/tools/example-ai-assistant/`

## Next Phase

Run an official-source freshness review of the seven Automation Tools. Review
only Zapier, Make, n8n, IFTTT, Pipedream, Bardeen, and Relay.app; preserve
current routes and publish no draft page as part of that phase.
