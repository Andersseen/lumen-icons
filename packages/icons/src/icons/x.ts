import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-x',
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
      <path
        d="M18 6 6 18"
        [moveTarget]="animate()"
        [moveFrames]="{ rotate: [0, -6.84, 2.66, 0], y: [0, -0.42, 0] }"
        moveReverseDuration="0"
      moveDuration="560"
      />
      <path
        d="m6 6 12 12"
        [moveTarget]="animate()"
        [moveFrames]="{ rotate: [0, 6.84, -2.66, 0], y: [0, 0.42, 0] }"
        moveReverseDuration="0"
      moveDuration="560"
      />
    </svg>
  `,
})
export class LmnXIcon extends LmnIconBase {}
