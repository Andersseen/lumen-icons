# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Demo site

#### Fixed

- Hero badge text was invisible: a section-scoped `.dark` could not re-resolve
  Tailwind theme tokens, because `@theme` declares `--color-*` only at `:root`.
  The bridge now uses `@theme inline`, so any subtree may be `.dark`.
- `--accent` was defined as a second brand purple, but volt-ui paints it as the
  hover surface in 44 places, making every hover state read as "selected". It is
  now the subtle surface the design system expects.
- `/icons` exposed two `<main>` landmarks and a duplicate `icon-search` id.
- Quickstart code snippets were clipped mid-token on the home page.
- `provideMovement` ignored `prefers-reduced-motion`; app-level motion now
  switches off with the OS setting (library icons already honoured it via CSS).
- The GitHub link is reachable from the mobile header.

#### Changed

- The `/icons` desktop sidebar and mobile control block — two near-identical
  templates, both permanently in the DOM — are one `app-icon-controls`, shown in
  a sticky rail on desktop and a `volt-drawer` on mobile. Catalog state moved to
  an `IconCatalogStore` with a single `CATALOG_DEFAULTS`.
- Hand-rolled `role="radio"` grids are now an `app-option-group` atom over
  `volt-toggle-group`, which brings roving-tabindex keyboard support.
- Icon cards are built on `volt-card` with the three copy actions behind one
  `volt-dropdown-menu`, a `volt-tooltip` for truncated names, and one page-level
  toast instead of a pill per card.
- The catalog grid renders in `@defer (on viewport)` chunks with `volt-skeleton`
  placeholders: 6 703 → 2 502 DOM nodes, 14 065 px → 6 781 px.
- `/docs` has a sticky TOC rail and tabs the reference tables, so the 362-row
  icon list is no longer appended to every visit: 25 998 px → 3 816 px.
- Scroll-reveal, stagger and parallax motion via `angular-movement` on the home,
  catalog and docs pages.


## [Unreleased]

### Added

- **Rest-state corrections**: tool and key motions now turn briefly and return to their original orientation; bolt thickness pulses on its path and settles at normal width; trash isolates its top rim while the discard artifact is transient.
- **Composed semantic motion**: chart bars now grow independently; stacks assemble layer by layer; X symbols unfold from pause-like strokes; bolts pulse their width; rockets launch then return as a fade; and Wi‑Fi/RSS emit two staggered pulses.
- **Mechanism-specific motion**: batteries now assemble a terminal, case and charge level; balance scales settle around their pivot; scissors snip; paper clips flex into position; and puzzle pieces seat with a controlled compression.
- **Focused draw animations for document and add icons**: `document*` icons now trace their outlines rather than appearing as a generic fade, and `plus*` icons assemble their circle (where present), vertical stroke, then horizontal stroke instead of rotating.
- **Per-part animation machinery**: recipes can now declare `splitPaths` (the generator splits compound `<path>` d's into one element per subpath, converting relative `m` starts to absolute) and variant-scoped CSS markers `.lmn-animate--outline` / `.lmn-animate--filled`, so animations can move *parts* of an icon (slider pins, box lids, a lone arrow) without touching SVG sources.
- **Directed animations for the first 15 catalog icons** (spec addendum 2026-08-18): `academic-cap` tosses and fades back; `adjustments-*` move only their pins; the three `archive-box` variants open the lid with a distinct action each (peek / arrow drops in / X pops out); plain arrows draw themselves drifting toward their direction; download arrows draw only the arrow, never the container.
- **Directed animations for the next 15 catalog icons**: long/right/left/up/down arrows now draw from tail to tip; circle and rectangle arrow variants draw only the arrow before resolving the head; `arrow-path` retains its one-shot rotation, while `arrow-path-rounded-square` draws its two return arrows in parallel.
- **Per-icon arrow refinements**: circle arrows establish their ring before the arrow arrives; rectangle variants keep a fixed frame while the arrow crosses it; square variants receive the arrow; and the tray gives a small impact response. Filled SVGs use split parts whenever their geometry permits it.
- **Turn-arrow path animation**: the eight `arrow-turn-*` icons now trace their route through the corner and resolve their arrowhead instead of using the generic 360° spin fallback.
- **Navigation motion refinements**: `arrow-uturn-*` now traces its U route instead of spinning; `bars-*` keeps its line identity with staggered reveals; and `bars-arrow-*` reveals its list before the direction arrow arrives.
- **Sticky desktop icon controls**: the `/icons` sidebar stays below the app header while the catalog grid scrolls; the mobile controls are unchanged.
- **34 new semantic animation recipes** in `scripts/animations.mjs` (e.g. `blink`, `chevron-cascade`, `trend-draw`, `door-enter`/`door-exit`, `stack-rise`, `cell-pop`, `screen-on`, `bubble-pop`, `cap-toss-fade`, `tag-swing`, `receipt-print`, `grin`, `crawl`), all pure CSS, single-run with `both` fill and reduced-motion safe. See `docs/specs/2026-08-17-semantic-animation-remap.md`.
- **Root `LICENSE`** (MIT) so GitHub and npm both detect the license correctly.

### Changed

- **Official homepage refresh**: rebuilt the public landing page into a responsive product experience with a live Lumen icon canvas, clear library metrics, technical capability cards and a three-step quickstart. The page uses Lumen icons rather than stock image assets and has dedicated Playwright coverage for its main browse flow.

- **Official app platform refresh**: upgraded VoltUI to 1.0.1 and Angular Movement to 0.8.0; the demo now uses Angular's zoneless change detection. Its controls use VoltUI's native ARIA labels after the upgrade.
- **Self-contained icon generation**: the generator now takes outline and filled geometry from committed Lumen components instead of requiring the Heroicons package; direct `heroicons` and `zone.js` dependencies were removed.

- **Verified rest-state motion and sidebar scrolling**: `bold` now pulses its real configured outline stroke width instead of a generic scale; `rocket-launch` anticipates and departs diagonally up-right before returning to its exact default state; the sticky desktop controls now scroll within their own viewport region. Playwright covers the bold weight peak, rocket rest state, and independent sidebar scrolling.

- **~90 icons remapped to semantic animations** (spec `2026-08-17-semantic-animation-remap`): the generic `pulse-scale` went from 75 icons to just 1 (`github`, brand logo). Eyes blink, double chevrons cascade, trending arrows draw themselves, login/logout icons enter/exit, stacks rise, grids pop cell by cell, screens power on, chat bubbles pop from their tail. No SVG or public API changes.

### Fixed

- **Narrow catalog overflow** — `/icons` now starts with one column below 420 px, its flex/grid children can shrink, and the compact header hides non-essential chrome. All card copy actions remain reachable at 320 px; a Playwright regression test covers it.
- **Broken split-path icon geometry** — implicit relative line segments following a converted `m` command now remain relative, preventing malformed arrow strokes in the new per-part archive/download animations.
- **Arrow draw direction and pacing** — the shaft now draws from its tail to the tip before the arrowhead resolves, using a longer eased motion instead of starting at the point.
- **Shadowed duplicate keys in `ICON_ANIMATIONS`**: `cloud-arrow-down`/`cloud-arrow-up` now animate as download/upload (they silently floated); `document-magnifying-glass` zooms instead of fading in. Dead duplicate entries (`document-duplicate`, `finger-print`, nonexistent `ellipsis`) removed.
- **Animation class accumulation on regeneration** — `applyPathClasses` now strips previously applied `lmn-path-N` classes before re-adding them, so custom icons no longer pile up duplicate classes on every `--overwrite` regen (e.g. `menu` had six copies of each).
- **Root `LICENSE`** (MIT) so GitHub and npm both detect the license correctly.
- **`SECURITY.md`** and structured issue templates (bug report, icon request, feature request).
- **Screenshots** of the demo site in `docs/assets/`, used by the rewritten README.

### Changed

- **Heroicons SVG sources are now vendored** in `packages/icons/svg/` (v2.2.0, MIT) instead of being read from `node_modules/heroicons` at generation time. The `heroicons` npm dependency is gone — the generator runs fully offline and upstream upgrades can no longer silently mutate the icon set.
- **The demo app is now explicitly zoneless** (`provideZonelessChangeDetection`) and so is the unit-test environment — the `zone.js` dependency was removed entirely.
- **README rewritten** as a visual project landing page: badges, comparison table, quick start, full icon API, real category counts, pipeline diagram and docs index. The npm-facing `packages/icons/README.md` got the same treatment.
- **CI/CD consolidated into a single pipeline** (`.github/workflows/ci.yml`, replacing `ci-cd.yml`). The site is now built **once** and the same artifact is what E2E runs against and what gets deployed — down from 6 dependency installs and 3 builds to 3 installs and 1 build. Cloudflare Pages is the only deployment path; the manual `deploy:preview` / `deploy:prod` scripts were removed so no deploy can bypass the quality gates.
- **Demo site version is no longer hardcoded** in two places — the header badge and hero badge both read `LIBRARY_VERSION` from `src/app/data/site-meta.ts` (they were still showing `v0.1` at 0.2.0).

### Fixed

- **Invisible selected states** in the catalog: the size picker rendered white-on-white when selected in light mode, and the animate toggle rendered purple-on-purple. Both now follow the repo's `border-primary bg-primary text-primary-foreground` convention.
- **Overlapping action buttons** on icon cards — the `Import` / `HTML` / `Code` row now shrinks correctly instead of spilling out of its grid cells.
- **Low-contrast animation hint** in the sidebar (purple text on a purple background in dark mode).
- **Dead "Status" category filter** removed — no icon was ever assigned to it, so the chip always showed "no icons". Removed from the generator too, so it does not come back on regeneration.
- **Flaky docs icon-table spec** — rendering all 362 icons exceeded the 5s default timeout on a cold Vite cache (i.e. every CI run).

## [0.2.0] - 2026-05-29

### Added

- **Filled variant support** for every Heroicons-based icon. Each component now embeds the official `heroicons/24/solid` SVG and renders it when `variant="filled"` is set.
- **Catalog radius presets** — quick-select Circle (`50%`), Rounded (`0.5rem`) and Square (`0`) buttons in the icon sidebar and mobile controls.
- **Per-icon re-exports** via `lumen-icons/<name>` subpaths, generated automatically by the build script for full Angular Package Format (APF) compatibility.
- **Custom icon preservation pipeline**: the generator extracts existing SVG paths from current icon components, so the 38 custom icons stay in sync without duplicate source files.

### Changed

- **Pure-CSS icon animations**: removed the runtime animation dependency from every icon component. Each icon now ships its own scoped `@keyframes` and `.lmn-animate` class, with `prefers-reduced-motion` support baked in.
- **Animation visibility fix**: animations are applied through a scoped CSS class instead of an inline `style.animation` binding, so Angular’s ViewEncapsulation correctly resolves the keyframe reference.
- **`radius` input now accepts `number | string`**, enabling both pixel values and CSS units such as `50%` or `0.5rem`.
- **Catalog sidebar layout**: the Padding and Radius sliders are now always visible instead of being hidden when `background="none"`.

### Fixed

- **Sidebar unit tests** updated to handle the additional radius slider (`getAllByRole("slider")`).
- **Slider visibility in the demo app** fixed by adding a Tailwind `@source` directive for `@voltui/components`, ensuring the `h-2` utility used by `volt-slider` is generated.
- **Package build** now produces APF-compliant output and passes `publint` without warnings.

## [0.1.0] - 2026-05-22

### Added

- **31 icons** with semantic, opt-in animations via `angular-movement` (`MoveVariantsDirective`) and CSS `@keyframes`.
- **stroke-draw animations** for icons with narrative paths: `bold`, `checkbox`, `copy`, `external-link`, `home`, `mail`, `paperclip`, `radio`, `search`.
- **transform animations** for icons with kinetic meaning: `avatar` (head greeting), `smile` (smile + wink), `heart` (heartbeat), `sparkles` (sequential pop), `sun` (ray burst), `x` (cross-cut).
- **Unit tests** for all 31 icons covering render, accessibility (aria-hidden / aria-label), and `animate` input.
- **E2E tests** with Playwright: smoke, navigation, icon gallery search/copy, theme toggle, docs snippets.
- **Husky + lint-staged + commitlint** pre-commit hooks enforcing ESLint auto-fix and Conventional Commits.
- **CI/CD** workflow with lint, typecheck, build-lib, check-package (publint), unit tests, e2e tests, merge gate, and deploy to Cloudflare Pages.
- **Dependabot** configuration for weekly grouped dependency updates.
- `CONTRIBUTING.md`, `CODEOWNERS`, and PR template.

### Changed

- Refactored all icon animations from imperative `AnimationEngine` to declarative `MoveVariantsDirective` + CSS `@keyframes`.
- Removed redundant `animation-utils.ts` and all `viewChild` / `effect` boilerplate from icon components.
- Added explicit `standalone: true` to all 31 icon components.
- Updated `tsup.config.ts` to eliminate duplicate entry points (removed `src/*.ts` re-exports).
- Updated `package.json#exports` catch-all (`./*`) to resolve directly to `./dist/icons/*`.
- Strengthened ESLint config with `unused-imports`, `consistent-type-imports`, `@angular-eslint/prefer-standalone`, and `no-console` in library code.

### Fixed

- Icon visibility in non-animated state: removed `stroke-dasharray` / `stroke-dashoffset` from default styles; applied only inside `.is-animated` selectors so icons are visible by default.
- Fixed `moveSpring` string literal binding to property binding (`[moveSpring]="..."`) across all `MoveTargetDirective` icons.
- E2E test selectors in `theme.spec.ts` and `docs.spec.ts` replaced CSS selectors with semantic Playwright queries (`getByLabel`, `getByRole`).
