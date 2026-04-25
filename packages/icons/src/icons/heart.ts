import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { LmnIconSize, LmnIconAnimate } from '../types/icon.types';
import { ANIMATE_STYLES } from '../lib/animate.styles';

@Component({
  selector: 'lmn-heart',
  standalone: true,
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  `,
})
export class LmnHeartIcon {
  readonly size = input<LmnIconSize>(24);
  readonly strokeWidth = input<number>(2);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly animate = input<LmnIconAnimate>('none');
}
