# Lumen Icons Base Plan

## Goal

Create a single-repo foundation with:

- Angular app for demo + official website
- Publishable icon library package with `lmn-*` selectors
- Strong quality gates (lint, typecheck, unit tests, e2e)

## Repository Shape

- `src/`: Angular app (demo + docs site)
- `packages/lumen-icons/`: publishable library package
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
  - library: `packages/lumen-icons/tsconfig.lib.json`

## Build Strategy

- App build: Vite/Analog (`pnpm run build:app`)
- Library build: tsup (`pnpm run build:lib`)
- Full build: `pnpm run build`

## Icon Packaging Strategy

- Main export: `@lumen-icons/core`
- Barrel export: `@lumen-icons/core/icons`
- Per-icon export: `@lumen-icons/core/icons/<name>`

## Selector Convention

- Prefix: `lmn`
- Example selectors: `lmn-check`, `lmn-alert-circle`, `lmn-loader`

## Next Implementation Milestones

1. Add icon base component contract (host bindings, size/stroke inputs, a11y defaults).
2. Add first 10 icons and re-export barrel files.
3. Add generator script to transform source SVG into Angular components.
4. Add docs page with live previews + copy selector/import snippets.
5. Add release flow (changesets or semantic-release) for npm publishing.
