import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-smile',
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
        [moveFrames]="{ rotate: [0, 1.52, -1.52, 0], scale: [1, 1.023, 1] }"
        moveReverseDuration="0"
      moveDuration="650"
        moveEasing="ease-in-out"
      />
      <path
        d="M8 14s1.5 2 4 2 4-2 4-2"
        [moveTarget]="animate()"
        [moveFrames]="{ scaleY: [1, 1.057, 1] }"
        moveReverseDuration="0"
      moveDuration="560"
        moveDelay="100"
        moveEasing="cubic-bezier(0.22, 1, 0.36, 1)"
      />
      <line
        x1="9" y1="9" x2="9.01" y2="9"
        [moveTarget]="animate()"
        [moveFrames]="{ y: [0, -0.42, 0] }"
        moveReverseDuration="0"
      moveDuration="560"
        moveDelay="150"
        moveEasing="cubic-bezier(0.22, 1, 0.36, 1)"
      />
      <line
        x1="15" y1="9" x2="15.01" y2="9"
        [moveTarget]="animate()"
        [moveFrames]="{ y: [0, -0.42, 0] }"
        moveReverseDuration="0"
      moveDuration="560"
        moveDelay="180"
        moveEasing="cubic-bezier(0.22, 1, 0.36, 1)"
      />
    </svg>
  `,
})
export class LmnSmileIcon extends LmnIconBase {}
