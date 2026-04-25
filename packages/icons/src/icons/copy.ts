import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { LmnIconSize, LmnIconAnimate } from '../types/icon.types';
import { ANIMATE_STYLES } from '../lib/animate.styles';

@Component({
  selector: 'lmn-copy',
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
  `,
})
export class LmnCopyIcon {
  readonly size = input<LmnIconSize>(24);
  readonly strokeWidth = input<number>(2);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly animate = input<LmnIconAnimate>('none');
}
