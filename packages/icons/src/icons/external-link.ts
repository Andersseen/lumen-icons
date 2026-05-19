import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-external-link',
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
      [moveVariants]="{ active: { x: [0, -2, 0], y: [0, 2, 0] } }"
      [moveAnimate]="animate() ? 'active' : undefined"
      [moveDuration]="450"
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
      <path class="arrow-up" pathLength="1" d="M15 3h6v6"/>
      <path class="arrow-diagonal" pathLength="1" d="M10 14 21 3"/>
      <path class="box" pathLength="1" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  `,
  styles: [`
    .arrow-up, .arrow-diagonal, .box {
      stroke-dasharray: none;
      stroke-dashoffset: 0;
    }
    .is-animated .box {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: draw 260ms ease-out 0ms forwards;
    }
    .is-animated .arrow-up {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: draw 260ms ease-out 120ms forwards;
    }
    .is-animated .arrow-diagonal {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: draw 260ms ease-out 220ms forwards;
    }
    @keyframes draw {
      to { stroke-dashoffset: 0; }
    }
  `],
})
export class LmnExternalLinkIcon extends LmnIconBase {}
