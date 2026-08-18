# Spec: replace generic mechanism animations

- **Status:** done
- **Date:** 2026-08-18
- **Author:** Codex session
- **Semver impact:** patch — animation polish only; no public API changes.

## Summary

This pass replaces the remaining clearly mismatched generic animations with motion based on each icon's represented mechanism. The target group is batteries, balance scales, scissors, paper clips and puzzle pieces, where a generic wave or full rotation communicates the wrong action.

## Motivation

An icon animation should reinforce recognition: a battery should charge, a scale should settle, scissors should snip, a paper clip should flex into place, and a puzzle piece should seat. Generic rotation makes these symbols feel arbitrary and less polished.

## Scope

**In scope:**

- Add per-family, one-shot CSS recipes for the five mechanism stories.
- Map `battery-0/50/100`, `scale`, `scissors`, `paper-clip`/`paperclip`, and `puzzle-piece` to those recipes.
- Regenerate the affected components and validate reduced-motion support inherited from the generator.

**Out of scope (explicitly not doing):**

- Replacing rotations that are semantically correct for gears, keys, tools, cubes, refresh paths, or the loader.
- Broad visual redesign of SVG artwork or the catalog UI.

## Design

- Batteries build their charge from the terminal toward the body, with the filled art settling once rather than pretending to be a radio wave.
- The scale makes a small, damped balance correction about its top pivot rather than turning upside down.
- Scissors close through a short snip and settle; the clip flexes toward its resting position; the puzzle piece approaches and seats with a light compression.
- All timing uses eased, multi-phase keyframes (`cubic-bezier(0.22, 0.8, 0.32, 1)`), runs once with `both`, and is disabled by the shared reduced-motion CSS.

## Files to touch

| File | Change |
|---|---|
| `scripts/animations.mjs` | Add semantic mechanism recipes and mappings. |
| `packages/icons/src/icons/*.ts` | Regenerated output for the affected icons. |
| `CHANGELOG.md` | Record the visual correction. |
| `docs/ai/STATE.md` | Record the motion pass. |

## Acceptance criteria

- [x] Batteries no longer use the `wave` recipe; the scale, scissors, paper clips and puzzle piece no longer use `rotate-once`.
- [x] Changed recipes are one-shot, start/end at rest and use reduced-motion coverage supplied by the generator.
- [x] Generated components are regenerated from the recipe source, not edited by hand.
- [x] `pnpm run check` passes.
- [x] `CHANGELOG.md` and `docs/ai/STATE.md` are updated.

## Test plan

- Programmatically resolve the target icon recipe names after regeneration.
- Run `pnpm run check`; use the catalog’s animation control for a manual visual pass when a browser session is available.

## Risks & rollback

Split SVG paths can affect filled artwork if used indiscriminately; recipes will restrict per-part drawing to compatible outline artwork and use a safe filled settle. Roll back by reverting mappings and regenerating.

## Open questions

- None.
