import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-sun',
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
      <circle cx="12" cy="12" r="4"
        [moveTarget]="animate()"
        [moveFrames]="{ scale: [1, 1.05, 1] }"
        moveDuration="800"
        [moveSpring]="{ stiffness: 200, damping: 10 }"
      />
      <path d="M12 2v2"         [moveTarget]="animate()" [moveFrames]="{ scale: [0.5, 1], opacity: [0.35, 1] }" moveDuration="400" moveDelay="60"  moveEasing="ease-out" />
      <path d="M12 20v2"         [moveTarget]="animate()" [moveFrames]="{ scale: [0.5, 1], opacity: [0.35, 1] }" moveDuration="400" moveDelay="120" moveEasing="ease-out" />
      <path d="M4.93 4.93l1.41 1.41" [moveTarget]="animate()" [moveFrames]="{ scale: [0.5, 1], opacity: [0.35, 1] }" moveDuration="400" moveDelay="180" moveEasing="ease-out" />
      <path d="M17.66 17.66l1.41 1.41" [moveTarget]="animate()" [moveFrames]="{ scale: [0.5, 1], opacity: [0.35, 1] }" moveDuration="400" moveDelay="240" moveEasing="ease-out" />
      <path d="M2 12h2"         [moveTarget]="animate()" [moveFrames]="{ scale: [0.5, 1], opacity: [0.35, 1] }" moveDuration="400" moveDelay="300" moveEasing="ease-out" />
      <path d="M20 12h2"         [moveTarget]="animate()" [moveFrames]="{ scale: [0.5, 1], opacity: [0.35, 1] }" moveDuration="400" moveDelay="360" moveEasing="ease-out" />
      <path d="M6.34 17.66l-1.41 1.41" [moveTarget]="animate()" [moveFrames]="{ scale: [0.5, 1], opacity: [0.35, 1] }" moveDuration="400" moveDelay="420" moveEasing="ease-out" />
      <path d="M19.07 4.93l-1.41 1.41" [moveTarget]="animate()" [moveFrames]="{ scale: [0.5, 1], opacity: [0.35, 1] }" moveDuration="400" moveDelay="480" moveEasing="ease-out" />
    </svg>
  `,
})
export class LmnSunIcon extends LmnIconBase {}
