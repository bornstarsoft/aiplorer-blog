# Aiplorer Live Sitemap Health Audit

Audit date: 2026-07-26

## Scope

This read-only production audit checked the live sitemap, every URL listed in it, representative canonical tags, and the public exposure status of known draft tool pages.

Search Console property data was not available because the browser session was not authenticated. No Search Console settings or indexing requests were changed.

## Live Results

- `https://aiplorer.com/sitemap.xml` returned `200`.
- The live sitemap contained 885 entries before permalink de-duplication.
- All 885 listed entries returned `200` to a bounded HEAD request audit.
- The sitemap contained 883 unique URLs.
- SciSpace, Tome, and Example AI Assistant were absent from the production sitemap and their live routes returned `404`.

## Canonical Sample

Rendered canonical tags matched the public apex HTTPS URL and trailing-slash convention for:

- `/`
- `/ai-tools/`
- `/ai-tools/tools/`
- `/ai-tools/coding-tools/`
- `/ai-tools/tools/github-copilot/`
- `/ai-tools/tools/cursor/`
- `/posts/`
- `/posts/page/2/`
- `/posts/the-benefits-of-brain-training-through-mobile-games/`

The live and local canonical values matched for every sampled route.

## Duplicate Sitemap Finding

Two legacy post slugs were each emitted twice by Hugo's default sitemap because two source posts share each permalink:

- `/posts/the-benefits-of-brain-training-through-mobile-games/`
- `/posts/the-power-of-brain-training-through-mobile-games/`

The existing post files and public post URLs were not changed. A site-level sitemap template now emits each permalink once, preserving the established routes while removing duplicate sitemap entries.

## Local Fix Validation

- The production sitemap is valid XML.
- It contains 883 entries and 883 unique URLs.
- Its URL set is identical to the 883 unique URLs in the pre-fix live sitemap.
- The newer `lastmod` value is retained for each duplicated permalink.
- The draft build includes SciSpace, Tome, and Example AI Assistant as expected.
- The restored production build excludes all three draft pages from output and the sitemap.

## Deployment Verification

Commit `d088dc1` was pushed to GitHub `main` and deployed through Cloudflare
Pages on 2026-07-26.

- The plain live sitemap returned `200`.
- It contained 883 entries and 883 unique URLs.
- Its URL set matched the local production sitemap.
- `cf-cache-status` was `DYNAMIC`.
- GitHub Copilot, Cursor, Windsurf, Replit, and Tabnine remained public and
  present in the sitemap.
- SciSpace, Tome, and Example AI Assistant remained `404` and absent from the
  sitemap.

## Follow-Up

- Submit or recheck `https://aiplorer.com/sitemap.xml` in Search Console after deployment.
- Allow Google time to recrawl before interpreting canonical or duplicate-status changes.
- Use URL Inspection selectively for representative aggregate, tool, and legacy post URLs when quota is available.
- Keep the production structure audit in `docs/production-structure-health-audit.md` as the local baseline.
