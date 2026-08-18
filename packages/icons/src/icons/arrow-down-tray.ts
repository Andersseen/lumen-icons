import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-arrow-down-tray',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-arrow-down-tray-arrive {
          0%, 18% { transform: translateY(-4px); opacity: 0.15; }
          72% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes lmn-arrow-down-tray-shaft {
          0%, 18% { stroke-dashoffset: 1; }
          66% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-arrow-down-tray-head {
          0%, 46% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-arrow-down-tray-receiver {
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

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-arrow-down-tray-receiver 700ms ease-out both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-arrow-down-tray-shaft 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-arrow-down-tray-arrive 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-arrow-down-tray-head 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-arrow-down-tray-arrive 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-1 { animation: lmn-arrow-down-tray-arrive 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" clip-rule="evenodd" d="M12 2.25 a0.75 0.75 0 0 1 0.75 0.75 v11.69 l3.22 -3.22 a0.75 0.75 0 1 1 1.06 1.06 l-4.5 4.5 a0.75 0.75 0 0 1 -1.06 0 l-4.5 -4.5 a0.75 0.75 0 1 1 1.06 -1.06 l3.22 3.22 V3 a0.75 0.75 0 0 1 0.75 -0.75 Z" pathLength="1"/><path class="lmn-path-2" fill-rule="evenodd" clip-rule="evenodd" d="M3 15.75 a0.75 0.75 0 0 1 0.75 0.75 v2.25 a1.5 1.5 0 0 0 1.5 1.5 h13.5 a1.5 1.5 0 0 0 1.5 -1.5 V16.5 a0.75 0.75 0 0 1 1.5 0 v2.25 a3 3 0 0 1 -3 3 H5.25 a3 3 0 0 1 -3 -3 V16.5 a0.75 0.75 0 0 1 0.75 -0.75 Z" pathLength="1"/>
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
      <path class="lmn-path-1" d="M3 16.5 v2.25 A2.25 2.25 0 0 0 5.25 21 h13.5 A2.25 2.25 0 0 0 21 18.75 V16.5" pathLength="1"/><path class="lmn-path-2" d="M16.5 12 12 16.5" pathLength="1"/><path class="lmn-path-3" d="M12 16.5 L7.5 12" pathLength="1"/><path class="lmn-path-4" d="M12 3 L12 16.5" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnArrowDownTrayIcon extends LmnIconBase {}
