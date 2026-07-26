# Aiplorer Reviewed Tools Structure Status

Date: 2026-07-25
Updated: 2026-07-26

This internal note records the current reviewed-tool structure, remaining
drafts, category coverage, editorial policy, and recommended next work. Counts
are based on tool front matter in `content/ai-tools/tools/`.

## Current Tool Counts

Aiplorer currently has 64 reviewed public tool pages and four draft-only tool
pages.

| Category | Reviewed tools | Count |
| --- | --- | ---: |
| Automation Tools | Zapier, Make, n8n, IFTTT, Pipedream, Bardeen, Relay.app | 7 |
| Writing Tools | Grammarly, DeepL, Jasper, Copy.ai, Writesonic, Surfer, Frase | 7 |
| Audio Tools | ElevenLabs, Murf AI, Speechify, Suno, Udio, Adobe Podcast | 6 |
| Image Tools | Canva AI, Adobe Firefly, Midjourney, Ideogram, Leonardo AI, Stable Diffusion, Kittl, Photoroom, Microsoft Designer | 9 |
| Productivity Tools | ChatGPT, Claude, Gemini, Perplexity, Microsoft Copilot, Notion AI, Figma AI, Otter.ai, Fireflies.ai, Fathom, Granola, Read AI | 12 |
| Business Tools | HubSpot Breeze, Salesforce Agentforce, Zoho Zia, Shopify Sidekick, Fin | 5 |
| Coding Tools | GitHub Copilot, Cursor, Windsurf, Replit, Tabnine | 5 |
| Video Tools | Runway, Pika, Luma AI, Descript, Synthesia | 5 |
| Learning Tools | NotebookLM, Elicit, Consensus, You.com | 4 |
| Presentation Tools | Gamma, Beautiful.ai, Pitch, SlidesAI | 4 |
| **Total** |  | **64** |

The reviewed index at `/ai-tools/tools/` groups published tools by category.
The AI Tools landing page links to the ten public categories and the reviewed
tool pages.

## Current Draft Tools

These pages remain draft-only and must not be linked or submitted for indexing
until they pass a new official-source review:

- SciSpace
- Tome
- Example AI Assistant
- Clipdrop

SciSpace remains draft pending stable official product, pricing, help, privacy,
and security source review. Tome remains draft pending stable official product
and help-source availability. Example AI Assistant is an internal content-model
page and is not a publication candidate. Clipdrop remains draft pending a
consistent, readable official record of the current operator and applicable
privacy and legal terms.

Production builds and the production sitemap must exclude all four pages.

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
- Presentation Tools
- Coding Tools
- Productivity Tools
- Automation Tools
- Learning Tools
- Business Tools

All ten public category pages now have reviewed-card sections and current
caution copy. Presentation Tools links to Gamma, Beautiful.ai, Pitch, and
SlidesAI while Tome remains unpublished.

## Category Balance

Strongest coverage:

- Productivity Tools has 12 reviewed pages after the meeting, design, and
  transcription workflow batch.
- Image Tools has nine reviewed pages after the design and creative review.
- Automation Tools and Writing Tools each have seven reviewed pages.
- Audio Tools has six reviewed pages.
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

Use `docs/search-console-url-inspection-queue.md` for the current selective
manual queue. It prioritizes aggregate and category routes, the recent design
and creative pages, meeting and Coding Tools pages, transition pages, and
representative canonical samples. Draft, alternate-host, and cache-busted URLs
must not be submitted for indexing.

## Recommended Next Work

### 1. Run Risk-Based Monitoring

The first complete freshness cycle is finished. All 64 reviewed pages were
reviewed or rechecked against official sources on 2026-07-25 or 2026-07-26. Use
`docs/reviewed-tools-monitoring-plan.md` for the recurring cadence, change
triggers, validation gate, and review log.

Start with active product transitions such as the Relay.app wind-down and the
Windsurf-to-Devin Desktop identity change. Then monitor fast-changing access,
data, privacy, licensing, pricing, and availability boundaries across
Productivity, Coding, Automation, and Business Tools.

### 2. Recheck Remaining Real Drafts

Revisit SciSpace, Tome, and Clipdrop only when stable official product, help,
pricing, privacy, and terms sources are available. Keep them unpublished if
those sources remain incomplete or inconsistent.

### 3. Monitor Search And Deployment Health

Continue manual Search Console coverage checks, sitemap monitoring, and
important live-route verification. Preserve the explicit cache bypass for
`/ai-tools/*` and `/sitemap.xml`, and confirm aggregate pages remain current
after reviewed-page changes.

### 4. Consider Future Draft-First Batches

Only after category maintenance, possible future directions include:

- Data and analysis workflows: Julius AI, Rows AI, Akkio, Obviously AI,
  Polymer

The draft-first scope, category mapping, official-source gate, and caution
requirements for the design and creative candidates are recorded in
`docs/design-creative-draft-batch-plan.md`.

These are candidate names only. They are not reviewed recommendations and
should not be added publicly without the normal draft-first and official-source
review process. A new category should be created only when the existing
taxonomy cannot describe a candidate cleanly.

The meeting and transcription batch is now published under Productivity Tools.
Its draft-first source and caution record remains in
`docs/meeting-transcription-draft-batch-plan.md`.

## Recommended Direction

Deployment validation is complete for Figma AI, Kittl, Photoroom, and Microsoft
Designer. The immediate next phase is selective manual Search Console
inspection followed by risk-based maintenance. Keep SciSpace, Tome, and
Clipdrop unpublished unless their official sources become stable enough for
conservative review.
