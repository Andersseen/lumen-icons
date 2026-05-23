import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveTargetDirective],
  host: LM_ICON_HOST,
  styles: [`
    .check-box, .check-tick {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      transition: stroke-dashoffset 180ms ease-out;
    }
    .is-animated .check-box,
    .is-animated .check-tick {
      animation: draw 400ms ease-out forwards;
    }
    .is-animated .check-tick { animation-delay: 100ms; }
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
      <path class="check-box" pathLength="1" d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      <path class="check-tick" pathLength="1" d="m9 11 3 3L22 4"/>
    </svg>
  `,
})
export class LmnCheckboxIcon extends LmnIconBase {}
