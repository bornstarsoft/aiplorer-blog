# Aiplorer Reviewed Tools Structure Status

Date: 2026-07-25

This internal note records the current reviewed-tool structure, remaining
drafts, category coverage, editorial policy, and recommended next work. Counts
are based on tool front matter in `content/ai-tools/tools/`.

## Current Tool Counts

Aiplorer currently has 55 reviewed public tool pages and three draft-only tool
pages.

| Category | Reviewed tools | Count |
| --- | --- | ---: |
| Automation Tools | Zapier, Make, n8n, IFTTT, Pipedream, Bardeen, Relay.app | 7 |
| Writing Tools | Grammarly, DeepL, Jasper, Copy.ai, Writesonic, Surfer, Frase | 7 |
| Audio Tools | ElevenLabs, Murf AI, Speechify, Suno, Udio, Adobe Podcast | 6 |
| Image Tools | Canva AI, Adobe Firefly, Midjourney, Ideogram, Leonardo AI, Stable Diffusion | 6 |
| Productivity Tools | ChatGPT, Claude, Gemini, Perplexity, Microsoft Copilot, Notion AI | 6 |
| Business Tools | HubSpot Breeze, Salesforce Agentforce, Zoho Zia, Shopify Sidekick, Fin | 5 |
| Coding Tools | GitHub Copilot, Cursor, Windsurf, Replit, Tabnine | 5 |
| Video Tools | Runway, Pika, Luma AI, Descript, Synthesia | 5 |
| Learning Tools | NotebookLM, Elicit, Consensus, You.com | 4 |
| Presentation Tools | Gamma, Beautiful.ai, Pitch, SlidesAI | 4 |
| **Total** |  | **55** |

The reviewed index at `/ai-tools/tools/` groups published tools by category.
The AI Tools landing page links to the ten public categories and the reviewed
tool pages.

## Current Draft Tools

These pages remain draft-only and must not be linked or submitted for indexing
until they pass a new official-source review:

- SciSpace
- Tome
- Example AI Assistant

SciSpace remains draft pending stable official product, pricing, help, privacy,
and security source review. Tome remains draft pending stable official product
and help-source availability. Example AI Assistant is an internal content-model
page and is not a publication candidate.

Production builds and the production sitemap must exclude all three pages.

## Category Structure

Current public category routes:

- `/ai-tools/writing-tools/`
- `/ai-tools/image-tools/`
- `/ai-tools/video-tools/`
- `/ai-tools/audio-tools/`
- `/ai-tools/presentation-tools/`
- `/ai-tools/coding-tools/`
- `/ai-tools/productivity-tools/`
- `/ai-tools/automation-tools/`
- `/ai-tools/learning-tools/`
- `/ai-tools/business-tools/`

Categories with reviewed-card sections and current caution copy:

- Writing Tools
- Image Tools
- Video Tools
- Audio Tools
- Coding Tools
- Productivity Tools
- Automation Tools
- Learning Tools
- Business Tools

Presentation Tools has four reviewed representatives and a dedicated category
route, but its category page still uses lightweight introductory copy without
a reviewed-card section. This is the clearest remaining category-page gap.

## Category Balance

Strongest coverage:

- Automation Tools and Writing Tools each have seven reviewed pages.
- Audio, Image, and Productivity Tools each have six reviewed pages.
- Business, Coding, and Video Tools each have five reviewed pages.

Stable but smaller categories:

- Learning Tools has four reviewed research and source-review tools.
- Presentation Tools has four reviewed presentation workflow tools.

Every public category now has multiple reviewed representatives. Aiplorer no
longer needs a bulk batch simply to fill an empty category. Near-term work
should favor category quality, source maintenance, and live-deployment checks
over rapidly increasing the tool count.

## Editorial Policy

Current policy:

- No fake rankings, ratings, or scores.
- No affiliate links or paid placement.
- No unsupported "best" claims.
- No on-site ads, login, database, search, or workflow automation features.
- New tool pages start as drafts.
- A page becomes public only after conservative official-source review.
- Exact pricing, limits, model access, feature details, privacy, security,
  licensing, ownership, and commercial-use claims are omitted unless directly
  verified and necessary.
- Generated text, code, images, video, audio, research summaries, citations,
  and automated actions require human review.
- Sensitive, private, confidential, customer, employee, legal, medical, and
  financial information requires extra care.

## Search Console Follow-Up

Manual URL Inspection can prioritize recently added or changed aggregate and
category routes:

```txt
https://aiplorer.com/ai-tools/
https://aiplorer.com/ai-tools/tools/
https://aiplorer.com/ai-tools/audio-tools/
https://aiplorer.com/ai-tools/productivity-tools/
```

Recent Audio Tools pages:

```txt
https://aiplorer.com/ai-tools/tools/murf-ai/
https://aiplorer.com/ai-tools/tools/speechify/
https://aiplorer.com/ai-tools/tools/suno/
https://aiplorer.com/ai-tools/tools/udio/
https://aiplorer.com/ai-tools/tools/adobe-podcast/
```

Draft routes must not be submitted for indexing.

## Recommended Next Work

### 1. Polish Presentation Tools Category

Add reviewed cards for Gamma, Beautiful.ai, Pitch, and SlidesAI to
`/ai-tools/presentation-tools/`. Keep the existing fact-checking, brand,
privacy, media-license, and image-rights cautions. Do not expose Tome.

### 2. Recheck Remaining Real Drafts

Revisit SciSpace and Tome only when stable official product, help, pricing,
privacy, and terms sources are available. Keep both unpublished if those
sources remain incomplete or inconsistent.

### 3. Review Source Freshness

Prioritize pages with fast-changing plans, rights, model access, or product
scope. Audio, image, video, automation, coding, and business tools deserve
periodic source checks even when the public copy remains deliberately general.

### 4. Consider Future Draft-First Batches

Only after category maintenance, possible future directions include:

- Meeting and transcription workflows: Otter.ai, Fireflies.ai, Fathom,
  Granola, Read AI
- Design and creative workflows: Figma AI, Kittl, Photoroom, Clipdrop,
  Microsoft Designer
- Data and analysis workflows: Julius AI, Rows AI, Akkio, Obviously AI,
  Polymer

These are candidate names only. They are not reviewed recommendations and
should not be added publicly without the normal draft-first and official-source
review process. A new category should be created only when the existing
taxonomy cannot describe a candidate cleanly.

## Recommended Direction

The immediate next phase should polish the Presentation Tools category. After
that, pause bulk expansion long enough to recheck source freshness, Search
Console coverage, sitemap health, and the two real draft candidates.
