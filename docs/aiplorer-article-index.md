# Complete Reviewed Article Index

ACTIVE_WRITER = NONE

Base HEAD: a75061a. Preserve 28 unrelated owner WIP files and keep home unchanged.
Owner approved implementation and deployment under the web GitHub exception.

Guides and Use Cases count reviewed articles automatically, but their curated
body links do not cover every reviewed page. Add a compact alphabetical index
of all published reviewed section pages and a stable top-level jump link.
Keep existing curated content and worked examples. No search, account, tracking,
new tools, draft publication or claims of latest product verification.

## Validation And Handoff

Last AI: CODEX. Work ID: AIP-ARTICLE-INDEX. Implementation DONE.
QA PASS in an isolated release tree: 150 Node tests; draft and clean minified
production builds; 16 guide and 18 use-case index entries; all 34 destination
links return 200 locally. Keyboard jumps focus the target heading. Desktop,
390px and 320px layouts were checked; browser console has no errors.
The reference-pack entry identifies its three text downloads.

Temporary draft and unreviewed fixtures stay out of the reviewed index even
with buildDrafts. Fixtures were removed and production output restored.
Existing eight tool drafts stay out of production output and sitemap.
Reading navigation, reference-pack downloads, shortlist, legacy post URLs and
XML validators pass. The existing legacy raw-HTML warning is unchanged.
The new validator uses Node and the system Ruby YAML parser, without new packages.

HEAD/WIP: base a75061a plus this five-file change; 28 unrelated owner WIP files
are excluded from the release. Home content and legacy posts are unchanged.
NEXT_SINGLE_TASK: verify the committed production deployment and live indexes.
BLOCKER: none. Owner approved this scoped commit and deployment.
