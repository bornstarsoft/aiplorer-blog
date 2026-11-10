# Next practice picker

WORK-ID: AIP-NEXT-PRACTICE
ACTIVE_WRITER = NONE
Last AI: CODEX. Implementation and local verification: DONE.

Base: 659a107. Owner approved a new practice pack, easier next-pack
selection, and production deployment. Preserve the home and all 28
unrelated working changes.

Offer unpracticed packs by task area on the Use Cases shelf. Preview a
chosen pack without changing saved progress. Add a fictional review of
meeting actions against an explicit decision record.

Topic membership is defined in data/practice_topics.json. The build validator
requires each published practice pack to appear in exactly one topic.

QA: PASS. Isolated Hugo production and draft builds, 186 Node tests,
12 practice packs and 36 downloads, and 291 preserved post routes. Home
HTML is byte-identical. Browser checks covered filtered destinations,
cross-tab marks, all-practiced and undo states, storage fallback, and
320/390/1280px layouts. Protected drafts remain excluded.
BLOCKER: None for release preparation.
NEXT_SINGLE_TASK: deploy the scoped commit and verify production.
