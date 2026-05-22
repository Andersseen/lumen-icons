import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-bold',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    .is-animated .bold-top,
    .is-animated .bold-bottom {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
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
      <path class="bold-top" pathLength="1" d="M14 12a4 4 0 0 0 0-8H6v8"/>
      <path class="bold-bottom" pathLength="1" d="M15 20a4 4 0 0 0 0-8H6v8Z"/>
    </svg>
  `,
})
export class LmnBoldIcon extends LmnIconBase {}
