<div align="center">

# lumen-icons

### 362 accessible, tree-shakable icon components — built for Angular 21 and 22.

[![npm version](https://img.shields.io/npm/v/lumen-icons?style=flat-square&color=cb3837&logo=npm&logoColor=white)](https://www.npmjs.com/package/lumen-icons)
[![Angular 21 | 22](https://img.shields.io/badge/Angular-21%20%7C%2022-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev)
[![MIT](https://img.shields.io/badge/License-MIT-FDCB6E?style=flat-square)](./LICENSE)
[![Tree-shakable](https://img.shields.io/badge/tree--shakable-sideEffects%3A_false-00B894?style=flat-square)](https://github.com/Andersseen/lumen-icons)

**[🎨 Browse all icons](https://lumen-icons.andersseen.dev/icons)** · **[📖 Docs](https://lumen-icons.andersseen.dev/docs)** · **[⭐ GitHub](https://github.com/Andersseen/lumen-icons)**

</div>

---

Every icon is a **standalone Angular component with its own entry point**, so your bundler ships only what you import. Outline and filled variants, opt-in pure-CSS animations, framed icon backgrounds — and no styling opinions: colour comes from `currentColor`.

- ⚡ **Tree-shakable** — `sideEffects: false`, per-icon subpath exports, ≈0.3 kB gzipped per icon
- ♿ **Accessible by default** — decorative icons are `aria-hidden`, labelled icons get `role="img"`
- 🅰️ **Angular-native** — standalone, signal inputs, `OnPush`, no `NgModule`
- ✨ **Opt-in animations** — pure CSS keyframes, zero runtime dependencies
- 🎨 **Zero styling opinions** — no Tailwind, no CSS reset, no theme provider

## Installation

```sh
npm install lumen-icons
```

Requires `@angular/core` and `@angular/common` **21 or 22** as peer dependencies.

## Usage

Import only the icons you need:

```ts
import { Component } from '@angular/core';
import { LmnCheckIcon } from 'lumen-icons/check';

@Component({
  selector: 'app-example',
  imports: [LmnCheckIcon],
  template: `<lmn-check ariaLabel="Completed" [size]="20" />`,
})
export class ExampleComponent {}
```

Icons are **decorative by default** — pass `ariaLabel` only when the icon carries meaning:

```html
<lmn-check />                      <!-- aria-hidden="true" -->
<lmn-check ariaLabel="Completed" /> <!-- role="img", accessible name -->
```

Colour is inherited from CSS, so icons match their surroundings automatically:

```html
<span style="color: var(--brand)"><lmn-check /></span>
```

### Static attributes

Numeric inputs accept a static attribute as well as a binding, so both compile under `strictTemplates`:

```html
<lmn-check size="14" />          <!-- same as [size]="14" -->
<lmn-check strokeWidth="1.5" />  <!-- same as [strokeWidth]="1.5" -->
```

`size` must be one of `12 | 14 | 16 | 20 | 24 | 32`. A size outside that scale (`size="15"`) is a compile error under `strictTemplates`. If a bad value still reaches the icon at runtime, it renders at `24` and logs a warning in dev mode. Invalid `strokeWidth` and `padding` values fall back to their defaults the same way.

### Icons inside buttons: decorative vs meaningful

When the button already has a text label, the icon is **decorative**. Leave out `ariaLabel` and the icon stays `aria-hidden`, so screen readers announce "Save" once:

```html
<button type="button">
  <lmn-check size="16" />
  Save
</button>
```

When the icon **is** the label (an icon-only button), name the button itself. The icon stays decorative:

```html
<button type="button" aria-label="Delete">
  <lmn-trash size="16" />
</button>
```

Use `ariaLabel` only when the icon carries meaning on its own and no surrounding text says the same thing, like a status icon in a table cell:

```html
<td><lmn-check-circle tone="success" ariaLabel="Paid" /></td>
```

### State with `variant`: filled vs outline

`variant` makes a good on/off switch for state. For example, stars for rounds won:

```ts
@Component({
  selector: 'app-rounds',
  imports: [LmnStarIcon],
  template: `
    <span role="img" [attr.aria-label]="won() + ' of ' + total() + ' rounds won'">
      @for (round of rounds(); track round) {
        <lmn-star size="20" [variant]="round <= won() ? 'filled' : 'outline'" />
      }
    </span>
  `,
})
export class RoundsComponent {
  readonly won = input.required<number>();
  readonly total = input(3);
  readonly rounds = computed(() => Array.from({ length: this.total() }, (_, i) => i + 1));
}
```

Each star is decorative. The group carries one accessible name ("2 of 3 rounds won"), so screen readers don't read out a row of unlabelled stars.

### Framed icons

For toolbar, sidebar, badge or IDE-style UI:

```html
<lmn-check
  tone="primary"
  variant="filled"
  background="soft"
  backgroundTone="primary"
  [padding]="8"
  [radius]="10"
/>
```

`background="soft"` lets the icon tone and background tone differ. `background="solid"` uses the matching theme foreground automatically for contrast.

### Animations

```html
<lmn-check [animate]="true" />
```

Each icon has a semantic CSS animation — a check draws itself, an arrow slides, a heart beats. Animations are pure CSS, play once (only `loader` loops), and respect `prefers-reduced-motion`.

## API

Every icon accepts the same optional inputs:

| Input | Type | Default |
|---|---|---|
| `size` | `12 \| 14 \| 16 \| 20 \| 24 \| 32` (number or numeric string) | `24` |
| `strokeWidth` | `number` (or numeric string) | `2` |
| `ariaLabel` | `string` | — |
| `animate` | `boolean` | `false` |
| `variant` | `'outline' \| 'filled'` | `'outline'` |
| `tone` | `'inherit' \| 'foreground' \| 'muted' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'info' \| 'warning' \| 'destructive'` | `'inherit'` |
| `color` | `string` | — |
| `background` | `'none' \| 'soft' \| 'solid'` | `'none'` |
| `backgroundTone` | same values as `tone` | `'primary'` |
| `backgroundColor` | `string` | — |
| `padding` | `number` (or numeric string) | `0` |
| `radius` | `number \| string` (numeric string = px) | `'0.5rem'` |

## Exports

| Import | What you get |
|---|---|
| `lumen-icons/<name>` | a single icon — **preferred**, best tree-shaking |
| `lumen-icons/icons` | barrel of every icon |
| `lumen-icons` | types + every icon |

## Icons

362 icons across navigation, system, content, actions, feedback, communication, security, media and editor surfaces. Geometry is derived from [Heroicons](https://github.com/tailwindlabs/heroicons) (MIT), converted to standalone Angular components, plus custom icons drawn for this set.

**[→ Search the full catalog](https://lumen-icons.andersseen.dev/icons)**

## License

[MIT](./LICENSE) © [Andrii](https://github.com/Andersseen)
