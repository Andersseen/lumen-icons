# @lumen/icons

Accessible, tree-shakable Angular icon components with consistent `lmn-*`
selectors.

## Installation

```sh
npm install @lumen/icons
```

## Usage

Import only the icons you need:

```ts
import { LmnCheckIcon } from '@lumen/icons/check';
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

## API

Every icon supports:

- `size`: `12 | 14 | 16 | 20 | 24 | 32`
- `strokeWidth`: number
- `ariaLabel`: string
- `animate`: boolean

## Exports

- `@lumen/icons`
- `@lumen/icons/icons`
- `@lumen/icons/<name>`
- `@lumen/icons/icons/<name>`
