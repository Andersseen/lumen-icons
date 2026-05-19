import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-home',
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
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path class="home-shell" pathLength="1" d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline class="home-door" points="9 22 9 12 15 12 15 22"/>
    </svg>
  `,
  styles: [`
    .home-shell, .home-door {
      stroke-dasharray: none;
      stroke-dashoffset: 0;
    }
    .home-door {
      transform-box: fill-box;
      transform-origin: left center;
    }
    .is-animated .home-shell {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: draw 380ms ease-out 0ms forwards;
    }
    .is-animated .home-door {
      animation: door-swing 500ms cubic-bezier(0.34, 1.56, 0.64, 1) 280ms both;
    }
    @keyframes draw {
      to { stroke-dashoffset: 0; }
    }
    @keyframes door-swing {
      0%   { transform: scaleX(1); }
      40%  { transform: scaleX(0.12); }
      100% { transform: scaleX(1); }
    }
  `],
})
export class LmnHomeIcon extends LmnIconBase {}
