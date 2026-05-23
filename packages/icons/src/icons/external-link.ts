import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-external-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveTargetDirective],
  host: LM_ICON_HOST,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [moveTarget]="animate()"
      [moveFrames]="{ scale: [1, 0.981, 1.015, 1] }"
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
      <path
        d="M15 3h6v6"
        [moveTarget]="animate()"
        [moveFrames]="{ x: [0, -0.42, 0.42, 0], y: [0, 0.42, -0.42, 0], opacity: [1, 0.853, 1] }"
        moveReverseDuration="0"
      moveDuration="560"
      />
      <path
        d="M10 14 21 3"
        [moveTarget]="animate()"
        [moveFrames]="{ x: [0, -0.84, 0.42, 0], y: [0, 0.84, -0.42, 0], opacity: [1, 0.853, 1] }"
        moveReverseDuration="0"
      moveDuration="560"
        moveDelay="60"
      />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  `,
})
export class LmnExternalLinkIcon extends LmnIconBase {}
