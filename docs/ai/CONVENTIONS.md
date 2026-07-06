# CONVENTIONS — Hard rules and best practices

> Written as checklists so you can verify your own work. "MUST" rules are enforced
> by lint/CI or by review; violating them means the PR is rejected.

## Angular (both halves of the repo)

- [ ] MUST: standalone components only — no `NgModule` anywhere.
- [ ] MUST: `changeDetection: ChangeDetectionStrategy.OnPush` on every component.
- [ ] MUST: signals APIs — `input()`, `output()`, `model()`, `computed()`, `signal()`. Never `@Input()`/`@Output()`/`EventEmitter`.
- [ ] MUST: `inject(Service)` — never constructor injection.
- [ ] MUST: host bindings via the `host: {}` metadata object — never `@HostBinding`/`@HostListener`.
- [ ] MUST: new control flow (`@if`, `@for`, `@switch`) — never `*ngIf`/`*ngFor`.
- [ ] SHOULD: bridge RxJS only at the boundary with `toSignal()`/`toObservable()`; keep component internals signal-only.

## Library-only rules (`packages/icons/`)

- [ ] MUST: no Tailwind, no CSS frameworks, no runtime animation libraries, no third-party deps. Peers stay exactly `@angular/core` + `@angular/common`.
- [ ] MUST: no module-level side effects (`sideEffects: false` is a promise to bundlers).
- [ ] MUST: SVGs use `stroke="currentColor"` (outline) / `fill="currentColor"` (filled); never hardcoded colors.
- [ ] MUST: selector `lmn-<kebab-name>`, class `Lmn<PascalName>Icon`, file `packages/icons/src/icons/<kebab-name>.ts`.
- [ ] MUST: defaults stay `size=24`, `strokeWidth=2` (changing them is a breaking change).
- [ ] MUST: inline styles limited to display/dimensions/`transform-origin`/`transform-box` — everything else is the consumer's job.
- [ ] MUST NOT: barrel re-exports of entire modules beyond the existing generated barrel; every symbol must be individually importable.

## Accessibility (non-negotiable)

- [ ] Every icon: `ariaLabel` set → host gets `role="img"` + `aria-label`, SVG stays `aria-hidden="true"`. No `ariaLabel` → host gets `aria-hidden="true"`.
- [ ] SVGs always carry `focusable="false"`.
- [ ] Every animation block includes the `prefers-reduced-motion: reduce` media query disabling it.
- [ ] App templates: all interactive elements labeled; template a11y lint rules stay enabled.

## Animations

- [ ] CSS `@keyframes` only, scoped per icon as `lmn-<icon-name>`.
- [ ] Opt-in via the `animate` input; zero cost when `false`.
- [ ] Recipes define both `0%` and `100%` blocks; icons end at rest (`both` fill mode).
- [ ] Only `loader` may use `infinite`.
- [ ] New/changed motion goes through `scripts/animations.mjs` recipes — never hand-written into a generated component.

## Testing

- [ ] Unit specs live next to source; use `render()` from `@testing-library/angular`, never manual `TestBed.createComponent()`.
- [ ] Query by role/label/text (`getByRole`, `getByLabelText`); avoid `querySelector`.
- [ ] Every icon spec asserts at minimum: renders, `aria-hidden` default, `aria-label` when set.
- [ ] E2E (Playwright, `tests/e2e/`): use `getByRole`/`getByLabel`; assert user-visible behavior, never class names or DOM structure.
- [ ] One `describe` per component, one `it` per behavior.

## TypeScript

- [ ] `strict: true`, `noImplicitReturns`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature` — never relaxed, never `// @ts-ignore` without a written reason.
- [ ] Public library types live in `packages/icons/src/types/icon.types.ts` and are part of the semver contract.

## Git & releases

- [ ] Conventional commits (commitlint enforces): `feat(icons): …`, `fix(check): …`, `docs: …`, `chore: …`.
- [ ] `CHANGELOG.md` in keep-a-changelog format updated for every user-visible change.
- [ ] Semver policy:
  - **patch** — bug fixes, visual corrections to an icon's paths.
  - **minor** — new icons, new *optional* inputs on `LmnIconProps`.
  - **major** — rename/remove input or selector, change default `size`/`strokeWidth`, change `LmnIconProps` shape incompatibly.
- [ ] Never publish manually; use `pnpm run publish:icons` (it runs the checks). `--dry-run` first when unsure.

## ESLint specifics

- [ ] Component selector prefixes: `lmn` (library) / `app` (app), kebab-case. Directives: `lmn`, camelCase.
- [ ] No inline `eslint-disable` without a comment explaining why.
- [ ] Unused imports are lint errors (`eslint-plugin-unused-imports`).

## Definition of Done (any task)

1. Code follows every applicable checklist above.
2. `pnpm run check` passes locally (lint + typecheck app & lib + unit tests + package build + publint).
3. New icons: metadata entry added, `sync:icons` run, spec exists.
4. `CHANGELOG.md` updated if user-visible.
5. `docs/ai/STATE.md` "Recent changes" updated.
6. If the task had a spec (`docs/specs/`), its acceptance criteria are all checked off.
