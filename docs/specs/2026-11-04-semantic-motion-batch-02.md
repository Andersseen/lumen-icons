# Spec: Semantic motion — batch 02 (character foundation + feedback icons)

- **Status:** done
- **Date:** 2026-11-04
- **Author:** agent session (maintainer-directed; verified by Playwright filmstrip)
- **Semver impact:** patch — animation CSS only; no input, selector, default or export
  change. At rest, rendering is unchanged.

## Summary

The first lote of the full-catalog semantic pass. It does two things:

1. **A shared character foundation**, as the maintainer decided:
   - While an icon animates, its svg is `overflow: visible`, so parts can swing or
     fly past the 24-unit box.
   - A shared `EASE` vocabulary (with an overshooting `spring`) for reworked recipes.
   - The shared reduced-motion and `transform-box` blocks now cover
     `polyline`/`polygon`/`ellipse`.
2. **19 feedback and notification icons** now animate their mechanism: bells,
   heart, star, checks, X marks, alert/question/info marks, thumbs and faces.

The maintainer chose: keep the one-shot `animate` API (no hover API, patch release),
adopt the reference project's character (spring easing + overflow), and ship one PR
per family. The roadmap for the remaining families is in `docs/ai/STATE.md`.

## Reference study

[ajitzero/animated-icons](https://github.com/ajitzero/animated-icons) (MIT; 500
Lucide icons for Angular; credits lucide-animated and movingicons) — read from source:

- **Animates parts with personality.** `bell`'s body swings 20° → −10° → 10° → −5° →
  3° while the clapper swings *against* it; `copy` slides its two sheets apart;
  `trash`/`archive` lift the lid while the body drops; `wifi`/`sun` cascade.
- **Springy easing** `cubic-bezier(0.175, 0.885, 0.32, 1.275)` and `overflow: visible`.
- **Hover-held poses**, with 2–3 px displacements. Lumen keeps the one-shot `animate`
  contract (maintainer decision), so its amplitudes stay above the perceptibility floor.

## Foundation

| Change | Why | Effect on other icons |
|---|---|---|
| `.lmn-animate svg { overflow: visible }` | Parts swinging or arriving from outside were cut at the box edge (batch 01 clip, arrows from above) | Style text of all 362 regenerated. Far-travelling recipes (`send-plane` 14 px, `pin-drop`, `package-pop`, `door-*`, `receipt-print`…) were filmed: their trajectories are now visible instead of truncated, nothing reads as broken. Static rendering unchanged |
| `polyline`/`polygon`/`ellipse` in the shared transform-box + reduced-motion blocks | Gap noted in batch 01; `page-corner` compensated locally | `page-corner`'s local rule removed |
| `EASE.spring/springSoft/out/inOut` | One vocabulary instead of ad-hoc beziers | None until a recipe uses it |

## Geometry findings

Filled subpaths were classified by measuring real `getBBox()` containment:

- **Holes:** bell clapper, bell-snooze Z, the !/?/i marks, the check in
  check-circle/check-badge, the X in x-circle, and face features.
- **Separate pieces:** bell-alert's waves (their own tag), the thumbs' cuff.

**Rotation-invariant containers.** A disc looks the same at any rotation, so rotating
the *whole* filled glyph turns only its hole. Filled `x-circle` spins its X, filled
`question-mark-circle` tilts its ?, filled faces bob or droop their features, and
filled `exclamation-circle` shakes its !, all while the disc appears to stay still.
The same trick fails for the triangle and the badge, which wobble or press instead.

## Design — per icon

| Icon | Before (grade) | After | Story (outline · filled) | Grade |
|---|---|---|---|---|
| bell | ring (C) | **bell-ring** (new) | Decaying swing from the crown; clapper lags and swings wider, against the bell · clapper is a hole → whole bell swings | A / B → **B** |
| bell-alert | ring (C) | bell-ring | Rings + alert waves pulse outward twice · waves (own tag) pulse, body swings | **A** |
| bell-snooze | ring (D — rang like an alarm) | bell-ring `snooze` | Drowsy half-swing; the Z drifts up, tilts, settles · Z is a hole → half-swing | A / B → **B** |
| bell-slash | slash-strike (B) | slash-strike `bodyMotion: 'ring'` | The bell starts ringing and is silenced as the bar strikes · same, bar is part of the compound | A / B → **B** |
| heart | beat (C) | **heartbeat** (new) | Lub-dub: strong beat, softer beat, settle | **A** |
| star | beat (D — borrowed) | **star-twinkle** (new) | Spins in by one point (identical silhouette both ends) and pops | **B** |
| check | draw-scale (B) | **check-tick** (new) | Written stroke-first, lands with a pop · solid tick written left → right (clip reveal) | **A** |
| check-circle, check-badge | draw-scale (C) | check-tick | Container stays and is pressed while the tick is written · tick is a hole → container pressed | A / B → **B** |
| x-mark | x-from-pause (D — filled did not animate) | **x-close** (new) | Strokes written in sequence during a quarter turn (X is identical every 90°) · solid X makes the turn | **A** |
| x-circle | x-from-pause (D — filled did not animate) | x-close | X swirls in, ring pressed · rotation only: disc still, X turns | **A** |
| exclamation-circle | wiggle (D) | **alert-mark** `rise` (new) | ! springs up from its base, dot pops on landing, ring flinches · disc shake → only ! moves | A / B → **B** |
| exclamation-triangle | wiggle (D) | alert-mark `rise` | Same; triangle flinches on its base · triangle wobbles on its base | A / B → **B** |
| question-mark-circle | wiggle (D) | alert-mark `tilt` | Hook tilts like a puzzled head, dot bounces · rotation only: the ? tilts | **A** |
| information-circle | wiggle (D) | alert-mark `dot` | Dot drops onto the stem, stem takes the weight · i nods (rotation) | A / B → **B** |
| hand-thumb-up/down | thumbs-up/down (B) | **thumb-gesture** (new) | Wind-up, thrust from the wrist, overshoot, settle | **A** |
| face-smile, face-frown | mouth-curve (C — filled only popped) | mouth-curve + `eyes`, `filledMood` | Mouth forms, eyes blink · filled head bobs (happy) / droops (sad) | **A** |

`slash-strike` and `mouth-curve` gained options whose defaults reproduce their old
output byte for byte: the other `*-slash` icons and the custom `smile` are unchanged.

**Rejected after filmstrip review:**
- A "!" falling in from above: its first frame looked like a power symbol.
- Scaling the filled `x-circle` during its turn: the disc visibly popped.
- A full-height Z drift on `bell-snooze`: the Z collided with the bell's crown.

## Out of scope — found along the way

**All 38 custom icons have no filled geometry**; their filled variant is a CSS fallback
(`fill: currentColor; stroke: none`) that breaks about 20 of them:
- they disappear: `x`, `menu`, `list`, `loader`;
- they become discs or blobs: `info`, `alert-circle`, `smile`, `search`, `globe`,
  `image`, `checkbox`, `edit`, `package`, `paperclip`, `save`;
- they lose their meaning: `log-in`, `log-out`, `terminal`, `refresh-cw`, `upload`,
  `download`, `external-link`.

This is a rendering bug unrelated to motion, and it blocks filled certification of
those icons. The custom feedback icons (`x`, `checkbox`, `info`, `alert-circle`,
`smile`) were therefore moved out of this lote into a dedicated custom-icons lote,
which must first give them real filled geometry.

## Acceptance criteria

- [x] Each of the 19 icons verified frame by frame in both variants at 24 px; 4 also at
      48 px (`exclamation-*`, `x-circle`, `bell-snooze`).
- [x] Regeneration changes exactly these 19 components (plus the one-time foundation
      regen of all 362, in its own commit); repeat regen is a no-op.
- [x] Static invariants (unit, now data-driven over every reviewed icon): animated
      parts exist in their variant's markup; filled animates; 0 %/100 % keyframes; no
      `infinite`; the whole glyph never reaches `opacity: 0`; reduced-motion coverage;
      filled compound paths intact.
- [x] Browser invariants (e2e, 31 icons × 2 variants): intended part off rest at the
      probe frame; rest state equals the un-animated drawing on every element;
      reduced motion leaves no animation. 128/128 under 8 workers × 4 repeats.
- [x] `pnpm run check`, `pnpm run build:app`, `pnpm run test:e2e` pass.

## Results

| | Before | After |
|---|---|---|
| Lote grades (overall = weaker variant) | B × 4, C × 6, D × 9 | **A × 10, B × 9** |
| Filled variants with no animation | 2 (`x-mark`, `x-circle`) | 0 |
| Recipes | 154 | 161 (+7) |
| Certified semantic coverage | 12 / 362 (3.3 %) | **31 / 362 (8.6 %)** |

## Tooling fixes made while verifying

The first contact sheets showed most icons static. That was not true, and three
harness bugs were behind it:
1. Angular removes a component's `<style>` when its last instance is destroyed, so
   earlier icons on a multi-icon sheet lost their CSS. The board now keeps a copy.
2. A real hover raced the search reflow. Cards are now entered by event.
3. `loader`'s infinite timeline made seeking non-finite. It is now sampled over one
   iteration.

`--sheet` mode and a "NO ANIMATION" marker were added.

## Risks

- `overflow: visible` lets far-travelling parts paint outside the icon box while
  animating. A consumer clipping container still clips; a tight inline layout may
  briefly show a part outside the icon. This is the same trade-off the reference makes.
- The rotation-invariance trick depends on the container being a true circle.
  Badge and triangle were deliberately excluded.
- Rollback: revert the lote commits and regenerate.
