# Historical evidence contract

This archive currently contains only verified 2026 YTD Weeks 1–3: 24 franchise-week scores and 12 actual matchups. The user is assembling 2016–2025 scoring and 2021–2025 detailed matchup history separately. Do not scrape, infer, manufacture, or extrapolate missing data.

`schema.json` is the versioned JSON Schema for a full or incremental bundle. `archive.json` is the production source. `assets/history-engine.js` validates identities and sporting constraints; `tools/import-history.cjs` merges a supplied bundle only after validation. All calculations use that normalized source. The newspaper does not store precomputed winners or interesting claims.

## Package the verified dataset

Provide one JSON document with `schema_version: 1` and these arrays. Arrays may be empty when that category is not supplied:

| Array | Required content |
| --- | --- |
| `sources` | Permanent `id`, descriptive `label`; optional repository-relative `path` to the source. |
| `franchises` | Existing permanent `id`, `currentName`, and verified `aliases`. Existing canonical names must not change. New aliases must be verified explicitly. |
| `seasons` | `year`, `status` (`complete`, `partial`, `ytd`), and canonical `participants` for the scoring universe. Optional `standings` with `franchise`, `source`, `pf`, `scoreWeeks`, `wins`, `losses`, `playoff`, `lastPlace`. Explicit finishes, not guesses. |
| `weekly_scores` | Permanent `id`, `season`, `week`, `franchise`, `historicalName`, numeric `score`, `source`; `gameType` may be `unknown` when not verified. Do not add an opponent field based on inference. |
| `matchups` | Permanent `id`, `season`, `week`, `gameType`, `teamA`, `teamB`, `teamAName`, `teamBName`, `teamAScore`, `teamBScore`, `source`. Both names must be verified aliases. |
| `championships` | Permanent `id`, `season`, canonical `champion` and `runnerUp`, `championName`, `runnerUpName`, `source`; optional `matchupId` referring to the verified final. No unsupported score. Season must be complete. |

Set `seasons[].championshipsVerified: true` only when that completed season's title/runner-up record is verified. Drought calculations require a consecutive run of such seasons. Season participation is required for complete-week league comparisons. If the participant universe is unknown, leave it empty: scoring still works; weekly crowns, all-play and belt results are unavailable for that season.

Unknown names must first be added to the correct canonical alias list using evidence. The import must not guess which franchise a new name belongs to. Canonical IDs are: `22-train`, `big-ball-jam`, `team-name`, `georges`, `old-timer`, `logjammin`, `cunningcarla`, `notoriousfresh`.

Game types: `regular`, `semifinal`, `championship`, `third_place`, `consolation`. Scoring-only rows can additionally use `unknown`. No pre-2021 matchup is prohibited when explicitly sourced; none is inferred merely from scores.

Historical names remain attached to each row, even after canonical aggregation. A dynasty title should say the current franchise and its verified name at the time.

## Import safely

From the existing THE WADD repository:

```powershell
node tools/import-history.cjs verified-history.json
node tools/import-history.cjs verified-history.json --apply
npm test
```

The first command is a dry run. The importer checks aliases, source references, score/matchup reconciliation, duplicate franchise weeks, season PF for the same `scoreWeeks`, completed-season championship evidence, and 2026 YTD. Conflicting existing evidence is rejected for human review; it is never silently overwritten. Stable existing IDs may be repeated with identical content. New season metadata is append-only; revising existing metadata requires an explicit reviewed edit followed by tests. Empty arrays never clear existing rows.

The importer writes only `data/history/archive.json`, using a validated temporary file and rename. It does not touch Issue #001. After import, charts, records and dates update from observed data automatically. Update editorial `gaps` notes if needed; the page's current coverage dates always derive from imported rows.

Run desktop/mobile QA before committing. Publish to the SAME `TheSuckZone/the-wadd` repository and https://thesuckzone.github.io/the-wadd/stats/. Wait for Pages for that exact commit, then verify `/`, `/stats/`, `/issues/001/`, and `/archive/`. Do not create a new repository or issue merely to import historical records.

## Minimum evidence / provisional labels

PPG headlines: 3 recorded weeks. Win-percentage champion: 10 known games. Rivalry ownership, even-rivalry and curse labels: 3 meetings. Volatility: 6 recorded weeks. Luck awards: 6 comparable actual regular-season games with complete weekly scoring. Stretches require 3 or 5 contiguous weeks within one season. Final finishes need explicit completed-season records. 2026 is always YTD, with no invented final finish.

Synthetic scenarios exist only inside `tests/history.cjs` and are never included in the production archive. Partial imported history can prove an observed record, not an absolute complete-history league record. Every receipt discloses that limit.
