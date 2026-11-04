import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-exclamation-triangle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-exclamation-triangle-mark {
          0% { transform: scaleY(0); }
          34% { transform: scaleY(1.32); }
          48% { transform: scaleY(0.82); }
          64% { transform: scaleY(1.06); }
          100% { transform: scaleY(1); }
        }
        @keyframes lmn-exclamation-triangle-dot {
          0%, 44% { transform: scale(0); }
          62% { transform: scale(1.6); }
          100% { transform: scale(1); }
        }
        @keyframes lmn-exclamation-triangle-flinch {
          0%, 42% { transform: scale(1) rotate(0deg); }
          52% { transform: scale(0.94) rotate(-4deg); }
          66% { transform: scale(1.02) rotate(3deg); }
          80% { transform: scale(1) rotate(-1.5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes lmn-exclamation-triangle-filled {
          0%, 100% { transform: rotate(0deg) scale(1); }
          16% { transform: rotate(-7deg) scale(1.08); }
          34% { transform: rotate(6deg) scale(1.08); }
          52% { transform: rotate(-4deg) scale(1.03); }
          70% { transform: rotate(2deg) scale(1); }
        }

    :host(.lmn-animate) svg {
      overflow: visible;
    }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg polyline,
    :host(.lmn-animate) svg polygon,
    :host(.lmn-animate) svg ellipse,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { transform-origin: bottom center; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-exclamation-triangle-mark 820ms ease-in-out both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-exclamation-triangle-dot 820ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { transform-origin: bottom center; animation: lmn-exclamation-triangle-flinch 820ms ease-out both; }
        :host(.lmn-animate.lmn-filled) svg { transform-origin: 50% 85%; animation: lmn-exclamation-triangle-filled 820ms ease-in-out both; }

    @media (prefers-reduced-motion: reduce) {
      :host(.lmn-animate),
      :host(.lmn-animate) svg,
      :host(.lmn-animate) path,
      :host(.lmn-animate) line,
      :host(.lmn-animate) circle,
      :host(.lmn-animate) rect,
      :host(.lmn-animate) polyline,
      :host(.lmn-animate) polygon,
      :host(.lmn-animate) ellipse,
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
      <path class="lmn-path-1" fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd"/>
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
      <path class="lmn-path-1" d="M12 9 v3.75"/><path class="lmn-path-2" d="M2.696999999999999 16.126 c-0.866 1.5 0.217 3.374 1.948 3.374 h14.71 c1.73 0 2.813 -1.874 1.948 -3.374 L13.949 3.378 c-0.866 -1.5 -3.032 -1.5 -3.898 0 L2.697 16.126 Z"/><path class="lmn-path-3" d="M12 15.75 h0.007 v0.008 H12 v-0.008 Z"/>
    </svg>
    }
  `,
})
export class LmnExclamationTriangleIcon extends LmnIconBase {}
