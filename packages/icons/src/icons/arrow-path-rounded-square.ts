import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-arrow-path-rounded-square',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-arrow-path-rounded-square-shaft {
          0% { stroke-dashoffset: -1; opacity: 0.45; }
          62% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-arrow-path-rounded-square-head {
          0%, 44% { stroke-dashoffset: -1; opacity: 0.25; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-arrow-path-rounded-square-solid-half {
          0% { transform: scale(0.94); opacity: 0.2; }
          72% { transform: scale(1.02); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-arrow-path-rounded-square-shaft 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-6 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-arrow-path-rounded-square-head 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-1,
        :host(.lmn-animate.lmn-filled) svg .lmn-path-2 { animation: lmn-arrow-path-rounded-square-solid-half 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" clip-rule="evenodd" d="M12 5.25 c1.213 0 2.415 0.046 3.605 0.135 a3.256 3.256 0 0 1 3.01 3.01 c0.044 0.583 0.077 1.17 0.1 1.759 L17.03 8.47 a0.75 0.75 0 1 0 -1.06 1.06 l3 3 a0.75 0.75 0 0 0 1.06 0 l3 -3 a0.75 0.75 0 0 0 -1.06 -1.06 l-1.752 1.751 c-0.023 -0.65 -0.06 -1.296 -0.108 -1.939 a4.756 4.756 0 0 0 -4.392 -4.392 49.422 49.422 0 0 0 -7.436 0 A4.756 4.756 0 0 0 3.89 8.282 c-0.017 0.224 -0.033 0.447 -0.046 0.672 a0.75 0.75 0 1 0 1.497 0.092 c0.013 -0.217 0.028 -0.434 0.044 -0.651 a3.256 3.256 0 0 1 3.01 -3.01 c1.19 -0.09 2.392 -0.135 3.605 -0.135 Z" pathLength="1"/><path class="lmn-path-2" fill-rule="evenodd" clip-rule="evenodd" d="M5.03 11.469999999999999 a0.75 0.75 0 0 0 -1.06 0 l-3 3 a0.75 0.75 0 1 0 1.06 1.06 l1.752 -1.751 c0.023 0.65 0.06 1.296 0.108 1.939 a4.756 4.756 0 0 0 4.392 4.392 49.413 49.413 0 0 0 7.436 0 4.756 4.756 0 0 0 4.392 -4.392 c0.017 -0.223 0.032 -0.447 0.046 -0.672 a0.75 0.75 0 0 0 -1.497 -0.092 c-0.013 0.217 -0.028 0.434 -0.044 0.651 a3.256 3.256 0 0 1 -3.01 3.01 47.953 47.953 0 0 1 -7.21 0 3.256 3.256 0 0 1 -3.01 -3.01 47.759 47.759 0 0 1 -0.1 -1.759 L6.97 15.53 a0.75 0.75 0 0 0 1.06 -1.06 l-3 -3 Z" pathLength="1"/>
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
      <path class="lmn-path-1" d="M19.5 12 c0 -1.232 -0.046 -2.453 -0.138 -3.662 a4.006 4.006 0 0 0 -3.7 -3.7 48.678 48.678 0 0 0 -7.324 0 4.006 4.006 0 0 0 -3.7 3.7 c-0.017 0.22 -0.032 0.441 -0.046 0.662" pathLength="1"/><path class="lmn-path-2" d="M19.5 12 l3 -3" pathLength="1"/><path class="lmn-path-3" d="M19.5 12 l-3 -3" pathLength="1"/><path class="lmn-path-4" d="M4.5 12 c0 1.232 0.046 2.453 0.138 3.662 a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7 -3.7 c0.017 -0.22 0.032 -0.441 0.046 -0.662" pathLength="1"/><path class="lmn-path-5" d="M4.5 12 l3 3" pathLength="1"/><path class="lmn-path-6" d="M4.5 12 l-3 3" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnArrowPathRoundedSquareIcon extends LmnIconBase {}
