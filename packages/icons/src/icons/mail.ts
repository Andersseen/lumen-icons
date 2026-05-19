import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-mail',
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
      [moveVariants]="{ active: { y: [0, -4, 0] } }"
      [moveAnimate]="animate() ? 'active' : undefined"
      [moveDuration]="500"
      moveEasing="ease-out"
      style="transform-origin: center; transform-box: fill-box;"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect class="envelope" pathLength="1" width="20" height="16" x="2" y="4" rx="2"/>
      <path class="flap" pathLength="1" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  `,
  styles: [`
    .envelope, .flap {
      stroke-dasharray: none;
      stroke-dashoffset: 0;
    }
    .is-animated .envelope {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: draw 340ms ease-out 0ms forwards;
    }
    .is-animated .flap {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: flap-open 440ms cubic-bezier(0.16, 1, 0.3, 1) 200ms forwards;
    }
    @keyframes draw {
      to { stroke-dashoffset: 0; }
    }
    @keyframes flap-open {
      0%   { stroke-dashoffset: 1; transform: translateY(2px); }
      60%  { stroke-dashoffset: 0; transform: translateY(-2px); }
      100% { stroke-dashoffset: 0; transform: translateY(0); }
    }
  `],
})
export class LmnMailIcon extends LmnIconBase {}
