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
      <path d="M12 2v4"     [moveTarget]="animate()" [moveFrames]="{ scale: [0.45, 1.25, 1], opacity: [0.35, 1] }" moveDuration="420" moveDelay="0"   [moveSpring]="{ stiffness: 260, damping: 11 }" />
      <path d="m5 5 2.8 2.8" [moveTarget]="animate()" [moveFrames]="{ scale: [0.45, 1.25, 1], opacity: [0.35, 1] }" moveDuration="420" moveDelay="35"  [moveSpring]="{ stiffness: 260, damping: 11 }" />
      <path d="m19 5-2.8 2.8" [moveTarget]="animate()" [moveFrames]="{ scale: [0.45, 1.25, 1], opacity: [0.35, 1] }" moveDuration="420" moveDelay="70"  [moveSpring]="{ stiffness: 260, damping: 11 }" />
      <path d="M12 12v8"     [moveTarget]="animate()" [moveFrames]="{ scale: [0.45, 1.25, 1], opacity: [0.35, 1] }" moveDuration="420" moveDelay="105" [moveSpring]="{ stiffness: 260, damping: 11 }" />
      <path d="m5 19 2.8-2.8" [moveTarget]="animate()" [moveFrames]="{ scale: [0.45, 1.25, 1], opacity: [0.35, 1] }" moveDuration="420" moveDelay="140" [moveSpring]="{ stiffness: 260, damping: 11 }" />
      <path d="m19 19-2.8-2.8" [moveTarget]="animate()" [moveFrames]="{ scale: [0.45, 1.25, 1], opacity: [0.35, 1] }" moveDuration="420" moveDelay="175" [moveSpring]="{ stiffness: 260, damping: 11 }" />
      <circle cx="12" cy="12" r="3"
        [moveTarget]="animate()"
        [moveFrames]="{ scale: [0.45, 1.25, 1], opacity: [0.35, 1] }"
        moveDuration="420"
        moveDelay="90"
        [moveSpring]="{ stiffness: 260, damping: 11 }"
      />
    </svg>
  `,
})
export class LmnSparklesIcon extends LmnIconBase {}
