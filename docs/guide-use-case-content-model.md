# Guide And Use Case Content Model

Date: 2026-06-01

This model defines how Aiplorer guide and use-case pages should be created.
Both formats should be manually reviewed, practical, beginner-friendly, and
evergreen.

## Content Types

Guide content helps users choose, understand, or compare ways to use AI tools.
It should explain concepts, tradeoffs, selection criteria, and safe next steps.

Use Case content helps users complete a practical task with AI. It should start
with the user's goal, then show a realistic workflow, checks, limits, and tool
options.

## Recommended Locations

Use these structures for new pages:

```txt
content/guides/<guide-slug>.md
content/use-cases/<use-case-slug>.md
```

Expected future public routes after publication:

```txt
/guides/<guide-slug>/
/use-cases/<use-case-slug>/
```

## Required Fields

| Field | Purpose |
| --- | --- |
| `title` | Clear page title. |
| `description` | Original short summary for metadata and listings. |
| `contentType` | Use `guide` or `use-case`. |
| `audience` | Intended reader or beginner level. |
| `relatedTools` | Reviewed tool pages that may be relevant. |
| `relatedCategories` | Aiplorer categories related to the topic. |
| `lastReviewed` | Date the page was manually reviewed before publication. |
| `reviewStatus` | Current editorial state. |
| `draft` | Keep `true` until the page is reviewed for publication. |

## Writing Rules

- Keep pages practical, beginner-friendly, and evergreen.
- Use original wording.
- Do not add fake ratings.
- Do not add fake rankings.
- Do not make unsupported "best" claims.
- Do not copy marketing text from official websites.
- Use cautious wording for tool-specific features, pricing, availability,
  model access, and plan details.
- Link only to reviewed tool pages or broader Aiplorer category pages.
- Avoid promising exact results from AI tools.
- Remind users to check important AI output before using it.

## Link Rules

Specific tool links should currently be limited to reviewed public pages:

- `/ai-tools/tools/chatgpt/`
- `/ai-tools/tools/claude/`
- `/ai-tools/tools/gemini/`
- `/ai-tools/tools/`

Broader category links may point to existing Aiplorer category pages such as
`/ai-tools/writing-tools/`, `/ai-tools/productivity-tools/`, and
`/ai-tools/learning-tools/`.

## Review Status Values

Use simple editorial states:

- `draft`
- `needs-review`
- `reviewed`
- `needs-update`

Only `reviewed` pages should be considered for publication.
