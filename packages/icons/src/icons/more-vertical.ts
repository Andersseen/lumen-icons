import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-more-vertical',
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
        cx="12" cy="12" r="1"
        [moveTarget]="animate()"
        [moveFrames]="{ scale: [1, 1.11, 1] }"
        moveReverseDuration="0"
      moveDuration="560"
      />
      <circle
        cx="12" cy="5" r="1"
        [moveTarget]="animate()"
        [moveFrames]="{ scale: [1, 1.11, 1] }"
        moveReverseDuration="0"
      moveDuration="560"
        moveDelay="100"
      />
      <circle
        cx="12" cy="19" r="1"
        [moveTarget]="animate()"
        [moveFrames]="{ scale: [1, 1.11, 1] }"
        moveReverseDuration="0"
      moveDuration="560"
        moveDelay="200"
      />
    </svg>
  `,
})
export class LmnMoreVerticalIcon extends LmnIconBase {}
