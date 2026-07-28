# WORKFLOWS — Step-by-step playbooks

> Find your task here **before** improvising. Each playbook ends with a verification
> step — a task isn't done until verification passes.

---

## W1 — Add a new icon (from the Heroicons set)

Use when the icon exists in `packages/icons/svg/outline` (and ideally `packages/icons/svg/solid`) but isn't generated yet.

1. Confirm the SVG exists: check `packages/icons/svg/outline/<name>.svg`.
2. Decide its animation: add an entry to `ICON_ANIMATIONS` in `scripts/animations.mjs` (pick an existing recipe that matches the icon's *meaning*), or verify a `FALLBACK_ANIMATIONS` pattern already covers it sensibly.
3. Run `pnpm run generate:icons` — this emits the component + spec and updates barrel/catalog.
4. Add a metadata entry (category + aliases) in `src/app/data/icon-metadata.ts`.
5. Run `pnpm run sync:icons` (idempotent safety re-sync).
6. Verify: `pnpm run check`, then `pnpm run dev` and confirm the icon appears in the catalog, renders in both variants, and animates when toggled.
7. Update `CHANGELOG.md` (minor) and `docs/ai/STATE.md`.

## W2 — Add a brand-new custom icon (no Heroicons source)

1. Create `packages/icons/src/icons/<kebab-name>.ts` following the exact component template in `CLAUDE.md` (§ Icon component conventions): standalone, OnPush, extends `LmnIconBase`, outline + filled `@if` branches, scoped keyframes, reduced-motion block.
2. Keep the SVG on a `viewBox="0 0 24 24"` grid, `currentColor` only, no fixed width/height inside the SVG markup.
3. Create `<kebab-name>.spec.ts` (render + aria-hidden default + aria-label set — copy an existing spec).
4. Map an animation recipe in `ICON_ANIMATIONS` and run `pnpm run generate:icons` so the generator adopts and normalizes the icon (custom icons' paths are preserved via extraction).
5. Add metadata in `src/app/data/icon-metadata.ts`; run `pnpm run sync:icons`.
6. Verify as in W1 step 6. Changelog + STATE.md.

## W3 — Add or change an animation recipe

1. Edit `scripts/animations.mjs` only:
   - New recipe → add a builder to `RECIPES` (must define `0%` and `100%`; `both` fill; no `infinite` unless it's for `loader`).
   - Re-mapping → edit `ICON_ANIMATIONS` / `FALLBACK_ANIMATIONS`.
2. Regenerate: `pnpm exec node scripts/generate-icons.mjs --overwrite`.
3. Expect a large diff across `packages/icons/src/icons/` — that's normal; **do not** hand-tune individual generated files afterwards.
4. Verify: `pnpm run check`; then in the dev app toggle "animate" on affected icons; test with OS reduced-motion enabled (animation must not run).
5. Changelog + STATE.md.

## W4 — Change the shared icon API (`LmnIconBase` / `icon.types.ts`)

⚠️ This is the public contract. Before coding, write a spec (`docs/specs/`) and classify the change against the semver policy in CONVENTIONS.md.

1. Update `packages/icons/src/types/icon.types.ts` (`LmnIconProps` + `LmnIconInstance` must stay in sync).
2. Update `packages/icons/src/lib/icon-base.ts` (input + computed host style if visual).
3. If the template of every icon must change → that's a generator change (W3-style regenerate), not 360 manual edits.
4. Add/extend unit tests for the new behavior on at least one representative icon.
5. Expose the prop in the demo playground (`src/app/pages/icons.page.*`) so it's documented by example.
6. Verify: `pnpm run check` + manual dev-app pass. Changelog (minor for optional additions, major otherwise) + STATE.md.

## W5 — Work on the demo/docs app

1. App code only (`src/`) — Tailwind v4 and `@voltui/components` allowed; icons imported via the `lumen-icons` alias (no lib build needed).
2. New page → `src/app/pages/<name>.page.ts` with a **default export**; dynamic segment → `[param].page.ts`.
3. Follow Angular signal rules from CONVENTIONS.md; use volt-ui for chrome (see selector table in CLAUDE.md).
4. Add/adjust the relevant e2e spec in `tests/e2e/` if the user flow changed.
5. Verify: `pnpm run check` and `pnpm run test:e2e` (starts its own server on port 4173).

## W6 — Release / publish the library

1. Ensure a clean `main` with everything merged and `pnpm run check` green.
2. Bump `packages/icons/package.json` version per semver policy; move `CHANGELOG.md` Unreleased notes under the new version + date.
3. Dry-run: `pnpm run publish:icons:dry-run` — inspect the file list and exports map.
4. Publish: `pnpm run publish:icons` (never raw `npm publish`; the script runs checks).
5. Commit `chore(release): lumen-icons@<version>`, tag if the repo tags releases, push.
6. Update STATE.md (version line + recent changes).

## W7 — Fix a bug

1. Reproduce first: write the failing unit test (or e2e) *before* fixing.
2. Locate the true owner of the behavior using ARCHITECTURE.md's generated-vs-handwritten table — a bug visible in `packages/icons/src/icons/foo.ts` usually lives in the **generator or a recipe**, not in that file.
3. Fix at the source; regenerate if the fix touched generator/recipes.
4. Verify: the new test passes, `pnpm run check` passes.
5. Changelog (patch) + STATE.md.

## W8 — Start any session (read protocol)

1. Read `AGENTS.md` (rules), `docs/ai/STATE.md` (where things stand).
2. `git status` + `git log --oneline -5` — confirm reality matches STATE.md; if it doesn't, trust git/code and note the drift.
3. If the task is non-trivial (touches public API, generator, >3 files, or is ambiguous) → write a spec first (`docs/specs/README.md`).
4. Work in a feature branch off `main` (`feature/<slug>` or `fix/<slug>`), not on `main` directly.

## W9 — End any session (write protocol)

1. `pnpm run check` — do not skip.
2. Update `docs/ai/STATE.md`: add a "Recent changes" line; update "In progress" if you're leaving work unfinished (say exactly what's left and where).
3. If a spec was involved, tick its acceptance criteria and set its status.
4. Conventional commit(s); keep generated-file regeneration in its own commit when the diff is large (`chore(icons): regenerate icons`).
