import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-copy',
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
      [moveVariants]="{ active: { x: [0, -2, 0], opacity: [1, 0.85, 1] } }"
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
      <rect class="copy-sheet" pathLength="1" width="14" height="14" x="8" y="8" rx="2" ry="2"/>
      <path class="original" pathLength="1" d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
  `,
  styles: [`
    .copy-sheet, .original {
      stroke-dasharray: none;
      stroke-dashoffset: 0;
    }
    .is-animated .original {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: draw 320ms ease-out 0ms forwards;
    }
    .is-animated .copy-sheet {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: draw 340ms ease-out 140ms forwards;
    }
    @keyframes draw {
      to { stroke-dashoffset: 0; }
    }
  `],
})
export class LmnCopyIcon extends LmnIconBase {}
