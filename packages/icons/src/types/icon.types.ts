import type { InputSignal, InputSignalWithTransform } from '@angular/core';

/**
 * The recommended size scale, in px. Icons are drawn on a 24 px grid and look
 * crispest on these steps, but `size` accepts any positive number.
 */
export type LmnIconSize = 12 | 14 | 16 | 20 | 24 | 32;
/**
 * What the `size` input accepts: any positive number of px, bound
 * (`[size]="40"`) or as a static attribute (`size="40"`). The recommended
 * {@link LmnIconSize} steps stay in editor autocompletion.
 */
export type LmnIconSizeInput =
  | LmnIconSize
  | `${LmnIconSize}`
  // `& {}` keeps the literal steps in autocompletion instead of widening them away.
  | (number & {})
  | (`${number}` & {});
/** What `strokeWidth` and `padding` accept: `[padding]="8"` or `padding="8"`. */
export type LmnIconNumberInput = number | `${number}`;
export type LmnIconVariant = 'outline' | 'filled';
export type LmnIconBackground = 'none' | 'soft' | 'solid';
export type LmnIconTone =
  | 'inherit'
  | 'foreground'
  | 'muted'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'info'
  | 'warning'
  | 'destructive';

export interface LmnIconProps {
  /** Any positive number of px; {@link LmnIconSize} lists the recommended steps. */
  size?: number;
  strokeWidth?: number;
  ariaLabel?: string;
  animate?: boolean;
  tone?: LmnIconTone;
  color?: string;
  variant?: LmnIconVariant;
  background?: LmnIconBackground;
  backgroundTone?: LmnIconTone;
  backgroundColor?: string;
  padding?: number;
  radius?: number | string;
}

export interface LmnIconInstance {
  readonly size: InputSignalWithTransform<number, LmnIconSizeInput>;
  readonly strokeWidth: InputSignalWithTransform<number, LmnIconNumberInput>;
  readonly ariaLabel: InputSignal<string | undefined>;
  readonly animate: InputSignal<boolean>;
  readonly tone: InputSignal<LmnIconTone>;
  readonly color: InputSignal<string | undefined>;
  readonly variant: InputSignal<LmnIconVariant>;
  readonly background: InputSignal<LmnIconBackground>;
  readonly backgroundTone: InputSignal<LmnIconTone>;
  readonly backgroundColor: InputSignal<string | undefined>;
  readonly padding: InputSignalWithTransform<number, LmnIconNumberInput>;
  readonly radius: InputSignalWithTransform<number | string, number | string>;
}

/**
 * Every icon input, typed as what it accepts when set — the object to hand
 * `NgComponentOutlet` (or `ComponentRef.setInput`) when icons come from data:
 *
 * ```ts
 * readonly inputs: LmnIconInputs = { size: 40, background: 'soft', tone: 'primary', radius: '50%' };
 * ```
 * ```html
 * <ng-container *ngComponentOutlet="icon; inputs: inputs" />
 * ```
 */
export type LmnIconInputs = {
  -readonly [K in keyof LmnIconInstance]?: LmnIconInstance[K] extends InputSignalWithTransform<infer _Value, infer W>
    ? W
    : never;
};
