import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-adjustments-horizontal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-adjustments-horizontal-pin-a {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(2px); }
        }
        @keyframes lmn-adjustments-horizontal-pin-b {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-2px); }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-adjustments-horizontal-pin-a 600ms ease-in-out both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-6,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-7 { animation: lmn-adjustments-horizontal-pin-b 600ms ease-in-out both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-10,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-11 { animation: lmn-adjustments-horizontal-pin-a 600ms ease-in-out both 80ms; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-7 { animation: lmn-adjustments-horizontal-pin-a 600ms ease-in-out both; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-8 { animation: lmn-adjustments-horizontal-pin-b 600ms ease-in-out both; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-9 { animation: lmn-adjustments-horizontal-pin-a 600ms ease-in-out both 80ms; }

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
      <path class="lmn-path-1" d="M18.75 12.75 h1.5 a0.75 0.75 0 0 0 0 -1.5 h-1.5 a0.75 0.75 0 0 0 0 1.5 Z"/><path class="lmn-path-2" d="M12 6 a0.75 0.75 0 0 1 0.75 -0.75 h7.5 a0.75 0.75 0 0 1 0 1.5 h-7.5 A0.75 0.75 0 0 1 12 6 Z"/><path class="lmn-path-3" d="M12 18 a0.75 0.75 0 0 1 0.75 -0.75 h7.5 a0.75 0.75 0 0 1 0 1.5 h-7.5 A0.75 0.75 0 0 1 12 18 Z"/><path class="lmn-path-4" d="M3.75 6.75 h1.5 a0.75 0.75 0 1 0 0 -1.5 h-1.5 a0.75 0.75 0 0 0 0 1.5 Z"/><path class="lmn-path-5" d="M5.25 18.75 h-1.5 a0.75 0.75 0 0 1 0 -1.5 h1.5 a0.75 0.75 0 0 1 0 1.5 Z"/><path class="lmn-path-6" d="M3 12 a0.75 0.75 0 0 1 0.75 -0.75 h7.5 a0.75 0.75 0 0 1 0 1.5 h-7.5 A0.75 0.75 0 0 1 3 12 Z"/><path class="lmn-path-7" d="M9 3.75 a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0 -4.5 Z"/><path class="lmn-path-8" d="M12.75 12 a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1 -4.5 0 Z"/><path class="lmn-path-9" d="M9 15.75 a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0 -4.5 Z"/>
    </svg>
    } @else {
      <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.lmn-animate]="animate()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path class="lmn-path-1" d="M10.5 6 h9.75"/><path class="lmn-path-2" d="M10.5 6 a1.5 1.5 0 1 1 -3 0"/><path class="lmn-path-3" d="M10.5 6 a1.5 1.5 0 1 0 -3 0"/><path class="lmn-path-4" d="M3.75 6 H7.5"/><path class="lmn-path-5" d="M10.5 18 h9.75"/><path class="lmn-path-6" d="M10.5 18 a1.5 1.5 0 0 1 -3 0"/><path class="lmn-path-7" d="M10.5 18 a1.5 1.5 0 0 0 -3 0"/><path class="lmn-path-8" d="M3.75 18 H7.5"/><path class="lmn-path-9" d="M16.5 12 h3.75"/><path class="lmn-path-10" d="M16.5 12 a1.5 1.5 0 0 1 -3 0"/><path class="lmn-path-11" d="M16.5 12 a1.5 1.5 0 0 0 -3 0"/><path class="lmn-path-12" d="M3.75 12 h9.75"/>
    </svg>
    }
  `,
})
export class LmnAdjustmentsHorizontalIcon extends LmnIconBase {}
