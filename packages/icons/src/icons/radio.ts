import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveTargetDirective],
  host: LM_ICON_HOST,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="12" cy="12" r="10"
        [moveTarget]="animate()"
        [moveFrames]="{ scale: [1, 1.15, 1] }"
        moveDuration="500"
        moveEasing="ease-in-out"
      />
      <circle
        cx="12" cy="12" r="4"
        [moveTarget]="animate()"
        [moveFrames]="{ scale: [1, 0.85, 1] }"
        moveDuration="500"
        moveEasing="ease-in-out"
      />
    </svg>
  `,
})
export class LmnRadioIcon extends LmnIconBase {}
