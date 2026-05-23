import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-home',
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
        d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        [moveTarget]="animate()"
        [moveFrames]="{ opacity: [0.55, 1], y: [-3, 0], scale: [0.96, 1.04, 1] }"
        moveDuration="460"
        moveEasing="cubic-bezier(0.16, 1, 0.3, 1)"
      />
      <polyline
        points="9 22 9 12 15 12 15 22"
        [moveTarget]="animate()"
        [moveFrames]="{ opacity: [0.4, 1], y: [3, 0] }"
        moveDuration="360"
        moveDelay="90"
        moveEasing="cubic-bezier(0.16, 1, 0.3, 1)"
      />
    </svg>
  `,
})
export class LmnHomeIcon extends LmnIconBase {}
