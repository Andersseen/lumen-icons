import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-bold',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveTargetDirective],
  host: LM_ICON_HOST,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [moveTarget]="animate()"
      [moveFrames]="{ scaleX: [1, 1.046, 1], scaleY: [1, 0.985, 1], x: [0, 0.42, 0] }"
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
      <path d="M14 12a4 4 0 0 0 0-8H6v8"/>
      <path d="M15 20a4 4 0 0 0 0-8H6v8Z"/>
    </svg>
  `,
})
export class LmnBoldIcon extends LmnIconBase {}
