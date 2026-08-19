# Spec: Animate the mechanism, not the glyph

- **Status:** done
- **Date:** 2026-08-19
- **Author:** agent session (maintainer-directed, verified by Playwright filmstrip)
- **Semver impact:** patch — CSS + SVG-structure changes inside existing icon
  components; no API, selector, export or default-input change.

## Summary

The previous pass made every animation *visible*. This one makes a directed set of
them *mean something specific*: a house opens and shuts its door, a face's mouth starts
flat and curves into its expression, every `*-slash` icon draws its bar across the glyph
after the glyph has settled, an open padlock closes and springs open again, and a screen
powers on like a CRT. Ten new recipes cover 26 icons.

## Motivation

Direct maintainer review of the catalog: several icons had motion that was perceptible
but still generic — the icon scaled or faded as one blob where the meaning lives in a
specific part. The requests were concrete, and each maps to a mechanism the outline
already contains as a separate subpath.

## Design

### A geometric detector for strike-through bars

Heroicons splits the diagonal bar of a `*-slash` icon into several collinear segments,
and the indices differ per icon (`bolt-slash` uses 3, `bell-slash` 2, `no-symbol` 1), so
hardcoding them per icon would be fragile. `tagSlashPaths()` instead finds them
geometrically: a subpath that is a single straight move+line running along the
top-left→bottom-right diagonal, within ~12° of 45°, longer than 1.2 units. Segments are
authored in either direction, so the test is on `dx * dy > 0` rather than both positive.

Matching subpaths get `lmn-slash` plus `pathLength="1"`; everything else gets
`lmn-body`. The generator applies this when a recipe sets `slashPaths: true`.

### The recipes

| Recipe | Icons | Motion |
|---|---|---|
| `slash-strike` | 11 `*-slash` / `*-x-mark` / `no-symbol` | Glyph settles, then the bar is **drawn** across it |
| `door-swing` | home | The door swings open and shuts again |
| `folder-lid` | folder | The front panel tilts open and drops shut |
| `mouth-curve` | face-smile, face-frown, smile | The mouth starts flat (`scaleY(0.04)`) and curves into its expression |
| `lock-cycle` | lock-open | Shackle slides over and locks, then springs back open — the icon still ends open |
| `crt-power` | tv, computer-desktop, device-tablet | Picture starts as a scan line, snaps to full height with a phosphor flood, settles |
| `clock-hands` | clock | The hands sweep round to rest, pivoting on the dial centre |
| `envelope-flap` | envelope, mail | The flap falls open and closes |
| `terminal-prompt` | terminal, command-line | The chevron is drawn, then the cursor blinks in |
| `wallet-card` | wallet | A card drops into the wallet and seats |

Two details worth recording:

- **`home`'s door is not its own subpath** — walls and door share one path. It is
  mirrored by a `::after` pseudo-element hinged on the left jamb, sized as a share of
  the 24-unit viewBox (the same technique `trash-lid` uses for its discard artifact).
- **`clock`'s hands must pivot on the dial, not their own box.** Every other recipe
  relies on the shared `transform-box: fill-box`; the hands override it with
  `transform-box: view-box; transform-origin: 12px 12px`.

`mouth-curve`, `crt-power`, `envelope-flap` and `terminal-prompt` take the part indices
as args, so the same recipe serves icons whose subpath order differs (`face-smile` has
the mouth at 1 of 6, the custom `smile` at 2 of 4).

## Results

| | Before this pass | After |
|---|---|---|
| Expressive recipes | 293 (85%) | **299 (87%)** |
| Below perceptibility at 24 px | 1 | 1 (`briefcase`, a classifier false positive) |
| Icons reaching `opacity: 0` mid-animation | 0 | 0 |
| Recipes | 137 | 147 |

The only mid-animation `opacity: 0` in the catalog belongs to `trash`'s `::after`
discard artifact, which is meant to be invisible before and after its arc — the glyph
itself never disappears.

## Acceptance criteria

- [x] Each requested behaviour verified frame by frame in a filmstrip.
- [x] Every recipe ends at its rest state (`lock-open` ends open, `no-symbol` ends struck).
- [x] No new duplicate keys in `RECIPES`.
- [x] `pnpm run check` passes (3654 unit tests + publint).
- [x] `pnpm run test:e2e` passes (26 tests).

## Verification

Filmstrips confirmed: the house door swings out and shuts; the folder panel lifts; the
smile and frown mouths begin as flat lines; `lock-open` closes to a padlock and springs
open again; the clock hands sweep; the TV opens from a scan line with a visible phosphor
flood; the wallet card drops in; `bolt-slash`, `eye-slash`, `no-symbol`,
`video-camera-slash`, `bell-slash`, `link-slash`, `signal-slash`, `bookmark-slash` and
`speaker-x-mark` all settle first and then draw their bar; the terminal prompt draws its
chevron and blinks its cursor; the envelope flap opens.

## Risks & rollback

- `tagSlashPaths` is heuristic. It found the bar in all 11 targeted icons, and returns
  nothing for `slash` itself (whose diagonal runs the other way) — that icon keeps its
  previous recipe. A future icon whose glyph contains an incidental 45° stroke could be
  mis-tagged; the filmstrip is the check.
- `door-swing` and `crt-power` position pseudo-elements by percentage of the icon box.
  They track the glyph at any `size`, but a future redraw of `home` or `tv` would need
  those percentages revisited.
- Rollback is `git revert` of one commit plus `generate-icons.mjs --overwrite`.

## Open questions

- `speaker-x-mark`, `phone-x-mark` and `archive-box-x-mark` carry an **X**, not a single
  bar; `slash-strike` draws one diagonal as the "slash" and treats the other as body, so
  the cross assembles slightly asymmetrically. A dedicated `x-strike` that draws both
  strokes in sequence would read better.
