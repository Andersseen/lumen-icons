# Spec: Semantic motion coverage — batch 01 (folders, inboxes, documents)

- **Status:** done
- **Date:** 2026-11-04
- **Author:** agent session (maintainer-directed; verified by Playwright filmstrip)
- **Semver impact:** patch — CSS and SVG-structure changes inside 12 existing icon
  components; no input, selector, default or export change.

## Summary

Twelve folder, inbox and document icons had motion that was visible but generic: the
whole glyph hopped (`folder-pop`) or faded in from nothing (`file-appear`). Each now
animates its mechanism. The work also adds an internal, reproducible **semantic motion
inventory** so later batches measure real progress instead of recipe counts.

## Motivation

"Animate the mechanism, not the glyph." Earlier passes made every animation
*perceptible* (2026-08-19 perceptibility pass) and made 26 icons *expressive*. Their
"87% expressive" figure classified recipes, not reviewed outcomes, and so it is not a
measure of semantic coverage. This batch starts that measurement from evidence.

## Baseline (origin/main `ad653e5`)

- 362 catalog icons; 147 recipes; `lumen-icons` 0.2.0; Angular 21.
- Generator idempotent on the baseline (`generate-icons.mjs --overwrite` → no diff).
- All 12 icons were explicit mappings: 7 × `folder-pop`, 5 × `file-appear`.
- Baseline filmstrips (24 px, both variants) confirmed what they did: `folder-pop` hops
  the whole glyph 6 px *up* and back — for the two `*-arrow-down` icons that runs against
  the arrow's meaning — and `file-appear` fades the whole glyph in from `opacity: 0`.

## Scope

**In scope:** the 12 icons below; recipes in `scripts/animations.mjs`; an internal
inventory (`scripts/motion-inventory.mjs` + `docs/ai/motion-reviews.json` →
`docs/ai/MOTION-INVENTORY.md`); a reusable filmstrip tool
(`scripts/motion-filmstrip.mjs`); unit + e2e coverage.

**Out of scope:** `folder` (its `folder-lid` is the reference), new inputs, hover
triggers, selectable animations, the website, the 0.3.0 plan, any release.

## Geometry findings that shaped the design

The deciding constraint was the **filled** geometry. Seven filled icons carry their
action mark as an *evenodd hole* inside one compound path: the plus/minus/arrow of the
three folders, the inbox cavity, the clipboard clip's opening, the rows of
`clipboard-document-list` and the content of `newspaper`. Splitting such a path turns
each hole into a filled shape drawn on top of the body, so the mark disappears. Those
filled variants keep the compound path and animate the whole glyph with an
equivalent story (receive-squash, swell/contract, or a top → bottom print reveal).
`folder-open`, `inbox-arrow-down`, `inbox-stack` and the two clipboard documents have
their moving part as a separate subpath or tag, so their filled variants animate the
part itself.

`file` is a custom icon: outline-only, with a CSS filled fallback in which the dog-ear
`<polyline>` disappears inside the page. Its fold is a `<polyline>`, which neither
the shared `transform-box` rule nor the shared reduced-motion block covers, so
`page-corner` sets both locally. The shared block was not widened, because that would
have rewritten all 362 files for one icon.

## Design — per icon

Indices are split-subpath positions (outline) and tag positions (filled).

| Icon | Before | After | Moving part (outline · filled) | Story |
|---|---|---|---|---|
| folder-open | folder-pop | **folder-open-swing** (new) | front panel [1,2] · front [2] | Panel starts stood up (scaleY 1.4 from its bottom hinge) and falls forward onto the open pose; back panel still |
| folder-plus | folder-pop | **folder-action** `add` (new) | plus [1,2] · whole (hole) | Plus turns in from a point (scale 0.2, −90°) and lands; folder still. Filled swells 16 % |
| folder-minus | folder-pop | **folder-action** `remove` | minus [1] · whole (hole) | Minus collapses to a point (scaleX 0.14) and springs back. Filled contracts 16 % |
| folder-arrow-down | folder-pop | arrow-into-receiver (reused, extended) | shaft [3] + heads [1,2] · whole (hole) | Shaft drawn down from 6 px above, head resolves, folder takes a 1 px impact. Filled squashes on arrival |
| inbox | folder-pop | **tray-receive** (new) | tray floor [1] · whole (hole) | Floor drops 6 px from the tray mouth, narrowed (scaleX 0.8) to stay between the walls; tray takes the weight |
| inbox-arrow-down | folder-pop | arrow-into-receiver (reused, extended) | shaft [3] + heads [4,5] · arrow tag [2] | Arrow drawn down through the rim gap into the tray; tray impact in both variants |
| inbox-stack | folder-pop | **tray-stack** (new) | upper [2,3,4], lower [1,5] · upper [1], lower [2] | Lower tray rises 3 px into place, upper tray is set down from 3.75 px above, lower takes the weight |
| clipboard | file-appear | **clipboard-secure** (new) | clip [1,2] · whole (hole) | Clip springs open (scale 1.16 × 1.32 from its base), holds, snaps shut |
| clipboard-document | file-appear | **clipboard-secure** | clip [4,5] + sheet [3,6] · sheet [2,3] | Clip opens, sheet slides under it (−5 px, −5°) and is pinned as the clip snaps |
| clipboard-document-list | file-appear | **clipboard-secure** | rows [[9,1],[10,2],[11,3]] · sheet [2] | Each row checks in order: bullet pops, line is written. Filled rows are holes, so the document is placed instead |
| file | file-appear | **page-corner** (new) | page [1] + fold [2] · whole | Page outline drawn, then the dog-ear folds down from the corner. Filled sheet printed top → bottom |
| newspaper | file-appear | **newspaper-layout** (new) | photo [8] + lines [1,2],[3],[4] · whole (holes) | Photo block placed, then the columns are set line by line. Filled page printed top → bottom; its holes appear in reading order |

### Reuse versus new recipes

- **Reused:** `arrow-into-receiver` already told "arrow arrives in a receiver" for
  `arrow-down-tray` and the square variants. It gained an `options` argument
  (`reverseShaft`, `splitFilled`, `filledReceiverIndices`, `filledWhole`) instead of
  becoming a sibling recipe. A latent bug was fixed along the way: an empty
  `filledArrowIndices` emitted a rule with no selector. Existing callers regenerate
  byte-identically.
- **Shared new recipes:** `folder-action` (add/remove), `clipboard-secure` (clip /
  sheet / rows are optional parts — one mechanism, three icons).
- **Single-icon recipes:** `folder-open-swing`, `tray-receive`, `tray-stack`,
  `newspaper-layout` and `page-corner` each describe a mechanism that exists only once
  in the current catalog.
- **Shared helpers:** `receiveSquashKeyframes`, `printRevealKeyframes`, `partRule`.
- `folder-pop` is now unused by the catalog (kept: `FALLBACK_ANIMATIONS` still routes
  future `*folder*` icons to it). The inventory lists it under unused recipes.

## Acceptance criteria

- [x] Each of the 12 icons animates the part named above, verified frame by frame in
      both variants at 24 px (and 16 / 48 px for 8 of them).
- [x] Non-participating geometry stays still at the sampled frame (e2e `still` probes).
- [x] Every animation ends at the un-animated drawing: transform, opacity,
      stroke-dashoffset, stroke-width and clip-path equal the cancelled state on every
      element (e2e).
- [x] No mid-animation `opacity: 0`, no `infinite` (unit).
- [x] `prefers-reduced-motion: reduce` leaves zero running animations in both
      variants of all 12 icons (e2e).
- [x] Filled evenodd compound paths are never split (unit: tag and `fill-rule` counts
      match the source SVG).
- [x] Regenerating changes exactly these 12 component files; a second run is a no-op.
- [x] Inventory reproducible: `pnpm run check:motion` and its unit test fail on a stale
      report, a stale review (recipe changed since review), a review outside the
      catalog, an unknown recipe, or a missing assessment in a completed batch.
- [x] `pnpm run check`, `pnpm run build:app`, `pnpm run test:e2e` pass.
- [x] `CHANGELOG.md` and `docs/ai/STATE.md` updated.

## Verification methodology

`scripts/motion-filmstrip.mjs` opens `/icons`, turns animation on, hovers the card so
the catalog mounts the animated host, and **clones that host**. Cloning keeps the
emulated-encapsulation attributes that the scoped styles are keyed on. Each clone is
attached first, then every animation in it is paused and seeked with the Web
Animations API to 0 / 20 / 40 / 60 / 80 / 100 % of the latest `endTime` in that clone,
so staged parts stay in step. The first draft of the tool attached clones *after*
seeking. Disconnected clones have no animations, so every frame played live and came
out identical. It now throws if a clone has nothing to seek.

`tests/e2e/semantic-motion.spec.ts` asserts the same properties in CI.

## Results

| | Before | After |
|---|---|---|
| Batch grades (overall = weaker variant) | D × 10, E × 2 | **A × 4, B × 8** |
| Recipes | 147 | 154 (+7) |
| Certified semantic coverage (catalog denominator) | 0 / 362 (no reviews existed) | **12 / 362 = 3.3 %** |
| Reviewed icons | 0 | 12; 350 explicitly `unreviewed` |

Per-variant grades are in [`docs/ai/MOTION-INVENTORY.md`](../ai/MOTION-INVENTORY.md).
Outline is A for 11 of 12; `folder-minus` is B because a round-trip collapse only
*implies* removal. Filled is A for `folder-open`, `inbox-arrow-down`, `inbox-stack` and
`clipboard-document`. The other eight are B, because a hole cannot move independently
and the filled story is told by the whole glyph.

## Risks & known limitations

- `folder-open`'s upright pose is a scaleY, so the panel's horizontal strokes are
  ~1.4× thicker for the first ~15 % of the timeline.
- At 48 px the clipboard clip's open pose reaches the top edge of the view box; at
  0.75 px of stroke it is not visibly clipped at any reviewed size.
- `clipboard-document-list` and `newspaper` tell a slightly different story in each
  variant (rows checked in vs. document placed / page printed), forced by the holes.
- The inventory's grades are human judgement recorded in JSON. The tooling guarantees
  that they stay attached to the recipe that was reviewed, not that they are right.
- Rollback: revert the commit and run `generate-icons.mjs --overwrite`.

## Open questions

- None blocking. Candidate follow-up: widen the shared reduced-motion and
  `transform-box` blocks to `polyline`/`polygon` in a dedicated regen PR.
