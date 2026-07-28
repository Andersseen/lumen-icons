# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

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
