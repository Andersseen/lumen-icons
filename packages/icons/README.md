# lumen-icons

Accessible, tree-shakable Angular icon components with consistent `lmn-*`
selectors, optional per-icon CSS animations, filled mode and framed icon
backgrounds for app UI.

The package currently includes 362 UI icons covering navigation, actions,
feedback, media, content, communication, security, editor, and system surfaces.
Icons are generated from a curated Heroicons outline source set and converted to
standalone Angular components.

## Installation

```sh
npm install lumen-icons
```

## Usage

Import only the icons you need:

```ts
import { LmnCheckIcon } from 'lumen-icons/check';
```

Then add the component to an Angular component's `imports` array:

```ts
@Component({
  imports: [LmnCheckIcon],
  template: `<lmn-check ariaLabel="Completed" />`,
})
export class ExampleComponent {}
```

Icons are decorative by default. Pass `ariaLabel` when the icon communicates
meaning.

For toolbar, sidebar, badge or IDE-style UI, use the visual inputs:

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

`background="soft"` lets the icon tone and background tone differ. `background="solid"`
uses the matching theme foreground automatically for contrast.

## API

Every icon supports:

- `size`: `12 | 14 | 16 | 20 | 24 | 32`
- `strokeWidth`: number
- `ariaLabel`: string
- `animate`: boolean
- `tone`: `'inherit' | 'foreground' | 'muted' | 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning' | 'destructive'`
- `color`: string
- `variant`: `'outline' | 'filled'`
- `background`: `'none' | 'soft' | 'solid'`
- `backgroundTone`: same values as `tone`
- `backgroundColor`: string
- `padding`: number
- `radius`: number | string

Set `animate` to `true` to trigger the icon's built-in CSS keyframe animation.
Animations are pure CSS — no extra animation library is required.

## Exports

- `lumen-icons`
- `lumen-icons/icons`
- `lumen-icons/<name>`
