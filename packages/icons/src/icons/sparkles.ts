import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-sparkles',
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
      <path d="M12 2v4"     [moveTarget]="animate()" [moveFrames]="{ scale: [1, 0.92, 1.04, 1], opacity: [1, 0.88, 1] }" moveReverseDuration="0" moveDuration="560" moveDelay="0" />
      <path d="m5 5 2.8 2.8" [moveTarget]="animate()" [moveFrames]="{ scale: [1, 0.92, 1.04, 1], opacity: [1, 0.88, 1] }" moveReverseDuration="0" moveDuration="560" moveDelay="35" />
      <path d="m19 5-2.8 2.8" [moveTarget]="animate()" [moveFrames]="{ scale: [1, 0.92, 1.04, 1], opacity: [1, 0.88, 1] }" moveReverseDuration="0" moveDuration="560" moveDelay="70" />
      <path d="M12 12v8"     [moveTarget]="animate()" [moveFrames]="{ scale: [1, 0.92, 1.04, 1], opacity: [1, 0.88, 1] }" moveReverseDuration="0" moveDuration="560" moveDelay="105" />
      <path d="m5 19 2.8-2.8" [moveTarget]="animate()" [moveFrames]="{ scale: [1, 0.92, 1.04, 1], opacity: [1, 0.88, 1] }" moveReverseDuration="0" moveDuration="560" moveDelay="140" />
      <path d="m19 19-2.8-2.8" [moveTarget]="animate()" [moveFrames]="{ scale: [1, 0.92, 1.04, 1], opacity: [1, 0.88, 1] }" moveReverseDuration="0" moveDuration="560" moveDelay="175" />
      <circle cx="12" cy="12" r="3"
        [moveTarget]="animate()"
        [moveFrames]="{ scale: [1, 0.92, 1.04, 1], opacity: [1, 0.88, 1] }"
        moveReverseDuration="0"
        moveDuration="560"
        moveDelay="90"
      />
    </svg>
  `,
})
export class LmnSparklesIcon extends LmnIconBase {}
