# Aiplorer Quick Tool Finder

## Purpose

Quick Finder helps visitors move from a tool name or practical task to a
smaller set of manually reviewed services. It is designed for a growing
directory where category browsing alone can become slow.

## Behavior

- The homepage search sends a tool, task, and optional category query to the
  reviewed tools index.
- The reviewed tools index matches the query against reviewed titles,
  categories, descriptions, `bestFor` entries, and use cases.
- Eight common task shortcuts apply the same query and category filters for
  research, writing, coding, automation, meetings, images, video, and audio.
- An active task shortcut is visibly identified and reflected in the URL.
- Category filtering and category jump links use the same visible result set.
- The current query is reflected in the URL so browser navigation and shared
  links remain useful.
- An empty result offers a clear reset and a route to workflow collections.

## Trust And Privacy

- Quick Finder searches only already published, manually reviewed tool
  metadata.
- Results preserve category and alphabetical ordering. There is no score,
  popularity rank, paid placement, or affiliate priority.
- Task shortcuts are workflow starting points, not popularity labels or
  recommendations.
- Filtering runs in the browser. Queries are not stored in an Aiplorer account
  or sent to an Aiplorer database.
- Draft tools remain outside production output and cannot appear in finder
  results.

## Trend Context

Current AI use is increasingly organized around practical workflows such as
agentic automation, coding, research, and multimodal creation. A task-aware
finder complements Aiplorer's workflow collections and Trend Watch without
turning the directory into an unreviewed high-volume link index.

The implementation remains progressively enhanced and lightweight: the
homepage form still reaches the reviewed directory without JavaScript, while
the directory adds client-side filtering when JavaScript is available.
