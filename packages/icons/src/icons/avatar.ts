import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-avatar',
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
        cx="12" cy="8" r="5"
        [moveTarget]="animate()"
        [moveFrames]="{ scale: [0.9, 1.1, 1] }"
        moveDuration="400"
        [moveSpring]="{ stiffness: 320, damping: 14 }"
      />
      <path
        d="M20 21a8 8 0 1 0-16 0"
        [moveTarget]="animate()"
        [moveFrames]="{ scale: [0.9, 1.1, 1] }"
        moveDuration="400"
        moveDelay="60"
        [moveSpring]="{ stiffness: 320, damping: 14 }"
      />
    </svg>
  `,
})
export class LmnAvatarIcon extends LmnIconBase {}
