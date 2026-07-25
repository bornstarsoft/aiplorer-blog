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
| 2026-06-02 | 8 |
| 2026-07-25 | 47 |
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

## Completed Automation Freshness Batch

The second re-review batch covered Automation Tools:

- Zapier
- Make
- n8n
- IFTTT
- Pipedream
- Bardeen
- Relay.app

All seven pages were reviewed against current official sources on 2026-07-25.
Zapier, Make, n8n, IFTTT, and Pipedream kept their cautious high-level public
descriptions. Bardeen was adjusted to reflect its current research, data, and
business workflow emphasis.

Relay.app required a material status update. Its official site announces a
shutdown with access ending on August 15, 2026 for free users and September 14,
2026 for paying customers. The existing reviewed URL remains available as
transition guidance, but the page no longer presents Relay.app as a new
adoption option.

## Completed Coding Freshness Batch

The third re-review batch covered Coding Tools:

- GitHub Copilot
- Cursor
- Windsurf
- Replit
- Tabnine

All five pages were reviewed against current official sources on 2026-07-25.
GitHub Copilot, Cursor, Replit, and Tabnine remain published with cautious
high-level descriptions. Source notes were refreshed, and account,
organization, privacy mode, codebase indexing, model-provider, data-use, and
budget cautions were strengthened where relevant.

Windsurf required a material identity update. Cognition's official product page
states that Devin Desktop is the new name for Windsurf. Aiplorer preserves the
existing `/ai-tools/tools/windsurf/` URL, points its official link to Devin
Desktop, and explains the rename without creating a duplicate tool page.

## Completed Learning Freshness Batch

The fourth re-review batch covered the reviewed Learning Tools:

- NotebookLM
- Elicit
- Consensus
- You.com

All four pages were reviewed against current official sources on 2026-07-25
and remain published. Source notes and review dates were refreshed without
adding paper-count, coverage, research-accuracy, citation-accuracy, model,
pricing, limit, privacy, retention, security, or availability guarantees.

NotebookLM received stronger cautions around notebook sharing, feedback,
connected Google services, account types, and organization settings. Elicit
and Consensus remain research-oriented tools with newer agent and deeper review
workflows, while their public pages continue to require original-source
verification.

You.com now emphasizes web search and research APIs on its main product site
while continuing to document a conversational AI platform. Its reviewed page
was broadened from a search-assistant description to search-and-research
products without promising API access or performance.

## Later Batches

Continue with this order:

1. Presentation Tools
2. Audio, Image, Video, Writing, and Business Tools reviewed on 2026-07-25

Presentation Tools were reviewed in early June and include fast-changing
limits, exports, collaboration, media rights, models, or product scope. The
July batches are newer and can follow unless a product announces a major
change first.

## Draft Policy

Do not publish SciSpace or Tome merely to complete a batch. Revisit them only
when current official product, help, pricing, privacy, security, and legal
sources are reachable and sufficient for conservative wording.

Production builds and the production sitemap must continue to exclude:

- `/ai-tools/tools/scispace/`
- `/ai-tools/tools/tome/`
- `/ai-tools/tools/example-ai-assistant/`

## Next Phase

Run an official-source freshness review of the four reviewed Presentation
Tools: Gamma, Beautiful.ai, Pitch, and SlidesAI. Preserve Tome as a draft
unless stable official product, help, pricing, privacy, and security sources
support a separate publication review.
