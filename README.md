# lumen-icons

Single repository for:

- Angular app (demo + official website)
- Publishable icon library package (`lumen-icons`)
- Optional per-icon CSS animations (no external animation dependency)
- Interactive catalog demo with search aliases, categories, size, stroke, animation, variant, color, background, padding and radius controls

This is not a monorepo with multiple apps/packages managed by separate tooling; it is one repository with a clear internal package boundary for the icon library.

## Base Structure

- `src/`: Angular application shell (demo and docs website)
- `packages/icons/`: npm package source and build config
- `tests/e2e/`: Playwright tests
- `docs/architecture-plan.md`: project structure and roadmap

## Tooling

- Angular + Analog + Vite
- Tailwind CSS (app only)
- Vitest + Testing Library (unit)
- Playwright (e2e)
- ESLint (TypeScript + Angular templates)
- TypeScript strict mode
- ng-packagr (Angular Package Format library build)

## Commands

- `pnpm run dev`: run the Angular app locally
- `pnpm run build:app`: build app
- `pnpm run build:lib`: build `lumen-icons`
- `pnpm run sync:icons`: regenerate icon exports and the website catalog from icon source files
- `pnpm run generate:icons`: regenerate icons from Heroicons SVG source and update the catalog
- `pnpm run check:package`: build and validate the publishable package
- `pnpm run build`: build lib + app
- `pnpm run lint`: lint all files
- `pnpm run typecheck`: typecheck app + lib
- `pnpm run test:unit`: run unit tests
- `pnpm run test:e2e`: run e2e tests

## Icon Conventions

- Prefix for selectors: `lmn`
- Selector examples: `lmn-check`, `lmn-alert-circle`
- One icon component per file inside `packages/icons/src/icons/`
- Named exports through package root and per-icon subpath exports
- Icons must render visibly when `animate` is false; animation styles should be opt-in only
- Icons default to outline/currentColor, with optional filled and framed background modes for app UI
