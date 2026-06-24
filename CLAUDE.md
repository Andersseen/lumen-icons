# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project vision

An open-source Angular icon library inspired by projects like Lucide and Radix Icons but built specifically for Angular 21+. The library (`lumen-icons`) ships individual icon components with the `lmn-*` selector prefix. Icons are:

- **Tree-shakable by default** — each icon is its own entry point (`lumen-icons/icons/check`).
- **Accessible by default** — correct ARIA defaults, configurable `ariaLabel`.
- **Zero framework styling** — no Tailwind in the library; consumers control appearance.
- **Optionally animated** — animations via `angular-movement` (`MoveVariantsDirective`) + CSS `@keyframes` (opt-in per icon use).
- **Installable as a package** OR copy-pasteable as single files into any Angular project.

The companion `src/` application is the official demo + docs site, built with AnalogJS and styled with Tailwind CSS. The demo uses `@voltui/components` for its own UI chrome so development stays fast.

---

## Repository shape

```
lumen-icons/
├── packages/icons/          ← publishable library: lumen-icons
│   ├── src/
│   │   ├── index.ts         ← public API surface (re-exports types + icons)
│   │   ├── icons/           ← one .ts file per icon, barelled by index.ts
│   │   ├── lib/
│   │   │   └── icon-base.ts ← shared base class + host bindings
│   │   └── types/
│   │       └── icon.types.ts
│   ├── ng-package.json      ← ng-packagr APF build config
│   ├── tsconfig.lib.json
│   └── package.json
├── src/                     ← demo + docs app (AnalogJS)
│   └── app/
│       ├── app.ts           ← root component (header/footer shell)
│       ├── app.config.ts
│       └── pages/           ← file-system routes (AnalogJS convention)
├── tests/
│   └── e2e/                 ← Playwright tests
├── scripts/                 ← build/sync/generate helpers
│   ├── build-lib.mjs
│   ├── generate-icons.mjs
│   └── sync-icons.mjs
├── vite.config.ts           ← app build (AnalogJS + Tailwind)
├── vitest.config.ts         ← unit tests (jsdom)
├── vitest.setup.ts          ← @analogjs/vitest-angular/setup-zone + jest-dom
├── playwright.config.ts
└── package.json             ← single workspace (not a monorepo tool)
```

This is **not** a Nx/Turborepo monorepo — one `package.json`, one `node_modules`, two distinct TypeScript configs.

---

## Commands

```bash
# Development
pnpm run dev                 # start the demo app (http://localhost:5173)
pnpm run preview             # preview production build locally

# Building
pnpm run build               # build lib then app (full pipeline)
pnpm run build:lib           # bundle lumen-icons via ng-packagr → packages/icons/dist/
pnpm run build:app           # build AnalogJS app → dist/

# Quality gates
pnpm run lint                # ESLint (TS files + Angular inline templates)
pnpm run typecheck           # typecheck both tsconfig.app.json + packages/icons/tsconfig.lib.json
pnpm run check               # lint + typecheck + test:unit (run before every PR)

# Testing
pnpm run test:unit           # Vitest run (one-shot)
pnpm run test:unit:watch     # Vitest watch mode (development)
pnpm run test:e2e            # Playwright (auto-starts dev server on port 4173)
pnpm run test:e2e:ui         # Playwright with interactive UI

# Run a single spec file
pnpm vitest run packages/icons/src/icons/check.spec.ts
```

---

## Architecture

### Library (`packages/icons/`)

**Entry points** (mirrored in both `tsup.config.ts` and `package.json#exports`):

| Import path | What it exposes |
|---|---|
| `lumen-icons` | types + all icons (use sparingly — prefers tree-shaking) |
| `lumen-icons/icons` | barrel of all icon components |
| `lumen-icons/icons/check` | single icon (preferred import) |

**Path alias** — `tsconfig.json` maps `lumen-icons → packages/icons/src/index.ts` so the app imports the same source during development without building the lib first.

**Building** — `ng-packagr` produces Angular Package Format (APF) output (FESM2022 bundles, Ivy metadata, and unified `.d.ts` declarations). A post-build step in `scripts/build-lib.mjs` generates per-icon re-exports and the final `package.json#exports` map.

### App (`src/`)

- **AnalogJS** provides file-based routing: files in `src/app/pages/` become routes. Default exports are the page components. Use `[param].page.ts` for dynamic segments.
- **SSR is disabled** (`ssr: false, static: true`) — the site is a static SPA with optional prerendering.
- **Tailwind CSS v4** — app only; never import it from the library.
- **`@voltui/components`** — use volt-ui components for all demo-app UI chrome (buttons, cards, tabs, badges, tooltips, etc.). See the volt-ui section below.

### Testing

- **Unit tests** (`*.spec.ts` in `src/` or `packages/`): Vitest + jsdom + `@testing-library/angular`. Zone.js is bootstrapped via `vitest.setup.ts`.
- **E2E tests** (`tests/e2e/`): Playwright against Chromium only. The dev server starts automatically on port 4173.

---

## Icon component conventions

### File naming and location

```
packages/icons/src/icons/
  check.ts          ← component + spec live here (or check.spec.ts alongside)
  alert-circle.ts
  arrow-right.ts
  index.ts          ← re-export every icon from this file
```

### Component template

Each icon is a standalone Angular component wrapping an inline SVG:

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-check',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-check { 0% { scale: 0.5; opacity: 0; } 60% { scale: 1.2; } 100% { scale: 1; opacity: 1; } }

    .lmn-animate {
      animation: lmn-check 420ms ease both;
    }

    @media (prefers-reduced-motion: reduce) {
      .lmn-animate,
      .lmn-animate-el {
        animation: none !important;
      }
    }
  `],
  template: `
    @if (variant() === 'filled') {
      <svg
        [attr.width]="size()"
        [attr.height]="size()"
        [class.lmn-animate]="animate()"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <!-- filled path(s) here -->
      </svg>
    } @else {
      <svg
        [attr.width]="size()"
        [attr.height]="size()"
        [attr.stroke-width]="strokeWidth()"
        [class.lmn-animate]="animate()"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <!-- outline path(s) here -->
      </svg>
    }
  `,
})
export class LmnCheckIcon extends LmnIconBase {}
```

**Rules:**
- Class name: `Lmn<PascalName>Icon` (e.g. `LmnAlertCircleIcon`)
- Selector: `lmn-<kebab-name>` (e.g. `lmn-alert-circle`)
- Default `size`: 24. Default `strokeWidth`: 2.
- `ariaLabel` present → `role="img"` + `aria-label` on host, SVG gets `aria-hidden="true"`. Absent → host gets `aria-hidden="true"`.
- SVGs use `stroke="currentColor"` — color is always inherited from CSS.
- No Tailwind, no inline styles beyond `display`, dimensions, and `transform-origin` / `transform-box` when animating.
- `sideEffects: false` is declared in `packages/icons/package.json` — do not add module-level side effects.

### Optional animations

Animations are opt-in via an `animate` input. When `false` (the default), no animation code runs.

```typescript
readonly animate = input<boolean>(false);
```

Icon animations are pure CSS and driven by a semantic recipe catalog in `scripts/animations.mjs`. Each icon is mapped to a recipe (e.g. `draw-scale`, `slide-right`, `beat`, `spin`) via `ICON_ANIMATIONS` and `FALLBACK_ANIMATIONS`. The generator (`scripts/generate-icons.mjs`) applies the recipe to each icon, producing per-icon scoped `@keyframes`, optional `pathLength="1"` for stroke-drawing effects, and optional per-path classes (`.lmn-path-1`, `.lmn-path-2`, etc.) for multi-part animations.

When `animate` is `true`, the host and the SVG receive the `.lmn-animate` class and the scoped animation runs. Respect `prefers-reduced-motion` via the shared media-query block shown in the template above. Do not introduce runtime animation dependencies in the library.

**Adding or changing an animation recipe:**
1. Open `scripts/animations.mjs` and add a builder to `RECIPES` if it does not exist.
2. Map icon names to the recipe in `ICON_ANIMATIONS` (explicit) or `FALLBACK_ANIMATIONS` (pattern-based fallback).
3. Regenerate all icons with `pnpm exec node scripts/generate-icons.mjs --overwrite`.
4. Run `pnpm run check` to verify lint, typecheck, tests, and package output.

**Rules for recipes:**
- Only `loader.ts` may use `infinite` animation; all other icons must run once (`both` fill mode).
- Recipes must define both `0%` and `100%` keyframe blocks so the icon ends at rest state.
- Keep recipes CSS-only; no JavaScript animation libraries.

### Exporting a new icon

1. Add `packages/icons/src/icons/my-icon.ts` with the component.
2. Add a line in `packages/icons/src/icons/index.ts`:
   ```typescript
   export { LmnMyIconIcon } from './my-icon';
   ```
3. Add `packages/icons/src/icons/my-icon.spec.ts` (at minimum a render + accessibility test).
4. Run `pnpm run sync:icons` to regenerate the website catalog and ensure the barrel is consistent.

---

## Angular 21 best practices

- **Always standalone** — never use `NgModule`.
- **OnPush everywhere** — `ChangeDetectionStrategy.OnPush` on every component.
- **Signals API** — use `input()`, `output()`, `model()`, `computed()`, `signal()` from `@angular/core`. Do not use `@Input()`, `@Output()`, `EventEmitter`.
- **`inject()`** — use functional injection (`inject(MyService)`) instead of constructor injection.
- **`toSignal()` / `toObservable()`** — bridge RxJS observables to signals at the boundary; keep the rest of the component signal-only.
- **Host bindings via `host: {}`** — prefer the `host` metadata object over `@HostBinding` / `@HostListener`.
- **No barrel re-exports of entire modules** in the library — every symbol must be individually importable for tree-shaking.

---

## AnalogJS conventions (app only)

- Pages are default exports placed in `src/app/pages/`. The filename becomes the route segment.
- Dynamic route segments: `[id].page.ts` → `/icons/:id`.
- Layouts: `(layout).page.ts` wraps child pages in the same directory.
- API routes (if needed): `src/server/routes/api/` with Nitro/h3 handler format.
- Do not use `RouterModule.forRoot()` — routing is provided by `provideFileRouter()` in `app.config.ts`.

---

## Volt-UI in the demo app

The demo app imports from `@voltui/components`. Add it to `package.json` dependencies and import `@voltui/components/themes.css` in `src/styles.css` to activate theming.

**Available components and their selectors:**

| Category | Selectors |
|---|---|
| Action | `volt-button`, `volt-toggle` |
| Display | `volt-badge`, `volt-avatar`, `volt-card` (+ `volt-card-header`, `volt-card-title`, `volt-card-description`, `volt-card-content`, `volt-card-footer`), `volt-separator`, `volt-progress` |
| Form | `volt-input`, `volt-textarea`, `volt-checkbox`, `volt-radio-group` + `volt-radio-item`, `volt-switch`, `volt-slider`, `volt-select` (+ `volt-select-content`, `volt-select-item`, `volt-select-label`, `volt-select-separator`), `volt-form-field` (+ `volt-form-field-label`, `volt-form-field-hint`, `volt-form-field-error`) |
| Overlay | `volt-tooltip` + `volt-tooltip-content`, `volt-dialog`, `volt-popover`, `volt-dropdown-menu` |
| Navigation | `volt-tabs` (+ `volt-tabs-list`, `volt-tabs-trigger`, `volt-tabs-content`), `volt-breadcrumbs`, `volt-navigation-menu`, `volt-nav-sidebar` |
| Disclosure | `volt-accordion` |

All volt-ui components:
- Are standalone, OnPush, Angular 21 signals-based.
- Use `input()` for props and `model()` for two-way bindings.
- Accept a `variant` input managed by `class-variance-authority`.
- Wrap `ng-primitives` primitives for accessibility.

**Theme selection** — include one theme preset CSS before `@voltui/components/themes.css`:
```css
/* src/styles.css */
@import '@voltui/components/themes/presets/volt-soft.css';
@import '@voltui/components/themes.css';
```

---

## Testing best practices

### Unit tests (Vitest + Testing Library)

- Test file lives next to the source: `check.spec.ts` alongside `check.ts`.
- Use `render()` from `@testing-library/angular` — do not `TestBed.createComponent()` manually.
- Query via role/label/text first (`getByRole`, `getByLabelText`). Avoid `querySelector`.
- Assert accessibility: every rendered icon should have either `aria-hidden="true"` or an accessible name.
- One `describe` block per component, one `it` per behaviour.

```typescript
import { render } from '@testing-library/angular';
import { LmnCheckIcon } from './check';

describe('LmnCheckIcon', () => {
  it('renders with aria-hidden when no ariaLabel provided', async () => {
    const { container } = await render(LmnCheckIcon);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders with aria-label when ariaLabel input is set', async () => {
    const { container } = await render(LmnCheckIcon, {
      componentInputs: { ariaLabel: 'Done' },
    });
    expect(container.firstElementChild).toHaveAttribute('aria-label', 'Done');
  });
});
```

### E2E tests (Playwright)

- Tests live in `tests/e2e/`.
- Use `page.getByRole()` and `page.getByLabel()` — avoid CSS selectors.
- Each test file covers one page or user flow.
- Do not assert implementation details (class names, DOM structure) — assert what a user sees or can interact with.

---

## Open source library maintenance

### Package hygiene

- `sideEffects: false` must remain in `packages/icons/package.json` — it enables tree-shaking in consumer bundlers.
- The `files` field in `packages/icons/package.json` must list only `dist/` — never ship source.
- Keep peer dependencies minimal and exact (`@angular/core` and `@angular/common`).
- Run `publint` before every release: `pnpm publint packages/icons` to catch export map issues.

### Versioning and changelog

- Follow Semantic Versioning: patch for bug fixes, minor for new icons or non-breaking API additions, major for breaking changes to `LmnIconProps` or selector renames.
- Maintain a `CHANGELOG.md` at the repo root (keep-a-changelog format).
- Use conventional commits: `feat(icons): add lmn-arrow-right`, `fix(check): correct viewBox`.

### Breaking-change policy for the icon API

- Adding a new optional input to `LmnIconProps` is non-breaking (minor).
- Renaming or removing an input, or changing a selector, is breaking (major).
- Changing the default `size` or `strokeWidth` is breaking.

### Quality gate before merging

`pnpm run check` (lint + typecheck + unit tests) must pass. E2E tests run in CI.

---

## TypeScript config notes

- Root `tsconfig.json` — shared base. Sets `strict: true`, `noImplicitReturns`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature`. Do not relax these.
- `tsconfig.app.json` — app build. Includes `src/app/pages/**/*.page.ts`.
- `packages/icons/tsconfig.lib.json` — library typecheck and declaration output. Excludes `*.spec.ts`.
- The path alias `"lumen-icons": ["packages/icons/src/index.ts"]` lets the app import the live source during development without an intermediate build step.

---

## ESLint rules to follow

- Component selectors must use prefix `lmn` or `app`, kebab-case (enforced).
- Directive selectors must use prefix `lmn`, camelCase (enforced).
- Angular template accessibility rules are enabled — all interactive elements need labels, all images need alt text or `aria-hidden`.
- Do not disable ESLint rules inline without a comment explaining why.
