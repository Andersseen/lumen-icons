# STATE — Current project status

> **This is a living file.** Any agent that makes a meaningful change MUST update
> "Recent changes" and (if applicable) "In progress" before ending the session.
> Keep entries short; prune anything older than ~10 entries into git history.

**Last updated:** 2026-08-19
**Library version:** `lumen-icons` 0.2.0 (published to npm) · repo app `lumen` 0.0.1 (private)

## Snapshot

- **362 icons** in `packages/icons/src/icons/`, each with a matching `.spec.ts` (363 specs incl. types spec).
- Sources: Heroicons 24/outline (outline variant) + 24/solid (filled variant), plus ~38 custom icons preserved by the generator's extraction pipeline.
- **Icon API** (all optional inputs on every icon, defined in `LmnIconBase`):
  `size` (12|14|16|20|24|32, default 24) · `strokeWidth` (default 2) · `ariaLabel` · `animate` (default false) · `tone` · `color` · `variant` (outline|filled) · `background` (none|soft|solid) · `backgroundTone` · `backgroundColor` · `padding` · `radius` (number|string, default `0.5rem`).
- **Animations:** ~70 pure-CSS recipes in `scripts/animations.mjs`; every icon is mapped to one via `ICON_ANIMATIONS` (explicit) or `FALLBACK_ANIMATIONS` (pattern). Only `loader` loops infinitely.
- **Demo app pages:** `index` (landing), `icons` (catalog playground — one `app-icon-controls` in a sticky rail or a `volt-drawer`, backed by `IconCatalogStore`; grid rendered in `@defer` chunks), `docs` (sticky TOC rail, tabbed reference tables). Theme toggle (light/dark) via `ThemeService`.
- **Tooling:** Angular 21 · AnalogJS 2.4 (SSR off, static SPA) · Vite 8 · Vitest 4 + Testing Library · Playwright · Tailwind v4 (app only) · @voltui/components (app chrome) · pnpm 10 · husky + commitlint (conventional commits).
- **CI/CD:** one workflow, `.github/workflows/ci.yml` — quality (lint/typecheck/unit) ∥ build (lib + site, uploaded as the `site` artifact) → e2e against that artifact → merge gate → Cloudflare Pages deploy (preview on PRs, production on `main`). Deploys happen **only** from CI; needs `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` secrets.
- **Quality gate:** `pnpm run check` = lint + typecheck (app & lib) + unit tests + `build:lib` + publint.

## Recent changes (newest first)

- **2026-08-19** — Official-site refactor onto volt-ui atoms and angular-movement
  ([spec](../specs/2026-08-18-official-site-refactor.md), status `done`). A Playwright
  audit found four defects, all fixed: the hero badge was invisible (scoped `.dark`
  could not re-resolve theme tokens — the `@theme` bridge is now `inline`), `/icons`
  had two `<main>` landmarks and a duplicate `icon-search` id, the quickstart snippets
  clipped mid-token, and `provideMovement` ignored `prefers-reduced-motion`. Also
  corrected `--accent`, which was a second brand purple where volt-ui expects the hover
  surface (44 usages), so hover no longer reads as "selected". The two duplicated
  `/icons` control panels became one `app-icon-controls` (sticky rail on desktop,
  `volt-drawer` on mobile) over a new `IconCatalogStore`; the hand-rolled radio grids
  became an `app-option-group` atom on `volt-toggle-group`; icon cards moved to
  `volt-card` + `volt-dropdown-menu` + one page-level toast. `@defer` chunking and
  tabbed docs reference cut `/icons` to 2 502 nodes (from 6 703) and `/docs` to 3 816 px
  (from 25 998). `pnpm run check` and all 26 Playwright tests pass.
- **2026-08-18** — Official-site visual refresh. The home page now presents Lumen as a product landing page: a high-contrast responsive hero, live semantic-motion canvas, 362/0/100% proof points, developer-focused capability cards and a three-step quickstart. The install copy action and existing routes remain intact; a new Playwright flow covers the primary browse CTA. Full E2E passes (23 tests), production build passes, and unit/package verification remains green.
- **2026-08-18** — Official app refresh: upgraded `@voltui/components` 0.1.0 → 1.0.1 and `angular-movement` 0.1.0 → 0.8.0. The application and Analog test bed now run zoneless through `provideZonelessChangeDetection()` / `setupTestBed({ zoneless: true })`; direct `zone.js` was removed (it remains transitively present for Analog's test tooling only). VoltUI control labels now use the v1 ARIA inputs. The generator reads committed Lumen outline/filled branches rather than `node_modules/heroicons`, so direct Heroicons is removed too. Unit, Playwright and production builds pass.
- **2026-08-18** — Verified semantic rest state + sidebar scrolling with Playwright. The outline generator now exposes the configured stroke width as a CSS variable, so `bold` genuinely thickens and returns to the caller's exact value; `rocket-launch` makes an upper-right diagonal flight before resetting at full opacity and identity transform. The semantic desktop `<aside>` is the sticky panel's own viewport-scoped scroll container, preventing users from having to reach the page bottom. Targeted E2E passes (11 tests) and `pnpm run check` passes (3648 tests + publint).
- **2026-08-18** — Rest-state correction after visual review. `wrench`, `wrench-screwdriver`, and `key` replaced their persistent 180°/90° rotations with a short turn and explicit `rotate(0deg)` end state. Bolt now thickens only its path (`scaleX`) and returns to width 1. Trash splits the outline so its top rim opens/closes while the discard pseudo-element is invisible at both ends. `pnpm run check` remains green.
- **2026-08-18** — Semantic composition pass. Added explicit rest-state keyframes for the requested charts, bolts, trash, stacks, X, rocket, Wi‑Fi and RSS. Charts use per-bar baseline growth; stack and square-stack outlines assemble by layer; X strokes rotate from a pause-like stance; trash temporarily emits a discard artifact while its lid opens/closes; rockets disappear in flight and fade back at rest; Wi‑Fi/RSS run two ordered arc pulses. `pnpm run check` passes (3648 tests + publint).
- **2026-08-18** — Mechanism motion audit. Replaced semantically wrong generic motion for `battery-0/50/100` (wave → terminal/frame/charge assembly), `scale` (180° flip → damped balance settle), `scissors` (full rotation → snip), both paper-clip spellings (full rotation → flex), and `puzzle-piece` (full rotation → seat). All recipes are one-shot eased sequences with generator-provided reduced-motion coverage; 8 icons regenerated and `pnpm run check` passes.
- **2026-08-18** — Responsive catalog + targeted motion audit. `/icons` no longer overflows at 320 px: the grid uses one column until two cards fit, the main flex child may shrink, and header chrome compacts. Added a Playwright viewport regression test. Audited all 362 resolved recipes and retained rotation only where it expresses a physical mechanism or a return/refresh path; replaced the clearly generic rotation/fade for `plus*` (staged stroke assembly) and the eight standard `document*` icons (outline draw, filled settle). Browser-session visual inspection was unavailable; targeted e2e passes and manual dev-app review remains useful.
- **2026-08-18** — Navigation motion + catalog controls. The `/icons` desktop sidebar is now sticky at the component host. `arrow-uturn-*` explicitly uses `turn-draw` instead of the spin fallback; `bars-2/3/4` and aligned bar variants now reveal their real lines in a directional cascade; `bars-arrow-*` draws the list then delivers its arrow; `arrow-up-right` is an explicit diagonal draw. Regenerated 14 icon components; visual pass remains pending maintainer review.
- **2026-08-18** — Per-icon visual refinement pass for the first 30 catalog icons. Replaced the generic artifact-arrow extension with distinct `arrow-in-circle`, `arrow-through-rectangle`, and `arrow-into-receiver` stories: rings establish before an arrow arrives, rectangle frames stay put while an arrow crosses, squares receive it, and trays react on impact. Also removed `academic-cap`'s distracting fade, made filled adjustments move individual knobs, and gave `alert-circle` its own ring-and-marker signal. `arrow-path-rounded-square` now treats its two curved arrows as parallel draw paths rather than spinning the complete icon. Regenerated 16 affected icon components; visual pass remains pending maintainer review.
- **2026-08-18** — The eight `arrow-turn-*` icons no longer inherit the generic 360° spin fallback. `turn-draw` splits each into route + two arrowhead strokes, traces the route through its corner tail → tip, then resolves the head; the filled version settles once without rotation. Regenerated 8 affected icon components.
- **2026-08-18** — Directed batch: next 15 catalog icons. `arrow-right`, `arrow-long-*`, `arrow-left/right-circle`, and the `arrow-left/right-*-on-rectangle` variants now use the split-path draw sequence from tail → tip → head over 700 ms; horizontal filled rectangle/circle arrows use directional lunge tuning. `arrow-path` and `arrow-path-rounded-square` keep one-shot spin but slow to 1000 ms for a smoother pass. 15 icon files regenerated; awaiting the usual visual pass.
- **2026-08-18** — Directed batch: first 15 catalog icons (spec addendum). New generator capabilities: `splitPaths` (split compound paths into subpaths with relative→absolute conversion) + variant CSS markers (`.lmn-animate--outline`/`.lmn-animate--filled`). New recipes: `cap-toss-fade` (academic-cap), `slider-pins` (adjustments move only their knobs), `archive-peek`/`archive-drop`/`archive-reject` (lid opens + per-variant action), `draw-drift` (plain arrows draw + drift), `draw-part` (download arrows: only the arrow draws). Fixed the splitter so implicit relative line segments following a converted `m` keep their coordinates instead of corrupting the icon geometry. Arrow drawing now follows tail → tip → head over 700 ms with eased pacing; the generator reverses only straight shafts defined backwards in source SVGs. 14 icon files regenerated; `pnpm run check` green (3648 tests + publint).
- **2026-08-17** — Semantic animation remap implemented (branch `feature/semantic-animations`, spec `2026-08-17-semantic-animation-remap`, status in-progress pending the manual visual pass). Phase 0: fixed 5 duplicate/dead keys in `ICON_ANIMATIONS` (`cloud-arrow-down/up` now download/upload, `document-magnifying-glass` zooms). Phase 1: 34 new recipes + ~90 icons remapped — `pulse-scale` dropped from 75 icons to 1 (`github`). Also fixed `applyPathClasses` class accumulation on regen (menu had 6× duplicate classes). `pnpm run check` green (3648 tests + publint). ~93 icon files regenerated. Left to do: manual visual pass in the dev app (both variants × reduced-motion), then merge.
- **2026-07-27** — Repository presentation + deployment consolidation. README rewritten as a visual landing page (badges, comparison table, API reference, pipeline diagram) with real screenshots in `docs/assets/`; same treatment for the npm README. GitHub About now has a description and 19 topics. Added root `LICENSE`, `SECURITY.md` and issue templates. **CI/CD collapsed into one workflow** (`.github/workflows/ci.yml`, replacing `ci-cd.yml`) that builds the site once and deploys that same artifact to Cloudflare Pages — preview on PRs, production on `main`; manual deploy scripts removed. Fixed demo-site visual bugs found while screenshotting (hardcoded `v0.1`, invisible selected states in the size picker and animate toggle, overlapping icon-card actions, dead "Status" category filter).
- **2026-07-06** — Added AI-agent documentation pack: `AGENTS.md`, `docs/ai/*` (context, state, architecture, conventions, workflows), `docs/specs/` (SDD process + template).
- **~2026-06/07** — Animation system iterations (`feat: update animations` ×2): recipe catalog refinements in `scripts/animations.mjs`, regenerated icons.
- **2026-05-29 (v0.2.0)** — Filled variant for all Heroicons-based icons; per-icon `lumen-icons/<name>` subpath exports; pure-CSS animations replacing the runtime animation dependency; `radius` accepts `number | string`; catalog radius presets; custom-icon preservation pipeline; APF-compliant build passing publint.
- **2026-05-22 (v0.1.0)** — Initial 31 icons, unit + e2e test suites, demo site.

## In progress / known gaps

- **Spec in review: [docs/specs/2026-08-17-semantic-animation-remap.md](../specs/2026-08-17-semantic-animation-remap.md)** — semantic animation remap (branch `feature/semantic-animations`). Phase 0 + Phase 1 **implemented and `pnpm run check` green**; spec stays `in-progress` only for the manual visual pass in the dev app (representative icons × both variants × reduced-motion). Phases 2–3 (`file-appear`, `typewriter`, `rotate-once`, `spin` groups) get their own specs.
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
