# Spec: elevate the official Lumen Icons homepage

- **Status:** done
- **Date:** 2026-08-18
- **Author:** Codex session
- **Semver impact:** none — demo-site presentation only.

## Summary

Redesign the public homepage into a polished product landing page for an Angular icon library. The page will lead with its product promise, make the icon API and semantic motion tangible, establish technical credibility, and offer direct routes to browse and documentation.

## Motivation

The homepage already contains the right information but presents it as disconnected blocks. The official site should make Lumen feel like a deliberate, modern library: attractive on first view, clear in seconds, and useful to a developer ready to install it.

## Scope

**In scope:**

- Recompose the hero around a strong visual hierarchy, live icon canvas, product metrics and clear primary/secondary calls to action.
- Upgrade the animation showcase into a product-like playground surface that exposes real Lumen code.
- Present benefits as a technical product story rather than a generic feature grid.
- Improve the quickstart as a concise installation-to-first-icon flow.
- Keep the page responsive, accessible, dark-theme compatible and purely component/CSS based.

**Out of scope (explicitly not doing):**

- Changing the `/icons` catalog, `/docs` content, library API or icon geometry.
- Adding third-party image assets, a runtime animation dependency, tracking or authentication.

## Design

- Use layered CSS gradients, subtle grid texture and the library's own SVGs instead of stock visuals.
- Keep semantic icon animations opt-in and one-shot; page micro-interactions may use the already-installed Angular Movement package.
- Make all facts specific and stable: 362 individually importable icons, Angular 21+, accessible defaults and CSS-only semantic animation.
- Preserve semantic landmarks, meaningful labels and mobile-first stacking.

## Files to touch

| File | Change |
|---|---|
| `src/app/pages/index.page.ts` | Compose the refined home sections. |
| `src/app/components/home/home-hero.*` | Build the product hero and visual live canvas. |
| `src/app/components/home/home-animation-showcase.*` | Modernize the interactive icon preview. |
| `src/app/components/home/home-features.*` | Reframe feature content with developer-focused hierarchy. |
| `src/app/components/home/home-quickstart.*` | Present a crisp three-step onboarding flow. |
| `tests/e2e/*` | Add homepage assertions for the primary product flow. |
| `CHANGELOG.md`, `docs/ai/STATE.md` | Record the visual refresh. |

## Acceptance criteria

- [x] The homepage has visible Browse icons and Documentation calls to action, an accessible product hero and a responsive layout at 320 px and desktop widths.
- [x] It shows real Lumen icon components, the install command and developer-relevant capabilities without static image dependencies.
- [x] Existing navigation, copy interaction and theme flows continue to work.
- [x] Playwright contains a homepage product-flow regression test.
- [x] `pnpm run check` and `pnpm run test:e2e` pass.
- [x] `CHANGELOG.md` and `docs/ai/STATE.md` are updated.

## Test plan

- Add a Playwright check for hero CTAs and the visible icon/API preview.
- Run full unit/package checks and full browser E2E suite.
- Inspect narrow and desktop screenshots with Playwright.

## Risks & rollback

The main risk is visual density or horizontal overflow on small screens. Use the existing responsive Tailwind breakpoints and Playwright viewport checks; the refresh can be reverted without impacting the library package.

## Open questions

- None.
