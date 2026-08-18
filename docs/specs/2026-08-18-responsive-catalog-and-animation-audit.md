# Spec: make the icon catalog responsive and audit generic motion

- **Status:** done
- **Date:** 2026-08-18
- **Author:** Codex session
- **Semver impact:** patch — fixes demo layout and icon motion only; the public API is unchanged.

## Summary

The `/icons` catalog must remain usable without horizontal page overflow on narrow screens, while retaining its denser desktop layout and sticky desktop controls. In parallel, the animation catalog will be audited programmatically and only high-confidence generic or semantically mismatched recipes will be replaced with motion that uses the icon's actual parts.

## Motivation

At narrow viewport widths the catalog starts at two columns, giving cards a min-content width that spills outside the viewport. The catalog is also the primary visual QA surface for the icon library, so a systematic recipe audit is needed to find remaining generic rotations or morphs that do not fit the icon's meaning.

## Scope

**In scope:**

- Make `/icons` use one card column below the width at which two cards fit, and prevent flex/grid min-content overflow.
- Add a browser-visible responsive regression test for a narrow viewport.
- Inventory generated animation recipes, inspect remaining generic families, and improve only the semantically clear cases found.
- Regenerate any affected icon components from `scripts/animations.mjs`.

**Out of scope (explicitly not doing):**

- Redesigning the card visual language or changing icon inputs, defaults, exports, or categories.
- Inventing a single animation pattern for every icon; each changed family must have an icon-specific rationale.

## Design

- The main catalog flex child will opt into `min-w-0`, and the grid will use one column by default, graduating to two columns only when its cards can fit.
- The desktop sidebar stays sticky from the `lg` breakpoint; mobile controls remain the only controls below that breakpoint.
- Recipe audit results will determine the exact mapping changes. Existing `spin` and line/menu fallbacks are candidates only when an icon-specific alternative can be expressed through current SVG parts and one-shot CSS keyframes.

## Files to touch

| File | Change |
|---|---|
| `src/app/pages/icons.page.html` | Correct the responsive main/grid sizing. |
| `tests/e2e/icons.spec.ts` | Assert the narrow catalog has no horizontal document overflow. |
| `scripts/animations.mjs` | Add or remap only audit-approved semantic recipes. |
| `packages/icons/src/icons/*.ts` | Regenerated output for changed recipes; never hand-edited. |
| `CHANGELOG.md` | Record user-visible fixes. |
| `docs/ai/STATE.md` | Record the completed audit and responsive work. |

## Acceptance criteria

- [x] At 320 px and 375 px wide, `/icons` has no horizontal document overflow and every card action remains reachable.
- [x] Desktop `/icons` retains five columns at `xl` and its sidebar remains sticky at `lg` and above.
- [x] Each animation changed by the audit uses an icon-specific, one-shot CSS sequence and respects reduced motion.
- [x] `pnpm run test:e2e -- tests/e2e/icons.spec.ts` passes.
- [x] `pnpm run check` passes.
- [x] `CHANGELOG.md` and `docs/ai/STATE.md` are updated.

## Test plan

- Use the in-app browser at 320, 375, 768 and desktop widths to inspect the catalog and sticky controls.
- Add Playwright coverage asserting `document.documentElement.scrollWidth <= window.innerWidth` at a narrow viewport and that the first card actions are visible.
- Run the targeted e2e spec, then `pnpm run check` after regeneration.

## Risks & rollback

Grid breakpoints can unexpectedly affect medium-width card density; browser checks cover each breakpoint. Recipe changes regenerate many committed files; rollback is a mapping/recipe revert followed by regeneration.

## Open questions

- None.
