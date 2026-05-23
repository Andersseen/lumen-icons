import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-menu',
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
      <line
        x1="4" x2="20" y1="6" y2="6"
        [moveTarget]="animate()"
        [moveFrames]="{ scaleX: [1, 0.932, 1] }"
        moveReverseDuration="0"
      moveDuration="560"
        moveEasing="ease-in-out"
      />
      <line
        x1="4" x2="20" y1="12" y2="12"
        [moveTarget]="animate()"
        [moveFrames]="{ scaleX: [1, 0.932, 1] }"
        moveReverseDuration="0"
      moveDuration="560"
        moveDelay="80"
        moveEasing="ease-in-out"
      />
      <line
        x1="4" x2="20" y1="18" y2="18"
        [moveTarget]="animate()"
        [moveFrames]="{ scaleX: [1, 0.932, 1] }"
        moveReverseDuration="0"
      moveDuration="560"
        moveDelay="160"
        moveEasing="ease-in-out"
      />
    </svg>
  `,
})
export class LmnMenuIcon extends LmnIconBase {}
