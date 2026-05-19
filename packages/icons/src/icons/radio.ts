import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-radio',
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
      [moveVariants]="{ active: { scale: [1, 1.06, 1] } }"
      [moveAnimate]="animate() ? 'active' : undefined"
      [moveDuration]="450"
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
      <circle class="ring" pathLength="1" cx="12" cy="12" r="10"/>
      <circle class="dot" cx="12" cy="12" r="4"/>
    </svg>
  `,
  styles: [`
    .ring {
      stroke-dasharray: none;
      stroke-dashoffset: 0;
    }
    .dot {
      transform-box: fill-box;
      transform-origin: center;
      opacity: 1;
      transform: scale(1);
      transition: none;
    }
    .is-animated .ring {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: ring-draw 340ms ease-out forwards;
    }
    .is-animated .dot {
      animation: dot-appear 300ms cubic-bezier(0.34, 1.56, 0.64, 1) 200ms both;
    }
    @keyframes ring-draw {
      to { stroke-dashoffset: 0; }
    }
    @keyframes dot-appear {
      0%   { opacity: 0; transform: scale(0.3); }
      70%  { opacity: 1; transform: scale(1.3); }
      100% { opacity: 1; transform: scale(1); }
    }
  `],
})
export class LmnRadioIcon extends LmnIconBase {}
