import type { InputSignal } from '@angular/core';

export type LmnIconSize = 12 | 14 | 16 | 20 | 24 | 32;

export interface LmnIconProps {
  size?: LmnIconSize;
  strokeWidth?: number;
  ariaLabel?: string;
  animate?: boolean;
}

export interface LmnIconInstance {
  readonly size: InputSignal<LmnIconSize>;
  readonly strokeWidth: InputSignal<number>;
  readonly ariaLabel: InputSignal<string | undefined>;
  readonly animate: InputSignal<boolean>;
}
