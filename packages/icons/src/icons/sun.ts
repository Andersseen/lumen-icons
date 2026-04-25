import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { LmnIconSize, LmnIconAnimate } from '../types/icon.types';
import { ANIMATE_STYLES } from '../lib/animate.styles';

@Component({
  selector: 'lmn-sun',
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
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  `,
})
export class LmnSunIcon {
  readonly size = input<LmnIconSize>(24);
  readonly strokeWidth = input<number>(2);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly animate = input<LmnIconAnimate>('none');
}
