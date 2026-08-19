import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-face-smile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-face-smile-mouth {
          0% { transform: scaleY(0.04); opacity: 0.55; }
          58% { transform: scaleY(1.3); opacity: 1; }
          80% { transform: scaleY(0.92); }
          100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes lmn-face-smile-face {
          0% { transform: scale(0.9); }
          56% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate) svg path { transform-origin: center; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-face-smile-mouth 640ms cubic-bezier(0.3, 1.4, 0.5, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-6 { animation: lmn-face-smile-face 640ms cubic-bezier(0.3, 1.2, 0.5, 1) both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-face-smile-face 640ms cubic-bezier(0.3, 1.2, 0.5, 1) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z" clip-rule="evenodd"/>
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
      <path class="lmn-path-1" d="M15.182 15.182 a4.5 4.5 0 0 1 -6.364 0"/><path class="lmn-path-2" d="M21 12 a9 9 0 1 1 -18 0 9 9 0 0 1 18 0 Z"/><path class="lmn-path-3" d="M9.75 9.75 c0 0.414 -0.168 0.75 -0.375 0.75 S9 10.164 9 9.75 9.168 9 9.375 9 s0.375 0.336 0.375 0.75 Z"/><path class="lmn-path-4" d="M9.375 9.75 h0.008 v0.015 h-0.008 V9.75 Z"/><path class="lmn-path-5" d="M15 9.75 c0 0.414 -0.168 0.75 -0.375 0.75 s-0.375 -0.336 -0.375 -0.75 0.168 -0.75 0.375 -0.75 0.375 0.336 0.375 0.75 Z"/><path class="lmn-path-6" d="M14.625 9.75 h0.008 v0.015 h-0.008 V9.75 Z"/>
    </svg>
    }
  `,
})
export class LmnFaceSmileIcon extends LmnIconBase {}
