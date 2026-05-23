import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-lock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveTargetDirective],
  host: LM_ICON_HOST,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [moveTarget]="animate()"
      [moveFrames]="{ y: [0, -0.42, 0], scale: [1, 1.015, 1] }"
      moveReverseDuration="0"
      moveDuration="560"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path
        d="M7 11V7a5 5 0 0 1 10 0v4"
        [moveTarget]="animate()"
        [moveFrames]="{ y: [0, -0.84, 0] }"
        moveReverseDuration="0"
      moveDuration="560"
        moveDelay="50"
      />
    </svg>
  `,
})
export class LmnLockIcon extends LmnIconBase {}
