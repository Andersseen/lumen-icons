import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-x-circle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-x-circle-turn {
          0% { transform: rotate(-90deg) scale(0.6); }
          62% { transform: rotate(8deg) scale(1.1); }
          100% { transform: rotate(0deg) scale(1); }
        }
        @keyframes lmn-x-circle-spin {
          0% { transform: rotate(-90deg); }
          62% { transform: rotate(8deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes lmn-x-circle-first {
          0% { stroke-dashoffset: 1; }
          45%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-x-circle-second {
          0%, 20% { stroke-dashoffset: 1; }
          65%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-x-circle-press {
          0%, 40% { transform: scale(1); }
          60% { transform: scale(0.92); }
          80% { transform: scale(1.03); }
          100% { transform: scale(1); }
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

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { transform-box: view-box; transform-origin: 12px 12px; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { stroke-dasharray: 1; stroke-dashoffset: 0; animation: lmn-x-circle-first 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-x-circle-turn 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { stroke-dasharray: 1; stroke-dashoffset: 0; animation: lmn-x-circle-second 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-x-circle-turn 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-x-circle-press 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-x-circle-spin 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" pathLength="1"/>
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
      <path class="lmn-path-1" d="m9.75 9.75 4.5 4.5" pathLength="1"/><path class="lmn-path-2" d="M14.25 9.75 l-4.5 4.5" pathLength="1"/><path class="lmn-path-3" d="M21 12 a9 9 0 1 1 -18 0 9 9 0 0 1 18 0 Z" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnXCircleIcon extends LmnIconBase {}
