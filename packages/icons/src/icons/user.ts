import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveTargetDirective],
  host: LM_ICON_HOST,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [moveTarget]="animate()"
      [moveFrames]="{ y: [0, -0.42, 0], scale: [1, 0.992, 1.015, 1] }"
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle
        cx="12"
        cy="7"
        r="4"
        [moveTarget]="animate()"
        [moveFrames]="{ y: [0, -0.63, 0], scale: [1, 0.985, 1.03, 1] }"
        moveReverseDuration="0"
      moveDuration="560"
        moveDelay="50"
      />
    </svg>
  `,
})
export class LmnUserIcon extends LmnIconBase {}
