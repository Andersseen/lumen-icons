import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-inbox-arrow-down',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-inbox-arrow-down-arrive {
          0%, 18% { transform: translateY(-5px); opacity: 0.15; }
          72% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes lmn-inbox-arrow-down-shaft {
          0%, 18% { stroke-dashoffset: 1; }
          66% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-inbox-arrow-down-head {
          0%, 46% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-inbox-arrow-down-receiver {
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

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-inbox-arrow-down-receiver 760ms ease-out both; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-1 { animation: lmn-inbox-arrow-down-receiver 760ms ease-out both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-inbox-arrow-down-shaft 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-inbox-arrow-down-arrive 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-inbox-arrow-down-head 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-inbox-arrow-down-arrive 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-2 { animation: lmn-inbox-arrow-down-arrive 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M5.478 5.559A1.5 1.5 0 0 1 6.912 4.5H9A.75.75 0 0 0 9 3H6.912a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H15a.75.75 0 0 0 0 1.5h2.088a1.5 1.5 0 0 1 1.434 1.059l2.213 7.191H17.89a3 3 0 0 0-2.684 1.658l-.256.513a1.5 1.5 0 0 1-1.342.829h-3.218a1.5 1.5 0 0 1-1.342-.83l-.256-.512a3 3 0 0 0-2.684-1.658H3.265l2.213-7.191Z" clip-rule="evenodd" pathLength="1"/><path class="lmn-path-2" fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v6.44l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l1.72 1.72V3a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" pathLength="1"/>
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
      <path class="lmn-path-1" d="M9 3.75 H6.912 a2.25 2.25 0 0 0 -2.15 1.588 L2.35 13.177 a2.25 2.25 0 0 0 -0.1 0.661 V18 a2.25 2.25 0 0 0 2.25 2.25 h15 A2.25 2.25 0 0 0 21.75 18 v-4.162 c0 -0.224 -0.034 -0.447 -0.1 -0.661 L19.24 5.338 a2.25 2.25 0 0 0 -2.15 -1.588 H15" pathLength="1"/><path class="lmn-path-2" d="M2.25 13.5 h3.86 a2.25 2.25 0 0 1 2.012 1.244 l0.256 0.512 a2.25 2.25 0 0 0 2.013 1.244 h3.218 a2.25 2.25 0 0 0 2.013 -1.244 l0.256 -0.512 a2.25 2.25 0 0 1 2.013 -1.244 h3.859" pathLength="1"/><path class="lmn-path-3" d="M12 3 v8.25" pathLength="1"/><path class="lmn-path-4" d="M12 11.25 l-3 -3" pathLength="1"/><path class="lmn-path-5" d="M12 11.25 l3 -3" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnInboxArrowDownIcon extends LmnIconBase {}
