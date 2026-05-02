import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: LM_ICON_HOST,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  `,
})
export class LmnHomeIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);
}
