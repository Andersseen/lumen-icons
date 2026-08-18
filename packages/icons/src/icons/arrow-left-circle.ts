import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-arrow-left-circle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-arrow-left-circle-ring {
          0% { stroke-dashoffset: 1; opacity: 0.25; }
          54% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-arrow-left-circle-shaft {
          0%, 24% { stroke-dashoffset: 1; }
          72% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-arrow-left-circle-head {
          0%, 52% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-arrow-left-circle-arrive {
          0%, 20% { transform: translate(3px, 0); }
          78%, 100% { transform: translate(0, 0); }
        }
        @keyframes lmn-arrow-left-circle-solid-ring {
          0% { transform: scale(0.88); opacity: 0.35; }
          58%, 100% { transform: scale(1); opacity: 1; }
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
          animation: lmn-arrow-left-circle-ring 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-arrow-left-circle-shaft 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-arrow-left-circle-arrive 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-arrow-left-circle-head 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-arrow-left-circle-arrive 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-1 { animation: lmn-arrow-left-circle-solid-ring 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-2 { animation: lmn-arrow-left-circle-arrive 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" clip-rule="evenodd" d="M12 2.25 c-5.385 0 -9.75 4.365 -9.75 9.75 s4.365 9.75 9.75 9.75 9.75 -4.365 9.75 -9.75 S17.385 2.25 12 2.25 Z" pathLength="1"/><path class="lmn-path-2" fill-rule="evenodd" clip-rule="evenodd" d="M7.72 11.47 a0.75 0.75 0 0 0 0 1.06 l3 3 a0.75 0.75 0 1 0 1.06 -1.06 l-1.72 -1.72 h5.69 a0.75 0.75 0 0 0 0 -1.5 h-5.69 l1.72 -1.72 a0.75 0.75 0 0 0 -1.06 -1.06 l-3 3 Z" pathLength="1"/>
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
      <path class="lmn-path-1" d="m11.25 9 -3 3" pathLength="1"/><path class="lmn-path-2" d="M8.25 12 l3 3" pathLength="1"/><path class="lmn-path-3" d="M15.75 12 L8.25 12" pathLength="1"/><path class="lmn-path-4" d="M21 12 a9 9 0 1 1 -18 0 9 9 0 0 1 18 0 Z" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnArrowLeftCircleIcon extends LmnIconBase {}
