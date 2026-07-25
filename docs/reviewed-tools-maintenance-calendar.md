# Aiplorer Reviewed Tools Maintenance Calendar

Date: 2026-07-26

This calendar turns the risk-based cadence in
`docs/reviewed-tools-monitoring-plan.md` into concrete review windows. It does
not authorize automatic content changes, publication, indexing requests, or
advancing review dates without a completed official-source review.

## Baseline

- 60 reviewed public tool pages
- 10 public tool categories
- Review baseline dates: 2026-07-25 and 2026-07-26
- Three draft-only pages: SciSpace, Tome, and Example AI Assistant

The earlier applicable cadence takes priority when a tool appears in more than
one group. Event-driven triggers such as a shutdown, rename, broken official
URL, pricing boundary change, or material privacy or licensing change override
the calendar.

## Next Review Windows

| Priority | Target | Scope | Expected action |
| --- | --- | --- | --- |
| Active transitions | By 2026-08-02, then weekly while active | Relay.app; Windsurf / Devin Desktop | Check official identity, destination, access, migration, and shutdown guidance |
| Fast-changing boundaries | Complete by 2026-09-25 to 2026-09-26 | Productivity, Automation, Coding, Business, Canva AI, DeepL, ElevenLabs | Recheck official product, help, pricing, privacy, security, policy, and legal sources as relevant |
| General freshness | Complete by 2026-11-25 to 2026-11-26 | Remaining Writing, Image, Video, Audio, Learning, and Presentation pages | Recheck identity, official URLs, major workflow scope, rights, consent, source verification, and availability |
| Draft readiness | Trigger-based only | SciSpace; Tome | Revisit only when stable official product and supporting sources are available |

Example AI Assistant remains an internal model page and is not a publication
candidate.

## Weekly Transition Check

### Relay.app

- Confirm the official shutdown notice and export guidance remain reachable.
- Check for changes to announced access deadlines, account deletion, export,
  credential, and support guidance.
- Keep the existing Aiplorer route as transition guidance unless official
  evidence requires a cautious update.

### Windsurf / Devin Desktop

- Confirm the Devin Desktop identity and official destination remain current.
- Check whether official product and documentation pages still describe the
  Windsurf relationship accurately.
- Preserve `/ai-tools/tools/windsurf/` and avoid creating a duplicate route for
  a rename.

Record a no-change result when official guidance remains materially unchanged.
Do not advance `lastReviewed` solely because a scheduled check was attempted.

## September 2026 High-Risk Cycle

Use small batches:

1. Productivity core: ChatGPT, Claude, Gemini, Perplexity, Microsoft Copilot,
   and Notion AI.
2. Meeting workflows: Otter.ai, Fireflies.ai, Fathom, Granola, and Read AI.
3. Automation: Zapier, Make, n8n, IFTTT, Pipedream, Bardeen, and Relay.app.
4. Coding: GitHub Copilot, Cursor, Windsurf, Replit, and Tabnine.
5. Business and cross-category exceptions: HubSpot Breeze, Salesforce
   Agentforce, Zoho Zia, Shopify Sidekick, Fin, Canva AI, DeepL, and
   ElevenLabs.

Focus on account and workspace boundaries, connected services, model or
provider choices, data-use controls, privacy and retention settings, credits,
permissions, enterprise or organization policy, licensing, consent, and
availability. Avoid copying exact values unless they are necessary and
directly verified.

## November 2026 General Cycle

Review the remaining pages by category:

- Writing Tools except DeepL: Copy.ai, Frase, Grammarly, Jasper, Surfer, and
  Writesonic.
- Image Tools except Canva AI: Adobe Firefly, Midjourney, Ideogram, Leonardo
  AI, and Stable Diffusion.
- Video Tools: Runway, Pika, Luma AI, Descript, and Synthesia.
- Audio Tools except ElevenLabs: Murf AI, Speechify, Suno, Udio, and Adobe
  Podcast.
- Learning Tools: NotebookLM, Elicit, Consensus, and You.com.
- Presentation Tools: Gamma, Beautiful.ai, Pitch, and SlidesAI.

Check product identity, official URL health, major workflow changes, rights and
consent requirements, source verification, sensitive-content handling, and
public availability. Apply an earlier review when an official change signal
appears.

## Validation And Recording

For every completed batch:

1. Record official sources checked and any material change.
2. Record the retain, transition, update, or draft decision.
3. Update `lastReviewed` and `lastmod` only after a complete review.
4. Run the validation gate in `docs/reviewed-tools-monitoring-plan.md`.
5. Verify changed live routes, aggregate listings, the relevant category, and
   the sitemap after deployment.

Search Console inspection remains manual and separate from this calendar.
Never submit draft, alternate-host, or cache-busted URLs for indexing.
