import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-bold',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveTargetDirective],
  host: LM_ICON_HOST,
  styles: [`
    .bold-top, .bold-bottom {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      transition: stroke-dashoffset 180ms ease-out;
    }
    .is-animated .bold-top,
    .is-animated .bold-bottom {
      animation: draw 400ms ease-out forwards;
    }
    .is-animated .bold-bottom { animation-delay: 100ms; }
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
      [moveSpring]="{ stiffness: 320, damping: 14 }"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path class="bold-top" pathLength="1" d="M14 12a4 4 0 0 0 0-8H6v8"/>
      <path class="bold-bottom" pathLength="1" d="M15 20a4 4 0 0 0 0-8H6v8Z"/>
    </svg>
  `,
})
export class LmnBoldIcon extends LmnIconBase {}
