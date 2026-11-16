import type { InputSignal, InputSignalWithTransform } from '@angular/core';

export type LmnIconSize = 12 | 14 | 16 | 20 | 24 | 32;
/** What the `size` input accepts: `[size]="14"` or the static attribute `size="14"`. */
export type LmnIconSizeInput = LmnIconSize | `${LmnIconSize}`;
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
  size?: LmnIconSize;
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
  readonly size: InputSignalWithTransform<LmnIconSize, LmnIconSizeInput>;
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
