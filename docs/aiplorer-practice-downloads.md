# Practice Download Entry Points

ACTIVE_WRITER = NONE

Base HEAD: 69b5eb2. Owner approved implementation and live deployment.
Preserve 28 unrelated WIP files; leave home, drafts and legacy posts unchanged.

Add a native jump and compact resource list to article hubs only when reviewed,
published pages explicitly declare practiceDownloads. Each pack keeps its
article link and separate named input, review key and worksheet downloads.
Do not automatically expose arbitrary text resources, private browser state or
unreviewed/draft packs. Reuse the existing article-index styling and download
icon. No new JavaScript, storage, account, search, dependency or prediction.

## Validation And Handoff

Last AI: CODEX (AIP-PRACTICE-DOWNLOADS). Implementation DONE.
HEAD/WIP: based on 69b5eb2; six scoped files, 28 owner WIP files excluded.
Owner approval: implementation, validation and live deployment.

QA PASS in an isolated HEAD-plus-change tree:
- Production and draft builds, followed by a clean production restore.
- 150 Node tests; native download, article index and reference-pack validators.
- Six downloads preserve the existing source bytes.
- Reviewed draft and unreviewed fixture packs remain out of the shelf even
  with --buildDrafts; fixtures exist only in the temporary validation tree.
- Eight tool drafts excluded from production routes and sitemap.
- 291 legacy post URLs preserved.
- Browser: six successful downloads, keyboard jump focuses the heading,
  no horizontal overflow at 320/390/1280px and no observed page errors.

Existing legacy-post raw HTML warning is unchanged. No public tool claims,
homepage content, text-file contents or draft status changed.
NEXT_SINGLE_TASK: commit the exact validated files, deploy through the existing
GitHub/Cloudflare integration and verify the live shelf and downloads.
Deployment status at this commit: NOT_RUN. No blocker.
