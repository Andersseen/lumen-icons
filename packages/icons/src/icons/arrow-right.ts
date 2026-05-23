import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-arrow-right',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveTargetDirective],
  host: LM_ICON_HOST,
  styles: [`
    .arrow-line {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      transition: stroke-dashoffset 180ms ease-out;
    }
    .is-animated .arrow-line {
      animation: arrow-draw 260ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes arrow-draw {
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
      [moveFrames]="{ x: [-3, 0], opacity: [0.65, 1] }"
      moveDuration="320"
      [moveSpring]="{ stiffness: 300, damping: 15 }"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path class="arrow-line" pathLength="1" d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
  `,
})
export class LmnArrowRightIcon extends LmnIconBase {}
