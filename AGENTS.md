# AGENTS.md — Start here

Instructions for AI coding agents working on **lumen-icons**. Read this file first, then follow the reading order below. `CLAUDE.md` contains the same rules in longer form; if the two ever disagree, **the code is the source of truth** — fix the docs.

## Reading order (before any task)

1. [docs/ai/CONTEXT.md](docs/ai/CONTEXT.md) — what this project is and why it exists.
2. [docs/ai/STATE.md](docs/ai/STATE.md) — current status, recent work, next steps.
3. [docs/ai/ARCHITECTURE.md](docs/ai/ARCHITECTURE.md) — how the pieces fit; **generated vs hand-written files**.
4. [docs/ai/CONVENTIONS.md](docs/ai/CONVENTIONS.md) — hard rules (Angular 21 signals, naming, a11y, testing).
5. [docs/ai/WORKFLOWS.md](docs/ai/WORKFLOWS.md) — step-by-step playbooks for common tasks. **Find your task here before improvising.**
6. For non-trivial tasks: write a spec first — see [docs/specs/README.md](docs/specs/README.md).

## The 10 rules you must never break

1. **Never hand-edit generated files.** Icon components in `packages/icons/src/icons/*.ts`, `packages/icons/src/icons/index.ts`, and `src/app/data/icon-catalog.ts` are produced by scripts. Change the generator (`scripts/generate-icons.mjs`, `scripts/animations.mjs`) and regenerate instead.
2. **Angular 21 signals only**: `input()`, `output()`, `model()`, `computed()`, `signal()`, `inject()`. Never `@Input()`, `@Output()`, `EventEmitter`, constructor injection, or `NgModule`.
3. **Every component is standalone with `ChangeDetectionStrategy.OnPush`.** No exceptions.
4. **The library (`packages/icons/`) has zero styling frameworks and zero runtime animation dependencies.** No Tailwind, no JS animation libs. Animations are pure CSS `@keyframes`. Tailwind is app-only (`src/`).
5. **Accessibility is non-negotiable**: every icon renders with either `aria-hidden="true"` (no `ariaLabel`) or `role="img"` + `aria-label` (with `ariaLabel`). Every animation respects `prefers-reduced-motion`.
6. **Tree-shaking must survive your change**: `sideEffects: false` stays in `packages/icons/package.json`; no module-level side effects; every symbol individually importable.
7. **Selectors**: components `lmn-<kebab>` (library) or `app-*` (demo app); class names `Lmn<Pascal>Icon`.
8. **Only `loader` may animate infinitely.** All other icon animations run once with `both` fill mode and define `0%` and `100%` keyframes.
9. **Quality gate before claiming done**: `pnpm run check` (lint + typecheck + unit tests + package build + publint) must pass.
10. **Conventional commits**: `feat(icons): add lmn-arrow-right`, `fix(check): correct viewBox`. Breaking changes to the icon API (renamed inputs/selectors, changed defaults) require a major version — flag them, don't sneak them in.

## Quick command reference

```bash
pnpm run dev            # demo app at http://localhost:5173
pnpm run check          # THE quality gate — run before every PR
pnpm run generate:icons # regenerate icon components from source SVGs + animation recipes
pnpm run sync:icons     # re-sync barrel index + website catalog after adding/removing icons
pnpm vitest run packages/icons/src/icons/check.spec.ts   # single spec
```

## End-of-session duty

If you changed anything meaningful, update [docs/ai/STATE.md](docs/ai/STATE.md) (the "Recent changes" and "In progress" sections). The next agent starts from that file.
