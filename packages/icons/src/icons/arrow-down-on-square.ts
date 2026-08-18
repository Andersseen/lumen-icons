import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-arrow-down-on-square',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-arrow-down-on-square-arrive {
          0%, 18% { transform: translateY(-4px); opacity: 0.15; }
          72% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes lmn-arrow-down-on-square-shaft {
          0%, 18% { stroke-dashoffset: 1; }
          66% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-arrow-down-on-square-head {
          0%, 46% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-arrow-down-on-square-receiver {
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
          animation: lmn-arrow-down-on-square-shaft 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-arrow-down-on-square-arrive 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-arrow-down-on-square-head 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-arrow-down-on-square-arrive 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-1,
        :host(.lmn-animate.lmn-filled) svg .lmn-path-2 { animation: lmn-arrow-down-on-square-arrive 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both; }

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
      <path class="lmn-path-1" d="M12 1.5 a0.75 0.75 0 0 1 0.75 0.75 V7.5 h-1.5 V2.25 A0.75 0.75 0 0 1 12 1.5 Z" pathLength="1"/><path class="lmn-path-2" d="M11.25 7.5 v5.69 l-1.72 -1.72 a0.75 0.75 0 0 0 -1.06 1.06 l3 3 a0.75 0.75 0 0 0 1.06 0 l3 -3 a0.75 0.75 0 1 0 -1.06 -1.06 l-1.72 1.72 V7.5 h3.75 a3 3 0 0 1 3 3 v9 a3 3 0 0 1 -3 3 h-9 a3 3 0 0 1 -3 -3 v-9 a3 3 0 0 1 3 -3 h3.75 Z" pathLength="1"/>
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
      <path class="lmn-path-1" d="M9 8.25 H7.5 a2.25 2.25 0 0 0 -2.25 2.25 v9 a2.25 2.25 0 0 0 2.25 2.25 h9 a2.25 2.25 0 0 0 2.25 -2.25 v-9 a2.25 2.25 0 0 0 -2.25 -2.25 H15" pathLength="1"/><path class="lmn-path-2" d="M9 12 l3 3" pathLength="1"/><path class="lmn-path-3" d="M12 15 l3 -3" pathLength="1"/><path class="lmn-path-4" d="M12 2.25 L12 15" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnArrowDownOnSquareIcon extends LmnIconBase {}
