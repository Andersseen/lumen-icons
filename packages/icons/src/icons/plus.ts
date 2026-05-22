import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-plus',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    .is-animated .plus-h,
    .is-animated .plus-v {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: draw 400ms ease-out forwards;
    }

    .is-animated .plus-v {
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
      <path class="plus-h" pathLength="1" d="M5 12h14"/>
      <path class="plus-v" pathLength="1" d="M12 5v14"/>
    </svg>
  `,
})
export class LmnPlusIcon extends LmnIconBase {}
