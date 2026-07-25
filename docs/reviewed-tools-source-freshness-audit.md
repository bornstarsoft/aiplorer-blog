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
| 2026-07-25 | 51 |
| 2026-07-26 | 4 |
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

## Completed Presentation Freshness Batch

The fifth re-review batch covered the reviewed Presentation Tools:

- Gamma
- Beautiful.ai
- Pitch
- SlidesAI

All four pages were reviewed against current official sources on 2026-07-25
and remain published. Their high-level presentation descriptions remain
accurate, while source notes and review dates were refreshed.

Gamma now covers a broader set of visual-content and programmatic creation
workflows. Beautiful.ai continues to emphasize AI-assisted presentation
creation, Smart Slides, brand controls, and team workflows. Pitch now documents
Pitch Agent, richer external sharing, and visitor analytics. SlidesAI now
documents presentation creation across its web app, Google Slides, PowerPoint,
and a ChatGPT-related workflow.

The pages add current cautions around AI data-use controls, workspace and
sharing permissions, cloud storage, third-party AI providers, visitor
analytics, consent, account connections, uploaded source material, and
third-party processing. They continue to avoid pricing, limit, quality, export,
commercial-use, privacy, security, and availability guarantees.

## Completed Cross-Category Freshness Batch

The final freshness batch covered the four remaining reviewed pages:

- Canva AI
- Grammarly
- DeepL
- ElevenLabs

All four pages were reviewed against current official sources on 2026-07-26
and remain published. All 55 reviewed public tool pages now have a current
official-source review dated 2026-07-25 or 2026-07-26.

Canva AI now reflects its current conversational creation scope and adds
cautions around connected tools, licensed content, provenance, technology
partners, and privacy settings. Grammarly now reflects generative assistance
and agent-style writing workflows, with stronger cautions around citations,
detectors, product improvement, and training controls.

DeepL now documents its broader Translator, Write, Voice, API, app, and
integration scope while adding plan-specific infrastructure, processing-region,
subprocessor, and data-residency cautions. ElevenLabs now reflects its broader
creative, speech, transcription, generative audio, agent, and API scope while
adding disclosure, consent, recording, retention, redaction, data-use,
provenance, and impersonation cautions.

The pages continue to avoid exact pricing, limits, model details, quality or
accuracy claims, feature availability promises, commercial-use conclusions,
privacy or security guarantees, and data-retention guarantees.

## Priority 1 Monitoring Check

Relay.app and Windsurf were rechecked on 2026-07-26 as the first active
transition monitoring pair.

Relay.app's live shutdown notice continues to state the same August and
September 2026 wind-down dates, disabled signup and upgrade status, export
options, account and data deletion behavior, connected-app credential deletion,
and transition support. Its current export documentation remains reachable and
adds detailed workspace, workflow, run-history, table, prompt, JSON, screenshot,
account, and workspace guidance. The former `www` legal, security, and privacy
URLs now redirect to apex paths that returned HTTP 404 in direct checks, so
they are no longer treated as live supporting sources. The public page remains
transition guidance and should be rechecked before the first announced access
deadline.

The Devin Desktop product page continues to state that Devin Desktop is the new
name for Windsurf, while Cognition's announcement describes it as the next
generation of Windsurf. The former Windsurf product, docs, and pricing URLs
redirect to current Devin pages. Current product, getting-started, pricing, and
privacy pages support the existing cautious transition description. The
Aiplorer `/ai-tools/tools/windsurf/` URL remains unchanged for continuity.

## Priority 2 Productivity Monitoring Check

ChatGPT, Claude, Gemini, Perplexity, Microsoft Copilot, and Notion AI were
rechecked on 2026-07-26 against their current official product, plan, help,
privacy, data-control, or security documentation.

The six public pages continue to use accurate high-level positioning and avoid
exact prices, limits, model-access claims, retention claims, and privacy or
security guarantees. Their existing cautions still cover output review,
sensitive or confidential information, connected services, account and
workspace differences, changing availability, and applicable workplace
policies. No public page change was required in this monitoring pass.

Microsoft's current consumer Copilot documentation gives additional detail
about training and personalization controls that can vary by account, product
context, and region. The existing Aiplorer page already distinguishes personal,
work, school, and organization contexts and directs users to current privacy
and data-handling policies, so no narrower or region-specific claim was added.

Official source groups checked:

- ChatGPT: `chatgpt.com`, ChatGPT pricing, OpenAI Data Controls FAQ, and the
  OpenAI Privacy Policy
- Claude: Claude product and plan pages plus the Anthropic Privacy Center
- Gemini: Gemini product overview, plan/help pages, and Gemini Apps Privacy Hub
- Perplexity: product, subscription, getting-started, and data-collection help
  pages
- Microsoft Copilot: consumer product overview, Microsoft 365 comparison, and
  privacy FAQ pages
- Notion AI: product, FAQ, pricing, AI security, and general security pages

## Priority 2 Coding Monitoring Check

GitHub Copilot, Cursor, Windsurf/Devin Desktop, Replit, and Tabnine were
rechecked on 2026-07-26 against current official product, documentation,
pricing, data-use, privacy, security, responsible-use, or trust pages.

The five public pages continue to use accurate high-level positioning and avoid
exact prices, usage allowances, model-access claims, IDE promises, repository
access promises, license-safety conclusions, and privacy or security
guarantees. Their existing cautions still require generated-code review,
testing, dependency checks, secret protection, private-repository care,
license review, security review, and compliance with workplace policy. No
public page change was required in this monitoring pass.

GitHub's current official materials distinguish individual and organization
data-use controls and describe contextual code or workspace information used
to provide Copilot features. The existing Aiplorer page already directs users
to current account, organization, model-provider, repository, data-use, and
budget controls before proprietary code is sent, so no plan-specific claim was
added.

Official source groups checked:

- GitHub Copilot: product, documentation, responsible-use, model-change, and
  data-use information
- Cursor: product, pricing, data-use, privacy, and security pages
- Windsurf/Devin Desktop: product, getting-started, pricing, and Cognition
  privacy pages
- Replit: product, Agent, information-security, project-security, and privacy
  pages
- Tabnine: product, code-privacy, privacy-policy, license-protection, and trust
  pages

## Priority 2 Automation Monitoring Check

Zapier, Make, n8n, IFTTT, Pipedream, Bardeen, and Relay.app were rechecked on
2026-07-26 against current official product, documentation, pricing, help,
privacy, security, or shutdown-transition pages.

Zapier, Make, n8n, IFTTT, Pipedream, and Relay.app required no public page
change. Their existing descriptions and cautions remain consistent with
current official positioning. The pages continue to require workflow testing
and careful handling of connected accounts, app permissions, customer or
business data, workflow failures, changing limits, pricing, security details,
and availability.

Bardeen's current official positioning more strongly emphasizes go-to-market
teams and workflows for lead research, data enrichment, outreach preparation,
customer success, and revenue operations. Its public page was narrowed to
reflect that current focus while retaining the Automation Tools category and
the existing permission, data, reliability, pricing, and security cautions.

Official source groups checked:

- Zapier: product, features, pricing, help, and security pages
- Make: product, pricing, operations help, and security pages
- n8n: product, pricing, documentation, and security pages
- IFTTT: product, plans, account-security, privacy, and terms pages
- Pipedream: product, privacy-and-security, and security best-practice pages
- Bardeen: product, pricing, help, security, and privacy pages
- Relay.app: current shutdown notice and transition guidance

No exact prices, limits, integration counts, feature-availability promises,
retention guarantees, or privacy and security guarantees were added during
this monitoring pass.

## Priority 2 Business Monitoring Check

HubSpot Breeze, Salesforce Agentforce, Zoho Zia, Shopify Sidekick, and Fin were
rechecked on 2026-07-26 against current official product, help, pricing,
privacy, security, trust, or legal pages.

HubSpot Breeze, Salesforce Agentforce, Zoho Zia, and Shopify Sidekick required
no public page change. Their existing high-level descriptions remain
consistent with current official positioning and already require human review,
workflow testing, permission checks, careful customer and business data
handling, and current plan and policy verification.

HubSpot's current documentation continues to define Breeze as its AI across
the platform, including assistant and agent experiences, while its AI product
page now emphasizes Agent Hub. The existing Aiplorer page remains deliberately
broad enough to cover this structure without promising access to a specific
assistant, agent, plan, credit model, or connected product.

Fin's current official materials position it as a Customer Agent across
customer service, inbound sales, and commerce rather than only as a
customer-service tool. Its public page was broadened to reflect those
customer-facing workflow areas while retaining human review, escalation,
permissions, customer-data, pricing, reliability, security, and availability
cautions.

Official source groups checked:

- HubSpot Breeze: AI product, Breeze help, pricing, security and compliance,
  privacy, and legal pages
- Salesforce Agentforce: product, how-it-works, pricing, privacy FAQ, and
  security and compliance documentation
- Zoho Zia: product, generative-AI, help, privacy, and security pages
- Shopify Sidekick: product, help, pricing, security, and privacy pages
- Fin: product, Customer Agent, pricing, help, security, trust, privacy, and
  legal pages

No exact prices, limits, credits, customer-agent capabilities, connected
product or channel lists, performance claims, model details, retention
guarantees, or privacy and security guarantees were added during this
monitoring pass.

## Priority 3 Image Monitoring Check

Adobe Firefly, Canva AI, Ideogram, Leonardo AI, Midjourney, and Stable
Diffusion were rechecked on 2026-07-26 against current official product, help,
pricing, privacy, legal, licensing, or safety pages.

Adobe Firefly now presents a substantially broader creative-content workspace
covering image, video, audio, design, ideation, editing, and a mix of Adobe and
partner models. Its public page was broadened while retaining the Image Tools
category and adding a reminder that model terms, data practices, access, and
availability can differ.

Leonardo AI and Midjourney both now document video creation alongside image
workflows. Their public pages were broadened to include reviewed video and
motion use cases, with stronger cautions around public or private visibility,
remixing, consent, media rights, plan differences, and human review.

Canva AI, Ideogram, and Stable Diffusion required no public page change. Canva
AI was already refreshed on the same date for its broader creative scope.
Ideogram remains accurately described as an image creation and design tool.
Stable Diffusion remains a specific image-model family within Stability AI's
broader portfolio, and its page already requires users to check the license
for the exact model or service.

Official source groups checked:

- Adobe Firefly: product, workspace help, plan and credit information, privacy,
  and generative-AI product terms
- Canva AI: product, pricing and access help, AI product terms, and AI safety
  pages
- Ideogram: product, documentation, pricing, terms, and privacy pages
- Leonardo AI: product, creation help, video help, pricing, visibility, terms,
  and privacy pages
- Midjourney: product, video documentation, plan comparison, terms, and privacy
  pages
- Stable Diffusion: Stability AI core models, platform documentation, pricing,
  model licensing, terms, and privacy pages

No exact prices, credits, limits, model lists, output-quality claims,
commercial-use conclusions, ownership guarantees, privacy or security
guarantees, or feature-availability promises were added during this monitoring
pass.

## Priority 3 Video Monitoring Check

Runway, Pika, Luma AI, Descript, and Synthesia were rechecked on 2026-07-26
against current official product, help, pricing, privacy, security, terms, or
acceptable-use pages.

Runway now presents a broader creative platform spanning video, image, and
audio generation and editing. Its public page was broadened while retaining
the Video Tools category and existing review, consent, rights, privacy, and
commercial-use cautions.

Pika now presents video creation together with emerging agent and workflow
experiments. Its public page was broadened cautiously and now calls out
identity, likeness, consent, impersonation, and experimental availability
boundaries more directly.

Luma AI's current official materials identify Luma App as its consumer
creative workspace and emphasize video, image, and agent-supported creative
workflows. Its public page was updated without copying model names, plan
details, or availability promises, and now reminds users to review agent
actions and third-party model boundaries.

Descript now places its AI co-editor more prominently within its video and
audio editing workflow. Its public page was refreshed to reflect that
positioning and the official beta guidance that the co-editor may make
incorrect assumptions, overpromise, or require revision.

Synthesia required no public page change. Its existing business-video
positioning and cautions around scripts, facts, voice and likeness consent,
copyright, workplace policy, privacy, and sensitive business content remain
consistent with current official materials.

Official source groups checked:

- Runway: product, pricing, help, privacy, data-security, and terms pages
- Pika: product, pricing, FAQ, privacy, data-privacy, and terms pages
- Luma AI: product, official AI-assistant information, app, pricing, terms,
  privacy, and legal pages
- Descript: product, AI co-editor help, pricing, help, privacy, security, and
  account-data pages
- Synthesia: product, features, pricing, help, privacy, security, and
  acceptable-use pages

No exact prices, credits, limits, model lists, output-quality claims,
commercial-use conclusions, rights guarantees, privacy or security guarantees,
or feature-availability promises were added during this monitoring pass.

## Priority 3 Audio Monitoring Check

ElevenLabs, Murf AI, Speechify, Suno, Udio, and Adobe Podcast were rechecked on
2026-07-26 against current official product, help, pricing, privacy, security,
terms, rights, safety, or data-use pages.

ElevenLabs required no public page change because it had already been refreshed
on the same date for its current creative, agent, API, voice-rights, recording,
retention, redaction, safety, and data-use boundaries.

Murf AI now presents a broader voice platform covering studio voiceovers,
dubbing, developer use, and conversational voice agents. Its public page was
broadened and now calls out agent testing, recording and disclosure rules,
escalation, connected-system permissions, and unexpected responses.

Speechify has repositioned from a primarily text-to-speech reader to a voice AI
productivity tool covering listening, dictation, questions, notes, podcasts,
and document workflows. Its public page was broadened while adding source
verification and sensitive meeting, recording, and document cautions.

Suno now presents a broader music creation and production workspace with remix,
editing, and multitrack workflows. Its public page was broadened and now
directs users to review current upload, custom-model, user-content, and service
data-use policies before providing source material.

Udio remains in a rights-holder partnership transition. Its current official
help states that download availability has changed, so its public page now
warns users to confirm current export behavior before relying on that workflow.

Adobe Podcast's current help documents browser-based recording, transcription,
enhancement, optional video, and text-based editing. Its public page was
broadened cautiously and now notes that enhancement results can depend on
recording quality, speaker clarity, and background noise.

Official source groups checked:

- ElevenLabs: product, documentation, pricing, billing, safety, legal,
  data-use, and agent-privacy pages
- Murf AI: product, voice-agent, pricing, help, developer documentation, legal,
  privacy, security, and terms pages
- Speechify: product, repositioning announcement, pricing, help, privacy, and
  terms pages
- Suno: product, pricing, help, custom-model, model-training disclosure, terms,
  privacy, and community-guideline pages
- Udio: product, pricing, help, upload, rights-holder partnership, terms, and
  privacy pages
- Adobe Podcast: product, features, FAQ, privacy, terms, and security pages

No exact prices, credits, limits, voice or model lists, output-quality claims,
commercial-use conclusions, ownership guarantees, privacy or security
guarantees, or unsupported feature-availability promises were added during
this monitoring pass.

## Ongoing Monitoring

Return to risk-based monitoring of all 60 reviewed pages. Prioritize a page
when an official source announces a major product identity change, shutdown,
pricing or credit model change, privacy or training-policy change, security or
data-residency change, or material availability change.

The recurring cadence, trigger rules, validation gate, and current priority
queue are documented in `docs/reviewed-tools-monitoring-plan.md`.

## Draft Policy

Do not publish SciSpace or Tome merely to complete a batch. Revisit them only
when current official product, help, pricing, privacy, security, and legal
sources are reachable and sufficient for conservative wording.

Production builds and the production sitemap must continue to exclude:

- `/ai-tools/tools/scispace/`
- `/ai-tools/tools/tome/`
- `/ai-tools/tools/example-ai-assistant/`

## Next Phase

The completed freshness review was validated and deployed. Continue with the
risk-based monitoring plan, beginning with active product transitions and then
fast-changing access, data, licensing, and availability boundaries. Preserve
SciSpace and Tome as drafts unless stable official product, help, pricing,
privacy, security, and policy sources support separate publication reviews.
