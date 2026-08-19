import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-speaker-x-mark',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-speaker-x-mark-body {
          0% { transform: scale(0.88); opacity: 0.35; }
          46% { transform: scale(1.04); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes lmn-speaker-x-mark-bar {
          0%, 34% { stroke-dashoffset: 1; opacity: 0; }
          40% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate) svg .lmn-body { transform-origin: center; }

    :host(.lmn-animate) svg .lmn-body { animation: lmn-speaker-x-mark-body calc(780ms * 0.62) cubic-bezier(0.3, 1.3, 0.5, 1) both; }
        :host(.lmn-animate) svg .lmn-slash {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-speaker-x-mark-bar 780ms cubic-bezier(0.5, 0, 0.2, 1) both;
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
      <path class="lmn-body" d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z"/>
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
      <path class="lmn-slash" d="M17.25 9.75 19.5 12" pathLength="1"/><path class="lmn-slash" d="M19.5 12 l2.25 2.25" pathLength="1"/><path class="lmn-body" d="M19.5 12 l2.25 -2.25"/><path class="lmn-body" d="M19.5 12 l-2.25 2.25"/><path class="lmn-body" d="M6.75 8.25 l4.72 -4.72 a0.75 0.75 0 0 1 1.28 0.53 v15.88 a0.75 0.75 0 0 1 -1.28 0.53 l-4.72 -4.72 H4.51 c-0.88 0 -1.704 -0.507 -1.938 -1.354 A9.009 9.009 0 0 1 2.25 12 c0 -0.83 0.112 -1.633 0.322 -2.396 C2.806 8.756 3.63 8.25 4.51 8.25 H6.75 Z"/>
    </svg>
    }
  `,
})
export class LmnSpeakerXMarkIcon extends LmnIconBase {}
