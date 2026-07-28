# CONTEXT — What lumen-icons is and why it exists

> Audience: AI agents and new contributors. Read this before touching code.
> This file changes rarely. Day-to-day status lives in [STATE.md](STATE.md).

## One-paragraph summary

**lumen-icons** is an open-source icon library built specifically for **Angular 21+**, inspired by Lucide and Radix Icons. It ships each icon as its own standalone Angular component (`<lmn-check />`, `<lmn-arrow-right />`), tree-shakable to the single icon, accessible by default, styled only by the consumer (`currentColor`), with optional pure-CSS semantic animations. The same repo also contains the official demo/docs website (AnalogJS + Tailwind v4), which doubles as the library's test bed.

## Why it exists

- Angular has no first-class equivalent of Lucide: existing icon solutions are either font-based, wrap generic SVG loaders, or aren't built on Angular 21 signals APIs.
- Icon libraries that ship one giant module break tree-shaking; lumen-icons makes **per-icon entry points** (`lumen-icons/check`) the default consumption path.
- Most icon sets treat accessibility and motion-sensitivity as afterthoughts; here they are baked into the base class and the animation generator.

## What success looks like

1. An Angular developer can `pnpm add lumen-icons`, import one icon, and ship only that icon's bytes.
2. Icons are accessible out of the box without the developer thinking about ARIA.
3. Optional per-icon animations feel *semantic* (a bell rings, a trash lid opens, a check draws itself) — not generic fade-ins — and cost nothing when unused.
4. The demo site (lumen-icons.dev) lets users search ~360 icons, preview every prop (size, stroke, variant, tone, background, animation), and copy ready-to-paste code.
5. Icons can alternatively be **copy-pasted as single files** into any Angular project (shadcn-style), because each component is self-contained.

## Explicit non-goals

- ❌ Supporting frameworks other than Angular (no React/Vue/Web Components builds).
- ❌ Supporting Angular < 21 or non-signals APIs.
- ❌ Runtime icon loading / sprite sheets / icon fonts.
- ❌ Shipping any styling opinion in the library (no Tailwind, no theme CSS in `packages/icons`).
- ❌ JavaScript-driven animations in the library (CSS `@keyframes` only).

## The two halves of the repo

| Half | Path | Published? | Stack | Purpose |
|---|---|---|---|---|
| **Library** | `packages/icons/` | ✅ npm as `lumen-icons` | Angular 21, ng-packagr (APF) | The product. Zero deps beyond Angular peers. |
| **Demo/docs app** | `src/` | ❌ deployed to Cloudflare Pages | AnalogJS, Tailwind v4, @voltui/components | Showcase, docs, catalog, and dogfooding ground. |

Rules differ per half: the app may use Tailwind and volt-ui freely; the library may use **nothing** but Angular. Never let an app-side convenience leak into `packages/icons/`.

## Key design decisions (and why)

- **One component per icon file** — enables per-icon entry points and copy-paste distribution. The barrel (`lumen-icons/icons`) exists but is discouraged in docs.
- **Icons are generated, not hand-written** — ~360 components are produced by `scripts/generate-icons.mjs` from Heroicons SVG sources (outline + solid, vendored in `packages/icons/svg/` — zero third-party runtime/build dependencies) plus a recipe catalog in `scripts/animations.mjs`. This keeps 360 files consistent and lets one recipe change update dozens of icons. Generated output **is committed** so consumers and contributors don't need to run the generator.
- **Animations as "recipes"** — a recipe (e.g. `draw-scale`, `ring`, `trash-lid`) is a keyframes builder function. Icons map to recipes by name (`ICON_ANIMATIONS`) or pattern (`FALLBACK_ANIMATIONS`). This gives semantic motion at scale without per-icon CSS authoring.
- **`LmnIconBase` abstract directive** — all shared inputs (size, tone, variant, background, …) and host bindings live in one place; icon components only carry their SVG and scoped animation styles.
- **APF via ng-packagr + post-build exports map** — standard Angular packaging, with `scripts/build-lib.mjs` generating per-icon re-exports so `lumen-icons/<name>` resolves.

## Glossary

| Term | Meaning |
|---|---|
| **Recipe** | A named CSS animation builder in `scripts/animations.mjs` (e.g. `beat`, `zoom`, `open-envelope`). |
| **Variant** | `outline` (stroke-based, default) or `filled` (solid fill, from Heroicons solid set). |
| **Tone** | Semantic color token (`primary`, `success`, `destructive`, …) resolved via CSS custom properties. |
| **Catalog** | The generated list the website uses to render/search all icons (`src/app/data/icon-catalog.ts`). |
| **Metadata** | Hand-maintained categories + aliases for search (`src/app/data/icon-metadata.ts`). |
| **APF** | Angular Package Format — the npm packaging layout ng-packagr produces. |
| **Custom icons** | The ~38 icons that don't come from Heroicons; the generator extracts and preserves their existing SVG paths on regeneration. |
