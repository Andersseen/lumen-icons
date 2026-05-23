import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-mail',
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
      <rect
        width="20" height="16" x="2" y="4" rx="2"
        [moveTarget]="animate()"
        [moveFrames]="{ scale: [1, 1.023, 1] }"
        moveReverseDuration="0"
      moveDuration="560"
        moveEasing="ease-in-out"
      />
      <path
        d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
        [moveTarget]="animate()"
        [moveFrames]="{ y: [0, -0.84, 0] }"
        moveReverseDuration="0"
      moveDuration="560"
        moveDelay="80"
        moveEasing="cubic-bezier(0.22, 1, 0.36, 1)"
      />
    </svg>
  `,
})
export class LmnMailIcon extends LmnIconBase {}
