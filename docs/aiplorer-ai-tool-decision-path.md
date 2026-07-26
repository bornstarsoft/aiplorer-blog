# Aiplorer AI Tool Decision Path

Date: 2026-07-26

## Purpose

`/ai-tools/decision-path/` helps visitors who know the work they need to do but
do not yet know which AI tool category or review criteria to use. It connects
the existing workflow collections, reviewed tool pages, Shortlist, and
comparison view in two choices:

1. practical workflow
2. review priority

## Data and behavior

- Workflow definitions and candidate titles come from
  `aiplorer-workflow-collections.html`.
- Candidate pages must be public, `draft: false`, and
  `reviewStatus: "reviewed"`.
- Candidate tools are displayed alphabetically and are not ranked or scored.
- The selected workflow and priority are reflected in URL query parameters.
- No account, database, remote profile, recommendation model, or tracking is
  introduced.
- Shortlist controls use the existing browser-local
  `aiplorer-shortlist-v1` storage.

## Editorial boundary

The result is a starting path, not a product recommendation. Each result keeps
the workflow caution and adds a selected review checkpoint covering source
verification, privacy and permissions, reliability, rights and publishing, or
current plans and limits. Visitors must still read the full review and verify
current details at the official source.
