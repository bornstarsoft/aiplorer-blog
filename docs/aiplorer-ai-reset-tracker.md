# Aiplorer AI Reset Tracker

## Purpose

The Codex Reset Pulse gives visitors a repeat-use historical utility without
asking for an AI account login, browser session, API key, or usage history.

It keeps two concepts separate:

- Public provider incident status.
- A source-linked history of public or exceptional reset announcements.

The page does not forecast reset events or infer a visitor's account schedule.
The earlier manual timestamp form and local countdown were removed because they
served a different task and reduced the visibility of the historical data.

## Public Codex History

`data/codex_reset_history.json` contains a manually checked snapshot of 46
public Codex reset announcements observed between September 17, 2025 and August
24, 2026. Each row stores only the UTC announcement timestamp and the source X
post URL. The seed was checked against `https://codex-resets.com/`, which states
that it collects posts from `@thsottiaux` and is not affiliated with OpenAI.

The records are labeled as announcement observations rather than official
OpenAI reset telemetry. Announcement scope is not uniform: source posts can
refer to full, partial, banked, or incoming resets. Aiplorer therefore does not
present the event count as a count of identical account resets.

The public page presents the snapshot as the Aiplorer Reset Pulse. The default
view favors fast comparison over a wall of metric cards:

- Live elapsed time since the latest observed announcement.
- A 30-day UTC activity strip with one cell per calendar day.
- Latest interval, 30-day median, and full-history median on a shared visual
  scale.
- A compact 30-day, 90-day, and full-history comparison table.
- A fixed 24-hour UTC distribution whose axis labels can shift to the visitor's
  browser time, Los Angeles time, or UTC without changing bar heights. The Los
  Angeles axis uses the PST or PDT offset active on the latest record date.
- A live vertical marker showing the current moment on the selected time axis.
- A compact homepage pulse showing elapsed time, the latest observed timestamp,
  record count, and a direct path to the full tracker.
- A source-linked event timeline.

The latest 14 intervals, UTC weekday distribution, six-hour time-band
distribution, event timeline, and provenance notes remain available in one
collapsed detail section. This keeps the first read concise while preserving
deeper inspection for visitors who need it. Original record links use compact
icon controls rather than a repeated visible Source label.

The median is emphasized because the history contains long gaps and a recent
higher-frequency period. The recent-versus-full comparison is descriptive and
no metric is labeled as a next-reset estimate.

The hourly view also remains descriptive. It identifies the same strongest
observed six-hour UTC band and relabels that fixed band for the selected time
axis; it does not infer a future reset hour.

## Official Status Data

The page requests the public JSON summaries from:

- `https://status.openai.com/api/v2/status.json`
- `https://status.claude.com/api/v2/status.json`

These APIs describe public service status. They do not provide account quota or
reset data. If either request fails, the page keeps working and directs the
visitor to the official status website.

## Public Entry Points

The tracker is available at `/ai-tools/reset-tracker/`. Lightweight entry links
are included on the homepage, the AI Tools overview, and the reviewed directory
shortcut row. It is a historical utility page rather than a reviewed vendor
page and is not included in reviewed-tool counts or rankings.

## Refresh And Deferred Automation

The history snapshot is not refreshed automatically in this release. The
homepage and tracker display the date represented by `snapshotAt`, so visitors
can distinguish a recently checked snapshot from live account telemetry.

### Daily Manual Refresh

First validate the existing file:

```bash
node scripts/validate-reset-history.mjs
```

Check the source once. If there is no new reset record, preview and then record
the completed check:

```bash
node scripts/update-reset-history.mjs --mark-checked --dry-run
node scripts/update-reset-history.mjs --mark-checked
```

If there is a new source post, copy its exact UTC announcement time and direct
status URL. Preview the change before writing it:

```bash
node scripts/update-reset-history.mjs \
  --at "2026-08-12T00:00:00.000Z" \
  --source "https://x.com/example/status/1234567890" \
  --dry-run
```

Remove `--dry-run` only after reviewing the preview. The command rejects
duplicate timestamps, duplicate source URLs, non-status URLs, future event
times relative to the check, and a check time older than the published
snapshot. It also sorts events newest-first, updates `snapshotAt`, keeps
`coverageStartsAt` aligned with the oldest record, and updates the tracker
`lastmod` date.

After either kind of update, run:

```bash
node scripts/validate-reset-history.mjs
hugo --cleanDestinationDir --gc --minify
git diff --check
```

Review the generated tracker and sitemap before committing. Existing records
should remain immutable unless a source correction is documented.

A future public reset-event monitor should use a separate Cloudflare Worker,
scheduled polling, and a small normalized event store. It should distinguish
official events, corroborated public announcements, community reports, and
forecasts. Account pages, private endpoints, credentials, and login-protected
usage views must not be scraped.

Any future forecast should publish its source period, sample size, uncertainty,
generation time, and historical evaluation. It must not claim to predict an
individual visitor's reset window.
