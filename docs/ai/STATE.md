# STATE — Current project status

> **This is a living file.** Any agent that makes a meaningful change MUST update
> "Recent changes" and (if applicable) "In progress" before ending the session.
> Keep entries short; prune anything older than ~10 entries into git history.

**Last updated:** 2026-07-27
**Library version:** `lumen-icons` 0.2.0 (published to npm) · repo app `lumen` 0.0.1 (private)

## Snapshot

- **362 icons** in `packages/icons/src/icons/`, each with a matching `.spec.ts` (363 specs incl. types spec).
- Sources: Heroicons 24/outline (outline variant) + 24/solid (filled variant), plus ~38 custom icons preserved by the generator's extraction pipeline.
- **Icon API** (all optional inputs on every icon, defined in `LmnIconBase`):
  `size` (12|14|16|20|24|32, default 24) · `strokeWidth` (default 2) · `ariaLabel` · `animate` (default false) · `tone` · `color` · `variant` (outline|filled) · `background` (none|soft|solid) · `backgroundTone` · `backgroundColor` · `padding` · `radius` (number|string, default `0.5rem`).
- **Animations:** ~70 pure-CSS recipes in `scripts/animations.mjs`; every icon is mapped to one via `ICON_ANIMATIONS` (explicit) or `FALLBACK_ANIMATIONS` (pattern). Only `loader` loops infinitely.
- **Demo app pages:** `index` (landing), `icons` (catalog with full prop playground, search, copy-to-clipboard), `docs`. Theme toggle (light/dark) via `ThemeService`.
- **Tooling:** Angular 21 · AnalogJS 2.4 (SSR off, static SPA) · Vite 8 · Vitest 4 + Testing Library · Playwright · Tailwind v4 (app only) · @voltui/components (app chrome) · pnpm 10 · husky + commitlint (conventional commits).
- **CI/CD:** one workflow, `.github/workflows/ci.yml` — quality (lint/typecheck/unit) ∥ build (lib + site, uploaded as the `site` artifact) → e2e against that artifact → merge gate → Cloudflare Pages deploy (preview on PRs, production on `main`). Deploys happen **only** from CI; needs `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` secrets.
- **Quality gate:** `pnpm run check` = lint + typecheck (app & lib) + unit tests + `build:lib` + publint.

## Recent changes (newest first)

- **2026-07-27** — Generator bug-fix pass (post-review): fixed `variant="filled"` fallback CSS for the 38 custom icons (selector now `:host(.lmn-filled) svg` — previously unscoped, so emulated encapsulation made it a silent no-op); removed 5 duplicate keys in `ICON_ANIMATIONS` (`cloud-arrow-down`/`cloud-arrow-up` back to `download-arrow`/`upload-arrow`, `document-magnifying-glass` back to `zoom`) and added `no-dupe-keys` for `scripts/**/*.mjs` in ESLint to prevent regressions; made `applyPathClasses` idempotent (token dedupe — `menu.ts` had 6 copies of `lmn-path-1`); extracted shared catalog/barrel/metadata writers into `scripts/icon-catalog-writer.mjs` so `generate-icons.mjs` and `sync-icons.mjs` emit byte-identical output (verified), and dropped dead `selectorStr`/`exampleStr` mocks from `icon-card.spec.ts`. Regenerated all 362 icons — only the 41 affected files changed. `pnpm run check` green.
- **2026-07-27** — Repository presentation + deployment consolidation. README rewritten as a visual landing page (badges, comparison table, API reference, pipeline diagram) with real screenshots in `docs/assets/`; same treatment for the npm README. GitHub About now has a description and 19 topics. Added root `LICENSE`, `SECURITY.md` and issue templates. **CI/CD collapsed into one workflow** (`.github/workflows/ci.yml`, replacing `ci-cd.yml`) that builds the site once and deploys that same artifact to Cloudflare Pages — preview on PRs, production on `main`; manual deploy scripts removed. Fixed demo-site visual bugs found while screenshotting (hardcoded `v0.1`, invisible selected states in the size picker and animate toggle, overlapping icon-card actions, dead "Status" category filter).
- **2026-07-06** — Added AI-agent documentation pack: `AGENTS.md`, `docs/ai/*` (context, state, architecture, conventions, workflows), `docs/specs/` (SDD process + template).
- **~2026-06/07** — Animation system iterations (`feat: update animations` ×2): recipe catalog refinements in `scripts/animations.mjs`, regenerated icons.
- **2026-05-29 (v0.2.0)** — Filled variant for all Heroicons-based icons; per-icon `lumen-icons/<name>` subpath exports; pure-CSS animations replacing the runtime animation dependency; `radius` accepts `number | string`; catalog radius presets; custom-icon preservation pipeline; APF-compliant build passing publint.
- **2026-05-22 (v0.1.0)** — Initial 31 icons, unit + e2e test suites, demo site.

## In progress / known gaps

- **Active plan: [docs/specs/2026-07-06-v0.3.0-plan.md](../specs/2026-07-06-v0.3.0-plan.md)** — 0.3.0 release (free-form `size`, `animateOnHover`) + demo refresh (prerender/SEO, playground parity). Status: draft, awaiting maintainer approval. Start with its P0 items.
- ~~No root `LICENSE` file~~ — added 2026-07-27 (P0.1 done).
- The demo site's advertised version lives in `src/app/data/site-meta.ts` — **bump it when releasing**, it is not derived from `packages/icons/package.json`.
- `CLAUDE.md` drifts slightly from code in places (e.g. it omits `tone`/`backgroundTone` inputs and the `check:package` step in `check`). Code is the source of truth. (P0.3.)
- All 324 Heroicons outline icons are already generated (362 = 324 + 38 custom) — icon growth needs a new source decision.
- E2E suite exists (`tests/e2e/`: smoke, navigation, icons, docs, theme) but only runs against Chromium.
- `vite.config.ts` prerenders no routes (`prerender.routes: []`) — the site ships as an empty-shell SPA. (P2.1.)

## Next milestones

See the active 0.3.0 plan above; longer-horizon items (from docs/architecture-plan.md):

1. ~~Validate the published package inside a fresh external Angular app~~ → folded into the 0.3.0 plan (P0.2).
2. Add an SVG → component generator path for brand-new icons (not just syncing existing sets).
3. Release flow with Changesets or semantic-release.
4. Visual regression checks for the icon grid in light and dark themes.

## Versioning reminders

- New icons / new optional inputs → **minor**. Bug fixes → **patch**.
- Renaming/removing inputs or selectors, or changing default `size`/`strokeWidth` → **major** (see CONVENTIONS.md).
- Update `CHANGELOG.md` (keep-a-changelog format) with every user-visible change.
