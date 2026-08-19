import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-shopping-cart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-shopping-cart-wheel {
          0% { transform: translateX(-5px) rotate(0deg); }
          100% { transform: translateX(0) rotate(300deg); }
        }
        @keyframes lmn-shopping-cart-body {
          0% { transform: translateX(-5px); }
          72% { transform: translateX(1px); }
          100% { transform: translateX(0); }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate) svg path { transform-origin: center; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-6 { animation: lmn-shopping-cart-wheel 760ms cubic-bezier(0.25, 0.8, 0.35, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-shopping-cart-body 760ms cubic-bezier(0.25, 0.8, 0.35, 1) both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-shopping-cart-body 760ms cubic-bezier(0.25, 0.8, 0.35, 1) both; }

    @media (prefers-reduced-motion: reduce) {
      :host(.lmn-animate),
      :host(.lmn-animate) svg,
      :host(.lmn-animate) path,
      :host(.lmn-animate) line,
      :host(.lmn-animate) circle,
      :host(.lmn-animate) rect,
      :host(.lmn-animate) g,
      :host(.lmn-animate) .lmn-animate-el {
        animation: none !important;
      }
    }
    
  `],
  template: `
    @if (variant() === 'filled') {
      <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [class.lmn-animate]="animate()"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path class="lmn-path-1" d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"/>
    </svg>
    } @else {
      <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [style.--lmn-stroke-width]="strokeWidth() + 'px'"
      [class.lmn-animate]="animate()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path class="lmn-path-1" d="M2.25 3 h1.386 c0.51 0 0.955 0.343 1.087 0.835 l0.383 1.437"/><path class="lmn-path-2" d="M7.5 14.25 a3 3 0 0 0 -3 3 h15.75"/><path class="lmn-path-3" d="M7.5 14.25 h11.218 c1.121 -2.3 2.1 -4.684 2.924 -7.138 a60.114 60.114 0 0 0 -16.536 -1.84"/><path class="lmn-path-4" d="M7.5 14.25 5.106 5.272"/><path class="lmn-path-5" d="M6 20.25 a0.75 0.75 0 1 1 -1.5 0 0.75 0.75 0 0 1 1.5 0 Z"/><path class="lmn-path-6" d="M18.75 20.25 a0.75 0.75 0 1 1 -1.5 0 0.75 0.75 0 0 1 1.5 0 Z"/>
    </svg>
    }
  `,
})
export class LmnShoppingCartIcon extends LmnIconBase {}
