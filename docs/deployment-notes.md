# Aiplorer Deployment Notes

Date: 2026-06-01

The repository README describes this project as a Hugo static site powered by
Cloudflare Pages. No root `.github` workflow directory or project-level
Cloudflare config file was found during the Phase 4C repo inspection, so live
Cloudflare Pages settings must be verified manually in the Cloudflare dashboard.

## Repo-Level Assumptions

- Canonical base URL in `config.toml`: `https://aiplorer.com/`.
- Expected Cloudflare Pages build command: `hugo`.
- Expected build output directory: `public`.
- Generated output is ignored by `.gitignore` with `/public/`, `/resources/`,
  and `.hugo_build.lock`.
- Hugo generated `robots.txt` because `enableRobotsTXT = true`.
- Hugo generated `sitemap.xml` with `https://aiplorer.com/` URLs.

## CNAME Decision

The tracked root `CNAME` file contained `www.bornstarai.com`, which did not
match the Aiplorer base URL. It also was not copied into Hugo's generated
`public/` output. Because the repo evidence points to Cloudflare Pages rather
than root GitHub Pages deployment, the stale root `CNAME` file was removed in
Phase 4C to avoid misleading future deployment work.

This does not verify live DNS or Cloudflare dashboard settings. Confirm the
production custom domain in Cloudflare Pages before launch.

## Production Route Check

A clean production `hugo` build generated the current MVP service routes:

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

The production sitemap includes the published service pages above. `robots.txt`
allows crawling and points to `https://aiplorer.com/sitemap.xml`.

## Draft Exposure Result

The draft example tool page is not generated in normal production output and is
not included in the normal production sitemap. It appears only when building
with `hugo --buildDrafts`, as expected for editorial review.

## Remaining Manual Checks

- Confirm Cloudflare Pages project, repository, and production branch.
- Confirm build command `hugo` and output directory `public`.
- Confirm Cloudflare Hugo version compatibility with local Hugo.
- Connect `aiplorer.com` as the production custom domain.
- Confirm `www.aiplorer.com` redirect behavior.
- Confirm SSL/TLS and live `/sitemap.xml` after deployment.
- Confirm Google Search Console domain property and sitemap submission.
- Enable Cloudflare Web Analytics only if intentionally approved.
