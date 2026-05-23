import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-plus',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveTargetDirective],
  host: LM_ICON_HOST,
  styles: [`
    .plus-h, .plus-v {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      transition: stroke-dashoffset 180ms ease-out;
    }
    .is-animated .plus-h,
    .is-animated .plus-v {
      animation: draw 400ms ease-out forwards;
    }
    .is-animated .plus-v { animation-delay: 100ms; }
    @keyframes draw {
      to { stroke-dashoffset: 0; }
    }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.is-animated]="animate()"
      [moveTarget]="animate()"
      [moveFrames]="{ scale: [0.92, 1.08, 1] }"
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
      <path class="plus-h" pathLength="1" d="M5 12h14"/>
      <path class="plus-v" pathLength="1" d="M12 5v14"/>
    </svg>
  `,
})
export class LmnPlusIcon extends LmnIconBase {}
