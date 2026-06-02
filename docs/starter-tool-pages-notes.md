# Starter Tool Pages Notes

Date: 2026-06-01

Phase 2A adds three real AI tool pages as draft validation pages:

- ChatGPT
- Claude
- Gemini

Phase 2B reviewed ChatGPT as the first controlled live publish candidate.
Phase 2C reviewed Claude as the second controlled live publish candidate.
Phase 2D reviewed Gemini as the third controlled live publish candidate.

## ChatGPT Review Result

ChatGPT was reviewed on 2026-06-01 and published as the first live Aiplorer tool
page.

Official sources checked:

- `https://chatgpt.com/`
- OpenAI Help article: `What is ChatGPT: FAQ`
- OpenAI Help article: `ChatGPT Capabilities Overview`
- `https://chatgpt.com/pricing/`

The page uses only high-level, cautious claims. Specific prices, plan limits,
model names, feature limits, integrations, and regional availability were not
copied into the page.

Current status:

```yaml
content/ai-tools/tools/chatgpt.md
draft: false
reviewStatus: "reviewed"
lastReviewed: "2026-06-01"
```

## Claude Review Result

Claude was reviewed on 2026-06-01 and published as the second live Aiplorer
tool page.

Official sources checked:

- `https://claude.ai/`
- `https://www.anthropic.com/claude`
- Anthropic Help article: `What are some things I can use Claude for?`
- `https://claude.ai/pricing`

The page uses only high-level, cautious claims. Specific prices, plan limits,
model names, feature limits, integrations, and regional availability were not
copied into the page.

Current status:

```yaml
content/ai-tools/tools/claude.md
draft: false
reviewStatus: "reviewed"
lastReviewed: "2026-06-01"
```

## Gemini Review Result

Gemini was reviewed on 2026-06-01 and published as the third live Aiplorer tool
page.

Official sources checked:

- `https://gemini.google.com/`
- `https://gemini.google/overview/`
- Google Help article: `Use Gemini Apps`
- `https://gemini.google/subscriptions/`

The page uses only high-level, cautious claims. Specific prices, plan limits,
model names, feature limits, app availability, Workspace availability,
integrations, and regional availability were not copied into the page.

Current status:

```yaml
content/ai-tools/tools/gemini.md
draft: false
reviewStatus: "reviewed"
lastReviewed: "2026-06-01"
```

## Starter Quality Bar

ChatGPT, Claude, and Gemini now establish the initial publishing quality bar for
Aiplorer AI tool pages.

Before publishing future tool pages:

- Verify the official URL again.
- Review the current official product positioning.
- Review major use cases against official information.
- Review pricing and plan language against official information.
- Keep pricing language cautious.
- Set `lastReviewed` to the actual review date.
- Change `reviewStatus` only after manual review.
- Preview the page locally with `hugo --buildDrafts`.
- Run `hugo` and confirm the page route behaves as expected.

Future tool pages should meet or exceed the ChatGPT, Claude, and Gemini page
quality bar: official sources checked, cautious wording, no fake ratings, no
fake rankings, no copied marketing text, and no detailed pricing or feature
claims unless directly verified.

## Perplexity Review Result

Phase 5A added Perplexity as a draft-first validation page. Phase 5B reviewed
Perplexity against official sources and published it as the fourth live
Aiplorer tool page.

Official sources checked:

- `https://www.perplexity.ai/`
- Perplexity Help Center article: `What is Perplexity?`
- Perplexity Help Center article: `Getting Started with Perplexity`
- Perplexity Help Center article: `Practical Tips for Using Perplexity`
- Perplexity Help Center article: `Which Perplexity Subscription Plan is right
  for you?`
- Perplexity Help Center collection: `Privacy & Data`

The page uses only high-level, cautious claims. Specific prices, plan limits,
model names, exact source availability, citation quality, integrations, and
feature availability were not copied into the page.

Current status:

```yaml
content/ai-tools/tools/perplexity.md
draft: false
reviewStatus: "reviewed"
lastReviewed: "2026-06-02"
```

The Perplexity page includes caution notes that AI-generated answers may be
incomplete, outdated, or incorrect. Users should verify source links and original
sources when accuracy matters, and should avoid entering sensitive or
confidential information unless they understand the tool's privacy and data
handling policies.

## Microsoft Copilot Review Result

Phase 5D added Microsoft Copilot as a draft-first validation page. Phase 5E
reviewed Microsoft Copilot against official Microsoft sources and published it
as the fifth live Aiplorer tool page.

Official sources checked:

- `https://copilot.microsoft.com/`
- `https://support.microsoft.com/en-us/microsoft-copilot`
- `https://www.microsoft.com/en-us/microsoft-365-copilot/pricing`
- `https://www.microsoft.com/en-us/microsoft-copilot/organizations`
- `https://www.microsoft.com/en-us/microsoft-365-copilot/personal`
- `https://support.microsoft.com/en-us/microsoft-365-copilot`
- `https://learn.microsoft.com/en-us/copilot/`

The page uses only high-level, cautious claims. Specific prices, plan
comparisons, Microsoft 365 entitlement details, Windows availability, Edge
availability, Bing availability, model access, organization availability,
integrations, and exact feature availability were not copied into the page.

Current status:

```yaml
content/ai-tools/tools/microsoft-copilot.md
draft: false
reviewStatus: "reviewed"
lastReviewed: "2026-06-02"
```

The Microsoft Copilot page reminds users that AI-generated work should be
reviewed before use. It also notes that work, school, and organization accounts
may have different access, privacy, and data handling policies, and that users
should handle sensitive or confidential information carefully.

## Canva AI Draft Result

Phase 5G added Canva AI as a draft-first validation page.

Current status:

```yaml
content/ai-tools/tools/canva-ai.md
draft: true
reviewStatus: "needs-official-review"
lastReviewed: ""
```

Canva AI remains unpublished pending official review. It should not be linked
from `/ai-tools/`, `/ai-tools/tools/`, category pages, or global navigation
until it meets the ChatGPT, Claude, Gemini, Perplexity, and Microsoft Copilot
quality bar.

Before publication, review official Canva sources, confirm current product
positioning, check pricing and plan language, and avoid unverified claims about
Magic Studio availability, image generation availability, video generation
availability, Brand Kit availability, team availability, model access,
integrations, or exact feature availability. The page should continue reminding
users to review AI-generated designs, text, and images before publishing and to
check brand, copyright, privacy, and commercial-use requirements carefully.
