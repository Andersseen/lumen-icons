import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-terminal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-terminal-prompt {
          0%, 18% { stroke-dashoffset: 1; opacity: 0; }
          24% { opacity: 1; }
          62%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-terminal-cursor {
          0%, 60% { opacity: 0; transform: scaleX(0.2); }
          70% { opacity: 1; transform: scaleX(1); }
          78% { opacity: 0.15; }
          86% { opacity: 1; }
          92% { opacity: 0.15; }
          100% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes lmn-terminal-frame {
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
          animation: lmn-terminal-prompt 860ms cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        :host(.lmn-animate) svg .lmn-path-2 { animation: lmn-terminal-cursor 860ms steps(1, end) both; }

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
    
    :host(.lmn-filled) svg,
    :host(.lmn-filled) svg path {
      fill: currentColor;
      stroke: none;
    }
  
  `],
  template: `
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
      <polyline class="lmn-path-1" points="4 17 10 11 4 5" pathLength="1"/><line class="lmn-path-2" x1="12" x2="20" y1="19" y2="19" pathLength="1"/>
    </svg>
  `,
})
export class LmnTerminalIcon extends LmnIconBase {}
