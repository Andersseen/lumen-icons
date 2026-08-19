import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-lock-open',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-lock-open-shackle {
          0% { transform: translate(0, 0) rotate(0deg); }
          30% { transform: translate(-8px, 1px) rotate(0deg); }
          40% { transform: translate(-8px, 2px) rotate(0deg); }
          62% { transform: translate(-8px, 2px) rotate(0deg); }
          80% { transform: translate(-2px, -1px) rotate(0deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes lmn-lock-open-body {
          0%, 32% { transform: scale(1, 1); }
          44% { transform: scale(1.08, 0.92); }
          60% { transform: scale(0.98, 1.03); }
          100% { transform: scale(1, 1); }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate) svg .lmn-path-1 { transform-origin: bottom center; }
        :host(.lmn-animate) svg .lmn-path-2 { transform-origin: center; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-lock-open-shackle 1000ms cubic-bezier(0.4, 0, 0.3, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-lock-open-body 1000ms ease-out both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-lock-open-body 1000ms ease-out both; }

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
      <path class="lmn-path-1" d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z"/>
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
      <path class="lmn-path-1" d="M13.5 10.5 V6.75 a4.5 4.5 0 1 1 9 0 v3.75"/><path class="lmn-path-2" d="M3.75 21.75 h10.5 a2.25 2.25 0 0 0 2.25 -2.25 v-6.75 a2.25 2.25 0 0 0 -2.25 -2.25 H3.75 a2.25 2.25 0 0 0 -2.25 2.25 v6.75 a2.25 2.25 0 0 0 2.25 2.25 Z"/>
    </svg>
    }
  `,
})
export class LmnLockOpenIcon extends LmnIconBase {}
