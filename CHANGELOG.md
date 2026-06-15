# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
- **Package build** now produces APF-compliant output and passes `publint` without warnings.

## [0.1.0] - 2026-05-22

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
