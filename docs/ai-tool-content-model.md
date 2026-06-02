# Aiplorer AI Tool Content Model

Date: 2026-06-01

This model defines how future Aiplorer AI tool pages should be created. It is
intentionally conservative: tool pages must be manually reviewed, useful for
everyday users, and cautious about claims that may change over time.

## Recommended Location

Use this structure for individual tool pages:

```txt
content/ai-tools/tools/<tool-slug>.md
```

Expected future public route after publication:

```txt
/ai-tools/tools/<tool-slug>/
```

This keeps individual tool pages separate from the existing AI Tools category
pages such as `/ai-tools/writing-tools/` and `/ai-tools/image-tools/`.

## Archetype

Use the AI tool archetype when creating new tool drafts:

```txt
hugo new --kind ai-tool ai-tools/tools/<tool-slug>.md
```

New tool pages should start as:

```yaml
draft: true
reviewStatus: "draft"
```

Publish only after manual review.

## Required Fields

| Field | Purpose |
| --- | --- |
| `title` | Tool name or clear page title. |
| `description` | Original short description for metadata and summaries. |
| `type` | Use `ai-tools` so the page can use AI Tools layouts. |
| `layout` | Use `tool` for the future tool detail layout. |
| `category` | One primary Aiplorer category. |
| `bestFor` | Short list of user goals or tasks. |
| `pricingNote` | Cautious pricing language. |
| `officialUrl` | Official website URL, verified before publishing. |
| `lastReviewed` | Date the page was manually checked. |
| `draft` | Keep `true` until review is complete. |
| `reviewStatus` | Current editorial state. |

## Optional Fields

| Field | Purpose |
| --- | --- |
| `beginnerFriendly` | `true`, `false`, or `null` if not reviewed. |
| `freePlan` | `true`, `false`, or `null`; avoid guessing. |
| `useCases` | Specific tasks the tool may help with. |
| `pros` | Carefully worded advantages based on reviewed information. |
| `limitations` | Known limits, caveats, or user-fit concerns. |
| `similarTools` | Related tools to compare later. |
| `sourceNotes` | Internal notes about official pages checked. |

## Allowed Categories

Use one primary category:

- Writing Tools
- Image Tools
- Video Tools
- Audio Tools
- Coding Tools
- Productivity Tools
- Automation Tools
- Learning Tools
- Business Tools

## Cautious Wording Rules

Use language that leaves room for product changes:

- "may offer"
- "may help"
- "can support"
- "availability may change"
- "check the official website"
- "pricing and plan details may change"

Avoid language that implies unverified certainty:

- "the best"
- "number one"
- "guaranteed"
- "always free"
- "officially recommended by Aiplorer"
- "perfect for everyone"

## Editorial Rules

- Do not add fake ratings.
- Do not add fake rankings.
- Do not publish unsupported "best" claims.
- Do not copy marketing text from official websites or press pages.
- Do not claim current pricing or feature availability without checking the
  official website.
- Do not imply Aiplorer has tested a tool unless it has actually been tested.
- Do not publish affiliate links in this phase.
- Do not use automation to publish tool pages directly.
- Tool pages must include `lastReviewed`.
- Tool pages must clearly link to the official website.
- Tool pages should explain who the tool is useful for, not just repeat product
  claims.

## Review Status Values

Use simple editorial states:

- `draft`
- `needs-official-review`
- `needs-review`
- `reviewed`
- `needs-update`

Only `reviewed` pages should be considered for publication.
