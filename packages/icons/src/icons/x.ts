import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-x',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: LM_ICON_HOST,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  `,
})
export class LmnXIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);
}
