import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveTargetDirective],
  host: LM_ICON_HOST,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [moveTarget]="animate()"
      [moveFrames]="{ scale: [1, 0.977, 1.023, 1], y: [0, 0.42, -0.42, 0] }"
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
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      <path
        d="m9 11 3 3L22 4"
        [moveTarget]="animate()"
        [moveFrames]="{ scale: [1, 0.962, 1.068, 1], opacity: [1, 0.853, 1], y: [0, 0.42, -0.42, 0] }"
        moveReverseDuration="0"
      moveDuration="560"
        moveDelay="80"
      />
    </svg>
  `,
})
export class LmnCheckboxIcon extends LmnIconBase {}
