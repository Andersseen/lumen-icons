# Spec: compose semantic multi-part icon motion

- **Status:** done
- **Date:** 2026-08-18
- **Author:** Codex session
- **Semver impact:** patch — recipe and demo motion refinements only.

## Summary

This pass replaces visually simplistic effects with composed, per-part stories for the requested icons. Every new or revised keyframe sequence returns the glyph to the exact idle appearance at `100%`: no residual translation, rotation, scale or opacity change.

## Motivation

The catalog’s motion is only useful if it strengthens the icon’s meaning. Whole-icon scale, perpetual-looking displacement, and unrelated transforms make charts, stacks, trash, rocket, signal and X icons feel generic rather than authored.

## Scope

**In scope:**

- Charts: bar-by-bar growth from the baseline with staggered timing.
- Bolts: brief thickness/energy pulse that settles to normal weight.
- Trash: lid opens, a transient discard artifact falls in, then the lid closes.
- Stack and square-stack families: layer-by-layer assembly that preserves their own geometry.
- X/X-circle: two lines rotate from a pause-like position into the default X.
- Rocket: anticipate then launch diagonally in the glyph's upper-right direction, vanish, and fade back at its normal rest position.
- Wi-Fi and RSS: two ordered pulses through their arcs/rings.
- Bold: pulse its actual outline stroke weight, respecting the configured `strokeWidth` and returning to that exact value.
- Desktop sidebar: keep the sticky control panel independently scrollable within the viewport.

**Out of scope (explicitly not doing):**

- Changing idle SVG paths, the icon API, or the only allowed infinite loader animation.
- Applying a generic recipe to unrelated icons merely to increase coverage.

## Design

- Use `splitPaths` and path classes for outline variants where SVG subpaths correspond to bars, layers, or X strokes. Filled variants receive only safe, non-destructive settling when their compound winding prevents splitting.
- Keyframes use an eased three-phase action and explicitly reset all changed properties at `100%`.
- The temporary trash artifact exists only during the opt-in animation and is fully transparent at the first and last keyframes.

## Files to touch

| File | Change |
|---|---|
| `scripts/animations.mjs` | Add and remap semantic multi-part recipes. |
| `scripts/generate-icons.mjs` | Expose an outline icon's configured stroke width as a CSS custom property for weight motion. |
| `packages/icons/src/icons/*.ts` | Regenerated affected outputs only. |
| `src/app/components/icons/icons-sidebar.*` | Put the desktop scroll container on the semantic controls region. |
| `tests/e2e/icons.spec.ts` | Check the independent sidebar scroll, `bold` weight peak, and rocket idle state. |
| `CHANGELOG.md` | Record user-visible motion refinements. |
| `docs/ai/STATE.md` | Record the completed review pass. |

## Acceptance criteria

- [x] The requested icon families resolve to semantic per-part recipes instead of the previous generic `chart-grow`, `stack-rise`, `draw-scale`, `wave` or `glow` mappings; the rocket recipe now returns to rest.
- [x] All changed keyframes explicitly return translation, rotation, scale and opacity to idle values at `100%`.
- [x] Chart and stack outline paths animate in staggered, per-part order.
- [x] Changed components are generator output and `pnpm run check` passes.
- [x] `CHANGELOG.md` and `docs/ai/STATE.md` are updated.
- [x] `bold` grows beyond the configured 2 px default at its peak and returns to exactly 2 px.
- [x] Playwright confirms the rocket is fully opaque and untransformed after its animation, and the desktop control region can scroll without moving the page.

## Test plan

- Resolve the affected mappings programmatically after regeneration.
- Inspect generated CSS for idle values at 100% and shared reduced-motion coverage.
- Run `pnpm run check`; use Playwright to assert the semantic effects and their final rest state; manually review in `/icons` when an interactive browser is available.

## Risks & rollback

Splitting filled compound paths can alter holes and fills, so it is limited to compatible outline variants. Revert the mapping/recipe and regenerate to roll back.

## Open questions

- None.
