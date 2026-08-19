import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-command-line',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-command-line-prompt {
          0%, 18% { stroke-dashoffset: 1; opacity: 0; }
          24% { opacity: 1; }
          62%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-command-line-cursor {
          0%, 60% { opacity: 0; transform: scaleX(0.2); }
          70% { opacity: 1; transform: scaleX(1); }
          78% { opacity: 0.15; }
          86% { opacity: 1; }
          92% { opacity: 0.15; }
          100% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes lmn-command-line-frame {
          0% { transform: scale(0.94); opacity: 0.4; }
          46% { transform: scale(1.02); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate) svg .lmn-path-2 { transform-origin: left center; }
        :host(.lmn-animate) svg .lmn-path-1 { transform-origin: center; }

    :host(.lmn-animate) svg .lmn-path-1 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-command-line-prompt 860ms cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        :host(.lmn-animate) svg .lmn-path-2 { animation: lmn-command-line-cursor 860ms steps(1, end) both; }
        :host(.lmn-animate) svg .lmn-path-3 { animation: lmn-command-line-frame 860ms ease-out both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm3.97.97a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Zm4.28 4.28a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd" pathLength="1"/>
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
      <path class="lmn-path-1" d="m6.75 7.5 3 2.25 -3 2.25" pathLength="1"/><path class="lmn-path-2" d="M11.25 12 h3" pathLength="1"/><path class="lmn-path-3" d="M5.25 20.25 h13.5 A2.25 2.25 0 0 0 21 18 V6 a2.25 2.25 0 0 0 -2.25 -2.25 H5.25 A2.25 2.25 0 0 0 3 6 v12 a2.25 2.25 0 0 0 2.25 2.25 Z" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnCommandLineIcon extends LmnIconBase {}
