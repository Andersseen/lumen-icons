import { Directive, input } from '@angular/core';
import type { LmnIconSize } from '../types/icon.types';

export const LM_ICON_HOST = {
  '[attr.role]': 'ariaLabel() ? "img" : null',
  '[attr.aria-label]': 'ariaLabel() || null',
  '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
  'style': 'display: inline-flex; flex-shrink: 0;',
} as const;

@Directive()
export abstract class LmnIconBase {
  readonly size = input<LmnIconSize>(24);
  readonly strokeWidth = input<number>(2);
  readonly ariaLabel = input<string | undefined>(undefined);
}
