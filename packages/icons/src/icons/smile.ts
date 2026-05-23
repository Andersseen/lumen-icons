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
        [moveFrames]="{ rotate: [0, 4, -4, 0], scale: [1, 1.06, 1] }"
        moveDuration="600"
        moveEasing="ease-in-out"
      />
      <path
        d="M8 14s1.5 2 4 2 4-2 4-2"
        [moveTarget]="animate()"
        [moveFrames]="{ scaleY: [1, 1.15, 1] }"
        moveDuration="400"
        moveDelay="100"
        moveEasing="ease-out"
      />
      <line
        x1="9" y1="9" x2="9.01" y2="9"
        [moveTarget]="animate()"
        [moveFrames]="{ y: [0, -1, 0] }"
        moveDuration="300"
        moveDelay="150"
        moveEasing="ease-out"
      />
      <line
        x1="15" y1="9" x2="15.01" y2="9"
        [moveTarget]="animate()"
        [moveFrames]="{ y: [0, -1, 0] }"
        moveDuration="300"
        moveDelay="180"
        moveEasing="ease-out"
      />
    </svg>
  `,
})
export class LmnSmileIcon extends LmnIconBase {}
