import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-arrow-right',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    .is-animated .arrow-line {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: arrow-draw 260ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .is-animated .arrow-head {
      animation: arrow-head 360ms cubic-bezier(0.34, 1.56, 0.64, 1) 90ms both;
    }

    @keyframes arrow-draw {
      to { stroke-dashoffset: 0; }
    }

    @keyframes arrow-head {
      0% { opacity: 0.35; transform: translateX(-4px); }
      100% { opacity: 1; transform: translateX(0); }
    }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.is-animated]="animate()"
      [moveVariants]="{
        active: { x: [-3, 0], opacity: [0.65, 1] }
      }"
      [moveAnimate]="animate() ? 'active' : undefined"
      [moveDuration]="320"
      moveEasing="cubic-bezier(0.16, 1, 0.3, 1)"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path class="arrow-line" pathLength="1" d="M5 12h14"/>
      <path class="arrow-head" d="m12 5 7 7-7 7"/>
    </svg>
  `,
})
export class LmnArrowRightIcon extends LmnIconBase {}
