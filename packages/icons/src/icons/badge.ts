import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: LM_ICON_HOST,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <rect width="18" height="12" x="3" y="6" rx="6" ry="6"/>
    </svg>
  `,
})
export class LmnBadgeIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);
}
