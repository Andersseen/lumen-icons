import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { LmnIconSize } from '../types/icon.types';

@Component({
  selector: 'lmn-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    'style': 'display: inline-flex; flex-shrink: 0;',
  },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  `,
})
export class LmnSearchIcon {
  readonly size = input<LmnIconSize>(24);
  readonly strokeWidth = input<number>(2);
  readonly ariaLabel = input<string | undefined>(undefined);
}
