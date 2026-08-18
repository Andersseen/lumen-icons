import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-adjustments-vertical',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-adjustments-vertical-pin-a {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(2px); }
        }
        @keyframes lmn-adjustments-vertical-pin-b {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
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
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-adjustments-vertical-pin-a 600ms ease-in-out both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-6,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-7 { animation: lmn-adjustments-vertical-pin-b 600ms ease-in-out both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-10,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-11 { animation: lmn-adjustments-vertical-pin-a 600ms ease-in-out both 80ms; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-7 { animation: lmn-adjustments-vertical-pin-a 600ms ease-in-out both; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-8 { animation: lmn-adjustments-vertical-pin-b 600ms ease-in-out both; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-9 { animation: lmn-adjustments-vertical-pin-a 600ms ease-in-out both 80ms; }

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
      <path class="lmn-path-1" d="M6 12 a0.75 0.75 0 0 1 -0.75 -0.75 v-7.5 a0.75 0.75 0 1 1 1.5 0 v7.5 A0.75 0.75 0 0 1 6 12 Z"/><path class="lmn-path-2" d="M18 12 a0.75 0.75 0 0 1 -0.75 -0.75 v-7.5 a0.75 0.75 0 0 1 1.5 0 v7.5 A0.75 0.75 0 0 1 18 12 Z"/><path class="lmn-path-3" d="M6.75 20.25 v-1.5 a0.75 0.75 0 0 0 -1.5 0 v1.5 a0.75 0.75 0 0 0 1.5 0 Z"/><path class="lmn-path-4" d="M18.75 18.75 v1.5 a0.75 0.75 0 0 1 -1.5 0 v-1.5 a0.75 0.75 0 0 1 1.5 0 Z"/><path class="lmn-path-5" d="M12.75 5.25 v-1.5 a0.75 0.75 0 0 0 -1.5 0 v1.5 a0.75 0.75 0 0 0 1.5 0 Z"/><path class="lmn-path-6" d="M12 21 a0.75 0.75 0 0 1 -0.75 -0.75 v-7.5 a0.75 0.75 0 0 1 1.5 0 v7.5 A0.75 0.75 0 0 1 12 21 Z"/><path class="lmn-path-7" d="M3.75 15 a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0 -4.5 0 Z"/><path class="lmn-path-8" d="M12 11.25 a2.25 2.25 0 1 1 0 -4.5 2.25 2.25 0 0 1 0 4.5 Z"/><path class="lmn-path-9" d="M15.75 15 a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0 -4.5 0 Z"/>
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
      <path class="lmn-path-1" d="M6 13.5 V3.75"/><path class="lmn-path-2" d="M6 13.5 a1.5 1.5 0 0 1 0 3"/><path class="lmn-path-3" d="M6 13.5 a1.5 1.5 0 0 0 0 3"/><path class="lmn-path-4" d="M6 20.25 V16.5"/><path class="lmn-path-5" d="M18 13.5 V3.75"/><path class="lmn-path-6" d="M18 13.5 a1.5 1.5 0 0 1 0 3"/><path class="lmn-path-7" d="M18 13.5 a1.5 1.5 0 0 0 0 3"/><path class="lmn-path-8" d="M18 20.25 V16.5"/><path class="lmn-path-9" d="M12 7.5 V3.75"/><path class="lmn-path-10" d="M12 7.5 a1.5 1.5 0 0 1 0 3"/><path class="lmn-path-11" d="M12 7.5 a1.5 1.5 0 0 0 0 3"/><path class="lmn-path-12" d="M12 20.25 V10.5"/>
    </svg>
    }
  `,
})
export class LmnAdjustmentsVerticalIcon extends LmnIconBase {}
