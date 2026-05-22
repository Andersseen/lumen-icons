# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **10 new basic icons**: `bell`, `calendar`, `camera`, `clock`, `download`, `edit`, `lock`, `trash`, `upload`, `user` — clean SVG, no animations, ready for production use.
- **Smooth reset transitions** on all CSS-animated icons: `transition` added to animated elements so deactivating `animate()` returns to base state gracefully instead of snapping.

### Changed

- **Diversified animation personalities**: replaced generic `cubic-bezier(0.34, 1.56, 0.64, 1)` bounce on ~15 icons with unique spring configs or custom easings:
  - `badge`, `bold`, `checkbox`, `external-link`, `plus` → spring `{ stiffness: 280-340, damping: 12-15 }`
  - `heart` → soft spring `{ stiffness: 180, damping: 8 }`
  - `sparkles` → bouncy spring `{ stiffness: 260, damping: 11 }`
  - `moon` → eased rotate + scale (unchanged easing, no bounce)
  - `alert-circle` → snappy spring `{ stiffness: 350, damping: 16 }`
  - `arrow-left`, `arrow-right` → spring `{ stiffness: 300, damping: 15 }`
  - `sun` → slow spring `{ stiffness: 200, damping: 10 }`
  - `home`, `menu`, `search` → varied spring configs
  - `chevron-down`, `chevron-right`, `github`, `info`, `italic`, `settings`, `star` → unique spring stiffness/damping combos
- **Cleaned inline styles**: moved `style="transform-origin: center; transform-box: fill-box;"` from SVG templates into `styles: []` arrays on all icon components.

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

- Icon visibility in non-animated state: removed `stroke-dasharray` / `stroke-dashoffset` from default styles; applied only inside `.is-animated` selectors.
- E2E test selectors in `theme.spec.ts` and `docs.spec.ts` replaced CSS selectors with semantic Playwright queries (`getByLabel`, `getByRole`).
