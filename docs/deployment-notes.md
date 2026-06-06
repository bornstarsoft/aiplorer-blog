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

## Coding Tools Deployment Diagnostics

Date: 2026-06-06

The Coding Tools draft and review commits were pushed to `origin/main`:

- `039a878 Add Coding Tools draft batch`
- `536998b Review Coding Tools draft batch for publication`

Local validation after push:

- `main` was clean and aligned with `origin/main`.
- The five Coding Tools pages were `draft: false`, `reviewStatus: "reviewed"`,
  and `lastReviewed: "2026-06-06"`.
- `hugo --cleanDestinationDir` passed.
- Local production output included `/ai-tools/tools/github-copilot/`,
  `/ai-tools/tools/cursor/`, `/ai-tools/tools/windsurf/`,
  `/ai-tools/tools/replit/`, and `/ai-tools/tools/tabnine/`.
- Local production `sitemap.xml` included all five Coding Tools URLs.
- Local `/ai-tools/` and `/ai-tools/tools/` output included the five tools, with
  the reviewed tools index grouped under `Coding Tools`.
- `git diff --check` passed and the working tree stayed clean.

Live diagnostic result:

- `/ai-tools/`, `/ai-tools/tools/`, and `/sitemap.xml` returned HTTP `200`, but
  their body content did not yet include the Coding Tools batch.
- `/ai-tools/tools/github-copilot/`, `/ai-tools/tools/windsurf/`,
  `/ai-tools/tools/replit/`, and `/ai-tools/tools/tabnine/` returned HTTP `200`.
- The plain `/ai-tools/tools/cursor/` URL returned a cached HTTP `404` with
  `cf-cache-status: HIT`, while
  `/ai-tools/tools/cursor/?deploy-check=536998b` returned HTTP `200`.
- Cache-busted listing and sitemap checks for commit `536998b` still did not
  show the Coding Tools batch during this diagnostic pass.
- `/ai-tools/tools/scispace/`, `/ai-tools/tools/tome/`, and
  `/ai-tools/tools/example-ai-assistant/` returned HTTP `404`, and those draft
  routes were absent from the live sitemap.

Follow-up after manual Cloudflare Production deployment/cache review and Purge
Everything:

- Local source and production build remained correct for commit `4c8b840`, with
  all five Coding Tools pages and sitemap entries present in `public/`.
- `/ai-tools/` refreshed at the header level with `cf-cache-status: EXPIRED`,
  but its body still did not include GitHub Copilot, Cursor, Windsurf, Replit,
  or Tabnine.
- `/ai-tools/tools/` and `/sitemap.xml` still returned HTTP `200` with
  `cf-cache-status: HIT`, older `age` values, and body content missing the
  Coding Tools batch.
- Plain `/ai-tools/tools/cursor/` and `/ai-tools/tools/replit/` still returned
  cached HTTP `404` responses, while their cache-busted URLs with
  `deploy-check=4c8b840` returned HTTP `200`.
- Cache-busted `/ai-tools/`, `/ai-tools/tools/`, and `/sitemap.xml` still did
  not include the Coding Tools batch.
- Draft routes for SciSpace, Tome, and the example assistant continued to return
  HTTP `404` and remained absent from the live sitemap.

Follow-up after manual Cloudflare Pages redeploy:

- Local source and production build remained correct, with `2bc525b`,
  `4c8b840`, and `536998b` present in `main`.
- All five direct Coding Tools routes returned HTTP `200` without query
  parameters: GitHub Copilot, Cursor, Windsurf, Replit, and Tabnine.
- `/ai-tools/` and `/ai-tools/tools/` returned HTTP `200` with
  `cf-cache-status: HIT`, but their body content still did not include the
  Coding Tools batch.
- `/sitemap.xml` returned HTTP `200` with `cf-cache-status: MISS`, but its body
  still did not include the five Coding Tools URLs.
- No concrete Cloudflare Pages deployment preview URL was available during this
  diagnostic pass, so preview-vs-custom-domain comparison could not be
  completed.

Recommended Cloudflare follow-up:

- Confirm the latest Production deployment commit is `536998b`.
- Confirm the deployment status is successful.
- Confirm the Cloudflare Pages build command is `hugo` and the output directory
  is `public`.
- If Production is not on `536998b`, wait for or retry deployment from latest
  `main`.
- If Production is on `536998b`, purge `/ai-tools/`, `/ai-tools/tools/`,
  `/sitemap.xml`, and `/ai-tools/tools/cursor/`, then re-check without query
  parameters.

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

## Phase 4G Post-Merge Production Verification

Date: 2026-06-01

The GitHub PR from `aiplorer-revamp-main-integration` into `main` was merged.
Local `main` was updated from `origin/main` and fast-forwarded to merge commit
`189c79a`.

Local post-merge validation:

- `hugo --cleanDestinationDir` passed.
- `hugo --buildDrafts` passed.
- Production output was restored with `hugo --cleanDestinationDir`.
- `git diff --check` passed.
- Generated output remained ignored and unstaged.
- The known legacy raw HTML warning for
  `content/posts/2025-11-07-ai-233254.md` still appears.

Live domain checks:

- `https://aiplorer.com/` returned HTTP `200`.
- `https://www.aiplorer.com/` redirected once to `https://aiplorer.com/` and
  returned HTTP `200`.
- SSL verification succeeded for tested live URLs.
- `https://aiplorer.com/robots.txt` returned HTTP `200` and referenced
  `https://aiplorer.com/sitemap.xml`.
- `https://aiplorer.com/sitemap.xml` returned HTTP `200`.

Live deployment gap after merge:

- The expected homepage phrase "Explore AI Tools for Work and Creativity" was
  not found on the live homepage during this check.
- The live sitemap did not list the new service MVP routes during this check.
- Several expected service routes still returned HTTP `404`, including
  `/ai-tools/`, `/ai-tools/tools/chatgpt/`, `/ai-tools/tools/gemini/`,
  `/guides/`, `/guides/how-to-choose-the-right-ai-tool/`, `/use-cases/`, the
  two use-case pages, `/privacy/`, and `/terms/`.
- `/ai-tools/tools/` and `/ai-tools/tools/claude/` returned HTTP `200`, but the
  broader route and sitemap checks show the live deployment was not yet fully
  aligned with the merged `main` branch.
- The draft example route `/ai-tools/tools/example-ai-assistant/` returned HTTP
  `404` and was not found in the live sitemap, which remains the expected public
  behavior.

Next recommended action: check the Cloudflare Pages deployment dashboard for
the latest `main` build status, production branch setting, build command, output
directory, and any failed deployment logs. After a successful Cloudflare
deployment from merge commit `189c79a`, repeat the live route and sitemap
verification.

## Phase 4H Production Launch Monitoring

Date: 2026-06-02

Cloudflare production deployment is now live after the `main` push and manual
Cloudflare cache purge.

Verified live results:

- `https://aiplorer.com/` returned HTTP `200`.
- Homepage contains "Explore AI Tools for Work and Creativity".
- `/ai-tools/`, `/ai-tools/tools/`, ChatGPT, Claude, and Gemini tool pages
  returned HTTP `200`.
- `/ai-tools/tools/` contains "Reviewed AI Tools".
- `/guides/` and `/guides/how-to-choose-the-right-ai-tool/` returned HTTP
  `200`.
- `/use-cases/`, the email use case, and the document summarization use case
  returned HTTP `200` without query parameters.
- `/privacy/` and `/terms/` returned HTTP `200`.
- `/robots.txt` returned HTTP `200` and references
  `https://aiplorer.com/sitemap.xml`.
- `/sitemap.xml` returned HTTP `200` and includes the new service routes.
- `/ai-tools/tools/example-ai-assistant/` returned HTTP `404` and is absent
  from the sitemap.

The stale `/use-cases/` `404` observed immediately after deployment was resolved
by the Cloudflare cache purge.

Next manual action: submit or re-submit `https://aiplorer.com/sitemap.xml` in
Google Search Console, inspect priority service URLs, and monitor sitemap,
indexing, and 404 reports for the first 2-3 days after deployment.

## Phase 5C Perplexity Production Deployment

Date: 2026-06-02

Perplexity was added and reviewed through the draft-first workflow, then the two
Perplexity commits were pushed to `origin/main`:

- `5101b6a Add Perplexity draft tool page`
- `28aa221 Review Perplexity tool page for publication`

Local validation before push:

- `hugo --cleanDestinationDir` passed.
- `hugo --buildDrafts` passed.
- Production output was restored with `hugo --cleanDestinationDir`.
- `git diff --check` passed.
- Generated output remained ignored and unstaged.

Live verification after deployment:

- `/ai-tools/` returned HTTP `200` and includes Perplexity in the reviewed tool
  cards.
- `/ai-tools/tools/` returned HTTP `200` and lists Perplexity.
- `/ai-tools/tools/perplexity/` returned HTTP `200`.
- `/sitemap.xml` returned HTTP `200` and includes
  `https://aiplorer.com/ai-tools/tools/perplexity/`.
- `/ai-tools/tools/example-ai-assistant/` returned HTTP `404` and remains absent
  from the sitemap.

No Perplexity deployment cache issue was observed during this verification.

## Phase 5F Microsoft Copilot Production Deployment

Date: 2026-06-02

Microsoft Copilot was added and reviewed through the draft-first workflow, then
the two Microsoft Copilot commits were pushed to `origin/main`:

- `de69b5a Add Microsoft Copilot draft tool page`
- `1408af7 Review Microsoft Copilot tool page for publication`

Local validation before push:

- `hugo --cleanDestinationDir` passed.
- `hugo --buildDrafts` passed.
- Production output was restored with `hugo --cleanDestinationDir`.
- `git diff --check` passed.
- Generated output remained ignored and unstaged.

Live verification after deployment:

- `/ai-tools/tools/microsoft-copilot/` returned HTTP `200`.
- `/ai-tools/tools/` returned HTTP `200` and lists Microsoft Copilot.
- `/ai-tools/tools/example-ai-assistant/` returned HTTP `404`.
- The draft example route remains absent from the live sitemap.

Cache note:

- The non-query `/ai-tools/` page and `/sitemap.xml` initially returned HTTP
  `200` but served pre-Copilot cached content.
- Cache-busted checks for `/ai-tools/?deploy-check=1408af7` and
  `/sitemap.xml?deploy-check=1408af7` returned HTTP `200` and included
  Microsoft Copilot.
- If the non-query URLs remain stale after normal cache expiry, purge the
  Cloudflare cache and re-check `/ai-tools/` and `/sitemap.xml`.

## Phase 5I Canva AI Production Deployment

Date: 2026-06-02

Canva AI was added and reviewed through the draft-first workflow, then the two
Canva AI commits were pushed to `origin/main`:

- `f1f34bf Add Canva AI draft tool page`
- `d36bf62 Review Canva AI tool page for publication`

Local validation before push:

- `hugo --cleanDestinationDir` passed.
- `hugo --buildDrafts` passed.
- Production output was restored with `hugo --cleanDestinationDir`.
- `git diff --check` passed.
- Generated output remained ignored and unstaged.

Live verification after deployment:

- `/ai-tools/tools/canva-ai/` returned HTTP `200`.
- `/ai-tools/`, `/ai-tools/tools/`, and `/sitemap.xml` returned HTTP `200`.
- `/ai-tools/tools/example-ai-assistant/` returned HTTP `404`.
- The draft example route remains absent from the live sitemap.

Cache note:

- The non-query `/ai-tools/`, `/ai-tools/tools/`, and `/sitemap.xml` initially
  returned HTTP `200` but served pre-Canva cached content.
- Cache-busted checks for `/ai-tools/?deploy-check=d36bf62`,
  `/ai-tools/tools/?deploy-check=d36bf62`, and
  `/sitemap.xml?deploy-check=d36bf62` returned HTTP `200` and included Canva
  AI.
- If the non-query URLs remain stale after normal cache expiry, purge the
  Cloudflare cache and re-check `/ai-tools/`, `/ai-tools/tools/`, and
  `/sitemap.xml`.

## Research Learning Tools Batch Production Deployment

Date: 2026-06-06

The Research/Learning draft and review commits were pushed to `origin/main`:

- `9f4b570 Add Research Learning Tools draft batch`
- `e9f06c9 Review Research Learning Tools draft batch for publication`

Local validation before push:

- `hugo --cleanDestinationDir` passed.
- `hugo --buildDrafts` passed.
- Production output was restored with `hugo --cleanDestinationDir`.
- `git diff --check` passed.
- Generated output remained ignored and unstaged.
- Production output included NotebookLM, Elicit, Consensus, and You.com.
- Production output excluded SciSpace.
- Draft output included SciSpace.

Live verification after deployment:

- `/ai-tools/tools/notebooklm/`, `/ai-tools/tools/elicit/`,
  `/ai-tools/tools/consensus/`, and `/ai-tools/tools/you-com/` returned HTTP
  `200`.
- `/ai-tools/tools/` returned HTTP `200`, but the non-query page initially
  served stale cached content without the four published tools under Learning
  Tools.
- `/sitemap.xml` returned HTTP `200` and included the four published tool URLs.
- `/ai-tools/tools/scispace/`, `/ai-tools/tools/tome/`, and
  `/ai-tools/tools/example-ai-assistant/` returned HTTP `404`.
- SciSpace, Tome, and the draft example route remained absent from the live
  sitemap.

Cache note:

- The non-query `/ai-tools/` and `/ai-tools/tools/` returned HTTP `200` but
  served stale cached content without NotebookLM, Elicit, Consensus, and
  You.com.
- Header check for `/ai-tools/` showed `cf-cache-status: HIT`, `age: 382`, and
  `last-modified: Sat, 06 Jun 2026 01:29:51 GMT`.
- Header check for `/ai-tools/tools/` showed `cf-cache-status: HIT`,
  `age: 2005`, and `last-modified: Sat, 06 Jun 2026 01:29:48 GMT`.
- Cache-busted `/ai-tools/?deploy-check=e9f06c9` returned HTTP `200` and
  included NotebookLM, Elicit, Consensus, and You.com.
- Cache-busted `/ai-tools/tools/?deploy-check=e9f06c9` and
  `/sitemap.xml?deploy-check=e9f06c9` returned HTTP `200` and were correct.
- If the non-query AI Tools landing or reviewed tools index remains stale after
  normal cache expiry, purge the exact Cloudflare URLs for `/ai-tools/` and
  `/ai-tools/tools/`, then re-check without query parameters.

## Presentation Tools Category Production Deployment

Date: 2026-06-05

The Presentation Tools category commit was pushed to `origin/main`:

- `bf4b15c Add Presentation Tools category for Aiplorer`

Local validation before push:

- `hugo --cleanDestinationDir` passed.
- `hugo --buildDrafts` passed.
- Production output was restored with `hugo --cleanDestinationDir`.
- `git diff --check` passed.
- Generated output remained ignored and unstaged.
- Production output included `/ai-tools/presentation-tools/`.
- Production sitemap included `/ai-tools/presentation-tools/`.
- Gamma, Beautiful.ai, Pitch, and SlidesAI production pages showed
  `Category: Presentation Tools`.
- Tome remained absent from production output and sitemap, while appearing only
  in the draft build.

Live verification after deployment:

- `/ai-tools/presentation-tools/` returned HTTP `200`.
- `/ai-tools/` returned HTTP `200` and linked to Presentation Tools.
- `/ai-tools/tools/gamma/`, `/ai-tools/tools/beautiful-ai/`,
  `/ai-tools/tools/pitch/`, and `/ai-tools/tools/slidesai/` returned HTTP
  `200`.
- `/ai-tools/tools/tome/` and `/ai-tools/tools/example-ai-assistant/` returned
  HTTP `404`.

Cache note:

- The cache-busted checks for Gamma, Beautiful.ai, Pitch, and sitemap using
  `?deploy-check=bf4b15c` returned fresh content.
- Plain `/ai-tools/tools/slidesai/` already showed
  `Category: Presentation Tools`.
- Plain `/ai-tools/tools/gamma/`, `/ai-tools/tools/beautiful-ai/`,
  `/ai-tools/tools/pitch/`, and `/sitemap.xml` initially served stale cached
  content.
- If the non-query URLs remain stale after normal cache expiry, purge the exact
  Cloudflare URLs for Gamma, Beautiful.ai, Pitch, and sitemap, then re-check
  without query parameters.

## Presentation Tools Batch Production Deployment

Date: 2026-06-05

The Presentation Tools draft and review commits were pushed to `origin/main`:

- `9612be5 Add Presentation Tools draft batch`
- `e9d18bb Review Presentation Tools draft batch for publication`

Local validation before push:

- `hugo --cleanDestinationDir` passed.
- `hugo --buildDrafts` passed.
- Production output was restored with `hugo --cleanDestinationDir`.
- `git diff --check` passed.
- Generated output remained ignored and unstaged.

Live verification after deployment:

- `/ai-tools/tools/gamma/`, `/ai-tools/tools/beautiful-ai/`,
  `/ai-tools/tools/pitch/`, and `/ai-tools/tools/slidesai/` returned HTTP
  `200`.
- `/ai-tools/tools/tome/` and `/ai-tools/tools/example-ai-assistant/` returned
  HTTP `404`.
- The cache-busted `/ai-tools/?deploy-check=e9d18bb` and
  `/ai-tools/tools/?deploy-check=e9d18bb` pages included Gamma, Beautiful.ai,
  Pitch, and SlidesAI.
- The cache-busted `/sitemap.xml?deploy-check=e9d18bb` included the four
  published presentation tool URLs and excluded Tome.

Cache note:

- The non-query `/ai-tools/`, `/ai-tools/tools/`, and `/sitemap.xml` initially
  returned HTTP `200` but served pre-presentation-batch cached listing or
  sitemap content.
- If the non-query URLs remain stale after normal cache expiry, purge the
  Cloudflare cache and re-check `/ai-tools/`, `/ai-tools/tools/`, and
  `/sitemap.xml`.

## Automation Tools Batch Production Deployment

Date: 2026-06-05

The reviewed tools index polish and Automation Tools batch commits were pushed
to `origin/main`:

- `ae23eb6 Polish Aiplorer reviewed tools index`
- `d11f5bd Add Automation Tools draft batch`
- `9745fa6 Review Automation Tools draft batch for publication`

Local validation before push:

- `hugo --cleanDestinationDir` passed.
- `hugo --buildDrafts` passed.
- Production output was restored with `hugo --cleanDestinationDir`.
- `git diff --check` passed.
- Generated output remained ignored and unstaged.

Live verification after deployment:

- `/ai-tools/` returned HTTP `200` and included n8n, IFTTT, Pipedream,
  Bardeen, and Relay.app.
- `/ai-tools/tools/n8n/`, `/ai-tools/tools/ifttt/`,
  `/ai-tools/tools/pipedream/`, `/ai-tools/tools/bardeen/`, and
  `/ai-tools/tools/relay-app/` returned HTTP `200`.
- `/sitemap.xml` returned HTTP `200` and included all five new tool URLs.
- `/ai-tools/tools/example-ai-assistant/` returned HTTP `404`.
- The draft example route remains absent from the live sitemap.

Cache note:

- The non-query `/ai-tools/tools/` and `/ai-tools/automation-tools/` initially
  returned HTTP `200` but served pre-batch cached listing content.
- Cache-busted checks for `/ai-tools/tools/?deploy-check=9745fa6` and
  `/ai-tools/automation-tools/?deploy-check=9745fa6` returned HTTP `200` and
  included the reviewed Automation Tools batch.
- If the non-query listing URLs remain stale after normal cache expiry, purge
  the Cloudflare cache and re-check `/ai-tools/tools/` and
  `/ai-tools/automation-tools/`.

## Phase 5O Grammarly Production Deployment

Date: 2026-06-02

Grammarly was added and reviewed through the draft-first workflow, then the two
Grammarly commits were pushed to `origin/main`:

- `54e18eb Add Grammarly draft tool page`
- `e9ee140 Review Grammarly tool page for publication`

Local validation before push:

- `hugo --cleanDestinationDir` passed.
- `hugo --buildDrafts` passed.
- Production output was restored with `hugo --cleanDestinationDir`.
- `git diff --check` passed.
- Generated output remained ignored and unstaged.

Live verification after deployment:

- `/ai-tools/tools/grammarly/` returned HTTP `200`.
- `/ai-tools/`, `/ai-tools/tools/`, and `/sitemap.xml` returned HTTP `200`.
- `/ai-tools/` and `/ai-tools/tools/` included Grammarly in non-query
  responses.
- `/ai-tools/tools/example-ai-assistant/` returned HTTP `404`.
- The draft example route remains absent from the live sitemap.

Cache note:

- The non-query `/sitemap.xml` initially returned HTTP `200` but served
  pre-Grammarly cached content.
- Cache-busted checks for `/ai-tools/?deploy-check=e9ee140`,
  `/ai-tools/tools/?deploy-check=e9ee140`, and
  `/sitemap.xml?deploy-check=e9ee140` returned HTTP `200` and included
  Grammarly.
- If the non-query sitemap remains stale after normal cache expiry, purge the
  Cloudflare cache and re-check `/sitemap.xml`.

## Phase 5R DeepL Production Deployment

Date: 2026-06-02

DeepL was added and reviewed through the draft-first workflow, then the two
DeepL commits were pushed to `origin/main`:

- `10a56a7 Add DeepL draft tool page`
- `38a3298 Review DeepL tool page for publication`

Local validation before push:

- `hugo --cleanDestinationDir` passed.
- `hugo --buildDrafts` passed.
- Production output was restored with `hugo --cleanDestinationDir`.
- `git diff --check` passed.
- Generated output remained ignored and unstaged.

Live verification after deployment:

- `/ai-tools/tools/deepl/` returned HTTP `200`.
- `/ai-tools/`, `/ai-tools/tools/`, and `/sitemap.xml` returned HTTP `200`.
- `/ai-tools/tools/` included DeepL in the non-query response.
- `/sitemap.xml` included `/ai-tools/tools/deepl/` in the non-query response.
- `/ai-tools/tools/example-ai-assistant/` returned HTTP `404`.
- The draft example route remains absent from the live sitemap.

Cache note:

- The non-query `/ai-tools/` initially returned HTTP `200` but served
  pre-DeepL cached content.
- Cache-busted checks for `/ai-tools/?deploy-check=38a3298` and
  `/sitemap.xml?deploy-check=38a3298` returned HTTP `200` and included DeepL.
- If the non-query `/ai-tools/` remains stale after normal cache expiry, purge
  the Cloudflare cache and re-check `/ai-tools/`.

## Phase 5U ElevenLabs Production Deployment

Date: 2026-06-02

ElevenLabs was added and reviewed through the draft-first workflow, then the two
ElevenLabs commits were pushed to `origin/main`:

- `5eccff5 Add ElevenLabs draft tool page`
- `5492410 Review ElevenLabs tool page for publication`

Local validation before push:

- `hugo --cleanDestinationDir` passed.
- `hugo --buildDrafts` passed.
- Production output was restored with `hugo --cleanDestinationDir`.
- `git diff --check` passed.
- Generated output remained ignored and unstaged.

Live verification after deployment:

- `/ai-tools/tools/elevenlabs/` returned HTTP `200`.
- `/ai-tools/`, `/ai-tools/tools/`, and `/sitemap.xml` returned HTTP `200`.
- `/ai-tools/tools/` included ElevenLabs in the non-query response.
- `/ai-tools/tools/example-ai-assistant/` returned HTTP `404`.
- The draft example route remains absent from the live sitemap.

Cache note:

- The non-query `/ai-tools/` and `/sitemap.xml` initially returned HTTP `200`
  but served pre-ElevenLabs cached content.
- Cache-busted checks for `/ai-tools/?deploy-check=5492410` and
  `/sitemap.xml?deploy-check=5492410` returned HTTP `200` and included
  ElevenLabs.
- If the non-query URLs remain stale after normal cache expiry, purge the
  Cloudflare cache and re-check `/ai-tools/` and `/sitemap.xml`.

## Audio Tools Category Production Deployment

Date: 2026-06-02

The Audio Tools category commit was pushed to `origin/main`:

- `51cd5e2 Add Audio Tools category for Aiplorer`

Local validation before push:

- `hugo --cleanDestinationDir` passed.
- `hugo --buildDrafts` passed.
- Production output was restored with `hugo --cleanDestinationDir`.
- `git diff --check` passed.
- Generated output remained ignored and unstaged.

Live verification after deployment:

- `/ai-tools/audio-tools/` returned HTTP `200`.
- `/ai-tools/`, `/ai-tools/tools/elevenlabs/`, and `/sitemap.xml` returned
  HTTP `200`.
- `/ai-tools/` included the Audio Tools category card.
- `/sitemap.xml` included `/ai-tools/audio-tools/`.
- `/ai-tools/tools/example-ai-assistant/` returned HTTP `404`.
- The draft example route remains absent from the live sitemap.

Cache note:

- The non-query `/ai-tools/tools/elevenlabs/` initially returned HTTP `200` but
  served the pre-Audio Tools category value.
- The cache-busted check for
  `/ai-tools/tools/elevenlabs/?deploy-check=51cd5e2` returned HTTP `200` and
  showed `Category: Audio Tools`.
- If the non-query ElevenLabs page remains stale after normal cache expiry,
  purge the Cloudflare cache and re-check `/ai-tools/tools/elevenlabs/`.

## Homepage Bookmark Hub Production Deployment

Date: 2026-06-05

The homepage bookmark hub commit was pushed to `origin/main`:

- `24d5575 Polish Aiplorer homepage as AI bookmark hub`

Local validation before push:

- `hugo --cleanDestinationDir` passed.
- `hugo --buildDrafts` passed.
- Production output was restored with `hugo --cleanDestinationDir`.
- `git diff --check` passed.
- Generated output remained ignored and unstaged.

Live verification after deployment:

- `/` returned HTTP `200`.
- `/ai-tools/`, `/ai-tools/tools/`, and `/sitemap.xml` returned HTTP `200`.
- `/ai-tools/tools/example-ai-assistant/` returned HTTP `404`.
- The draft example route remains absent from the live sitemap.

Cache note:

- The non-query `/` initially returned HTTP `200` but served pre-bookmark-hub
  cached content.
- Header check for `/` showed `cf-cache-status: HIT`, `age: 2179`, and
  `last-modified: Fri, 05 Jun 2026 06:55:27 GMT`.
- Cache-busted `/?deploy-check=24d5575` returned HTTP `200` and included
  `Quick AI Bookmarks`, reviewed tool links, category links, and guide/use-case
  links.
- Header check for the cache-busted homepage showed `cf-cache-status: HIT`,
  `age: 14`, and `last-modified: Fri, 05 Jun 2026 07:31:32 GMT`.
- If the non-query homepage remains stale after normal cache expiry, purge the
  Cloudflare cache and re-check `/`.

## Phase 5L Notion AI Production Deployment

Date: 2026-06-02

Notion AI was added and reviewed through the draft-first workflow, then the two
Notion AI commits were pushed to `origin/main`:

- `26d3f6f Add Notion AI draft tool page`
- `19a5074 Review Notion AI tool page for publication`

Local validation before push:

- `hugo --cleanDestinationDir` passed.
- `hugo --buildDrafts` passed.
- Production output was restored with `hugo --cleanDestinationDir`.
- `git diff --check` passed.
- Generated output remained ignored and unstaged.

Live verification after deployment:

- `/ai-tools/tools/notion-ai/` returned HTTP `200`.
- `/ai-tools/`, `/ai-tools/tools/`, and `/sitemap.xml` returned HTTP `200`.
- `/ai-tools/tools/example-ai-assistant/` returned HTTP `404`.
- The draft example route remains absent from the live sitemap.

Cache note:

- The non-query `/ai-tools/`, `/ai-tools/tools/`, and `/sitemap.xml` initially
  returned HTTP `200` but served pre-Notion cached content.
- Cache-busted checks for `/ai-tools/?deploy-check=19a5074`,
  `/ai-tools/tools/?deploy-check=19a5074`, and
  `/sitemap.xml?deploy-check=19a5074` returned HTTP `200` and included Notion
  AI.
- If the non-query URLs remain stale after normal cache expiry, purge the
  Cloudflare cache and re-check `/ai-tools/`, `/ai-tools/tools/`, and
  `/sitemap.xml`.
