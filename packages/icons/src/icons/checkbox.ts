import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-checkbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.is-animated]="animate()"
      [moveVariants]="{ active: { scale: [1, 1.04, 1] } }"
      [moveAnimate]="animate() ? 'active' : undefined"
      [moveDuration]="400"
      moveEasing="cubic-bezier(0.34, 1.56, 0.64, 1)"
      style="transform-origin: center; transform-box: fill-box;"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path class="box" pathLength="1" d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      <path class="check-mark" pathLength="1" d="m9 11 3 3L22 4"/>
    </svg>
  `,
  styles: [`
    .box, .check-mark {
      stroke-dasharray: none;
      stroke-dashoffset: 0;
    }
    .is-animated .box {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: draw 280ms ease-out 0ms forwards;
    }
    .is-animated .check-mark {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: draw 320ms cubic-bezier(0.16, 1, 0.3, 1) 180ms forwards;
    }
    @keyframes draw {
      to { stroke-dashoffset: 0; }
    }
  `],
})
export class LmnCheckboxIcon extends LmnIconBase {}
