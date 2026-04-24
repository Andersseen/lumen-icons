# lumen-icons

Single repository for:

- Angular app (demo + official website)
- Publishable icon library package (`@lumen-icons/core`)

This is not a monorepo with multiple apps/packages managed by separate tooling; it is one repository with a clear internal package boundary for the icon library.

## Base Structure

- `src/`: Angular application shell (demo and docs website)
- `packages/lumen-icons/`: npm package source and build config
- `tests/e2e/`: Playwright tests
- `docs/architecture-plan.md`: project structure and roadmap

## Tooling

- Angular + Analog + Vite
- Tailwind CSS (app only)
- Vitest + Testing Library (unit)
- Playwright (e2e)
- ESLint (TypeScript + Angular templates)
- TypeScript strict mode
- tsup (library bundle + declaration output)

## Commands

- `pnpm run dev`: run the Angular app locally
- `pnpm run build:app`: build app
- `pnpm run build:lib`: build `@lumen-icons/core`
- `pnpm run build`: build lib + app
- `pnpm run lint`: lint all files
- `pnpm run typecheck`: typecheck app + lib
- `pnpm run test:unit`: run unit tests
- `pnpm run test:e2e`: run e2e tests

## Icon Conventions (Planned)

- Prefix for selectors: `lmn`
- Selector examples: `lmn-check`, `lmn-alert-circle`
- One icon component per file inside `packages/lumen-icons/src/icons/`
- Named exports through package root and per-icon subpath exports
