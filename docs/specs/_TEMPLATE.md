# Spec: <short imperative title>

- **Status:** draft | approved | in-progress | done | rejected
- **Date:** YYYY-MM-DD
- **Author:** <human or agent/session>
- **Semver impact:** none | patch | minor | major — <one-line justification>

## Summary

<2–4 sentences: what changes and for whom. A reader who stops here should still understand the task.>

## Motivation

<Why now. What problem or goal from CONTEXT.md / STATE.md this serves.>

## Scope

**In scope:**
- <bullet>

**Out of scope (explicitly not doing):**
- <bullet>

## Design

<The approach. For API changes: exact input names, types, defaults, and host-binding behavior. For generator/recipe changes: which recipes/maps change and roughly how many icons are affected. For app features: the page/component structure and which volt-ui pieces are used. Include rejected alternatives in one line each if any were considered.>

## Files to touch

| File | Change |
|---|---|
| `path/to/file` | <what happens to it> |

<Remember: generated files are never edited directly — list the generator/recipe file plus "regenerate icons" as a step instead.>

## Acceptance criteria

- [ ] <objective, checkable criterion — a command, an observable behavior, an existing file>
- [ ] `pnpm run check` passes
- [ ] <a11y criterion if UI is involved (aria state, reduced-motion)>
- [ ] `CHANGELOG.md` and `docs/ai/STATE.md` updated

## Test plan

<Which unit specs are added/changed; which e2e flows; what to verify manually in `pnpm run dev`.>

## Risks & rollback

<What could break (tree-shaking, publint, exports map, large regen diff) and how to undo.>

## Open questions

- <anything unresolved — must be empty before status becomes `approved`>
