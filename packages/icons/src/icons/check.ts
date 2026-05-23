import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveTargetDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-check',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveTargetDirective],
  host: LM_ICON_HOST,
  styles: [`
    .check-mark {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      transition: stroke-dashoffset 200ms ease-out;
    }
    .is-animated .check-mark {
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
      [moveTarget]="animate()"
      [moveFrames]="{ opacity: [0.7, 1], scale: [0.92, 1.08, 1], y: [2, -1, 0] }"
      moveDuration="460"
      [moveSpring]="{ stiffness: 300, damping: 13 }"
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
