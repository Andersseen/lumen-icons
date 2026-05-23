import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-chevron-right',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveTargetDirective],
  host: LM_ICON_HOST,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [moveTarget]="animate()"
      [moveFrames]="{ x: [0, -1.26, 0], opacity: [1, 0.811, 1], scaleX: [1, 0.97, 1] }"
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
      <path d="m9 18 6-6-6-6"/>
    </svg>
  `,
})
export class LmnChevronRightIcon extends LmnIconBase {}
