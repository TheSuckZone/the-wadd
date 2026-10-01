# THE WADD

A static, data-driven fantasy football newspaper. No dependencies, API keys, backend, or build required. Serve over HTTP; opening `index.html` as a file will block JSON loading in most browsers.

## Local preview and validation

```powershell
npm test
npm run serve
```

Open http://127.0.0.1:4173/the-wadd/ to test project-subdirectory hosting.

## Publish to GitHub Pages

Install Git and GitHub CLI and sign in with `gh auth login`. Run these commands inside this folder. Replace YOUR_USERNAME with your GitHub username; `the-wadd` is the new repository name.

```powershell
git init -b main
git add .
git commit -m "Build THE WADD Issue 001"
gh repo create YOUR_USERNAME/the-wadd --public --source=. --remote=origin
git push -u origin main
gh api --method POST repos/YOUR_USERNAME/the-wadd/pages -f build_type=workflow
gh workflow run pages.yml
gh run list --workflow pages.yml
```

If Pages is already enabled, update it using `gh api --method PUT repos/YOUR_USERNAME/the-wadd/pages -f build_type=workflow`. Alternatively select Settings → Pages → Source → GitHub Actions. View https://YOUR_USERNAME.github.io/the-wadd/ after the deployment succeeds. Issue 001 is at https://YOUR_USERNAME.github.io/the-wadd/issues/001/ and the archive at https://YOUR_USERNAME.github.io/the-wadd/archive/. No remote was created or published by this build.

## Future issues

All future issues must deploy to the SAME repository and public website. Once configured, reuse `origin`; never create another repository for a weekly edition. Commit, push, wait for Pages, and verify the live homepage, permanent issue route, and archive after every update. `AGENTS.md` records this requirement for future work.

1. Copy `issues/001/data.json` to `issues/002/data.json`, change issue/date/week, and update source data and editorial commentary.
2. Copy `issues/001/index.html` to `issues/002/index.html`; change `data-issue="001"` to `data-issue="002"`.
3. Prepend issue 002 to `data/issues.json`. The homepage automatically loads the first issue. Keep old JSON unchanged to preserve historical editions.
4. Run `npm test`, commit, and push. The validation script checks every listed issue.

All league data is in the issue JSON, with reusable draft and receipt schemas under `data/`. Standings, bars, awards, bench differences, efficiencies, and projected margins derive from this shared source. Supplied rounded efficiency is checked against calculated efficiency. Positional buckets reconcile to overall PF; chart tooltips include the allocation reconciliation.

## Draft data and receipts

The referenced draft screenshots were not attached. `draft.picks` remains empty and the site explicitly reports missing source material. Transcribe only readable picks. Use `round`, `pick_in_round`, `player`, `position`, `nfl_team`, and `fantasy_team` (team ID or full team name). Overall pick is calculated as `(round - 1) * 8 + pick_in_round`. Set uncertain entries to `uncertain: true`; they are excluded from analysis. The supplied `current_points` must remain null until authoritative production data is available.

The draft renderer supports position capital, average rounds, position timing, QB counts, and partial production by round. Objective labels currently use explicit thresholds: QB HOARDER = at least four QBs; WAITED ON QB = first QB in round eight or later. No labels are applied with missing draft data. Production verdicts, expected-value rankings, and current-roster attribution require additional baselines/roster data. No fabricated draft grades or preseason quotes are included.

Add sourced claims to `receipts` using `data/receipt-template.json`; future issues retain the claim and add a verified outcome. The trade recipient is unidentified in the supplied material and is marked accordingly.

## Files

`index.html`, `404.html`, `.nojekyll`, `.gitignore`, `package.json`, `README.md`, `.github/workflows/pages.yml`, `archive/index.html`, `issues/001/index.html`, `issues/001/data.json`, `data/issues.json`, `data/draft-template.json`, `data/receipt-template.json`, `assets/app.js`, `assets/style.css`, `assets/favicon.svg`, `tests/validate.cjs`, `tools/serve.cjs`.

