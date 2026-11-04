import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-smile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-smile-mouth {
          0% { transform: scaleY(0.04); opacity: 0.55; }
          58% { transform: scaleY(1.3); opacity: 1; }
          80% { transform: scaleY(0.92); }
          100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes lmn-smile-face {
          0% { transform: scale(0.9); }
          56% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes lmn-smile-blink {
          0%, 64% { transform: scaleY(1); }
          72% { transform: scaleY(0.1); }
          82%, 100% { transform: scaleY(1); }
        }
        @keyframes lmn-smile-mood {
          0% { transform: rotate(0deg) translateY(0); }
          22% { transform: rotate(-14deg) translateY(-1.5px); }
          46% { transform: rotate(10deg) translateY(0); }
          66% { transform: rotate(-5deg); }
          84% { transform: rotate(2deg); }
          100% { transform: rotate(0deg) translateY(0); }
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

    :host(.lmn-animate) svg path { transform-origin: center; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-smile-mouth 900ms cubic-bezier(0.3, 1.4, 0.5, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-smile-face 900ms cubic-bezier(0.3, 1.2, 0.5, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-smile-face 900ms cubic-bezier(0.3, 1.2, 0.5, 1) both, lmn-smile-blink 900ms ease-in-out both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-smile-mood 900ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }

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
      <circle cx="12" cy="12" r="10" class="lmn-animate-el lmn-path-1" /><path d="M8 14s1.5 2 4 2 4-2 4-2" class="lmn-animate-el lmn-path-2" /><line x1="9" y1="9" x2="9.01" y2="9" class="lmn-animate-el lmn-path-3" /><line x1="15" y1="9" x2="15.01" y2="9" class="lmn-animate-el lmn-path-4" />
    </svg>
    }
  `,
})
export class LmnSmileIcon extends LmnIconBase {}
