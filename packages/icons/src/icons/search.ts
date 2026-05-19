import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-search',
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
      <circle class="lens" pathLength="1" cx="11" cy="11" r="8"/>
      <path class="handle" pathLength="1" d="m21 21-4.3-4.3"/>
    </svg>
  `,
  styles: [`
    .lens, .handle {
      stroke-dasharray: none;
      stroke-dashoffset: 0;
      transform-box: fill-box;
      transition: none;
    }
    .handle {
      transform-origin: top left;
    }
    .is-animated .lens {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: draw 320ms ease-out forwards;
    }
    .is-animated .handle {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: handle-tilt 460ms cubic-bezier(0.34, 1.56, 0.64, 1) 180ms both;
    }
    @keyframes draw {
      to { stroke-dashoffset: 0; }
    }
    @keyframes handle-tilt {
      0%   { stroke-dashoffset: 1; transform: rotate(0deg); }
      50%  { stroke-dashoffset: 0; transform: rotate(10deg); }
      100% { stroke-dashoffset: 0; transform: rotate(0deg); }
    }
  `],
})
export class LmnSearchIcon extends LmnIconBase {}
