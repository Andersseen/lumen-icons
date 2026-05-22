import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-smile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    svg { transform-origin: center; transform-box: fill-box; }

    .mouth, .eye-left, .eye-right {
      transform-origin: center;
      transition: transform 220ms ease-out;
    }

    .is-animated .mouth {
      animation: smile-mouth 400ms ease-out 100ms forwards;
    }

    .is-animated .eye-left {
      animation: smile-eye 300ms ease-out 150ms forwards;
    }

    .is-animated .eye-right {
      animation: smile-eye 300ms ease-out 180ms forwards;
    }

    @keyframes smile-mouth {
      0%, 100% { transform: scaleY(1); }
      50% { transform: scaleY(1.15); }
    }

    @keyframes smile-eye {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-1px); }
    }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.is-animated]="animate()"
      [moveVariants]="{ active: { rotate: [0, 4, -4, 0], scale: [1, 1.06, 1] } }"
      [moveAnimate]="animate() ? 'active' : undefined"
      [moveDuration]="600"
      [moveSpring]="{ stiffness: 240, damping: 12 }"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10"/>
      <path class="mouth" d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line class="eye-left" x1="9" y1="9" x2="9.01" y2="9"/>
      <line class="eye-right" x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  `,
})
export class LmnSmileIcon extends LmnIconBase {}
