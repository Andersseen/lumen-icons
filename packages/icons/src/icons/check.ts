import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-check',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    .is-animated .check-mark {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: check-draw 420ms cubic-bezier(0.16, 1, 0.3, 1) 70ms forwards;
    }

    @keyframes check-draw {
      to { stroke-dashoffset: 0; }
    }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.is-animated]="animate()"
      [moveVariants]="{
        active: { opacity: [0.7, 1], scale: [0.92, 1.08, 1], y: [2, -1, 0] }
      }"
      [moveAnimate]="animate() ? 'active' : undefined"
      [moveDuration]="460"
      moveEasing="cubic-bezier(0.34, 1.56, 0.64, 1)"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <polyline class="check-mark" pathLength="1" points="4 12 9 17 20 6"/>
    </svg>
  `,
})
export class LmnCheckIcon extends LmnIconBase {}
