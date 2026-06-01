# Aiplorer Deployment Readiness Checklist

Date: 2026-06-01

Use this checklist before promoting the current Aiplorer MVP to production.
Repository checks are based only on the local Hugo project. Cloudflare and
Search Console items must be confirmed manually in their dashboards.

## Cloudflare Pages

- [ ] Cloudflare Pages project is connected to the correct GitHub repository.
- [ ] Production branch is `main`.
- [ ] Build command is `hugo`.
- [ ] Build output directory is `public`.
- [ ] Cloudflare Hugo version is compatible with the local build.
- [ ] Generated `public/`, `resources/`, and `.hugo_build.lock` are not
  committed.

## Domain

- [ ] Custom domain `aiplorer.com` is connected in Cloudflare Pages.
- [ ] `www.aiplorer.com` is connected or redirected intentionally.
- [ ] `www.aiplorer.com` redirects to `aiplorer.com` if that is the chosen
  canonical domain.
- [ ] SSL/TLS works for `https://aiplorer.com/`.
- [ ] `https://aiplorer.com/sitemap.xml` is reachable after deployment.
- [ ] `https://aiplorer.com/robots.txt` is reachable after deployment.

## Search And Analytics

- [ ] Google Search Console domain property exists for Aiplorer.
- [ ] Production sitemap is submitted in Search Console.
- [ ] Existing legacy `/posts/<slug>/` URLs are checked before any future
  rewrite, noindex, merge, or redirect work.
- [ ] Cloudflare Web Analytics is enabled only if intentionally approved.

## Production Route Spot Check

Confirm these routes after deployment:

- `/`
- `/ai-tools/`
- `/ai-tools/tools/`
- `/ai-tools/tools/chatgpt/`
- `/ai-tools/tools/claude/`
- `/ai-tools/tools/gemini/`
- `/guides/`
- `/guides/how-to-choose-the-right-ai-tool/`
- `/use-cases/`
- `/use-cases/how-to-use-ai-to-write-better-emails/`
- `/use-cases/how-to-summarize-long-documents-with-ai/`
- `/blog/`
- `/about/`
- `/contact/`
- `/privacy/`
- `/terms/`

## Draft Exposure

- [ ] Draft tool examples do not appear in normal production builds.
- [ ] Draft pages do not appear in the production sitemap.
- [ ] Draft pages are used only for editorial workflow validation.
