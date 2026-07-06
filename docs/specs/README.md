# Spec-Driven Development (SDD)

For non-trivial work in this repo, **write the spec before writing code**. The spec is
a small markdown file in this directory that says *what* will change, *why*, and *how
we'll know it's done*. Code reviews then check the diff against the spec, not against
vibes.

## When a spec is required

Write a spec if the task meets **any** of these:

- Touches the public icon API (`LmnIconProps`, `LmnIconBase`, selectors, defaults, exports map).
- Touches the generator or animation recipes in a way that changes output for many icons.
- Adds a new feature to the demo site (new page, new playground control, new flow).
- Requires a version bump decision (anything minor or major).
- Spans more than ~3 files of hand-written code, or the request is ambiguous.

**No spec needed** for: fixing a typo, a single-icon path correction, updating docs,
adding one Heroicons icon via the standard workflow (W1), dependency bumps.

## Lifecycle

```
draft → approved → in-progress → done   (or: rejected)
```

1. **Draft** — copy `_TEMPLATE.md` to `docs/specs/YYYY-MM-DD-<slug>.md`, fill every section. Unknowns go in "Open questions" — don't silently guess.
2. **Approved** — the maintainer (or the user driving the session) confirms scope and acceptance criteria. For an AI agent: present the spec summary and get an explicit OK before implementing, unless the user already gave unambiguous instructions that the spec merely records.
3. **In-progress** — implement, following the spec's plan. If reality forces a deviation, **update the spec first**, then the code.
4. **Done** — all acceptance criteria checked, `pnpm run check` green, status flipped to `done`. Specs stay in the folder as a decision record; don't delete them.

## Rules for agents

- One spec = one PR-sized unit of work. If the plan grows, split it.
- Acceptance criteria must be **objectively checkable** (a command that passes, a behavior observable in the dev app, a file that exists) — never "works well" or "is improved".
- The "Files to touch" list is a promise: touching files far outside it means the spec was wrong — stop and revise the spec.
- Copy the spec's checklist state honestly. An unchecked box with a note beats a falsely checked one.

## Index

*(add new specs to the top)*

- —
