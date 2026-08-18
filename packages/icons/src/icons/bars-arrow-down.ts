import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-bars-arrow-down',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-bars-arrow-down-list {
          0% { stroke-dashoffset: 1; opacity: 0; }
          52%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-bars-arrow-down-arrow {
          0%, 36% { transform: translateY(-3px); opacity: 0; }
          82%, 100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes lmn-bars-arrow-down-solid {
          0% { transform: translateY(-3px); opacity: 0.2; }
          82%, 100% { transform: translateY(0); opacity: 1; }
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
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-bars-arrow-down-list 650ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation-delay: 60ms; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation-delay: 120ms; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-6 { animation: lmn-bars-arrow-down-arrow 650ms cubic-bezier(0.22, 0.8, 0.32, 1) both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-bars-arrow-down-solid 650ms cubic-bezier(0.22, 0.8, 0.32, 1) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" clip-rule="evenodd" d="M2.25 4.5 A0.75 0.75 0 0 1 3 3.75 h14.25 a0.75 0.75 0 0 1 0 1.5 H3 a0.75 0.75 0 0 1 -0.75 -0.75 Z" pathLength="1"/><path class="lmn-path-2" fill-rule="evenodd" clip-rule="evenodd" d="M2.25 9 A0.75 0.75 0 0 1 3 8.25 h9.75 a0.75 0.75 0 0 1 0 1.5 H3 A0.75 0.75 0 0 1 2.25 9 Z" pathLength="1"/><path class="lmn-path-3" fill-rule="evenodd" clip-rule="evenodd" d="M17.25 8.25 A0.75 0.75 0 0 1 18 9 v10.19 l2.47 -2.47 a0.75 0.75 0 1 1 1.06 1.06 l-3.75 3.75 a0.75 0.75 0 0 1 -1.06 0 l-3.75 -3.75 a0.75 0.75 0 1 1 1.06 -1.06 l2.47 2.47 V9 a0.75 0.75 0 0 1 0.75 -0.75 Z" pathLength="1"/><path class="lmn-path-4" fill-rule="evenodd" clip-rule="evenodd" d="M2.25 13.5 a0.75 0.75 0 0 1 0.75 -0.75 h9.75 a0.75 0.75 0 0 1 0 1.5 H3 a0.75 0.75 0 0 1 -0.75 -0.75 Z" pathLength="1"/>
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
      <path class="lmn-path-1" d="M3 4.5 h14.25" pathLength="1"/><path class="lmn-path-2" d="M3 9 h9.75" pathLength="1"/><path class="lmn-path-3" d="M3 13.5 h9.75" pathLength="1"/><path class="lmn-path-4" d="M17.25 9 v12" pathLength="1"/><path class="lmn-path-5" d="M17.25 21 l-3.75 -3.75" pathLength="1"/><path class="lmn-path-6" d="M17.25 21 21 17.25" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnBarsArrowDownIcon extends LmnIconBase {}
