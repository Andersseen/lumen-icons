import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-wallet',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-wallet-card {
          0%, 12% { transform: translateY(-9px); opacity: 0; }
          26% { opacity: 1; }
          70% { transform: translateY(1.5px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes lmn-wallet-shell {
          0% { transform: scale(0.94); }
          58% { transform: scale(1.03); }
          100% { transform: scale(1); }
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
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-6 { animation: lmn-wallet-card 820ms cubic-bezier(0.25, 0.9, 0.3, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-wallet-shell 820ms cubic-bezier(0.3, 1.2, 0.5, 1) both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-wallet-shell 820ms cubic-bezier(0.3, 1.2, 0.5, 1) both; }

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
      <path class="lmn-path-1" d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z"/>
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
      <path class="lmn-path-1" d="M21 12 a2.25 2.25 0 0 0 -2.25 -2.25 H15 a3 3 0 1 1 -6 0 H5.25 A2.25 2.25 0 0 0 3 12"/><path class="lmn-path-2" d="M21 12 v6 a2.25 2.25 0 0 1 -2.25 2.25 H5.25 A2.25 2.25 0 0 1 3 18 v-6"/><path class="lmn-path-3" d="M21 12 V9"/><path class="lmn-path-4" d="M3 12 V9"/><path class="lmn-path-5" d="M21 9 a2.25 2.25 0 0 0 -2.25 -2.25 H5.25 A2.25 2.25 0 0 0 3 9"/><path class="lmn-path-6" d="M21 9 V6 a2.25 2.25 0 0 0 -2.25 -2.25 H5.25 A2.25 2.25 0 0 0 3 6 v3"/>
    </svg>
    }
  `,
})
export class LmnWalletIcon extends LmnIconBase {}
