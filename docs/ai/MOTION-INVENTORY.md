# Semantic motion inventory

> **Generated** by `node scripts/motion-inventory.mjs` — do not edit by hand.
> Judgements live in [`motion-reviews.json`](motion-reviews.json); everything else is
> derived from the catalog and `resolveAnimation()`. `--check` (and its unit test) fails
> when this file is stale or the record is inconsistent.

## How to read this

Grades describe whether an icon's motion communicates its meaning, mechanism or state
change — not merely whether it moves. An icon's grade is the weaker of its outline and
filled grades, and it counts as **certified** only when both variants were visually
verified (filmstrip at 24 px; see `scripts/motion-filmstrip.mjs`) and the grade is A or B.
Icons nobody has reviewed are `unreviewed` — they are **not** graded by recipe name.

| Grade | Meaning |
|---|---|
| A | Strongly semantic |
| B | Semantic family |
| C | Acceptable generic |
| D | Weak / generic fallback |
| E | Wrong semantics |

## Summary

| Metric | Value |
|---|---|
| Catalog icons | 362 |
| Recipes | 161 |
| Explicit mappings | 350 |
| Pattern-fallback mappings | 11 |
| Global-default mappings | 1 |
| Reviewed (outline + filled) | 36 |
| Review incomplete | 0 |
| Unreviewed | 326 |
| Certified A/B | 36 (A 16 · B 20) |
| Reviewed C/D/E | 0 (C 0 · D 0 · E 0) |
| **Certified semantic coverage** | **9.9%** (36 / 362) |

## Batches

| Batch | Status | Icons | Spec |
|---|---|---|---|
| batch-01 | complete | 12 | [2026-11-04-semantic-motion-batch-01.md](../specs/2026-11-04-semantic-motion-batch-01.md) |
| batch-02 | complete | 19 | [2026-11-04-semantic-motion-batch-02.md](../specs/2026-11-04-semantic-motion-batch-02.md) |
| batch-03 | complete | 5 | [2026-11-04-semantic-motion-batch-03.md](../specs/2026-11-04-semantic-motion-batch-03.md) |

### batch-01

| Icon | Before | After | Grade (outline / filled) | Story |
|---|---|---|---|---|
| `folder-open` | folder-pop (D) | folder-open-swing | A (A / A) | The front panel starts stood up (closed) and falls forward onto the drawing's open pose; the back panel never moves. |
| `folder-plus` | folder-pop (D) | folder-action | B (A / B) | The plus turns in from a point and lands with a small overshoot; the folder stays put. |
| `folder-minus` | folder-pop (D) | folder-action | B (B / B) | The minus collapses to a point (taken out) and springs back; the folder stays put. |
| `folder-arrow-down` | folder-pop (E) | arrow-into-receiver | B (A / B) | The arrow is drawn down from above the folder into it, then the head resolves; the folder takes a slight impact. |
| `inbox` | folder-pop (D) | tray-receive | B (B / B) | The tray floor drops in from the tray mouth, narrowed to stay between the walls, and lands; the tray takes the weight. |
| `inbox-arrow-down` | folder-pop (E) | arrow-into-receiver | A (A / A) | The arrow is drawn down into the tray through the gap in its rim; the tray takes a small impact. |
| `inbox-stack` | folder-pop (D) | tray-stack | A (A / A) | The lower tray rises into place, then the upper tray is set down on it and the lower one takes the weight. |
| `clipboard` | file-appear (D) | clipboard-secure | B (A / B) | The clip springs open, holds, and snaps shut on the board. |
| `clipboard-document` | file-appear (D) | clipboard-secure | A (A / A) | The clip opens, the document slides under it and is pinned as the clip snaps shut. |
| `clipboard-document-list` | file-appear (D) | clipboard-secure | B (A / B) | Each row checks in, in order: its bullet pops, then its line is written. |
| `file` | file-appear (D) | page-corner | B (A / B) | The sheet is drawn, then its dog-ear folds down from the corner. |
| `newspaper` | file-appear (D) | newspaper-layout | B (A / B) | The photo block is placed, then the columns are set line by line. |

### batch-02

| Icon | Before | After | Grade (outline / filled) | Story |
|---|---|---|---|---|
| `bell` | ring (C) | bell-ring | B (A / B) | The bell swings from its crown with a decaying oscillation; the clapper lags and swings wider, against it. |
| `bell-alert` | ring (C) | bell-ring | A (A / A) | The bell rings (clapper lagging) while the alert waves pulse outward twice. |
| `bell-snooze` | ring (D) | bell-ring | B (A / B) | A drowsy half-swing while the Z drifts up, tilts and settles. |
| `bell-slash` | slash-strike (B) | slash-strike | B (A / B) | The bell starts to ring and is silenced as the bar strikes through it. |
| `heart` | beat (C) | heartbeat | A (A / A) | A heartbeat: a strong lub, a softer dub, a settle. |
| `star` | beat (D) | star-twinkle | B (B / B) | Favourited: the star spins in by one point (identical silhouette at both ends) and pops past its size. |
| `check` | draw-scale (B) | check-tick | A (A / A) | The tick is written stroke-first and lands with a small pop. |
| `check-circle` | draw-scale (C) | check-tick | B (A / B) | The ring stays; it is pressed like a button while the tick is written and pops. |
| `check-badge` | draw-scale (C) | check-tick | B (A / B) | The badge stays; it is pressed like a button while the tick is written and pops. |
| `x-mark` | x-from-pause (D) | x-close | A (A / A) | Close: the two strokes are written one after the other while the X makes a quarter turn into place. |
| `x-circle` | x-from-pause (D) | x-close | A (A / A) | The X swirls in a quarter turn inside the ring, which is pressed as it lands. |
| `exclamation-circle` | wiggle (D) | alert-mark | B (A / B) | The ! springs up from its base, overshoots and settles; the dot pops as it lands; the ring flinches. |
| `exclamation-triangle` | wiggle (D) | alert-mark | B (A / B) | The ! springs up from its base; the dot pops; the triangle flinches on its base. |
| `question-mark-circle` | wiggle (D) | alert-mark | A (A / A) | The hook tilts like a puzzled head and the dot bounces. |
| `information-circle` | wiggle (D) | alert-mark | B (A / B) | The dot drops onto the stem, which takes the weight. |
| `hand-thumb-up` | thumbs-up (B) | thumb-gesture | A (A / A) | A wind-up, then the hand thrusts up from the wrist, overshoots and settles. |
| `hand-thumb-down` | thumbs-down (B) | thumb-gesture | A (A / A) | A wind-up, then the hand thrusts down from the wrist, overshoots and settles. |
| `face-smile` | mouth-curve (C) | mouth-curve | A (A / A) | The mouth curves into a smile and the eyes blink; filled, the head bobs happily. |
| `face-frown` | mouth-curve (C) | mouth-curve | A (A / A) | The mouth sags into a frown and the eyes blink; filled, the head droops. |

### batch-03

| Icon | Before | After | Grade (outline / filled) | Story |
|---|---|---|---|---|
| `x` | x-from-pause (E) | x-close | A (A / A) | Close: the strokes are written in sequence during a quarter turn into place. |
| `checkbox` | draw-scale (E) | check-tick | B (A / B) | The box stays and is pressed like a button while the tick is written and lands. |
| `info` | wiggle (E) | alert-mark | B (A / B) | The dot drops onto the stem, which takes the weight. |
| `alert-circle` | alert-signal (E) | alert-mark | B (A / B) | The ! springs up from its base, the dot pops on landing, the ring flinches. |
| `smile` | mouth-curve (E) | mouth-curve | A (A / A) | The mouth curves into a smile and the eyes blink; filled, the head bobs. |

## Flags

Errors: none.

**Stale mappings — ICON_ANIMATIONS keys with no catalog icon** (1)

`video`

**Unused recipes** (21)

`alert-signal`, `archive-reject`, `beat`, `cart-roll`, `clock-tick`, `draw-part`, `flash`, `fly`, `folder-pop`, `grin`, `menu-morph`, `mute-fade`, `no-shake`, `ring`, `search`, `shake`, `swing`, `thumbs-down`, `thumbs-up`, `unlock`, `x-from-pause`

**Global-default fallbacks** (1)

`github`

## All icons

| Icon | Recipe | Source | Family | Status | Grade | Outline | Filled |
|---|---|---|---|---|---|---|---|
| `academic-cap` | cap-toss-fade | explicit | — | unreviewed | — | — | — |
| `adjustments-horizontal` | slider-pins | explicit | — | unreviewed | — | — | — |
| `adjustments-vertical` | slider-pins | explicit | — | unreviewed | — | — | — |
| `alert-circle` | alert-mark | explicit | alerts | reviewed | B | verified | verified |
| `archive-box` | archive-peek | explicit | — | unreviewed | — | — | — |
| `archive-box-arrow-down` | archive-drop | explicit | — | unreviewed | — | — | — |
| `archive-box-x-mark` | slash-strike | explicit | — | unreviewed | — | — | — |
| `arrow-down` | draw-drift | explicit | — | unreviewed | — | — | — |
| `arrow-down-circle` | arrow-in-circle | explicit | — | unreviewed | — | — | — |
| `arrow-down-left` | draw-drift | explicit | — | unreviewed | — | — | — |
| `arrow-down-on-square` | arrow-into-receiver | explicit | — | unreviewed | — | — | — |
| `arrow-down-on-square-stack` | arrow-into-receiver | explicit | — | unreviewed | — | — | — |
| `arrow-down-right` | draw-drift | explicit | — | unreviewed | — | — | — |
| `arrow-down-tray` | arrow-into-receiver | explicit | — | unreviewed | — | — | — |
| `arrow-left` | draw-drift | explicit | — | unreviewed | — | — | — |
| `arrow-left-circle` | arrow-in-circle | explicit | — | unreviewed | — | — | — |
| `arrow-left-end-on-rectangle` | arrow-through-rectangle | explicit | — | unreviewed | — | — | — |
| `arrow-left-on-rectangle` | arrow-through-rectangle | explicit | — | unreviewed | — | — | — |
| `arrow-left-start-on-rectangle` | arrow-through-rectangle | explicit | — | unreviewed | — | — | — |
| `arrow-long-down` | draw-drift | explicit | — | unreviewed | — | — | — |
| `arrow-long-left` | draw-drift | explicit | — | unreviewed | — | — | — |
| `arrow-long-right` | draw-drift | explicit | — | unreviewed | — | — | — |
| `arrow-long-up` | draw-drift | explicit | — | unreviewed | — | — | — |
| `arrow-path` | spin | explicit | — | unreviewed | — | — | — |
| `arrow-path-rounded-square` | parallel-arrow-draw | explicit | — | unreviewed | — | — | — |
| `arrow-right` | draw-drift | explicit | — | unreviewed | — | — | — |
| `arrow-right-circle` | arrow-in-circle | explicit | — | unreviewed | — | — | — |
| `arrow-right-end-on-rectangle` | arrow-through-rectangle | explicit | — | unreviewed | — | — | — |
| `arrow-right-on-rectangle` | arrow-through-rectangle | explicit | — | unreviewed | — | — | — |
| `arrow-right-start-on-rectangle` | arrow-through-rectangle | explicit | — | unreviewed | — | — | — |
| `arrow-small-down` | slide-down | explicit | — | unreviewed | — | — | — |
| `arrow-small-left` | slide-left | explicit | — | unreviewed | — | — | — |
| `arrow-small-right` | slide-right | explicit | — | unreviewed | — | — | — |
| `arrow-small-up` | slide-up | explicit | — | unreviewed | — | — | — |
| `arrow-top-right-on-square` | arrow-bounce | explicit | — | unreviewed | — | — | — |
| `arrow-trending-down` | trend-draw | explicit | — | unreviewed | — | — | — |
| `arrow-trending-up` | trend-draw | explicit | — | unreviewed | — | — | — |
| `arrow-turn-down-left` | turn-draw | explicit | — | unreviewed | — | — | — |
| `arrow-turn-down-right` | turn-draw | explicit | — | unreviewed | — | — | — |
| `arrow-turn-left-down` | turn-draw | explicit | — | unreviewed | — | — | — |
| `arrow-turn-left-up` | turn-draw | explicit | — | unreviewed | — | — | — |
| `arrow-turn-right-down` | turn-draw | explicit | — | unreviewed | — | — | — |
| `arrow-turn-right-up` | turn-draw | explicit | — | unreviewed | — | — | — |
| `arrow-turn-up-left` | turn-draw | explicit | — | unreviewed | — | — | — |
| `arrow-turn-up-right` | turn-draw | explicit | — | unreviewed | — | — | — |
| `arrow-up` | slide-up | explicit | — | unreviewed | — | — | — |
| `arrow-up-circle` | slide-up | pattern | — | unreviewed | — | — | — |
| `arrow-up-left` | slide-up | pattern | — | unreviewed | — | — | — |
| `arrow-up-on-square` | upload-arrow | explicit | — | unreviewed | — | — | — |
| `arrow-up-on-square-stack` | upload-arrow | explicit | — | unreviewed | — | — | — |
| `arrow-up-right` | draw-drift | explicit | — | unreviewed | — | — | — |
| `arrow-up-tray` | upload-arrow | explicit | — | unreviewed | — | — | — |
| `arrow-uturn-down` | turn-draw | explicit | — | unreviewed | — | — | — |
| `arrow-uturn-left` | turn-draw | explicit | — | unreviewed | — | — | — |
| `arrow-uturn-right` | turn-draw | explicit | — | unreviewed | — | — | — |
| `arrow-uturn-up` | turn-draw | explicit | — | unreviewed | — | — | — |
| `arrows-pointing-in` | converge | explicit | — | unreviewed | — | — | — |
| `arrows-pointing-out` | diverge | explicit | — | unreviewed | — | — | — |
| `arrows-right-left` | swap-x | explicit | — | unreviewed | — | — | — |
| `arrows-up-down` | swap-y | explicit | — | unreviewed | — | — | — |
| `at-symbol` | typewriter | explicit | — | unreviewed | — | — | — |
| `avatar` | bounce | explicit | — | unreviewed | — | — | — |
| `backspace` | typewriter | pattern | — | unreviewed | — | — | — |
| `backward` | slide-left | pattern | — | unreviewed | — | — | — |
| `badge` | shine | explicit | — | unreviewed | — | — | — |
| `banknotes` | banknote-flutter | explicit | — | unreviewed | — | — | — |
| `bars-2` | bars-stagger | explicit | — | unreviewed | — | — | — |
| `bars-3` | bars-stagger | explicit | — | unreviewed | — | — | — |
| `bars-3-bottom-left` | bars-stagger | explicit | — | unreviewed | — | — | — |
| `bars-3-bottom-right` | bars-stagger | explicit | — | unreviewed | — | — | — |
| `bars-3-center-left` | bars-stagger | explicit | — | unreviewed | — | — | — |
| `bars-4` | bars-stagger | explicit | — | unreviewed | — | — | — |
| `bars-arrow-down` | bars-arrow | explicit | — | unreviewed | — | — | — |
| `bars-arrow-up` | bars-arrow | explicit | — | unreviewed | — | — | — |
| `battery-0` | battery-charge | explicit | — | unreviewed | — | — | — |
| `battery-100` | battery-charge | explicit | — | unreviewed | — | — | — |
| `battery-50` | battery-charge | explicit | — | unreviewed | — | — | — |
| `beaker` | wiggle | explicit | — | unreviewed | — | — | — |
| `bell` | bell-ring | explicit | notifications | reviewed | B | verified | verified |
| `bell-alert` | bell-ring | explicit | notifications | reviewed | A | verified | verified |
| `bell-slash` | slash-strike | explicit | notifications | reviewed | B | verified | verified |
| `bell-snooze` | bell-ring | explicit | notifications | reviewed | B | verified | verified |
| `bold` | bold-thicken | explicit | — | unreviewed | — | — | — |
| `bolt` | bolt-thicken | explicit | — | unreviewed | — | — | — |
| `bolt-slash` | slash-strike | explicit | — | unreviewed | — | — | — |
| `book-open` | book-open | explicit | — | unreviewed | — | — | — |
| `bookmark` | bookmark-fold | explicit | — | unreviewed | — | — | — |
| `bookmark-slash` | slash-strike | explicit | — | unreviewed | — | — | — |
| `bookmark-square` | bookmark-fold | explicit | — | unreviewed | — | — | — |
| `briefcase` | lock-click | explicit | — | unreviewed | — | — | — |
| `bug-ant` | crawl | explicit | — | unreviewed | — | — | — |
| `building-library` | stack-rise | explicit | — | unreviewed | — | — | — |
| `building-office` | stack-rise | explicit | — | unreviewed | — | — | — |
| `building-office-2` | stack-rise | explicit | — | unreviewed | — | — | — |
| `building-storefront` | stack-rise | explicit | — | unreviewed | — | — | — |
| `cake` | glow | explicit | — | unreviewed | — | — | — |
| `calculator` | typewriter | explicit | — | unreviewed | — | — | — |
| `calendar` | calendar-flip | explicit | — | unreviewed | — | — | — |
| `calendar-date-range` | calendar-flip | explicit | — | unreviewed | — | — | — |
| `calendar-days` | calendar-flip | explicit | — | unreviewed | — | — | — |
| `camera` | camera-shutter | explicit | — | unreviewed | — | — | — |
| `chart-bar` | chart-bars-stagger | explicit | — | unreviewed | — | — | — |
| `chart-bar-square` | chart-bars-stagger | explicit | — | unreviewed | — | — | — |
| `chart-pie` | chart-pie-slice | explicit | — | unreviewed | — | — | — |
| `chat-bubble-bottom-center` | bubble-pop | explicit | — | unreviewed | — | — | — |
| `chat-bubble-bottom-center-text` | bubble-pop | explicit | — | unreviewed | — | — | — |
| `chat-bubble-left` | bubble-pop | explicit | — | unreviewed | — | — | — |
| `chat-bubble-left-ellipsis` | bubble-pop | explicit | — | unreviewed | — | — | — |
| `chat-bubble-left-right` | bubble-pop | explicit | — | unreviewed | — | — | — |
| `chat-bubble-oval-left` | bubble-pop | explicit | — | unreviewed | — | — | — |
| `chat-bubble-oval-left-ellipsis` | bubble-pop | explicit | — | unreviewed | — | — | — |
| `check` | check-tick | explicit | feedback | reviewed | A | verified | verified |
| `check-badge` | check-tick | explicit | feedback | reviewed | B | verified | verified |
| `check-circle` | check-tick | explicit | feedback | reviewed | B | verified | verified |
| `checkbox` | check-tick | explicit | feedback | reviewed | B | verified | verified |
| `chevron-double-down` | chevron-cascade | explicit | — | unreviewed | — | — | — |
| `chevron-double-left` | chevron-cascade | explicit | — | unreviewed | — | — | — |
| `chevron-double-right` | chevron-cascade | explicit | — | unreviewed | — | — | — |
| `chevron-double-up` | chevron-cascade | explicit | — | unreviewed | — | — | — |
| `chevron-down` | slide-down | explicit | — | unreviewed | — | — | — |
| `chevron-left` | slide-left | explicit | — | unreviewed | — | — | — |
| `chevron-right` | slide-right | explicit | — | unreviewed | — | — | — |
| `chevron-up` | slide-up | explicit | — | unreviewed | — | — | — |
| `chevron-up-down` | swap-y | explicit | — | unreviewed | — | — | — |
| `circle-stack` | stack-assemble | explicit | — | unreviewed | — | — | — |
| `clipboard` | clipboard-secure | explicit | clipboard-documents | reviewed | B | verified | verified |
| `clipboard-document` | clipboard-secure | explicit | clipboard-documents | reviewed | A | verified | verified |
| `clipboard-document-check` | copy-offset | explicit | — | unreviewed | — | — | — |
| `clipboard-document-list` | clipboard-secure | explicit | clipboard-documents | reviewed | B | verified | verified |
| `clock` | clock-hands | explicit | — | unreviewed | — | — | — |
| `cloud` | float | explicit | — | unreviewed | — | — | — |
| `cloud-arrow-down` | cloud-transfer | explicit | — | unreviewed | — | — | — |
| `cloud-arrow-up` | cloud-transfer | explicit | — | unreviewed | — | — | — |
| `code-bracket` | typewriter | explicit | — | unreviewed | — | — | — |
| `code-bracket-square` | typewriter | explicit | — | unreviewed | — | — | — |
| `cog` | rotate-once | explicit | — | unreviewed | — | — | — |
| `cog-6-tooth` | rotate-once | explicit | — | unreviewed | — | — | — |
| `cog-8-tooth` | rotate-once | explicit | — | unreviewed | — | — | — |
| `command-line` | terminal-prompt | explicit | — | unreviewed | — | — | — |
| `computer-desktop` | crt-power | explicit | — | unreviewed | — | — | — |
| `copy` | copy-offset | explicit | — | unreviewed | — | — | — |
| `cpu-chip` | core-pulse | explicit | — | unreviewed | — | — | — |
| `credit-card` | credit-card-swipe | explicit | — | unreviewed | — | — | — |
| `cube` | rotate-once | explicit | — | unreviewed | — | — | — |
| `cube-transparent` | rotate-once | explicit | — | unreviewed | — | — | — |
| `currency-bangladeshi` | banknote-flutter | explicit | — | unreviewed | — | — | — |
| `currency-dollar` | banknote-flutter | explicit | — | unreviewed | — | — | — |
| `currency-euro` | banknote-flutter | explicit | — | unreviewed | — | — | — |
| `currency-pound` | banknote-flutter | explicit | — | unreviewed | — | — | — |
| `currency-rupee` | banknote-flutter | explicit | — | unreviewed | — | — | — |
| `currency-yen` | banknote-flutter | explicit | — | unreviewed | — | — | — |
| `cursor-arrow-rays` | tap | explicit | — | unreviewed | — | — | — |
| `cursor-arrow-ripple` | tap | explicit | — | unreviewed | — | — | — |
| `database` | stack-rise | explicit | — | unreviewed | — | — | — |
| `device-phone-mobile` | phone-vibrate | explicit | — | unreviewed | — | — | — |
| `device-tablet` | crt-power | explicit | — | unreviewed | — | — | — |
| `divide` | stretch-x | explicit | — | unreviewed | — | — | — |
| `document` | document-draw | explicit | — | unreviewed | — | — | — |
| `document-arrow-down` | document-draw | explicit | — | unreviewed | — | — | — |
| `document-arrow-up` | document-draw | explicit | — | unreviewed | — | — | — |
| `document-chart-bar` | document-draw | explicit | — | unreviewed | — | — | — |
| `document-check` | document-draw | explicit | — | unreviewed | — | — | — |
| `document-currency-bangladeshi` | file-appear | pattern | — | unreviewed | — | — | — |
| `document-currency-dollar` | file-appear | pattern | — | unreviewed | — | — | — |
| `document-currency-euro` | file-appear | pattern | — | unreviewed | — | — | — |
| `document-currency-pound` | file-appear | pattern | — | unreviewed | — | — | — |
| `document-currency-rupee` | file-appear | pattern | — | unreviewed | — | — | — |
| `document-currency-yen` | file-appear | pattern | — | unreviewed | — | — | — |
| `document-duplicate` | copy-offset | explicit | — | unreviewed | — | — | — |
| `document-magnifying-glass` | zoom | explicit | — | unreviewed | — | — | — |
| `document-minus` | document-draw | explicit | — | unreviewed | — | — | — |
| `document-plus` | document-draw | explicit | — | unreviewed | — | — | — |
| `document-text` | document-draw | explicit | — | unreviewed | — | — | — |
| `download` | download-arrow | explicit | — | unreviewed | — | — | — |
| `edit` | scribble | explicit | — | unreviewed | — | — | — |
| `ellipsis-horizontal` | ellipsis-pulse | explicit | — | unreviewed | — | — | — |
| `ellipsis-horizontal-circle` | ellipsis-pulse | explicit | — | unreviewed | — | — | — |
| `ellipsis-vertical` | ellipsis-pulse | explicit | — | unreviewed | — | — | — |
| `envelope` | envelope-flap | explicit | — | unreviewed | — | — | — |
| `envelope-open` | open-envelope | explicit | — | unreviewed | — | — | — |
| `equals` | stretch-x | explicit | — | unreviewed | — | — | — |
| `exclamation-circle` | alert-mark | explicit | alerts | reviewed | B | verified | verified |
| `exclamation-triangle` | alert-mark | explicit | alerts | reviewed | B | verified | verified |
| `external-link` | arrow-bounce | explicit | — | unreviewed | — | — | — |
| `eye` | blink | explicit | — | unreviewed | — | — | — |
| `eye-dropper` | drip | explicit | — | unreviewed | — | — | — |
| `eye-slash` | slash-strike | explicit | — | unreviewed | — | — | — |
| `face-frown` | mouth-curve | explicit | feedback | reviewed | A | verified | verified |
| `face-smile` | mouth-curve | explicit | feedback | reviewed | A | verified | verified |
| `file` | page-corner | explicit | clipboard-documents | reviewed | B | verified | verified |
| `film` | film-roll | explicit | — | unreviewed | — | — | — |
| `filter` | funnel-drain | explicit | — | unreviewed | — | — | — |
| `finger-print` | tap | explicit | — | unreviewed | — | — | — |
| `fire` | glow | explicit | — | unreviewed | — | — | — |
| `flag` | flag-wave | explicit | — | unreviewed | — | — | — |
| `folder` | folder-lid | explicit | — | unreviewed | — | — | — |
| `folder-arrow-down` | arrow-into-receiver | explicit | folders | reviewed | B | verified | verified |
| `folder-minus` | folder-action | explicit | folders | reviewed | B | verified | verified |
| `folder-open` | folder-open-swing | explicit | folders | reviewed | A | verified | verified |
| `folder-plus` | folder-action | explicit | folders | reviewed | B | verified | verified |
| `forward` | slide-right | pattern | — | unreviewed | — | — | — |
| `funnel` | funnel-drain | explicit | — | unreviewed | — | — | — |
| `gif` | frame-flip | explicit | — | unreviewed | — | — | — |
| `gift` | gift-unbox | explicit | — | unreviewed | — | — | — |
| `gift-top` | gift-unbox | explicit | — | unreviewed | — | — | — |
| `github` | pulse-scale | global-default | — | unreviewed | — | — | — |
| `globe` | globe-spin | explicit | — | unreviewed | — | — | — |
| `globe-alt` | globe-spin | explicit | — | unreviewed | — | — | — |
| `globe-americas` | globe-spin | explicit | — | unreviewed | — | — | — |
| `globe-asia-australia` | globe-spin | explicit | — | unreviewed | — | — | — |
| `globe-europe-africa` | globe-spin | explicit | — | unreviewed | — | — | — |
| `grid` | cell-pop | explicit | — | unreviewed | — | — | — |
| `h1` | typewriter | explicit | — | unreviewed | — | — | — |
| `h2` | typewriter | explicit | — | unreviewed | — | — | — |
| `h3` | typewriter | explicit | — | unreviewed | — | — | — |
| `hand-raised` | tap | explicit | — | unreviewed | — | — | — |
| `hand-thumb-down` | thumb-gesture | explicit | feedback | reviewed | A | verified | verified |
| `hand-thumb-up` | thumb-gesture | explicit | feedback | reviewed | A | verified | verified |
| `hashtag` | typewriter | explicit | — | unreviewed | — | — | — |
| `heart` | heartbeat | explicit | feedback | reviewed | A | verified | verified |
| `home` | door-swing | explicit | — | unreviewed | — | — | — |
| `home-modern` | home-bounce | explicit | — | unreviewed | — | — | — |
| `identification` | file-appear | explicit | — | unreviewed | — | — | — |
| `image` | shutter | explicit | — | unreviewed | — | — | — |
| `inbox` | tray-receive | explicit | inbox | reviewed | B | verified | verified |
| `inbox-arrow-down` | arrow-into-receiver | explicit | inbox | reviewed | A | verified | verified |
| `inbox-stack` | tray-stack | explicit | inbox | reviewed | A | verified | verified |
| `info` | alert-mark | explicit | alerts | reviewed | B | verified | verified |
| `information-circle` | alert-mark | explicit | alerts | reviewed | B | verified | verified |
| `italic` | typewriter | explicit | — | unreviewed | — | — | — |
| `key` | key-turn-return | explicit | — | unreviewed | — | — | — |
| `language` | translate-flip | explicit | — | unreviewed | — | — | — |
| `lifebuoy` | float | explicit | — | unreviewed | — | — | — |
| `light-bulb` | glow | explicit | — | unreviewed | — | — | — |
| `link` | draw-underline | explicit | — | unreviewed | — | — | — |
| `link-slash` | slash-strike | explicit | — | unreviewed | — | — | — |
| `list` | typewriter | explicit | — | unreviewed | — | — | — |
| `list-bullet` | typewriter | explicit | — | unreviewed | — | — | — |
| `loader` | spin-infinite | explicit | — | unreviewed | — | — | — |
| `lock` | lock-shackle | explicit | — | unreviewed | — | — | — |
| `lock-closed` | lock-shackle | explicit | — | unreviewed | — | — | — |
| `lock-open` | lock-cycle | explicit | — | unreviewed | — | — | — |
| `log-in` | door-enter | explicit | — | unreviewed | — | — | — |
| `log-out` | door-exit | explicit | — | unreviewed | — | — | — |
| `magnifying-glass` | zoom | explicit | — | unreviewed | — | — | — |
| `magnifying-glass-circle` | zoom | explicit | — | unreviewed | — | — | — |
| `magnifying-glass-minus` | zoom | explicit | — | unreviewed | — | — | — |
| `magnifying-glass-plus` | zoom | explicit | — | unreviewed | — | — | — |
| `mail` | envelope-flap | explicit | — | unreviewed | — | — | — |
| `map` | globe-spin | explicit | — | unreviewed | — | — | — |
| `map-pin` | pin-drop | explicit | — | unreviewed | — | — | — |
| `megaphone` | shout | explicit | — | unreviewed | — | — | — |
| `menu` | bars-stagger | explicit | — | unreviewed | — | — | — |
| `message-circle` | bubble-pop | explicit | — | unreviewed | — | — | — |
| `microphone` | microphone-pulse | explicit | — | unreviewed | — | — | — |
| `minus` | stretch-x | explicit | — | unreviewed | — | — | — |
| `minus-circle` | stretch-x | explicit | — | unreviewed | — | — | — |
| `minus-small` | stretch-x | explicit | — | unreviewed | — | — | — |
| `moon` | moon-wobble | explicit | — | unreviewed | — | — | — |
| `more-vertical` | ellipsis-pulse | explicit | — | unreviewed | — | — | — |
| `musical-note` | music-beat | explicit | — | unreviewed | — | — | — |
| `newspaper` | newspaper-layout | explicit | clipboard-documents | reviewed | B | verified | verified |
| `no-symbol` | slash-strike | explicit | — | unreviewed | — | — | — |
| `numbered-list` | typewriter | explicit | — | unreviewed | — | — | — |
| `package` | package-pop | explicit | — | unreviewed | — | — | — |
| `paint-brush` | scribble | explicit | — | unreviewed | — | — | — |
| `paper-airplane` | send-plane | explicit | — | unreviewed | — | — | — |
| `paper-clip` | clip-flex | explicit | — | unreviewed | — | — | — |
| `paperclip` | clip-flex | explicit | — | unreviewed | — | — | — |
| `pause` | play-morph | explicit | — | unreviewed | — | — | — |
| `pause-circle` | play-morph | explicit | — | unreviewed | — | — | — |
| `pencil` | scribble | explicit | — | unreviewed | — | — | — |
| `pencil-square` | scribble | explicit | — | unreviewed | — | — | — |
| `percent-badge` | percent-pop | explicit | — | unreviewed | — | — | — |
| `phone` | phone-vibrate | explicit | — | unreviewed | — | — | — |
| `phone-arrow-down-left` | phone-vibrate | explicit | — | unreviewed | — | — | — |
| `phone-arrow-up-right` | phone-vibrate | explicit | — | unreviewed | — | — | — |
| `phone-x-mark` | slash-strike | explicit | — | unreviewed | — | — | — |
| `photo` | shutter | explicit | — | unreviewed | — | — | — |
| `play` | play-morph | explicit | — | unreviewed | — | — | — |
| `play-circle` | play-morph | explicit | — | unreviewed | — | — | — |
| `play-pause` | play-morph | explicit | — | unreviewed | — | — | — |
| `plus` | plus-draw | explicit | — | unreviewed | — | — | — |
| `plus-circle` | plus-draw | explicit | — | unreviewed | — | — | — |
| `plus-small` | plus-draw | explicit | — | unreviewed | — | — | — |
| `power` | glow | explicit | — | unreviewed | — | — | — |
| `presentation-chart-bar` | chart-bars-stagger | explicit | — | unreviewed | — | — | — |
| `presentation-chart-line` | chart-grow | explicit | — | unreviewed | — | — | — |
| `printer` | file-appear | explicit | — | unreviewed | — | — | — |
| `puzzle-piece` | puzzle-seat | explicit | — | unreviewed | — | — | — |
| `qr-code` | scan | explicit | — | unreviewed | — | — | — |
| `question-mark-circle` | alert-mark | explicit | alerts | reviewed | A | verified | verified |
| `queue-list` | cell-pop | explicit | — | unreviewed | — | — | — |
| `radio` | emit | explicit | — | unreviewed | — | — | — |
| `receipt-percent` | receipt-print | explicit | — | unreviewed | — | — | — |
| `receipt-refund` | receipt-print | explicit | — | unreviewed | — | — | — |
| `rectangle-group` | cell-pop | explicit | — | unreviewed | — | — | — |
| `rectangle-stack` | stack-assemble | explicit | — | unreviewed | — | — | — |
| `refresh-cw` | spin | explicit | — | unreviewed | — | — | — |
| `rocket-launch` | rocket-launch | explicit | — | unreviewed | — | — | — |
| `rss` | signal-double-pulse | explicit | — | unreviewed | — | — | — |
| `save` | file-appear | explicit | — | unreviewed | — | — | — |
| `scale` | scale-settle | explicit | — | unreviewed | — | — | — |
| `scissors` | scissors-snip | explicit | — | unreviewed | — | — | — |
| `search` | zoom | explicit | — | unreviewed | — | — | — |
| `send` | send-plane | explicit | — | unreviewed | — | — | — |
| `server` | stack-rise | explicit | — | unreviewed | — | — | — |
| `server-stack` | stack-assemble | explicit | — | unreviewed | — | — | — |
| `settings` | rotate-once | explicit | — | unreviewed | — | — | — |
| `share` | share-cast | explicit | — | unreviewed | — | — | — |
| `shield` | core-pulse | explicit | — | unreviewed | — | — | — |
| `shield-check` | draw-scale | explicit | — | unreviewed | — | — | — |
| `shield-exclamation` | wiggle | explicit | — | unreviewed | — | — | — |
| `shopping-bag` | bounce | explicit | — | unreviewed | — | — | — |
| `shopping-cart` | cart-wheels | explicit | — | unreviewed | — | — | — |
| `signal` | wave | explicit | — | unreviewed | — | — | — |
| `signal-slash` | slash-strike | explicit | — | unreviewed | — | — | — |
| `slash` | draw-strikethrough | explicit | — | unreviewed | — | — | — |
| `smile` | mouth-curve | explicit | feedback | reviewed | A | verified | verified |
| `sparkles` | glow | explicit | — | unreviewed | — | — | — |
| `speaker-wave` | sound-waves | explicit | — | unreviewed | — | — | — |
| `speaker-x-mark` | slash-strike | explicit | — | unreviewed | — | — | — |
| `square-2-stack` | stack-assemble | explicit | — | unreviewed | — | — | — |
| `square-3-stack-3d` | stack-assemble | explicit | — | unreviewed | — | — | — |
| `squares-2x2` | cell-pop | explicit | — | unreviewed | — | — | — |
| `squares-plus` | cell-pop | explicit | — | unreviewed | — | — | — |
| `star` | star-twinkle | explicit | feedback | reviewed | B | verified | verified |
| `stop` | play-morph | explicit | — | unreviewed | — | — | — |
| `stop-circle` | play-morph | explicit | — | unreviewed | — | — | — |
| `strikethrough` | draw-strikethrough | explicit | — | unreviewed | — | — | — |
| `sun` | sun-rays | explicit | — | unreviewed | — | — | — |
| `swatch` | fan | explicit | — | unreviewed | — | — | — |
| `table-cells` | cell-pop | explicit | — | unreviewed | — | — | — |
| `tag` | tag-swing | explicit | — | unreviewed | — | — | — |
| `terminal` | terminal-prompt | explicit | — | unreviewed | — | — | — |
| `ticket` | ticket-tear | explicit | — | unreviewed | — | — | — |
| `trash` | trash-lid | explicit | — | unreviewed | — | — | — |
| `trophy` | trophy-shine | explicit | — | unreviewed | — | — | — |
| `truck` | truck-move | explicit | — | unreviewed | — | — | — |
| `tv` | crt-power | explicit | — | unreviewed | — | — | — |
| `underline` | draw-underline | explicit | — | unreviewed | — | — | — |
| `upload` | upload-arrow | explicit | — | unreviewed | — | — | — |
| `user` | bounce | explicit | — | unreviewed | — | — | — |
| `user-circle` | bounce | explicit | — | unreviewed | — | — | — |
| `user-group` | bounce | explicit | — | unreviewed | — | — | — |
| `user-minus` | bounce | explicit | — | unreviewed | — | — | — |
| `user-plus` | bounce | explicit | — | unreviewed | — | — | — |
| `users` | bounce | explicit | — | unreviewed | — | — | — |
| `variable` | typewriter | explicit | — | unreviewed | — | — | — |
| `video-camera` | film-roll | explicit | — | unreviewed | — | — | — |
| `video-camera-slash` | slash-strike | explicit | — | unreviewed | — | — | — |
| `view-columns` | cell-pop | explicit | — | unreviewed | — | — | — |
| `viewfinder-circle` | focus-lock | explicit | — | unreviewed | — | — | — |
| `wallet` | wallet-card | explicit | — | unreviewed | — | — | — |
| `wifi` | signal-double-pulse | explicit | — | unreviewed | — | — | — |
| `window` | screen-on | explicit | — | unreviewed | — | — | — |
| `wrench` | tool-tighten | explicit | — | unreviewed | — | — | — |
| `wrench-screwdriver` | tool-tighten | explicit | — | unreviewed | — | — | — |
| `x` | x-close | explicit | feedback | reviewed | A | verified | verified |
| `x-circle` | x-close | explicit | feedback | reviewed | A | verified | verified |
| `x-mark` | x-close | explicit | feedback | reviewed | A | verified | verified |
| `zap` | glow | explicit | — | unreviewed | — | — | — |
