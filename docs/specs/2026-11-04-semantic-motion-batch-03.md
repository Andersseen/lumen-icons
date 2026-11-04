# Spec: Semantic motion — batch 03 (custom icons: real filled geometry)

- **Status:** done
- **Date:** 2026-11-04
- **Author:** agent session (maintainer-directed; verified by Playwright filmstrip)
- **Semver impact:** patch. This is a bug fix: the filled variant of 25 custom icons
  rendered wrong or not at all. No input, selector, default or export changes.

## Summary

Lumen's 38 **custom** icons (no Heroicons source) never had filled geometry. Their
`variant="filled"` was a CSS fallback, `fill: currentColor; stroke: none`, which only
works for closed silhouettes. Batch 02 found it broke about 20 of them. This batch:

1. Gives 25 custom icons real filled geometry from a new
   `packages/icons/svg/custom-filled/` directory, and teaches the generator to emit a
   filled branch for a custom icon when a source exists there.
2. Certifies the motion of the five custom icons whose Heroicons siblings were
   reworked in batch 02 (`x`, `checkbox`, `info`, `alert-circle`, `smile`), reusing
   those recipes.
3. Adds a guard so a custom icon can no longer ship a broken filled variant unnoticed.

## The bug (filmed before the fix)

| Symptom in filled | Icons |
|---|---|
| Renders nothing | `x`, `menu`, `list`, `loader` |
| Becomes a disc or a blob (inner details filled in) | `info`, `alert-circle`, `smile`, `search`, `globe`, `image`, `checkbox`, `edit`, `package`, `paperclip`, `save` |
| Loses its meaning | `log-in`, `log-out`, `terminal`, `refresh-cw`, `upload`, `download`, `external-link`, `more-vertical` (dots thin to specks), `mail` (flap lost), `settings` (no axle hole) |
| Fine as a filled silhouette — fallback kept | `avatar`, `badge`, `copy`, `database`, `file`, `filter`, `github`, `grid`, `lock`, `message-circle`, `send`, `shield`, `zap` |

## Design

### Where the geometry comes from

Every other filled icon in the library is Heroicons solid, so a custom icon's filled
variant uses **the Heroicons solid glyph of its equivalent** wherever one exists. Each
pair was checked side by side before it was adopted. The 22 pairs, with attribution,
are listed in `packages/icons/svg/custom-filled/README.md`. Three had no equivalent
and were authored on the same 24-unit grid:

- **`checkbox`**: a rounded square with the exact `check-circle` tick as an evenodd
  hole.
- **`save`**: a floppy body with shutter and label holes.
- **`loader`**: the eight spokes as capsules, written as absolute path data. A first
  draft used `<rect transform="rotate(…)">`. That was rejected because the shared
  animation rule sets `transform-origin`/`transform-box` on every `rect`, and CSS
  applies those to the `transform` attribute too, so the spokes would have shifted
  as soon as the icon animated.

### Generator

- `scripts/generate-icons.mjs`: Heroicons and custom icons now share one
  `applyAnimationMarkup()` step for both variants. Run alone, the refactor
  regenerated **0 files**.
- Custom-icon extraction reads the **last** `<svg>` (the outline branch), which keeps
  re-extraction stable once a component has two branches. A repeat regeneration is a
  no-op.
- A custom icon with a `custom-filled/<name>.svg` gets the same
  `@if (variant() === 'filled')` template as a Heroicons icon, and its CSS fallback
  is dropped.

### Motion (5 icons)

| Icon | Before | After | Story (outline · filled) | Grade |
|---|---|---|---|---|
| x | x-from-pause; **filled invisible** (E) | x-close | Strokes written during a quarter turn · solid X makes the same turn | **A** |
| checkbox | draw-scale; filled blob (E) | check-tick | Box pressed while the tick is written · tick is a hole → box pressed | A / B → **B** |
| info | wiggle; filled disc (E) | alert-mark `dot` | Dot drops onto the stem · the disc tilts, so the i nods | A / B → **B** |
| alert-circle | alert-signal; filled disc (E) | alert-mark `rise` | ! springs up, dot pops, ring flinches · disc shake | A / B → **B** |
| smile | mouth-curve; filled disc (E) | mouth-curve + eyes/happy | Smile forms, eyes blink · head bob | **A** |

The other 20 custom icons with new filled geometry were filmed in both variants. Their
existing recipes run on the new geometry without animating the wrong part. Their
*semantic* review belongs to their family's lote, and they stay `unreviewed` in the
inventory until then.

## Guard

`scripts/custom-filled.spec.ts` checks every custom icon:
- either it has a `custom-filled/` source, and its generated filled branch reproduces
  that geometry (compared after the same idempotent subpath split);
- or it is on the explicit `FALLBACK_VERIFIED` list of 13 icons whose fallback was
  visually checked.

A new custom icon fails until someone has looked at it in filled mode.

## Acceptance criteria

- [x] The 25 icons render meaningful filled geometry (filmstrip, 24 px; the 5 motion
      icons also at 48 px).
- [x] Generator refactor alone: 0 changed files. With sources: exactly 25 changed;
      repeat regeneration is a no-op.
- [x] Guard test covers all 38 custom icons.
- [x] The 5 icons pass the data-driven static spec and the e2e probes (intermediate
      frame, rest state, reduced motion); 111/111 under 8 workers × 3 repeats.
- [x] `pnpm run check`, `pnpm run build:app` and `pnpm run test:e2e` pass.

## Results

| | Before | After |
|---|---|---|
| Custom icons broken in filled | ~22 | 0 (13 verified fallbacks, 25 real geometry) |
| Certified semantic coverage | 31 / 362 (8.6 %) | **36 / 362 (9.9 %)** |

## Risks

- A filled custom icon now matches its Heroicons sibling, so its filled silhouette can
  differ from its Lucide-style outline. The clearest case is `terminal`, whose filled
  variant is a command-line *window*. This is the same convention the rest of the
  library follows.
- Rollback: delete `custom-filled/` and regenerate. The generator falls back to CSS.
