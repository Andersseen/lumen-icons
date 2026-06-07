import type { InputSignal } from '@angular/core';

export type LmnIconSize = 12 | 14 | 16 | 20 | 24 | 32;
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
  readonly size: InputSignal<LmnIconSize>;
  readonly strokeWidth: InputSignal<number>;
  readonly ariaLabel: InputSignal<string | undefined>;
  readonly animate: InputSignal<boolean>;
  readonly tone: InputSignal<LmnIconTone>;
  readonly color: InputSignal<string | undefined>;
  readonly variant: InputSignal<LmnIconVariant>;
  readonly background: InputSignal<LmnIconBackground>;
  readonly backgroundTone: InputSignal<LmnIconTone>;
  readonly backgroundColor: InputSignal<string | undefined>;
  readonly padding: InputSignal<number>;
  readonly radius: InputSignal<number | string>;
}
