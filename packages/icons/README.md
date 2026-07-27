<div align="center">

# lumen-icons

### 362 accessible, tree-shakable icon components — built for Angular 21+.

[![npm version](https://img.shields.io/npm/v/lumen-icons?style=flat-square&color=cb3837&logo=npm&logoColor=white)](https://www.npmjs.com/package/lumen-icons)
[![Angular 21](https://img.shields.io/badge/Angular-21+-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev)
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

Requires `@angular/core` and `@angular/common` **21+** as peer dependencies.

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
| `size` | `12 \| 14 \| 16 \| 20 \| 24 \| 32` | `24` |
| `strokeWidth` | `number` | `2` |
| `ariaLabel` | `string` | — |
| `animate` | `boolean` | `false` |
| `variant` | `'outline' \| 'filled'` | `'outline'` |
| `tone` | `'inherit' \| 'foreground' \| 'muted' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'info' \| 'warning' \| 'destructive'` | `'inherit'` |
| `color` | `string` | — |
| `background` | `'none' \| 'soft' \| 'solid'` | `'none'` |
| `backgroundTone` | same values as `tone` | `'primary'` |
| `backgroundColor` | `string` | — |
| `padding` | `number` | `0` |
| `radius` | `number \| string` | `'0.5rem'` |

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
