import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-arrow-down-on-square-stack',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-arrow-down-on-square-stack-arrive {
          0%, 18% { transform: translateY(-4px); opacity: 0.15; }
          72% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes lmn-arrow-down-on-square-stack-shaft {
          0%, 18% { stroke-dashoffset: 1; }
          66% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-arrow-down-on-square-stack-head {
          0%, 46% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-arrow-down-on-square-stack-receiver {
          0%, 68%, 100% { transform: translateY(0); opacity: 1; }
          82% { transform: translateY(1px); opacity: 0.9; }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-arrow-down-on-square-stack-shaft 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-arrow-down-on-square-stack-arrive 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-arrow-down-on-square-stack-head 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-arrow-down-on-square-stack-arrive 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-2 { animation: lmn-arrow-down-on-square-stack-arrive 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" clip-rule="evenodd" d="M9.75 6.75 h-3 a3 3 0 0 0 -3 3 v7.5 a3 3 0 0 0 3 3 h7.5 a3 3 0 0 0 3 -3 v-7.5 a3 3 0 0 0 -3 -3 h-3 V1.5 a0.75 0.75 0 0 0 -1.5 0 v5.25 Z" pathLength="1"/><path class="lmn-path-2" fill-rule="evenodd" clip-rule="evenodd" d="M9.75 6.75 h1.5 v5.69 l1.72 -1.72 a0.75 0.75 0 1 1 1.06 1.06 l-3 3 a0.75 0.75 0 0 1 -1.06 0 l-3 -3 a0.75 0.75 0 1 1 1.06 -1.06 l1.72 1.72 V6.75 Z" pathLength="1"/><path class="lmn-path-3" d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" pathLength="1"/>
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
      <path class="lmn-path-1" d="M7.5 7.5 h-0.75 A2.25 2.25 0 0 0 4.5 9.75 v7.5 a2.25 2.25 0 0 0 2.25 2.25 h7.5 a2.25 2.25 0 0 0 2.25 -2.25 v-7.5 a2.25 2.25 0 0 0 -2.25 -2.25 h-0.75" pathLength="1"/><path class="lmn-path-2" d="M7.5 11.25 l3 3" pathLength="1"/><path class="lmn-path-3" d="M10.5 14.25 l3 -3" pathLength="1"/><path class="lmn-path-4" d="M10.5 1.5 L10.5 14.25" pathLength="1"/><path class="lmn-path-5" d="M16.5 10.5 h0.75 a2.25 2.25 0 0 1 2.25 2.25 v7.5 a2.25 2.25 0 0 1 -2.25 2.25 h-7.5 a2.25 2.25 0 0 1 -2.25 -2.25 v-0.75" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnArrowDownOnSquareStackIcon extends LmnIconBase {}
