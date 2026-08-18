# Spec: refresh app dependencies and remove Zone.js

- **Status:** done
- **Date:** 2026-08-18
- **Author:** Codex session
- **Semver impact:** patch — demo runtime and build tooling only; the published icon API remains unchanged.

## Summary

Update VoltUI and Angular Movement to their current compatible releases, make the demo application zoneless, and remove the unused `zone.js` dependency. The icon generator will obtain its source geometry from the committed Lumen components so that Heroicons is no longer a package dependency.

## Motivation

The app already uses signals and OnPush components, so retaining Zone.js adds runtime and test setup weight without serving the current architecture. Heroicons is used only as an historical generator source, while every shipped Lumen SVG is already committed; retaining it as a dependency makes the library look externally coupled when it is self-contained.

## Scope

**In scope:**

- Upgrade `@voltui/components` and `angular-movement` to the newest compatible versions.
- Replace zoned bootstrap/test setup with `provideZonelessChangeDetection()` and Analog's zoneless test setup.
- Remove direct `zone.js` and `heroicons` dependencies and their lockfile entries.
- Change generation to recover both outline and filled geometry from the committed component template, preserving variants and custom icons without Node module SVG sources.
- Run unit, package, and Playwright verification after dependency changes.

**Out of scope (explicitly not doing):**

- Updating the Angular major version or changing any public icon input/default.
- Altering icon geometry or their semantic animation recipes.
- Replacing Angular Movement in the app.

## Design

- The generator reads the current component's outline and optional filled SVG branches, strips Angular bindings, then reapplies generation transformations. This makes committed Lumen components the checked-in source of truth. New third-party icon imports are a separate workflow.
- Use Angular's `provideZonelessChangeDetection()` in `ApplicationConfig` and `setupTestBed({ zoneless: true })`; delete Zone.js setup/imports.
- Dependency versions are resolved from the npm registry, then the lockfile is updated only through pnpm.

## Files to touch

| File | Change |
|---|---|
| `package.json`, `pnpm-lock.yaml` | Upgrade requested packages; remove Heroicons and Zone.js. |
| `scripts/generate-icons.mjs` | Use committed Lumen SVG branches as source geometry. |
| `src/app/app.config.ts` | Enable zoneless Angular change detection. |
| `vitest.setup.ts` | Use zoneless Analog test setup. |
| `docs/ai/*`, `CHANGELOG.md` | Record the dependency and runtime migration. |

## Acceptance criteria

- [x] `package.json` has no direct `heroicons` or `zone.js` dependency.
- [x] Icon generation works with Heroicons absent from `node_modules`.
- [x] The demo bootstraps with `provideZonelessChangeDetection()` and tests run zoneless.
- [x] Requested dependency upgrades resolve without peer-dependency errors.
- [x] `pnpm run check` and `pnpm run test:e2e` pass.
- [x] `CHANGELOG.md` and `docs/ai/STATE.md` updated.

## Test plan

- Regenerate the icon library after removing Heroicons and compare for no unintentional SVG loss.
- Run `pnpm run check` and the full Playwright suite.
- Build the demo to ensure a zoneless browser bundle succeeds.

## Risks & rollback

Generator extraction must distinguish outline and filled SVG branches; preserve the original template when no filled branch exists. If an upstream upgrade breaks the app, pin the latest compatible release and record the constraint; revert this one commit to restore the zoned setup and dependencies.

## Open questions

- None.
