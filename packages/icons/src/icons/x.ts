import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-x',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-x-turn {
          0% { transform: rotate(-90deg) scale(0.6); }
          62% { transform: rotate(8deg) scale(1.1); }
          100% { transform: rotate(0deg) scale(1); }
        }
        @keyframes lmn-x-spin {
          0% { transform: rotate(-90deg); }
          62% { transform: rotate(8deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes lmn-x-first {
          0% { stroke-dashoffset: 1; }
          45%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-x-second {
          0%, 20% { stroke-dashoffset: 1; }
          65%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-x-press {
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

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { stroke-dasharray: 1; stroke-dashoffset: 0; animation: lmn-x-first 640ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-x-turn 640ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { stroke-dasharray: 1; stroke-dashoffset: 0; animation: lmn-x-second 640ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-x-turn 640ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-x-turn 640ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" pathLength="1"/>
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
      <path d="M18 6 6 18" class="lmn-animate-el lmn-path-1" pathLength="1"/><path d="m6 6 12 12" class="lmn-animate-el lmn-path-2" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnXIcon extends LmnIconBase {}
