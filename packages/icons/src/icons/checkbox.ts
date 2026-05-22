import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    .is-animated .check-box,
    .is-animated .check-tick {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: draw 400ms ease-out forwards;
    }

    .is-animated .check-tick {
      animation-delay: 100ms;
    }

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
      [moveVariants]="{ active: { scale: [0.92, 1.08, 1] } }"
      [moveAnimate]="animate() ? 'active' : undefined"
      [moveDuration]="400"
      moveEasing="cubic-bezier(0.34, 1.56, 0.64, 1)"
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
