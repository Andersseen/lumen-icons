import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-clipboard-document',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-clipboard-document-clip {
          0%, 8% { transform: translateY(0) scale(1, 1); }
          30%, 46% { transform: translateY(-0.75px) scale(1.16, 1.32); }
          60% { transform: translateY(0.5px) scale(0.95, 0.78); }
          78% { transform: translateY(0) scale(1.02, 1.06); }
          100% { transform: translateY(0) scale(1, 1); }
        }
        @keyframes lmn-clipboard-document-sheet {
          0%, 10% { transform: translateY(-5px) rotate(-5deg); opacity: 0.5; }
          52% { transform: translateY(0.6px) rotate(0deg); opacity: 1; }
          64% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(0) rotate(0deg); opacity: 1; }
        }
        @keyframes lmn-clipboard-document-bullet {
          0% { transform: scale(0); }
          60% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @keyframes lmn-clipboard-document-line {
          0% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 0; }
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

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5 { transform-box: view-box; transform-origin: 14.25px 5.25px; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5 { animation: lmn-clipboard-document-clip 900ms cubic-bezier(0.4, 0, 0.2, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-6 { transform-box: view-box; transform-origin: 9.75px 14.6px; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-6 { animation: lmn-clipboard-document-sheet 900ms cubic-bezier(0.4, 0, 0.2, 1) both; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-2,
        :host(.lmn-animate.lmn-filled) svg .lmn-path-3 { transform-box: view-box; transform-origin: 9.75px 14.6px; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-2,
        :host(.lmn-animate.lmn-filled) svg .lmn-path-3 { animation: lmn-clipboard-document-sheet 900ms cubic-bezier(0.4, 0, 0.2, 1) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z" clip-rule="evenodd"/><path class="lmn-path-2" d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z"/><path class="lmn-path-3" d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z"/>
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
      <path class="lmn-path-1" d="M8.25 7.5 V6.108 c0 -1.135 0.845 -2.098 1.976 -2.192 0.373 -0.03 0.748 -0.057 1.123 -0.08"/><path class="lmn-path-2" d="M15.75 18 H18 a2.25 2.25 0 0 0 2.25 -2.25 V6.108 c0 -1.135 -0.845 -2.098 -1.976 -2.192 a48.424 48.424 0 0 0 -1.123 -0.08"/><path class="lmn-path-3" d="M15.75 18.75 v-1.875 a3.375 3.375 0 0 0 -3.375 -3.375 h-1.5 a1.125 1.125 0 0 1 -1.125 -1.125 v-1.5 A3.375 3.375 0 0 0 6.375 7.5 H5.25"/><path class="lmn-path-4" d="M17.15 3.836 A2.251 2.251 0 0 0 15 2.25 h-1.5 a2.251 2.251 0 0 0 -2.15 1.586"/><path class="lmn-path-5" d="M17.15 3.8360000000000003 c0.065 0.21 0.1 0.433 0.1 0.664 v0.75 h-6 V4.5 c0 -0.231 0.035 -0.454 0.1 -0.664"/><path class="lmn-path-6" d="M6.75 7.5 H4.875 c-0.621 0 -1.125 0.504 -1.125 1.125 v12 c0 0.621 0.504 1.125 1.125 1.125 h9.75 c0.621 0 1.125 -0.504 1.125 -1.125 V16.5 a9 9 0 0 0 -9 -9 Z"/>
    </svg>
    }
  `,
})
export class LmnClipboardDocumentIcon extends LmnIconBase {}
