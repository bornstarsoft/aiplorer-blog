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
- Each directory result card shows the first reviewed `bestFor` item as a
  compact May fit preview before the visitor opens the full review.
- The same May fit signal appears on homepage, category, related-tool, and
  recently viewed cards so visitors can keep the same selection context while
  moving through Aiplorer.
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
- The May fit preview is one reviewed task example, not a ranking, endorsement,
  quality score, or claim that the service is suitable for every user.
- Recently viewed cards store this task-fit text with the existing private
  browser history. Older saved cards remain valid and gain the signal after the
  tool is opened again.
- Filtering runs in the browser. Queries are not stored in an Aiplorer account
  or sent to an Aiplorer database.
- Draft tools remain outside production output and cannot appear in finder
  results.

## Trend Rationale

The Stanford HAI 2026 AI Index describes rapid capability gains and tighter
performance clustering among leading systems, with competitive attention
shifting toward reliability and domain-specific performance. Aiplorer responds
by surfacing task fit from its existing reviewed metadata rather than adding a
popularity ranking.

Official source checked:

- https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance

## Trend Context

Current AI use is increasingly organized around practical workflows such as
agentic automation, coding, research, and multimodal creation. A task-aware
finder complements Aiplorer's workflow collections and Trend Watch without
turning the directory into an unreviewed high-volume link index.

The implementation remains progressively enhanced and lightweight: the
homepage form still reaches the reviewed directory without JavaScript, while
the directory adds client-side filtering when JavaScript is available.
