import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-arrow-left-on-rectangle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-arrow-left-on-rectangle-cross {
          0%, 16% { transform: translateX(4px); opacity: 0.2; }
          78%, 100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes lmn-arrow-left-on-rectangle-shaft {
          0%, 18% { stroke-dashoffset: 1; }
          70% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-arrow-left-on-rectangle-head {
          0%, 48% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-arrow-left-on-rectangle-frame {
          0%, 36% { opacity: 0.55; }
          100% { opacity: 1; }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-arrow-left-on-rectangle-frame 650ms ease-out both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-arrow-left-on-rectangle-shaft 650ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-arrow-left-on-rectangle-cross 650ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-arrow-left-on-rectangle-head 650ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-arrow-left-on-rectangle-cross 650ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-1 { animation: lmn-arrow-left-on-rectangle-frame 650ms ease-out both; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-2 { animation: lmn-arrow-left-on-rectangle-cross 650ms cubic-bezier(0.22, 0.8, 0.32, 1) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" clip-rule="evenodd" d="M7.5 3.75 A1.5 1.5 0 0 0 6 5.25 v13.5 a1.5 1.5 0 0 0 1.5 1.5 h6 a1.5 1.5 0 0 0 1.5 -1.5 V15 a0.75 0.75 0 0 1 1.5 0 v3.75 a3 3 0 0 1 -3 3 h-6 a3 3 0 0 1 -3 -3 V5.25 a3 3 0 0 1 3 -3 h6 a3 3 0 0 1 3 3 V9 A0.75 0.75 0 0 1 15 9 V5.25 a1.5 1.5 0 0 0 -1.5 -1.5 h-6 Z" pathLength="1"/><path class="lmn-path-2" fill-rule="evenodd" clip-rule="evenodd" d="M12.530000000000001 8.469999999999999 a0.75 0.75 0 0 1 0 1.06 l-1.72 1.72 h10.94 a0.75 0.75 0 0 1 0 1.5 H10.81 l1.72 1.72 a0.75 0.75 0 1 1 -1.06 1.06 l-3 -3 a0.75 0.75 0 0 1 0 -1.06 l3 -3 a0.75 0.75 0 0 1 1.06 0 Z" pathLength="1"/>
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
      <path class="lmn-path-1" d="M15.75 9 V5.25 A2.25 2.25 0 0 0 13.5 3 h-6 a2.25 2.25 0 0 0 -2.25 2.25 v13.5 A2.25 2.25 0 0 0 7.5 21 h6 a2.25 2.25 0 0 0 2.25 -2.25 V15" pathLength="1"/><path class="lmn-path-2" d="M12 9 l-3 3" pathLength="1"/><path class="lmn-path-3" d="M9 12 l3 3" pathLength="1"/><path class="lmn-path-4" d="M21.75 12 L9 12" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnArrowLeftOnRectangleIcon extends LmnIconBase {}
