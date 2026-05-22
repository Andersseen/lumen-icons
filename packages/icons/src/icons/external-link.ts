import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-external-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    svg { transform-origin: center; transform-box: fill-box; }

    .arrow-1, .arrow-2, .box {
      transition: stroke-dashoffset 180ms ease-out;
    }

    .is-animated .arrow-1,
    .is-animated .arrow-2,
    .is-animated .box {
      animation: draw 350ms ease-out forwards;
    }

    .is-animated .arrow-2 { animation-delay: 80ms; }
    .is-animated .box { animation-delay: 160ms; }

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
      [moveSpring]="{ stiffness: 340, damping: 15 }"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path class="arrow-1" pathLength="1" d="M15 3h6v6"/>
      <path class="arrow-2" pathLength="1" d="M10 14 21 3"/>
      <path class="box" pathLength="1" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  `,
})
export class LmnExternalLinkIcon extends LmnIconBase {}
