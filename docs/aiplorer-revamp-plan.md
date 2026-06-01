# Aiplorer Service Revamp Plan

Date: 2026-06-01

This plan is based on the Phase 0 brief for moving Aiplorer away from an
n8n-style automated AI blog and toward a service-style content hub.

## New Position

Service name:

```txt
Aiplorer
```

Domain:

```txt
https://aiplorer.com
```

Positioning:

```txt
Aiplorer.com - Explore AI Tools for Work and Creativity.
```

Plain-language promise:

```txt
Find practical AI tools, simple guides, and everyday use cases for writing,
design, coding, automation, learning, and productivity.
```

The site should feel like a useful AI tools and guides hub for general users,
not an automated AI news blog.

## Target Audience

Primary users:

- General office workers.
- Students.
- Freelancers.
- Small business owners.
- Marketers.
- Bloggers and creators.
- Designers.
- Beginner developers.
- Job seekers.
- People trying AI tools for the first time.

User questions the site should answer:

- Which AI tool should I use for this task?
- Which AI writing tool is easiest to start with?
- Which AI image tool is beginner-friendly?
- Can a coding beginner use AI coding tools?
- Which AI tools have a free plan or free starting option?
- Which tools help with repetitive work?
- How can I use AI for studying or job preparation?

## Proposed Public Sections

Phase 1 should introduce the public structure without deleting old posts:

- `/ai-tools/`
- `/writing-tools/`
- `/image-tools/`
- `/video-tools/`
- `/coding-tools/`
- `/productivity-tools/`
- `/automation-tools/`
- `/learning-tools/`
- `/use-cases/`
- `/guides/`
- `/blog/`
- `/about/`
- `/contact/`
- `/privacy/`
- `/terms/`

Recommended navigation priority:

1. AI Tools
2. Guides
3. Use Cases
4. Blog
5. About

The old `posts` section should remain available during migration unless a
separate URL preservation decision says otherwise.

## Content Model: Tool Page

Tool pages should be manually reviewed and maintained in Hugo markdown/front
matter at first. No database, login, ratings, or user reviews are needed for the
MVP.

Suggested fields:

- Tool Name
- Short Description
- Best For
- Main Category
- Beginner Friendly
- Free Plan
- Pricing Note
- Use Cases
- Pros
- Limitations
- Similar Tools
- Official Website
- Last Reviewed

Example front matter direction:

```yaml
title: "ChatGPT"
description: "A general-purpose AI assistant for writing, brainstorming, coding, learning, and productivity."
category: "AI Productivity Tools"
bestFor:
  - Writing
  - Brainstorming
  - Learning
  - Coding help
beginnerFriendly: true
freePlan: true
pricingNote: "Free and paid plans may be available. Check the official website for current pricing."
officialUrl: "https://chatgpt.com"
lastReviewed: "2026-06-01"
draft: false
```

Important editorial rule: prices, plans, and features change often. Avoid
absolute claims and point users to official websites for current details.

## Content Model: Guide Post

Guide posts should help beginners choose and use AI tools.

Suggested fields:

- Title
- Description
- Audience
- Skill Level
- Related Tool Categories
- Key Questions Answered
- Recommended Next Reads
- Last Reviewed

Guide content should be practical, evergreen, and structured around user
decisions rather than AI news.

## Content Model: Use Case Page

Use case pages should start from the user's job-to-be-done.

Suggested fields:

- Title
- Description
- User Goal
- Best Tool Categories
- Suggested Tools
- Step-by-Step Workflow
- Prompt Ideas
- Limitations
- Related Guides
- Last Reviewed

Use case content should avoid pretending one tool is always best. It should
explain tradeoffs and suggest official websites for current product details.

## Suggested First 20 Tool Pages

Start with a small manually reviewed set:

1. ChatGPT
2. Claude
3. Gemini
4. Perplexity
5. Microsoft Copilot
6. Notion AI
7. Canva AI
8. Midjourney
9. DALL-E
10. Runway
11. ElevenLabs
12. Cursor
13. GitHub Copilot
14. Zapier
15. Make
16. n8n
17. Grammarly
18. DeepL
19. Tome
20. Gamma

Do not publish these until official URLs, current positioning, and basic
metadata have been manually checked.

## Suggested First 10 Guides And Use Cases

Starter guide candidates:

1. Best AI Tools for Everyday Work
2. AI Writing Tools for Beginners
3. AI Image Tools Explained
4. AI Coding Assistants for Beginners
5. How to Choose the Right AI Tool

Starter use case candidates:

1. How to Use AI to Write Better Emails
2. How to Summarize Long Documents with AI
3. How to Brainstorm Blog Ideas with AI
4. How to Use AI for Study Planning
5. How to Use AI for Resume Ideas

These should be written as service content, not as auto-generated news posts.

## Existing Auto-Blog Handling

Do not mass delete existing posts. First classify each existing URL:

- Keep: quality is acceptable and topic fits the new position.
- Rewrite: topic fits, but article is thin or too news-like.
- Merge later: overlapping or duplicate posts can support one stronger page.
- Draft/noindex later: low-quality, off-position, no traffic, no backlinks.
- Redirect later: retired page has a close replacement.
- Retire later: no value, no traffic, no replacement, confirmed by data.

Required inputs before action:

- Search Console data.
- Current sitemap/index status.
- Any meaningful external links.
- Manual content quality review.

## Phase 1 Recommendation

Recommended next implementation phase:

1. Fix Hugo build compatibility in `config.toml`.
2. Create a real project-level `.gitignore` so `public/`, `resources/`, and
   Hugo lock/build artifacts stay untracked.
3. Resolve or confirm the `CNAME` mismatch after checking the actual Cloudflare
   Pages/GitHub Pages setup.
4. Add project-level layouts instead of editing the Ananke theme directly.
5. Build the homepage as a service entry point for AI Tools, Guides, and Use
   Cases.
6. Add section landing pages for the proposed public structure.
7. Keep existing `/posts/<slug>/` URLs live during the transition.
8. Update Privacy and Terms to match a static content site using Cloudflare Web
   Analytics and Google Search Console.
9. Add a content workflow checklist for manually reviewed tool pages.
10. Re-run Hugo and inspect generated URLs before deployment.

## What Not To Do

Do not do these during the early revamp:

- Do not delete existing posts in bulk.
- Do not remove existing URLs.
- Do not mass-edit existing posts.
- Do not publish unreviewed AI tool pages.
- Do not add affiliate links first.
- Do not add ads first.
- Do not add GA4 in the MVP.
- Do not add login, user accounts, comments, rankings, ratings, or reviews.
- Do not build a backend or database.
- Do not create fake rankings, fake ratings, or fake review language.
- Do not make hard claims about pricing or plans without current official
  verification.
- Do not use n8n for automatic publishing.
- Do not replace the Ananke theme before documenting the reason and migration
  path.
- Do not track generated `public/` output.

## Long-Term Operating Principle

Aiplorer should become a practical AI tools exploration hub:

- User-purpose first.
- Tool categories first.
- Manually reviewed information.
- Automation only as research/drafting support.
- Clear limitations.
- Official sources checked.
- No fake authority signals.

Long-term relationship:

- Aiplorer = AI tool exploration.
- Jobplorer = AI-era career and skill exploration.
