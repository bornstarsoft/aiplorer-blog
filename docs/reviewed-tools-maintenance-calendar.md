# Aiplorer Reviewed Tools Maintenance Calendar

Date: 2026-07-26

This calendar turns the risk-based cadence in
`docs/reviewed-tools-monitoring-plan.md` into concrete review windows. It does
not authorize automatic content changes, publication, indexing requests, or
advancing review dates without a completed official-source review.

## Baseline

- 65 reviewed public tool pages
- 10 public tool categories
- Review baseline dates: 2026-07-25 and 2026-07-26
- Eight draft-only pages: SciSpace, Tome, Clipdrop, Julius AI, Rows, Obviously
  AI, Polymer, and Example AI Assistant

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
| Draft readiness | Trigger-based only | SciSpace; Tome; Clipdrop; Julius AI; Rows; Obviously AI; Polymer | Revisit only when the identified official-source gaps are resolved |
| Data and analysis review | Completed 2026-07-26 | Akkio | Add to Business Tools monitoring and verify deployment separately |

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

## Transition Monitoring Log

### 2026-07-26 Baseline Check

- Relay.app's official shutdown notice continued to state that free-user
  access ends on August 15, 2026 and paying-customer access ends on September
  14, 2026. Its export, account deletion, connected-app credential, and
  transition support guidance remained materially unchanged.
- The official Devin Desktop page and Cognition announcement continued to
  identify Devin Desktop as the new name and next generation of Windsurf. The
  existing `/ai-tools/tools/windsurf/` route remains the correct continuity
  route.
- The current Relay.app and Windsurf pages remain accurate. No public copy,
  metadata, route, category, or publication-status change was required, and
  their `lastReviewed` values were not advanced for this no-change check.
- Official sources checked:
  `https://www.relay.app/`,
  `https://docs.relay.app/workspace-and-account/export-your-relay.app-data`,
  `https://devin.ai/desktop`,
  `https://cognition.com/blog/introducing-devin-desktop`, and
  `https://docs.devin.ai/desktop/getting-started`.
- Next scheduled transition check: 2026-08-02, or sooner if an official
  identity, destination, access, export, migration, or shutdown notice changes.

## September 2026 High-Risk Cycle

Use small batches:

1. Productivity core: ChatGPT, Claude, Gemini, Perplexity, Microsoft Copilot,
   and Notion AI.
2. Meeting workflows: Otter.ai, Fireflies.ai, Fathom, Granola, and Read AI.
3. Automation: Zapier, Make, n8n, IFTTT, Pipedream, Bardeen, and Relay.app.
4. Coding: GitHub Copilot, Cursor, Windsurf, Replit, and Tabnine.
5. Business and cross-category exceptions: HubSpot Breeze, Salesforce
   Agentforce, Zoho Zia, Shopify Sidekick, Fin, Akkio, Canva AI, DeepL, and
   ElevenLabs.
6. Design workflow exception: Figma AI.

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
  AI, Stable Diffusion, Kittl, Photoroom, and Microsoft Designer.
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
