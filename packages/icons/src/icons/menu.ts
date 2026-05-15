import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    .menu-line {
      transform-box: fill-box;
      transform-origin: center;
    }
    .is-animated .menu-line {
      animation: menu-wave 500ms ease-in-out both;
    }
    .is-animated .menu-line:nth-child(1) { animation-delay: 0ms; }
    .is-animated .menu-line:nth-child(2) { animation-delay: 80ms; }
    .is-animated .menu-line:nth-child(3) { animation-delay: 160ms; }

    @keyframes menu-wave {
      0%, 100% { transform: scaleX(1); }
      50%      { transform: scaleX(0.82); }
    }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.is-animated]="animate()"
      [moveVariants]="{ active: { opacity: [0.85, 1] } }"
      [moveAnimate]="animate() ? 'active' : undefined"
      [moveDuration]="400"
      moveEasing="ease-out"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line class="menu-line" x1="4" x2="20" y1="6" y2="6"/>
      <line class="menu-line" x1="4" x2="20" y1="12" y2="12"/>
      <line class="menu-line" x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  `,
})
export class LmnMenuIcon extends LmnIconBase {}
