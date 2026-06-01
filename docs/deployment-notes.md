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

## Phase 4D Live Verification

Date: 2026-06-01

The local repository was clean at commit `981dcbe` on branch
`aiplorer-revamp-phase0`. After fetching `origin`, the current branch was found
to diverge from `origin/main`: `origin/main` had commits not present locally on
this branch, and the current branch had the Aiplorer revamp commits not present
on `origin/main`. No push was performed because a safe fast-forward deployment
push to `main` could not be confirmed from this branch, and force pushing is not
allowed.

Local production build status:

- `hugo --cleanDestinationDir` passed.
- Generated output remained ignored and unstaged.
- The known legacy raw HTML warning for
  `content/posts/2025-11-07-ai-233254.md` still appears.

Live domain checks:

- `https://aiplorer.com/` returned HTTP `200`.
- `https://www.aiplorer.com/` redirected once to `https://aiplorer.com/` and
  returned HTTP `200`.
- SSL verification succeeded for the tested live URLs.
- `https://aiplorer.com/robots.txt` returned HTTP `200` and referenced
  `https://aiplorer.com/sitemap.xml`.
- `https://aiplorer.com/sitemap.xml` returned HTTP `200`.

Live deployment gap:

- The new service MVP routes such as `/ai-tools/`, `/ai-tools/tools/`,
  `/guides/`, and `/use-cases/` returned HTTP `404` on the live domain during
  this check.
- Expected live phrases such as "Explore AI Tools for Work and Creativity" and
  "Reviewed AI Tools" were not found on the live pages during this check.
- The draft example route `/ai-tools/tools/example-ai-assistant/` also returned
  HTTP `404` and was not found in the live sitemap, which is the expected public
  behavior.

Before production launch, confirm the deployment branch in Cloudflare Pages and
promote the reviewed Aiplorer revamp commits through a safe non-force workflow.

## Phase 4E Main Integration Preparation

Date: 2026-06-01

Integration branch: `aiplorer-revamp-main-integration`

The integration branch was created from the latest fetched `origin/main`.
A local safety branch was also created at
`backup/aiplorer-revamp-phase0-before-main-integration` before integration work.

The 18 revamp commits from `aiplorer-revamp-phase0` were cherry-picked onto the
integration branch in chronological order. No cherry-pick conflicts occurred.

Integrated branch verification:

- `hugo --cleanDestinationDir` passed.
- `hugo --buildDrafts` passed.
- Production output was restored with `hugo --cleanDestinationDir`.
- `git diff --check` passed.
- All expected MVP service routes were generated in production output.
- The draft example tool page was not generated in production output and was
  not listed in the production sitemap.
- `content/posts` retained the same file count as `origin/main` during this
  check, and `git diff --name-status origin/main...HEAD -- content/posts`
  showed no post changes.

Next step: push `aiplorer-revamp-main-integration` and merge it into `main`
through a safe reviewed workflow. Do not force push or overwrite `main`.
