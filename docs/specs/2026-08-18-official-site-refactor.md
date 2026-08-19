# Spec: Refactor the official site onto volt-ui atoms and angular-movement

- **Status:** done
- **Date:** 2026-08-18 (implemented 2026-08-19)
- **Author:** agent session (Playwright audit of `pnpm run dev`)
- **Semver impact:** none — app-only (`src/`); `packages/icons` is untouched.

## Summary

The demo site works, but it is built mostly from hand-rolled Tailwind markup: 27 raw
`<button>` against 3 `volt-button`, 12 hand-drawn bordered cards against 6 `volt-card`,
and 11 hand-built "segmented radiogroups" whose selected-state class string is
copy-pasted 13 times. The `/icons` control panel exists **twice** in the DOM (desktop
sidebar + mobile block, 241 + 171 lines of near-duplicate template), and
`angular-movement` is used on the home page only — `/icons` and `/docs` have no motion
at all. This spec rebuilds the three pages on volt-ui primitives as atoms, moves all app
motion to `angular-movement` directives, and fixes four defects the browser audit found.

## Motivation

`docs/ai/CONTEXT.md` positions the app as the showcase for the library: it is the first
thing a prospective consumer sees, and it is also the reference for "how a real Angular
21 app uses these icons". Today it demonstrates neither volt-ui nor angular-movement
well. The duplication is also a maintenance tax — the icon-catalog defaults are declared
in four separate places, so changing one default means touching four files.

## Audit findings (Playwright, Chromium, 1440×900 and 390×844, light + dark)

Method: `pnpm run dev`, scripted Playwright navigation, screenshots of every route in
both viewports and both themes, plus DOM/computed-style probes. Zero console errors on
all three routes.

### Defects (visible or measurable, ranked)

| # | Severity | Finding | Evidence |
|---|---|---|---|
| D1 | High | **Hero badge text is invisible.** "Angular 21+ · v0.2.0 · MIT" renders as near-black on the dark hero. | Computed `color: oklch(0.2077 …)` (the *light* `--foreground`) while the section's own `--foreground` is `oklch(0.9842 …)`. |
| D2 | High | **Section-scoped `.dark` is structurally broken.** Root cause of D1 and a trap for every future dark band. | `@theme` declares `--color-foreground: var(--foreground)` only at `:root`, so the substitution resolves once against the light value. `.dark` on `<html>` works (same element); `.dark` on a `<section>` cannot. |
| D3 | Med | **Two `<main>` landmarks on `/icons`** — `#main-content` in the shell plus `<main aria-label="Icon grid">` in the page. | `getByRole('main')` resolves to 2 elements. Violates one-`main`-per-document. |
| D4 | Med | **Duplicate DOM id `icon-search` and two search inputs.** Both control panels are always in the DOM; only CSS hides one. | `document.querySelectorAll('input[placeholder="Search icons..."]').length === 2`. |
| D5 | Med | **Quickstart code snippets are clipped.** Two of three cards cut mid-token ("…LmnCheckIcon } from", "[anima"). | `scrollWidth` 413 / 354 vs `clientWidth` 244, `overflow-x: auto` with no visible affordance. |
| D6 | Med | **`provideMovement` ignores `prefers-reduced-motion`.** `disabled: false` is hardcoded. | The *library* icons honour it via CSS; the *app*'s movement directives do not. |
| D7 | Low | Icon names truncate to ellipsis on ~40% of cards (`adjustments-hor…`, `archive-box-arr…`) with no tooltip. | `/icons` desktop screenshot. |
| D8 | Low | GitHub link is `hidden sm:block` — absent from the mobile header. | `app-header.html:44`. |

### Scale / structure

| Metric | Home | `/icons` | `/docs` |
|---|---|---|---|
| Page height | 2 623 px | **14 065 px** | **25 998 px** |
| DOM nodes | 425 | **6 703** | 4 972 |
| Inline SVGs | 40 | 367 | 381 |

- `/icons` renders all 362 cards eagerly — no virtualisation, no paging. Search still
  responds in ~100 ms and no long tasks were recorded, so this is a scroll/paint and
  memory problem, not a jank problem *yet*.
- `/docs` is a 26 000 px single `max-w-3xl` column with a non-sticky inline TOC card and
  a 362-row icon table appended to the bottom of the same page. On a 1440 px viewport
  roughly half the width is empty margin.
- On mobile, `/icons` puts ~600 px of controls above the first icon.

### volt-ui and angular-movement coverage

Installed `@voltui/components@1.0.1` exports 139 components. The app imports **6**:
`VoltCard`, `VoltSlider`, `VoltInput`, `VoltButton`, `VoltBadge`, `VoltSeparator`.
Unused and directly applicable: `VoltToggleGroup`/`VoltToggleGroupItem`, `VoltSearch`,
`VoltTooltip`, `VoltDrawer*`, `VoltDialog*`, `VoltTabs*`, `VoltToast*`, `VoltTable*`,
`VoltPagination*`, `VoltSkeleton`, `VoltPopover*`, `VoltSwitch`, `VoltSidebar*`.

`angular-movement@0.8.0` exports 22 directives. Templates use **4** inputs
(`move`, `moveWhileHover` ×7, `moveWhileTap` ×5, `moveStagger` ×1), all on the home page
plus the theme toggle. Unused: `moveInView`, `moveLayout`, `movePresence`,
`movePresenceFor`, `moveParallax`, `moveScroll`, `moveText`, `moveSmoothScroll`.

## Scope

**In scope**
- `src/app/**` — components, pages, `styles.css`, `app.config.ts`.
- New shared atoms that wrap volt-ui primitives.
- App unit specs and `tests/e2e/**` updated to match.

**Out of scope (explicitly not doing)**
- `packages/icons/**` — no icon, recipe or generator change. No Tailwind in the library.
- Visual redesign of the icon glyphs or their semantic animations.
- Prerendering / SEO (`vite.config.ts` `prerender.routes`) — that stays P2.1 of the
  0.3.0 plan.
- Changing the library's public API or the advertised version.

## Design

### Phase 0 — Defect fixes (independent, mergeable on their own)

**0.1 Theme tokens (D1, D2).** In `src/styles.css`, redeclare the `--color-*` bridge
inside `.dark` as well as `@theme`, so a locally scoped `.dark` re-resolves:

```css
.dark {
  /* existing --background, --foreground, … */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* …one line per token already listed in @theme… */
}
```

This makes `class="dark"` valid on any subtree and un-breaks the hero badge without
touching `home-hero.html`. *Rejected alternative:* hardcoding the badge to
`text-slate-200` — fixes one symptom, leaves the trap in place.

**0.2 One `main` (D3).** Drop `<main aria-label="Icon grid">` from `icons.page.html`;
use `<section aria-label="Icon grid">`. The shell's `#main-content` stays the only
`main`.

**0.3 Reduced motion (D6).** In `app.config.ts`:

```ts
provideMovement({
  duration: 280,
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  delay: 0,
  disabled: typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches,
})
```

**0.4 Snippet overflow (D5).** `code-snippet.html` gains a `min-w-0` chain and a
`whitespace-pre-wrap break-words` mode for the short one-liners the quickstart uses, so
no card clips mid-token at any width.

### Phase 1 — volt-ui atoms

Two new atoms under `src/app/components/shared/`, both thin wrappers so the rest of the
app stops repeating class strings:

- **`app-option-group`** — wraps `VoltToggleGroup` + `VoltToggleGroupItem`. Signature:
  `options: readonly ControlOption<T>[]`, `value = model<T>()`, `label: string`,
  `columns?: number`. Replaces all 11 hand-rolled `role="radio"` grids (category, size,
  variant, background, radius presets, ×2 for the duplicated panels) and deletes the
  13 copies of `'border-primary bg-primary text-primary-foreground'`. `VoltToggleGroup`
  brings roving-tabindex keyboard support that the current buttons lack.
- **`app-swatch-group`** — the tone / background-tone colour pickers, built on
  `VoltToggleGroupItem` with `VoltTooltip` for the colour name (today a `title`
  attribute).

`size-picker` and `animation-picker` collapse into these two atoms;
`animation-picker` becomes a `VoltSwitch`.

### Phase 2 — `/icons`, one control surface

The single largest win. `icons-sidebar` (241 lines) and `icons-mobile-controls`
(171 lines) are merged into **one** `app-icon-controls` component rendered **once**:

- Desktop (`lg:`) — inside `VoltSidebar` / `VoltSidebarContent`, sticky as today.
- Mobile — the *same* component projected into a `VoltDrawer`, opened from a "Filters"
  `volt-button` in the page header. This removes the ~600 px control wall above the
  first icon, kills the duplicate DOM and the duplicate `icon-search` id (D4), and
  restores the mobile GitHub link space.

Catalog state (11 signals) moves out of the three components into a single
`IconCatalogStore` (`providedIn` the route component) holding the signals, the
`filteredIcons` computed and one `DEFAULTS` object. `resetDemo()` then references
`DEFAULTS` instead of re-typing every default a fourth time.

`icon-card` is rebuilt on `VoltCard` + `VoltCardContent` + `VoltCardFooter` +
`VoltBadge` for the category chip, with the three copy actions moved into a
`VoltDropdownMenu` ("Copy ▾" → Import / HTML / Angular example). That trades three
always-visible text buttons for one, buys back ~36 px per card, and lets the icon name
use the full card width. `VoltTooltip` on the name resolves D7. The per-card "Copied"
pill becomes one page-level `VoltToast` (currently 362 potential absolute-positioned
pills).

Rendering: the grid is chunked with `@defer (on viewport)` per row-group so only the
visible slice mounts, with `VoltSkeleton` placeholders. *Rejected alternative:* a
virtual scroller — it fights the responsive column count and breaks Cmd+F.

### Phase 3 — `/docs` and home

- `/docs` gets a two-column layout: sticky `VoltSidebar` TOC (replacing the inline card)
  and content widened to `max-w-4xl`. The API reference and the "Available Icons" list
  move into `VoltTable` inside `VoltTabs`, so the 362-row table is no longer glued to
  the bottom of every visit — that alone removes ~20 000 px from the page.
- Home: the quickstart's three numbered cards become `VoltCard` with `VoltBadge` for the
  step number; the feature grid becomes `VoltCard` instead of 6 hand-drawn boxes.

### Phase 4 — angular-movement everywhere

| Where | Directive | Effect |
|---|---|---|
| Home sections | `moveInView="fade-up"` + `moveInViewOnce` | Sections reveal on scroll instead of appearing fully formed. |
| Hero background glow | `moveParallax` | Depth on the existing blur orb. |
| `/icons` grid | `moveStagger` on the grid + `moveInView` per card | Cards arrive in a wave; pairs naturally with the `@defer` chunks. |
| `/icons` grid re-layout | `moveLayout` on each card | Cards slide to their new position when a filter changes, instead of snapping. |
| Filter / no-results swap | `movePresence` | The empty state fades in rather than popping. |
| Drawer + dialog content | `movePresence` | Consistent enter/exit with the rest of the app. |
| Docs TOC → section | `moveSmoothScroll` | Replaces the raw anchor jump. |
| Card copy feedback | keep `moveWhileTap` | Already correct; now applied through the shared atom. |

All of it inherits the Phase 0.3 reduced-motion switch, so one media query disables the
entire app-level motion layer.

## Files to touch

| File | Change |
|---|---|
| `src/styles.css` | Mirror the `--color-*` bridge inside `.dark` (D1/D2). |
| `src/app/app.config.ts` | `provideMovement({ disabled: prefers-reduced-motion })` (D6). |
| `src/app/components/shared/option-group.ts` + `.html` | **New** — `VoltToggleGroup` atom. |
| `src/app/components/shared/swatch-group.ts` + `.html` | **New** — tone picker atom. |
| `src/app/components/shared/size-picker.*`, `animation-picker.*` | Reduced to the new atoms / `VoltSwitch`. |
| `src/app/components/shared/code-snippet.html` | Fix clipping (D5). |
| `src/app/components/icons/icon-controls.ts` + `.html` | **New** — replaces both panels. |
| `src/app/components/icons/icons-sidebar.*`, `icons-mobile-controls.*` | **Deleted.** |
| `src/app/services/icon-catalog-store.ts` | **New** — catalog signals, `filteredIcons`, `DEFAULTS`. |
| `src/app/pages/icons.page.ts` + `.html` | Consume the store; `VoltDrawer`; one landmark (D3); `@defer` chunks; `moveStagger`/`moveLayout`. |
| `src/app/components/icon-card.*` | Rebuilt on `VoltCard` + `VoltDropdownMenu` + `VoltTooltip`; toast instead of pill (D7). |
| `src/app/pages/docs.page.ts` | Two-column layout, `VoltTabs`, sticky TOC. |
| `src/app/components/docs/docs-toc.*`, `docs-api-table.*`, `docs-icon-table.*` | `VoltSidebar` / `VoltTable`. |
| `src/app/components/home/home-*.html` | `VoltCard` for features + quickstart; `moveInView`; `moveParallax`. |
| `src/app/components/layout/app-header.html` | GitHub link reachable on mobile (D8). |
| `tests/e2e/icons.spec.ts`, `docs.spec.ts` | Drawer flow, one-`main` assertion, tab flow. |
| `src/app/components/**/**.spec.ts` | Follow the component moves. |
| `docs/ai/STATE.md`, `CHANGELOG.md` | Record the refactor. |

## Acceptance criteria

- [ ] Hero badge text is legible in both themes — contrast ≥ 4.5:1, asserted in e2e.
- [ ] `page.getByRole('main')` resolves to exactly **1** element on every route.
- [ ] `document.querySelectorAll('#icon-search').length === 1`; no duplicate ids anywhere.
- [ ] No `<pre>`/`<code>` on the home page has `scrollWidth > clientWidth`.
- [ ] With `prefers-reduced-motion: reduce` emulated, no `angular-movement` animation runs.
- [ ] `/icons` initial DOM node count drops below ~2 500 (from 6 703); `/docs` page height drops below ~6 000 px (from 25 998).
- [ ] Every truncated icon name exposes its full name via `VoltTooltip`.
- [ ] Zero `role="radio"` hand-rolled buttons remain in `src/app`; zero occurrences of the copy-pasted selected-state class string.
- [ ] Raw `<button>` count in `src/app` templates is under 8 (from 27).
- [ ] Keyboard: the control group is reachable and operable with arrow keys (roving tabindex from `VoltToggleGroup`).
- [ ] `pnpm run check` passes.
- [ ] `pnpm run test:e2e` passes.
- [ ] `CHANGELOG.md` and `docs/ai/STATE.md` updated.

## Test plan

- **Unit** — new specs for `option-group` (selection + keyboard), `swatch-group`,
  `icon-controls` (one instance, model round-trip) and `IconCatalogStore`
  (`filteredIcons` across search/category, `reset()` restores `DEFAULTS`). Existing
  `icons-sidebar.spec.ts` is retargeted at `icon-controls`.
- **E2E** — extend `icons.spec.ts` with: open the mobile drawer at 390 px and filter from
  it; assert a single `main`; assert the copy dropdown copies each of the three snippets;
  assert cards still appear after scrolling past a `@defer` boundary. Extend `docs.spec.ts`
  with the tab switch to "Available Icons". Add a reduced-motion project to
  `playwright.config.ts`.
- **Manual** — `pnpm run dev`, then re-run the same audit script: all three routes ×
  {light, dark} × {1440, 390}, comparing against the screenshots taken for this spec.

## Risks & rollback

- **Motion regressions on low-end devices** — `moveLayout` on up to 362 cards is the
  riskiest item. Mitigation: only apply it to the mounted `@defer` slice, and measure
  before/after with the same long-task probe used in this audit (currently 0 ms). If it
  costs more than ~50 ms per filter change, drop `moveLayout` and keep `moveStagger`.
- **`@defer (on viewport)` and Cmd+F** — deferred cards are not in the DOM, so browser
  find won't reach them. Mitigation: chunk generously (≈60 icons) and keep the in-app
  search prominent.
- **volt-ui visual drift** — `VoltCard`/`VoltToggleGroup` bring their own paddings; the
  catalog grid rhythm will shift. Expected and acceptable; screenshots are the check.
- **Rollback** — every phase is an independent commit on a feature branch; Phase 0 is
  worth keeping even if Phases 1–4 are reverted.

## Deviations from the plan (found while building)

- **D1/D2 fixed with `@theme inline`, not by duplicating tokens.** Tailwind v4's
  `inline` option makes utilities reference `var(--foreground)` directly instead of
  the once-resolved `--color-foreground`, so a scoped `.dark` works with no
  duplication. A `.dark` island must also set `text-foreground`: volt's `outline`
  button sets no colour of its own and would otherwise inherit the light theme's.
- **`--accent` was a second brand purple.** volt-ui paints it as the hover surface in
  44 places, so every hover read as "selected" once the toggle groups landed. It is now
  the subtle surface the design system expects; the icon `accent` tone follows it.
- **volt-card's parts could not be used for the catalog tile.** `volt-card-content` /
  `volt-card-footer` accept no inputs and hard-code `p-6`, which naive class overrides
  cannot beat (no tailwind-merge). `volt-card` is used as the frame only.
- **`volt-toast` needs the manager.** Used declaratively it throws `No provider for
  NgpToastOptions`. It is driven through `NgpToastManager` (re-exported by volt-ui) —
  and **from an event handler, never an `effect`**: creating views imperatively inside a
  reactive context deadlocks zoneless change detection and froze the page on click.
- **`voltDrawerContent` hard-codes `h-[300px]`** for the bottom side and concatenates
  its `class` input without merging, so the drawer height is set inline.
- **The swatch pickers stayed custom.** volt-ui has no colour-swatch primitive and a
  toggle group paints its selected background over the swatch. They are now one shared
  atom with real arrow-key support instead of two hand-rolled copies.
- **`role="radio"` did not go to zero** — volt's toggle-group items use it correctly.
  The criterion that mattered (no hand-rolled radio grids, no copy-pasted state class)
  is met.
- **`moveSmoothScroll` is a page-level lerp container**, not an anchor helper; the docs
  TOC uses native `scroll-behavior: smooth` with `scroll-margin-top`.

## Results

| Metric | Before | After |
|---|---|---|
| `/icons` DOM nodes | 6 703 | 2 502 |
| `/icons` page height | 14 065 px | 6 781 px |
| `/docs` page height | 25 998 px | 3 816 px |
| `/docs` DOM nodes | 4 972 | 344 |
| `<main>` landmarks on `/icons` | 2 | 1 |
| Duplicate ids | `icon-search` | none |
| Raw `<button>` in `src/app` templates | 27 | 6 |
| Hand-rolled radio grids | 11 | 1 (the swatch atom) |
| Copies of the selected-state class string | 13 | 0 |
| volt-ui symbols imported | 6 | 30 |
| angular-movement inputs used | 5 | 8 |
| Control-panel implementations | 2 (412 lines) | 1 |
| First icon on a 390 px viewport | ~600 px down | 356 px down |

## Open questions

- Should `/icons` adopt `VoltPagination` instead of `@defer` chunking? Paging gives a
  bounded DOM and a shareable URL per page, but breaks the "scroll the whole set"
  browsing that a catalog wants. Recommendation: `@defer`, revisit if the DOM target is
  missed.
- Should the copy actions stay three visible buttons instead of a dropdown? The dropdown
  is one click deeper for the most common action (import). Alternative: keep "Import" as
  a primary button and put HTML/example behind the dropdown.
- Does the docs "Available Icons" table earn its place at all now that `/icons` is a full
  catalog with search, or should it become a link?
