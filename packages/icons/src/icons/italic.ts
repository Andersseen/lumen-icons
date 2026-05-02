import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-italic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: LM_ICON_HOST,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path d="M19 4h-9"/>
      <path d="M14 20H5"/>
      <path d="M15 4 9 20"/>
    </svg>
  `,
})
export class LmnItalicIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);
}
