# THE WADD publication workflow

Use this checkout for every issue. Reuse the Git `origin` remote and the same GitHub Pages website. The verified public repository is `TheSuckZone/the-wadd` (https://github.com/TheSuckZone/the-wadd). The permanent public website is https://thesuckzone.github.io/the-wadd/. Never create another weekly repository or website.

For each new issue:

1. Add the next zero-padded issue under `issues/XXX/data.json` and its permanent `index.html`. Reuse `assets/app.js` and `assets/style.css`.
2. Prepend the issue to `data/issues.json`, which controls the homepage/current issue and archive. Preserve all previous issue files unchanged. Read and compare their Git diff before committing.
3. Use only supplied or verified league evidence. Missing draft screenshots, player production, preseason claims, and trade counterparties must remain explicitly missing.
4. Run `npm test`. Inspect desktop/mobile layouts and relative navigation, including project-subdirectory hosting.
5. Commit the update to this repository and push to the same `origin` branch `main`. Do not leave deployment as an explanation when authenticated access allows action.
6. Wait for the Pages deployment for that exact commit to succeed. Verify the public homepage loads the new issue, its permanent route loads, and the Past Issues archive includes every prior issue.
7. Return the verified public URL. If authentication, permissions, or GitHub security confirmation blocks deployment, explain the exact required user action.

Initial GitHub creation and Pages configuration are authorized by the user. The website is intended to be public. The connected GitHub app and browser are signed in as TheSuckZone. If local Git lacks credentials, use authenticated GitHub connector commit/tree/ref operations for publication and synchronize the local checkout afterward. Never export browser cookies or authentication secrets.

## Historical statistics

The user is assembling the verified 2016–2025 historical dataset separately. Do not scrape, invent, or extrapolate missing history. Preserve Issue #001 HTML and JSON unchanged. Use `data/history/IMPORT.md` and `schema.json` for verified imports. The production archive currently has only 2026 YTD Weeks 1–3; test-only historical fixtures are not league data. Unsupported sections must explain why they are unavailable. Every statistic uses `history-engine.js` and its shared normalized archive; never hardcode discovered records in HTML. Keep the newspaper design and the main navigation label `FUCKIN' STATS MATE`. Deploy updates to `/stats/` on this same website and verify the current homepage, permanent issue, and archive still work.
