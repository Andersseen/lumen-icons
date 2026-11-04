import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-clipboard-document-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-clipboard-document-list-clip {
          0%, 8% { transform: translateY(0) scale(1, 1); }
          30%, 46% { transform: translateY(-0.75px) scale(1.16, 1.32); }
          60% { transform: translateY(0.5px) scale(0.95, 0.78); }
          78% { transform: translateY(0) scale(1.02, 1.06); }
          100% { transform: translateY(0) scale(1, 1); }
        }
        @keyframes lmn-clipboard-document-list-sheet {
          0%, 10% { transform: translateY(-5px) rotate(-5deg); opacity: 0.5; }
          52% { transform: translateY(0.6px) rotate(0deg); opacity: 1; }
          64% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(0) rotate(0deg); opacity: 1; }
        }
        @keyframes lmn-clipboard-document-list-bullet {
          0% { transform: scale(0); }
          60% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @keyframes lmn-clipboard-document-list-line {
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

    :host(.lmn-animate.lmn-filled) svg .lmn-path-2 { transform-box: view-box; transform-origin: 9.75px 15px; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-2 { animation: lmn-clipboard-document-list-sheet 900ms cubic-bezier(0.4, 0, 0.2, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-9 { animation: lmn-clipboard-document-list-bullet 495ms cubic-bezier(0.3, 1.4, 0.5, 1) 0ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { stroke-dasharray: 1; stroke-dashoffset: 0; animation: lmn-clipboard-document-list-line 495ms cubic-bezier(0.4, 0, 0.2, 1) 60ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-10 { animation: lmn-clipboard-document-list-bullet 495ms cubic-bezier(0.3, 1.4, 0.5, 1) 162ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { stroke-dasharray: 1; stroke-dashoffset: 0; animation: lmn-clipboard-document-list-line 495ms cubic-bezier(0.4, 0, 0.2, 1) 222ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-11 { animation: lmn-clipboard-document-list-bullet 495ms cubic-bezier(0.3, 1.4, 0.5, 1) 324ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { stroke-dasharray: 1; stroke-dashoffset: 0; animation: lmn-clipboard-document-list-line 495ms cubic-bezier(0.4, 0, 0.2, 1) 384ms both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" pathLength="1"/><path class="lmn-path-2" fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" pathLength="1"/>
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
      <path class="lmn-path-1" d="M9 12 h3.75" pathLength="1"/><path class="lmn-path-2" d="M9 15 h3.75" pathLength="1"/><path class="lmn-path-3" d="M9 18 h3.75" pathLength="1"/><path class="lmn-path-4" d="M15.75 18.75 H18 a2.25 2.25 0 0 0 2.25 -2.25 V6.108 c0 -1.135 -0.845 -2.098 -1.976 -2.192 a48.424 48.424 0 0 0 -1.123 -0.08" pathLength="1"/><path class="lmn-path-5" d="M11.35 3.8359999999999994 c-0.065 0.21 -0.1 0.433 -0.1 0.664 0 0.414 0.336 0.75 0.75 0.75 h4.5 a0.75 0.75 0 0 0 0.75 -0.75 2.25 2.25 0 0 0 -0.1 -0.664" pathLength="1"/><path class="lmn-path-6" d="M10.7 3.9219999999999993 A2.251 2.251 0 0 1 13.5 2.25 H15 c1.012 0 1.867 0.668 2.15 1.586" pathLength="1"/><path class="lmn-path-7" d="M11.349999999999998 3.8360000000000003 c-0.376 0.023 -0.75 0.05 -1.124 0.08 C9.095 4.01 8.25 4.973 8.25 6.108 V8.25" pathLength="1"/><path class="lmn-path-8" d="M8.25 8.25 H4.875 c-0.621 0 -1.125 0.504 -1.125 1.125 v11.25 c0 0.621 0.504 1.125 1.125 1.125 h9.75 c0.621 0 1.125 -0.504 1.125 -1.125 V9.375 c0 -0.621 -0.504 -1.125 -1.125 -1.125 H8.25 Z" pathLength="1"/><path class="lmn-path-9" d="M6.75 12 h0.008 v0.008 H6.75 V12 Z" pathLength="1"/><path class="lmn-path-10" d="M6.75 15 h0.008 v0.008 H6.75 V15 Z" pathLength="1"/><path class="lmn-path-11" d="M6.75 18 h0.008 v0.008 H6.75 V18 Z" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnClipboardDocumentListIcon extends LmnIconBase {}
