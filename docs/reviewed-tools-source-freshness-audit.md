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
| 2026-06-01 | 3 |
| 2026-06-02 | 22 |
| 2026-06-06 | 5 |
| 2026-07-25 | 25 |
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

## First Freshness Batch

The recommended first re-review batch is Productivity Tools:

- ChatGPT
- Claude
- Gemini
- Perplexity
- Microsoft Copilot
- Notion AI

ChatGPT, Claude, and Gemini have the oldest reviewed date, 2026-06-01. The
other three were reviewed on 2026-06-02 and belong to the same fast-changing
category, so reviewing the six together keeps the work coherent.

A simple URL reachability check on 2026-07-25 returned:

- HTTP 200: Gemini, Microsoft Copilot, Notion AI
- HTTP 403 from command-line requests: ChatGPT, Claude, Perplexity

The 403 results do not establish that the official URLs are invalid. They
indicate that the next review should use browser-accessible official product,
help, pricing, privacy, and security pages rather than relying on command-line
reachability alone.

## Review Priorities

For the Productivity Tools batch, recheck:

- official product identity and current official URL
- pricing and plan pages without copying exact prices or limits unless needed
- model and feature availability without assuming access is uniform
- privacy, data handling, connected workspace, and account cautions
- source and citation cautions where search or research features are involved
- generated text, code, and factual output review requirements

Keep wording cautious. A successful freshness review may update only
`lastReviewed` and `sourceNotes` when the public description remains accurate.
Do not introduce rankings, ratings, affiliate links, unsupported "best"
claims, or privacy and security guarantees.

## Later Batches

After Productivity Tools, use this order:

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

Run an official-source freshness review of the six Productivity Tools. Review
only those six, preserve current routes, and publish no draft page as part of
that phase.
