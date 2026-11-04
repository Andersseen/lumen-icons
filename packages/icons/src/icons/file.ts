import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-file',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-file-page {
          0% { stroke-dashoffset: 1; }
          62%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-file-fold {
          0%, 50% { transform: scale(0); }
          80% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        @keyframes lmn-file-print {
          0% { clip-path: inset(0 0 48% 0); }
          100% { clip-path: inset(0 0 0 0); }
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

    :host(.lmn-animate) svg .lmn-path-2 { transform-box: view-box; transform-origin: 20px 2px; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { stroke-dasharray: 1; stroke-dashoffset: 0; animation: lmn-file-page 760ms cubic-bezier(0.4, 0, 0.2, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-file-fold 760ms cubic-bezier(0.3, 1.2, 0.5, 1) both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-file-print 760ms cubic-bezier(0.4, 0, 0.2, 1) both; }

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
      <path class="lmn-path-1" d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" pathLength="1"/><polyline class="lmn-path-2" points="14 2 14 8 20 8" pathLength="1"/>
    </svg>
  `,
})
export class LmnFileIcon extends LmnIconBase {}
