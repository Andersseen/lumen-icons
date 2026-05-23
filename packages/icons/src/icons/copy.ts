import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-copy',
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
        width="14" height="14" x="8" y="8" rx="2" ry="2"
        [moveTarget]="animate()"
        [moveFrames]="{ x: [0, 2, 0], y: [0, 2, 0], opacity: [1, 0.7, 1] }"
        moveDuration="400"
        moveEasing="ease-in-out"
      />
      <path
        d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
        [moveTarget]="animate()"
        [moveFrames]="{ x: [0, -1, 0], y: [0, -1, 0] }"
        moveDuration="400"
        moveEasing="ease-in-out"
      />
    </svg>
  `,
})
export class LmnCopyIcon extends LmnIconBase {}
