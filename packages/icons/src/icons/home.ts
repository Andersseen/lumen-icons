import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    svg { transform-origin: center; transform-box: fill-box; }

    .home-shell, .home-door {
      transform-origin: center bottom;
      transition: transform 220ms ease-out, opacity 220ms ease-out;
    }

    .is-animated .home-shell {
      animation: home-settle 460ms cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .is-animated .home-door {
      animation: door-rise 360ms cubic-bezier(0.16, 1, 0.3, 1) 90ms both;
    }

    @keyframes home-settle {
      0% { opacity: 0.55; transform: translateY(-3px) scale(0.96); }
      60% { transform: translateY(1px) scale(1.04); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes door-rise {
      0% { opacity: 0.4; transform: translateY(3px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.is-animated]="animate()"
      [moveVariants]="{
        active: { opacity: [0.85, 1], y: [-1, 0] }
      }"
      [moveAnimate]="animate() ? 'active' : undefined"
      [moveDuration]="420"
      [moveSpring]="{ stiffness: 260, damping: 14 }"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path class="home-shell" d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline class="home-door" points="9 22 9 12 15 12 15 22"/>
    </svg>
  `,
})
export class LmnHomeIcon extends LmnIconBase {}
