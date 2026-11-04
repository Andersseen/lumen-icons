import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-alert-circle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-alert-circle-mark {
          0% { transform: scaleY(0); }
          34% { transform: scaleY(1.32); }
          48% { transform: scaleY(0.82); }
          64% { transform: scaleY(1.06); }
          100% { transform: scaleY(1); }
        }
        @keyframes lmn-alert-circle-dot {
          0%, 44% { transform: scale(0); }
          62% { transform: scale(1.6); }
          100% { transform: scale(1); }
        }
        @keyframes lmn-alert-circle-flinch {
          0%, 42% { transform: scale(1) rotate(0deg); }
          52% { transform: scale(0.94) rotate(-4deg); }
          66% { transform: scale(1.02) rotate(3deg); }
          80% { transform: scale(1) rotate(-1.5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes lmn-alert-circle-filled {
          0% { transform: rotate(0deg); }
          14% { transform: rotate(-16deg); }
          28% { transform: rotate(14deg); }
          42% { transform: rotate(-10deg); }
          56% { transform: rotate(6deg); }
          72% { transform: rotate(-3deg); }
          100% { transform: rotate(0deg); }
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

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { transform-origin: bottom center; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-alert-circle-mark 820ms ease-in-out both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-alert-circle-dot 820ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { transform-origin: center; animation: lmn-alert-circle-flinch 820ms ease-out both; }
        :host(.lmn-animate.lmn-filled) svg { transform-origin: 50% 50%; animation: lmn-alert-circle-filled 820ms ease-in-out both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd"/>
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
      <circle class="lmn-path-1" cx="12" cy="12" r="10" pathLength="1"/><line class="lmn-path-2" x1="12" x2="12" y1="8" y2="12" pathLength="1"/><line class="lmn-path-3" x1="12" x2="12.01" y1="16" y2="16" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnAlertCircleIcon extends LmnIconBase {}
