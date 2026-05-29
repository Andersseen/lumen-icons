# Lumen Icons Base Plan

## Goal

Create a single-repo foundation with:

- Angular app for demo + official website
- Publishable icon library package with `lmn-*` selectors
- Optional semantic CSS animation per icon (no external animation dependency)
- Strong quality gates (lint, typecheck, unit tests, e2e)

## Repository Shape

- `src/`: Angular app (demo + docs site)
- `packages/icons/`: publishable library package
  - `src/icons/`: one component per icon (`lmn-check`, etc.)
  - `src/types/`: shared library types
  - `src/index.ts`: public API surface
  - `package.json`: npm metadata + exports

## Quality and Tooling

- Unit tests: Vitest + Testing Library
- E2E: Playwright
- Lint: ESLint + angular-eslint + typescript-eslint
- Type checks:
  - app: `tsconfig.app.json`
  - library: `packages/icons/tsconfig.lib.json`

## Build Strategy

- App build: Vite/Analog (`pnpm run build:app`)
- Library build: tsup (`pnpm run build:lib`)
- Full build: `pnpm run build`

## Icon Packaging Strategy

- Main export: `@lumen/icons`
- Barrel export: `@lumen/icons/icons`
- Per-icon export: `@lumen/icons/<name>`
- `pnpm run sync:icons` keeps the barrel exports and website catalog aligned with source files

## Selector Convention

- Prefix: `lmn`
- Example selectors: `lmn-check`, `lmn-alert-circle`, `lmn-loader`

## Animation Strategy

- Each icon defines its own `@keyframes` inside the component's `styles` array.
- The `animate` input toggles the animation via `[class.lmn-animate]` and `[style.animation]`.
- No peer dependency on animation libraries — animations are pure CSS.
- The demo app may use `angular-movement` for layout/UI animations, but the icon library itself does not depend on it.

## Current Quality Gates

1. `pnpm run lint`
2. `pnpm run typecheck`
3. `pnpm run test:unit`
4. `pnpm run check:package`
5. `pnpm run test:e2e`

## Next Implementation Milestones

1. Validate the published package inside a fresh external Angular app.
2. Decide whether to move the library build to Angular Package Format tooling before public npm release.
3. Add a source SVG to Angular component generator for creating new icons, not only syncing existing metadata.
4. Add release flow with Changesets or semantic-release for npm publishing.
