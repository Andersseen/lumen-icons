import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { LmnIconSize } from '../types/icon.types';

@Component({
  selector: 'lmn-arrow-left',
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
      <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
    </svg>
  `,
})
export class LmnArrowLeftIcon {
  readonly size = input<LmnIconSize>(24);
  readonly strokeWidth = input<number>(2);
  readonly ariaLabel = input<string | undefined>(undefined);
}
