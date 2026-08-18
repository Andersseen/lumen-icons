# Spec: Semantic animation remap — purge the generic `pulse-scale`

- **Status:** in-progress
- **Date:** 2026-08-17
- **Author:** AI session (Kimi Code), for maintainer review
- **Semver impact:** minor — animation behavior changes on ~90 icons; no public API change (no inputs, selectors, or defaults touched)
- **Branch:** `feature/semantic-animations`

## Summary

Today 75 of 362 icons (~21%) render the same generic `pulse-scale` animation, and several other recipe groups (`file-appear` ×26, `typewriter` ×18, `rotate-once` ×18, `spin` ×15) mix icons whose meanings don't match the motion. This spec covers **Phase 0** (fix silently-shadowed duplicate keys in `ICON_ANIMATIONS`) and **Phase 1** (give every `pulse-scale` icon a semantic animation). Phases 2–3 (refining `file-appear`/`typewriter`/`rotate-once`/`spin` groups) are out of scope and will get their own specs.

No icon SVGs are created or modified. All work happens in `scripts/animations.mjs` (new recipes + remapping), then icons are regenerated.

## Motivation

From `docs/ai/CONTEXT.md`, success criterion #3: *"per-icon animations feel semantic (a bell rings, a trash lid opens, a check draws itself) — not generic fade-ins"*. The current distribution violates this for the library's default fallback and several catch-all groups. This is the project's stated differentiator.

### Measured starting point (2026-08-17, via `resolveAnimation` over all 362 icons)

| Recipe | Icons | Verdict |
|---|---|---|
| `pulse-scale` | **75** | generic default; target of this spec |
| `file-appear` | 26 | Phase 2 (own spec) |
| `typewriter` | 18 | Phase 2 (own spec) |
| `rotate-once` | 18 | Phase 3 (own spec) |
| `spin` | 15 | Phase 3 (own spec) |
| ~60 others | ≤10 each | fine |

**Bugs found (Phase 0):** `ICON_ANIMATIONS` contains duplicate keys; JS keeps the last one, silently discarding the earlier intent:

- `cloud-arrow-down`: `download-arrow` (line ~1702) vs `float` (line ~1796) → currently floats.
- `cloud-arrow-up`: `upload-arrow` vs `float` → currently floats.
- `document-magnifying-glass`: `zoom` vs `file-appear` → currently file-appear.
- `document-duplicate`, `finger-print`: duplicated with the same recipe (harmless, dead code).

**Structural constraint discovered:** most Heroicons outline SVGs are **single-`<path>`**, so per-part `pathClasses` animation (like `trash-lid`) is only available for a minority of icons. The main personalization lever for single-path icons is therefore: distinct transform "verbs" (axis, origin, distance, easing, `steps()`), stroke-draw on outline, `clip-path` wipes, and per-icon `args` — all pure CSS, no SVG changes. Multi-path icons (verified from sources/committed components) are flagged below where relevant.

## Scope

**In scope:**

- Phase 0: remove all duplicate keys in `ICON_ANIMATIONS`, resolving the three conflicts as decided in "Open questions".
- Phase 1: ~20 new recipes in `RECIPES` + remapping of all 75 `pulse-scale` icons (full table in Design).
- Small retouches where the remap naturally touches the same fallback lines (e.g. `more-vertical` → `ellipsis-pulse`).
- Regenerate all icons; changelog + STATE.md.

**Out of scope (explicitly not doing):**

- New icons, or any SVG path edits.
- Remapping `file-appear`, `typewriter`, `rotate-once`, `spin`, `bounce`, `wiggle` groups (Phase 2/3 specs).
- Any change to `LmnIconBase`, `icon.types.ts`, or the generator (`generate-icons.mjs`) — recipes need no new generator capability (`composeStyles` accepts arbitrary CSS; `args`/`pathClasses`/`pathLength` already exist).
- Demo-site changes (the playground already previews whatever animation an icon carries).

## Design

### Recipe contract (unchanged, enforced for every new recipe)

Pure CSS `@keyframes`; `0%` and `100%` defined; `both` fill mode; runs once (no `infinite`); `prefers-reduced-motion` handled by the shared embedded block; keyframes scoped as `lmn-<icon-name>`; `args` allowed for per-icon tuning (axis/origin/distance/duration). On the **filled** variant, stroke-draw animations degrade gracefully (dash is a no-op without stroke; opacity/transform parts still run) — same behavior as existing draw recipes.

### Phase 0 — duplicate resolution (proposed)

| Icon | Keep | Remove | Rationale |
|---|---|---|---|
| `cloud-arrow-down` | `download-arrow` | `float` | section intent "Transfer arrows"; cloud+down-arrow = download |
| `cloud-arrow-up` | `upload-arrow` | `float` | same |
| `document-magnifying-glass` | `zoom` | `file-appear` | it's a search action |
| `document-duplicate` | `copy-offset` | dup | identical, dead code |
| `finger-print` | `tap` | dup | identical, dead code |

### Phase 1 — new recipes and the 75-icon remap

New recipes (working names; each is a small builder, many share keyframe shapes via `args`):

| New recipe | Motion (semantic verb) | Target icons |
|---|---|---|
| `blink` | eyelid squash: `scaleY(1→0.1→1)`, origin center | `eye`, `eye-slash` |
| `drip` | drop falls: translateY + opacity fade, origin top | `eye-dropper` |
| `sound-waves` | emission pulse: scale 1→1.15 + opacity dip, origin left center | `speaker-wave` |
| `mute-fade` | waves die: opacity 1→0.3→1 | `speaker-x-mark` |
| `slider-nudge` | knob slides along track: alternate translate on axis (`args: [axis]`) | `adjustments-horizontal`, `adjustments-vertical` |
| `swap-x` / `swap-y` | go-and-return translate on axis | `arrows-right-left`, `chevron-up-down` (x); `arrows-up-down` (y) |
| `converge` / `diverge` | scale toward/away from center + slight opacity | `arrows-pointing-in` / `arrows-pointing-out` |
| `chevron-cascade` | per-chevron staggered slide (2 outline paths → `pathClasses`) | `chevron-double-up/down/left/right` |
| `trend-draw` | stroke-draw (pathLength), `args: [direction]` | `arrow-trending-up`, `arrow-trending-down` |
| `door-enter` / `door-exit` | translateX into/out of frame + opacity | `log-in`, `log-out`, `arrow-right-on-rectangle`, `arrow-left-on-rectangle`, `arrow-right-start-on-rectangle`, `arrow-left-start-on-rectangle`, `arrow-right-end-on-rectangle`, `arrow-left-end-on-rectangle` |
| `slot-in` / `slot-out` | arrow settles into / lifts out of its square | `arrow-down-on-square`, `arrow-down-on-square-stack`, `arrow-up-on-square`, `arrow-up-on-square-stack` |
| `stack-rise` | layers rise: scaleY 0→1 origin bottom + opacity | `database`, `server`, `server-stack`, `circle-stack`, `rectangle-stack`, `square-2-stack`, `square-3-stack-3d`, `building-library`, `building-office`, `building-office-2`, `building-storefront` |
| `cell-pop` | cells appear staggered (`pathClasses` where multi-tag, else `stack-rise` fallback) | `grid`, `squares-2x2`, `squares-plus`, `table-cells`, `view-columns`, `rectangle-group`, `queue-list` |
| `screen-on` | CRT-on: scaleY 0.2→1 + opacity flash, origin center | `device-tablet`, `computer-desktop`, `tv`, `window` |
| `core-pulse` | heartbeat from center (scale + opacity settle) | `cpu-chip`, `shield` |
| `bubble-pop` | message pops from its tail: scale origin bottom-left | all 8 `chat-bubble-*`, `message-circle` |
| `shout` | announcement: scale origin left + slight rotate | `megaphone` |
| `emit` | broadcast pulse: opacity + scale origin bottom | `radio` |
| `cap-toss` | rotate + translateY bounce (graduation toss) | `academic-cap` |
| `case-click` | briefcase latch: quick scale settle, origin top | `briefcase` |
| `shine` | badge gleam: scale 1→1.08 + opacity flash | `badge` |
| `fan` | swatch fan-out: rotate origin bottom-left | `swatch` |
| `funnel-drain` | pour-through: translateY + scaleY, origin top | `filter`, `funnel` |
| `package-pop` | parcel bounce (translateY + scale, origin bottom) | `package` |
| `grin` | mood pop, `args: [energy]` (smile bouncy / frown subdued) | `face-smile`, `face-frown`, `smile` |
| `frame-flip` | GIF frames: opacity in `steps()` | `gif` |
| `translate-flip` | language swap: rotateY flip once | `language` |
| `tag-swing` | tag dangles: rotate origin top-right (the hole) | `tag` |
| `receipt-print` | receipt prints out: translateY reveal | `receipt-percent`, `receipt-refund` |
| `percent-pop` | quick pop + settle | `percent-badge` |
| `wallet-open` | flap tilt: slight rotate origin top | `wallet` |
| `link-connect` / `link-break` | stroke-draw; break adds mid opacity dip | `link` / `link-slash` |
| `share-cast` | nodes cast up-right: translate + opacity | `share` |
| `focus-lock` | viewfinder corners lock: converge + opacity | `viewfinder-circle` |
| `crawl` | bug jitter: small alternating translate | `bug-ant` |
| `float-buoy` | buoy bob: reuse `float` with shorter duration (no new recipe) | `lifebuoy` (fixes nonsensical `ring` fallback) |
| *(existing)* `ellipsis-pulse` | 3 dots stagger (custom 3-tag icon) | `more-vertical` |
| *(existing)* `pulse-scale` | remains the honest generic default | `github` and any unmatched future icon |

**Result:** `pulse-scale` drops from 75 icons to ≤ 3 (`github` + true fallbacks). `ICON_ANIMATIONS` grows ~70 explicit entries; `FALLBACK_ANIMATIONS` keeps generic patterns only (its `() => true` default stays `pulse-scale`).

**Also fixed in passing (same fallback lines):** `lifebuoy` ring→float, `more-vertical` default→ellipsis-pulse. The `arrow-*-on-rectangle`/`arrow-*-on-square` icons move from fallback defaults to explicit entries.

**Rejected alternatives:**

- Splitting single-path Heroicons SVGs into multiple paths to enable `pathClasses` everywhere — rejected: violates "no SVG changes" and the generated-files rule; huge churn.
- One mega-recipe with 10 `args` — rejected: unreadable; named recipes self-document the mapping.
- JS-driven animation — rejected by project non-goals (CSS only).

## Files to touch

| File | Change |
|---|---|
| `scripts/animations.mjs` | Phase 0 dedupe; ~20 new builders in `RECIPES`; ~70 new `ICON_ANIMATIONS` entries; adjust ~6 `FALLBACK_ANIMATIONS` lines |
| `packages/icons/src/icons/*.ts` (+ specs) | 🤖 regenerated via `pnpm run generate:icons --overwrite` — never hand-edited |
| `CHANGELOG.md` | minor entry |
| `docs/ai/STATE.md` | recent-changes + in-progress update |
| `docs/specs/README.md` | index entry |

## Acceptance criteria

- [x] No duplicate keys in `ICON_ANIMATIONS` (verified by a script/one-liner over the source).
- [x] `pulse-scale` resolves for ≤ 3 of the 362 icons (same measurement script as Motivation) → **1 icon** (`github`, by decision).
- [x] Every icon in the Phase-1 table resolves to its listed recipe → 85 mappings script-verified.
- [x] Every new recipe defines `0%` and `100%`, uses `both` fill, and has no `infinite` → 34 recipes script-verified.
- [x] `pnpm run generate:icons --overwrite` produces the regen diff; `pnpm run check` passes (lint + typecheck + **3648 unit tests** + build:lib + publint).
- [ ] Manual pass in `pnpm run dev`: one representative icon per new recipe animates semantically in **both** variants (outline + filled), and does **not** animate with OS reduced-motion enabled. **← pending, needs human eyeballs**
- [x] `CHANGELOG.md` (minor) and `docs/ai/STATE.md` updated.

## Test plan

- Generated per-icon specs already assert render + ARIA; regeneration keeps them green — no spec-template change needed.
- Add one unit test asserting `resolveAnimation` has no duplicate-shadowed keys? — decision: enforce via the acceptance-criteria script instead (animations.mjs has no test harness today; adding one is out of scope).
- Manual: dev-app playground matrix for ~8 representative icons (`eye`, `chevron-double-up`, `arrow-trending-up`, `log-in`, `database`, `computer-desktop`, `chat-bubble-left`, `face-smile`) × both variants × reduced-motion on/off.

## Risks & rollback

- **Large regen diff** (~90 icon files change styles) — expected and normal per W3; committed separately as `chore(icons): regenerate icons`.
- **A new recipe looks wrong on the filled variant** — catch in the manual matrix; fix by tuning the recipe's non-stroke parts, not per-icon hacks.
- **pathClasses order mismatch** (classes apply by tag order) — verify on the multi-path targets (`chevron-double-*`, `grid`, `ellipsis`); worst case the stagger order looks off, still harmless.
- **Bundle/tree-shaking** — unaffected: keyframes are scoped per icon component; consumers only get CSS for icons they import.
- Rollback: `git revert` of the animations.mjs commit + regen; no API or data migration involved.

## Open questions

*(Resolved 2026-08-17 with maintainer — spec approved.)*

1. ~~Phase-0 conflict resolutions~~ → **approved**: restore the semantic motions (`cloud-arrow-down/up` → download/upload-arrow, `document-magnifying-glass` → zoom).
2. ~~`github`~~ → **decided**: keeps the generic `pulse-scale` (brand logo; honest default).
3. ~~Phase 2/3 timing~~ → **decided**: own specs, after this one lands.

## Implementation notes (deviations recorded during implementation)

### Addendum 2026-08-18 — directed batch: first 15 catalog icons

Maintainer-directed per-icon refinements on top of Phase 1. New generator capabilities (all inside `scripts/animations.mjs` + 2 call sites in `generate-icons.mjs`):

- **`splitPaths` recipe flag** — the generator splits compound `<path>` d's into one element per subpath (utility `splitSubpaths`, with a current-point tracker that converts non-initial relative `m` subpath starts to absolute `M` while preserving any following implicit relative `l` segments). The related `reversePaths` flag reverses selected straight shafts when source geometry begins at an arrow tip, so stroke drawing runs tail → tip. Enables true per-part motion (slider pins, box lids, arrow-only draws) without touching SVG sources. Outline-only by default; `'both'` possible after checking filled winding.
- **Variant markers in `composeStyles`** — recipes may write `.lmn-animate--outline` / `.lmn-animate--filled`, composed to `:host(.lmn-animate:not(.lmn-filled))` / `:host(.lmn-animate.lmn-filled)`, so variants can animate differently.
- **Whitespace fix**: `applyPathClasses` collapses double spaces left when a stripped class attribute is removed.

Per-icon results:

| Icon | Recipe | Motion |
|---|---|---|
| `academic-cap` | `cap-toss-fade` (replaces Phase-1 `cap-toss`) | cap flies up rotating, fades out, fades back in place |
| `adjustments-horizontal` / `-vertical` | `slider-pins` (replaces `slider-nudge`) | outline split in 12 subpaths; only the 3 knobs slide along their track (filled: whole-icon nudge) |
| `alert-circle` | `wiggle` (unchanged, approved as-is) | — |
| `archive-box` | `archive-peek` | lid lifts and closes (lid animates in both variants) |
| `archive-box-arrow-down` | `archive-drop` | lid opens → arrow drops in → lid closes |
| `archive-box-x-mark` | `archive-reject` | lid opens → X pops out → lid closes |
| `arrow-down`, `arrow-left`, `arrow-down-left`, `arrow-down-right` | `draw-drift` | shaft draws from tail to tip, then the arrowhead resolves with a subtle directional drift |
| `arrow-down-circle`, `arrow-down-tray`, `arrow-down-on-square(-stack)` | `draw-part` | outline shaft draws from tail to tip before its head (container stays); filled: whole lunge + arrow-path opacity dip |

`cap-toss` and `slider-nudge` recipes were removed (single-use, superseded). All other Phase-1 mappings unchanged.

### Original Phase-0/1 notes

- **Recipe reuse instead of new recipes** (same semantic motion already exists): `arrow-down-on-square(-stack)` → existing `download-arrow`, `arrow-up-on-square(-stack)` → existing `upload-arrow` (drops `slot-in`/`slot-out`); `briefcase` → existing `lock-click` (drops `case-click`); `wallet` → existing `calendar-flip` (drops `wallet-open`); `link` → existing `draw-underline`, `link-slash` → existing `draw-strikethrough` (drops `link-connect`/`link-break`). *(Note: `arrow-down-on-square(-stack)` were later re-directed to `draw-part` in the 2026-08-18 batch above.)*
- **Generator fix included** (`applyPathClasses` in `scripts/animations.mjs`): existing `lmn-path-N` classes are stripped before re-applying. Pre-existing bug: every `--overwrite` regen appended duplicate classes to custom icons (e.g. `menu.ts` had `lmn-path-1` ×6). The regen in this spec also cleans those files.
- **Dead entry removed**: `ellipsis` key in `ICON_ANIMATIONS` (no such icon exists; only `ellipsis-horizontal`/`ellipsis-vertical`/`ellipsis-horizontal-circle`).
- `cell-pop` declares 4 `pathClasses` with stagger delays; single-path icons only receive `lmn-path-1` (delay 0), so one recipe covers both multi-cell customs (e.g. `grid`, 4 tags) and single-path Heroicons.
