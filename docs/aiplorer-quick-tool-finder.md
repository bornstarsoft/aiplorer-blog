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
- Each result also offers a separate local bookmark control so visitors can
  build a shortlist without losing the current query or category.
- When saved candidates exist, the Directory shows a compact resume panel with
  up to three saved tool names, the next candidate stage, and private checklist
  progress. It links directly to the relevant shortlist stage and to the
  saved-only comparison view.
- The same May fit signal appears on homepage, category, related-tool, and
  recently viewed cards so visitors can keep the same selection context while
  moving through Aiplorer.
- Category filtering and category jump links use the same visible result set.
- The current query is reflected in the URL so browser navigation and shared
  links remain useful.
- The last non-empty query and category are stored in the current browser so
  the homepage can offer a direct way to resume that directory view.
- Visitors can clear the saved search from the homepage or by resetting the
  directory filters.
- After a visitor starts a Review Updates checkpoint, the Directory can expose
  a `New since checkpoint` filter when one or more public tool review tokens
  are newer than that browser's snapshot. The filter combines with task and
  category filters and is reflected as `new=1` in the URL.
- When one or more candidates are saved in the local shortlist, the Directory
  exposes a `Saved candidates` filter. It combines with task, category, and
  new-review filters, uses `saved=1` in the URL, and updates immediately when a
  visible result is saved or removed.
- The saved-candidate resume panel also offers a direct route back to the
  Directory's saved-only view, alongside the shortlist and comparison routes.
- Visitors can switch between the full card view and a compact scanning view.
  Compact view keeps the tool name, reviewed task-fit signal, review date, and
  save control visible while removing repeated description copy.
- The selected Directory view is stored in the current browser and restored on
  later visits without changing filter order or result ordering.
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
- Directory bookmarks use the existing browser-only shortlist and do not
  create an account, remote profile, or recommendation signal.
- Saved search state uses the local `aiplorer-last-tool-search-v1` browser key.
  It does not sync across browsers or devices.
- The Directory resume panel reads only the same browser-local shortlist,
  decision-stage, and candidate-check state. It does not send that state to
  Aiplorer or use it to rank tools.
- The new-review filter compares public tool path-and-date tokens with the
  existing browser-local Review Updates snapshot. It reports Aiplorer review
  activity, not vendor product changes or feature guarantees.
- The saved-candidate filter reads only the existing browser-local shortlist.
  It does not sync candidates, send them to Aiplorer, or change alphabetical
  and category ordering.
- The Directory view preference uses the local
  `aiplorer-tool-directory-view-v1` key. It is a presentation preference only
  and does not affect ranking, review status, or which tools match a filter.
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
