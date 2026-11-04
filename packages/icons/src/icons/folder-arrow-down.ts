import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-folder-arrow-down',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-folder-arrow-down-squash {
          0%, 22% { transform: scale(1, 1); }
          48% { transform: scale(1.06, 0.84); }
          70% { transform: scale(0.98, 1.04); }
          100% { transform: scale(1, 1); }
        }
        @keyframes lmn-folder-arrow-down-arrive {
          0%, 18% { transform: translateY(-6px); opacity: 0.15; }
          72% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes lmn-folder-arrow-down-shaft {
          0%, 18% { stroke-dashoffset: 1; }
          66% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-folder-arrow-down-head {
          0%, 46% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-folder-arrow-down-receiver {
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

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-folder-arrow-down-receiver 760ms ease-out both; }
        :host(.lmn-animate.lmn-filled) svg { transform-origin: 50% 100%; animation: lmn-folder-arrow-down-squash 760ms cubic-bezier(0.3, 1.2, 0.5, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-folder-arrow-down-shaft 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-folder-arrow-down-arrive 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-folder-arrow-down-head 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-folder-arrow-down-arrive 760ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V10.5Z" clip-rule="evenodd" pathLength="1"/>
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
      <path class="lmn-path-1" d="m9 13.5 3 3" pathLength="1"/><path class="lmn-path-2" d="M12 16.5 l3 -3" pathLength="1"/><path class="lmn-path-3" d="M12 10.5 L12 16.5" pathLength="1"/><path class="lmn-path-4" d="M13.06 6.31 l-2.12 -2.12 a1.5 1.5 0 0 0 -1.061 -0.44 H4.5 A2.25 2.25 0 0 0 2.25 6 v12 a2.25 2.25 0 0 0 2.25 2.25 h15 A2.25 2.25 0 0 0 21.75 18 V9 a2.25 2.25 0 0 0 -2.25 -2.25 h-5.379 a1.5 1.5 0 0 1 -1.06 -0.44 Z" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnFolderArrowDownIcon extends LmnIconBase {}
