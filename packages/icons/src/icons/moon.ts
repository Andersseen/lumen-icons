import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { LmnIconSize, LmnIconAnimate } from '../types/icon.types';
import { ANIMATE_STYLES } from '../lib/animate.styles';

@Component({
  selector: 'lmn-moon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[attr.data-animate]': 'animate() !== "none" ? animate() : null',
    'style': 'display: inline-flex; flex-shrink: 0;',
  },
  styles: [ANIMATE_STYLES],
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  `,
})
export class LmnMoonIcon {
  readonly size = input<LmnIconSize>(24);
  readonly strokeWidth = input<number>(2);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly animate = input<LmnIconAnimate>('none');
}
