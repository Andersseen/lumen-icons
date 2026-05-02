import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-sparkles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: LM_ICON_HOST,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path d="M12 2v4"/>
      <path d="m5 5 2.8 2.8"/>
      <path d="m19 5-2.8 2.8"/>
      <path d="M12 12v8"/>
      <path d="m5 19 2.8-2.8"/>
      <path d="m19 19-2.8-2.8"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `,
})
export class LmnSparklesIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);
}
