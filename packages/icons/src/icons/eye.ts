import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-eye',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveTargetDirective],
  host: LM_ICON_HOST,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [moveTarget]="animate()"
      [moveFrames]="{ scale: [1, 1.1, 1] }"
      moveDuration="400"
      [moveSpring]="{ stiffness: 300, damping: 14 }"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `,
})
export class LmnEyeIcon extends LmnIconBase {}
