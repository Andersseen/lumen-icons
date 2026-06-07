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
- Library build: ng-packagr in Angular Package Format (APF) (`pnpm run build:lib`)
  - Produces FESM2022 bundles, Ivy-compiled metadata, and unified type declarations
  - Post-build script generates per-icon re-exports so `lumen-icons/<name>` continues to work
- Full build: `pnpm run build`

## Icon Packaging Strategy

- Main export: `lumen-icons`
- Barrel export: `lumen-icons/icons`
- Per-icon export: `lumen-icons/<name>`
- `pnpm run sync:icons` keeps the barrel exports and website catalog aligned with source files
- `src/app/data/icon-metadata.ts` enriches the generated catalog with categories and aliases for website search/filtering

## Selector Convention

- Prefix: `lmn`
- Example selectors: `lmn-check`, `lmn-alert-circle`, `lmn-loader`

## Animation Strategy

- Each icon defines its own `@keyframes` inside the component's `styles` array.
- The `animate` input toggles the animation via `[class.lmn-animate]` and `[style.animation]`.
- No peer dependency on animation libraries — animations are pure CSS.
- The demo app may use `angular-movement` for layout/UI animations, but the icon library itself does not depend on it.

## Visual Configuration Strategy

- Icons default to outline mode and inherit `currentColor`, matching common Angular/Web usage.
- Shared inputs live in `LmnIconBase`: `color`, `variant`, `background`, `backgroundColor`, `padding`, and `radius`.
- `variant="filled"` is opt-in and applies currentColor fill through component styles.
- `variant="filled"` uses a soft currentColor fill so outline detail remains readable.
- `background="soft"` lets icon tone and background tone differ.
- `background="solid"` uses the matching theme foreground automatically for contrast.

## Current Quality Gates

1. `pnpm run lint`
2. `pnpm run typecheck`
3. `pnpm run test:unit`
4. `pnpm run check:package`
5. `pnpm run test:e2e`

## Website Catalog UX

- Search matches icon name, selector, category label, category id, and aliases.
- Category filters use the metadata map and are independent of the generated icon source list.
- The catalog demo exposes preview controls for size, stroke width, animation, variant, icon color, background, padding, and radius.
- Each icon card can copy the import, selector snippet, or a complete standalone Angular example.
- Copy feedback is visible and announced through an `aria-live` region.
- Catalog card interactions use CSS transitions so the icon page does not need the app animation helper.

## Next Implementation Milestones

1. Validate the published package inside a fresh external Angular app.
2. Add a source SVG to Angular component generator for creating new icons, not only syncing existing metadata.
3. Add release flow with Changesets or semantic-release for npm publishing.
4. Add visual regression checks for the icon grid in light and dark themes.
