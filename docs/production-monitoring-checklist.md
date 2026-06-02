# Production Monitoring Checklist

Date: 2026-06-02

Aiplorer's service-style MVP is live after the `main` deployment and Cloudflare
cache purge. Use this checklist for the first 2-3 days after launch.

## Current Launch Status

- Production domain: `https://aiplorer.com/`
- Canonical domain: `https://aiplorer.com/`
- `www.aiplorer.com` should redirect to `https://aiplorer.com/`.
- Homepage copy is live: "Explore AI Tools for Work and Creativity".
- Reviewed tool index is live and shows the first reviewed tools.
- Use Cases now returns `200` without query parameters after Cloudflare cache
  purge.
- Draft example tool route returns `404` and is absent from the sitemap.

## Live MVP Routes To Monitor

- `https://aiplorer.com/`
- `https://aiplorer.com/ai-tools/`
- `https://aiplorer.com/ai-tools/tools/`
- `https://aiplorer.com/ai-tools/tools/chatgpt/`
- `https://aiplorer.com/ai-tools/tools/claude/`
- `https://aiplorer.com/ai-tools/tools/gemini/`
- `https://aiplorer.com/guides/`
- `https://aiplorer.com/guides/how-to-choose-the-right-ai-tool/`
- `https://aiplorer.com/use-cases/`
- `https://aiplorer.com/use-cases/how-to-use-ai-to-write-better-emails/`
- `https://aiplorer.com/use-cases/how-to-summarize-long-documents-with-ai/`
- `https://aiplorer.com/privacy/`
- `https://aiplorer.com/terms/`
- `https://aiplorer.com/robots.txt`
- `https://aiplorer.com/sitemap.xml`

## Search Console Checklist

- [ ] Open Google Search Console.
- [ ] Select domain property: `aiplorer.com`.
- [ ] Go to `Indexing -> Sitemaps`.
- [ ] Submit: `sitemap.xml`.
- [ ] Confirm submitted sitemap URL:
  `https://aiplorer.com/sitemap.xml`.
- [ ] Monitor sitemap status and indexing errors over the next few days.

Use URL Inspection for these pages first:

- `https://aiplorer.com/`
- `https://aiplorer.com/ai-tools/`
- `https://aiplorer.com/ai-tools/tools/`
- `https://aiplorer.com/guides/how-to-choose-the-right-ai-tool/`
- `https://aiplorer.com/use-cases/`
- `https://aiplorer.com/use-cases/how-to-use-ai-to-write-better-emails/`
- `https://aiplorer.com/use-cases/how-to-summarize-long-documents-with-ai/`

Request indexing only for the most important pages first.

## 404 Monitoring

- [ ] Check Search Console `Pages` and `Crawl stats` reports.
- [ ] Check Cloudflare analytics for repeated 404 paths.
- [ ] Confirm service routes continue returning `200`.
- [ ] Confirm `/ai-tools/tools/example-ai-assistant/` remains `404`.
- [ ] Investigate any unexpected 404 for published service pages.
- [ ] Do not redirect, delete, noindex, or rewrite legacy post URLs without
  checking Search Console data first.

## Legacy Post Preservation

- [ ] Monitor legacy `/posts/<slug>/` URLs for unexpected 404s.
- [ ] Preserve existing post URLs during the monitoring period.
- [ ] Review Search Console impressions/clicks before any future merge,
  noindex, redirect, or rewrite work on legacy posts.
- [ ] Keep `content/posts/` changes out of future service expansion phases
  unless explicitly reviewed.

## Cloudflare Checks

- [ ] Confirm the production deployment points to the latest `main` commit.
- [ ] Confirm build command is `hugo`.
- [ ] Confirm build output directory is `public`.
- [ ] Confirm cache purge has cleared stale 404 responses.
- [ ] Confirm Cloudflare Web Analytics status if analytics is intended.
- [ ] Do not enable new analytics, ads, affiliate links, login, database,
  comments, or automation without a separate reviewed phase.

## Phase 5A Gate

Do not start Phase 5A until:

- The sitemap is submitted or re-submitted in Search Console.
- No major live route errors remain.
- No unexpected legacy post 404 issue is detected.

Suggested Phase 5A starter tools:

- Perplexity
- Microsoft Copilot
- Canva AI

Each future tool page should follow the established workflow:

- Create as draft first.
- Review official sources.
- Use cautious wording for pricing, plans, features, and availability.
- Publish one by one after review.
