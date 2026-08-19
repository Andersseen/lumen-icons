# Spec: Make every icon animation readable and mechanically honest

- **Status:** done
- **Date:** 2026-08-19
- **Author:** agent session (Playwright filmstrip audit)
- **Semver impact:** patch — CSS-only changes inside existing icon components; no
  API, selector, export or default-input change.

## Summary

A frame-by-frame audit of the shipped animations found that a third of the catalog
animates in a way the user cannot see at the default 24 px, and that a handful of
icons animate the whole glyph where the meaning lives in one part. This pass fixes
both: five new part-aware recipes replace generic whole-icon motion, and every recipe
below the perceptibility threshold gains amplitude. Icons below the threshold drop
from **111 of 343 (32%) to 1**, and expressive recipes rise from **60% to 85%**.

## Motivation

The project's differentiating claim is that each icon carries a *semantic* animation —
motion that expresses the icon's mechanism or meaning, not a generic spin or pulse.
Two specs sat `in-progress` in `docs/ai/STATE.md` pending a manual visual pass that had
never happened. This is that pass, plus the fixes it turned up.

## Method

Hovering an icon and watching is not a measurement. Instead: clone the `<lmn-*>` host,
insert the copies into an overlay, then freeze each copy at a different point of the
timeline (`getAnimations({subtree:true})` → `pause()` → `currentTime`), producing a
deterministic filmstrip at 0/20/40/60/80/100%.

Two things the harness has to get right, both worth recording:

- The recipes are written as `:host(.lmn-animate) svg path`, so **the `<lmn-*>` host is
  what must be cloned** — cloning the `<svg>` drops every rule.
- **Never filter the catalog between captures.** Angular removes a component's
  encapsulated `<style>` when its last instance is destroyed, which silently strips the
  frames already captured. Mount all `@defer` chunks instead and leave every component
  alive.

## Findings

### Perceptibility

Calibrating against the animations that read well (`eye` squashes to 10% of its height,
`heart` scales 25%, `key`/`wrench` rotate well past 10°), the floor for a 24 px render is
roughly **≥15% scale, ≥10° rotation, ≥5 px translation, or splitting the icon into
parts**. 111 of 343 animated icons sat below all four, across 49 recipes — `lock-click`
at `scale(1.08)` is about one pixel of movement.

### Two structural bugs, not just weak numbers

- **3D transforms with no perspective.** `banknote-flutter` used `rotateY(25deg)` and
  `calendar-flip` used `rotateX(-25deg)`. Without a perspective these flatten to
  `scaleX(cos θ)` — a ~9% squeeze, not a flip.
- **A dead duplicate recipe.** `RECIPES` contained `sun-rays` twice. JS object literals
  keep the last key, so the live one was a version targeting
  `path:nth-child(n+2)` — which matches nothing, because `sun` is a single compound
  path. That is why `sun` never radiated.

### Whole-icon motion where the mechanism is in one part

`lock-closed` pulsed instead of dropping its shackle; `camera` shrank and faded instead
of closing an iris; `cloud-arrow-up` lifted the cloud along with the arrow;
`shopping-cart` slid sideways instead of rolling; `sun` throbbed instead of radiating.
All five have compound outlines that `splitPaths` separates cleanly.

Separately, `rocket-launch` reached `opacity: 0` mid-flight — a ~150 ms hole in the icon
that reads as a rendering fault rather than a launch.

## Design

**Five new part-aware recipes** (all `splitPaths: true`, one-shot, `both` fill):

| Recipe | Icons | Motion |
|---|---|---|
| `lock-shackle` | lock, lock-closed | Shackle held open, drops into the body, body absorbs the impact |
| `camera-shutter` | camera | Iris closes to a point and reopens; body recoils; flash fires |
| `sun-rays` | sun | Eight rays sweep outward from the disc in sequence and settle |
| `cart-wheels` | shopping-cart | Wheels rotate 300° while the basket eases forward |
| `cloud-transfer` | cloud-arrow-up/down | Only the arrow travels; the cloud stays put |

**Amplitude raised** on the recipes that were under the floor, keeping their existing
mechanism: `typewriter` (rewritten as a stroke-draw — a 3 px fade is not typing),
`banknote-flutter` and `calendar-flip` (real perspective), `wiggle`, `glow`, `zoom`,
`phone-vibrate`, `lock-click`, `grin`, `film-roll`, `slide-*`, `arrow-bounce`, `swap-x/y`,
`float`, `core-pulse`, `scale-settle`, `scissors-snip`, `send-plane`, `clip-flex`,
`receipt-print`, `shine`, `crawl`, `drip`, `flag-wave`, `frame-flip`, `translate-flip`,
`shout`, `microphone-pulse`, `music-beat`, `no-shake`, `package-pop`, `percent-pop`,
`puzzle-seat`, `scan`, `emit`, `share-cast`, `sound-waves`, `mute-fade`, `ticket-tear`,
`trophy-shine`, `focus-lock`, `door-enter`, `door-exit`. Explicit `args` in
`ICON_ANIMATIONS` that pinned the old smaller values were raised to match.

`rocket-launch` now bottoms out at `opacity: 0.35` instead of 0.

## Results

| | Before | After |
|---|---|---|
| Expressive (parts / stroke-draw / axis squash / ≥10° rotation) | 205 (60%) | **293 (85%)** |
| Perceptible whole-icon pulse | 27 (8%) | 49 (14%) |
| **Below perceptibility at 24 px** | **111 (32%)** | **1** |
| Recipes with a duplicate key | 1 | 0 |

The one remaining entry is `briefcase`, a false positive: it uses the two-axis
`scale(1.1, 0.88)` squash that the classifier's single-value scale check misses.

## Files touched

| File | Change |
|---|---|
| `scripts/animations.mjs` | 5 new recipes, ~44 recipes re-tuned, dead duplicate `sun-rays` removed, 7 icon remaps, `args` raised |
| `packages/icons/src/icons/*.ts` | Regenerated (`generate-icons.mjs --overwrite`) |
| `docs/ai/STATE.md`, `CHANGELOG.md` | Recorded |

## Acceptance criteria

- [x] Icons below the perceptibility floor drop from 111 to ≤2.
- [x] No duplicate keys in `RECIPES`.
- [x] No icon reaches `opacity: 0` mid-animation.
- [x] Every recipe still ends at its rest state (measured: rest-drift 0.00).
- [x] Only `loader` uses an infinite animation.
- [x] `pnpm run check` passes (3654 unit tests + publint).
- [x] `pnpm run test:e2e` passes (26 tests).
- [x] Visual pass: filmstrips captured for the redesigned and the high-reach recipes.

## Verification

Filmstrips confirmed, frame by frame: the shackle now visibly clears the lock body and
drops in; the camera iris closes to a dot and reopens with the flash; the sun's rays
sweep out and settle; the cart's wheels turn as it advances; the cloud stays still while
the arrow rises into it; the rocket flies without vanishing; the balance beam tilts and
settles level; `code-bracket`/`at-symbol` type themselves in; `currency-dollar` and
`calendar` perform real 3D flips.

## Risks & rollback

- Bigger motion is more noticeable on hover-heavy pages. All of it stays behind the
  opt-in `animate` input and the generator's `prefers-reduced-motion` block.
- `splitPaths` on five more icons enlarges their DOM slightly (2–9 elements instead of 1).
- Rollback is `git revert` of one commit plus `generate-icons.mjs --overwrite`.

## Open questions

- The perceptibility floor (15% / 10° / 5 px) was calibrated by eye against known-good
  icons at 24 px. It could become a generator-time assertion so new recipes cannot land
  under it.
