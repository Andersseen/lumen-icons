import { Directive, input } from '@angular/core';
import type { LmnIconInstance, LmnIconSize } from '../types/icon.types';

@Directive()
export abstract class LmnIconBase implements LmnIconInstance {
  readonly size = input<LmnIconSize>(24);
  readonly strokeWidth = input<number>(2);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly animate = input<boolean>(false);
}
