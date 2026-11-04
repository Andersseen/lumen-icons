import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-check-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-check-badge-draw {
          0% { stroke-dashoffset: 1; }
          58%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-check-badge-pop {
          0%, 56% { transform: scale(1); }
          72% { transform: scale(1.18); }
          100% { transform: scale(1); }
        }
        @keyframes lmn-check-badge-press {
          0%, 10% { transform: scale(1); }
          40% { transform: scale(0.86); }
          66% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        @keyframes lmn-check-badge-reveal {
          0% { clip-path: inset(0 100% 0 0); }
          58%, 100% { clip-path: inset(0 0 0 0); }
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

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { stroke-dasharray: 1; stroke-dashoffset: 0; animation: lmn-check-badge-draw 700ms cubic-bezier(0.22, 0.8, 0.32, 1) both, lmn-check-badge-pop 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-check-badge-press 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-check-badge-press 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" pathLength="1"/>
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
      <path class="lmn-path-1" d="M9 12.75 11.25 15 15 9.75" pathLength="1"/><path class="lmn-path-2" d="M21 12 c0 1.268 -0.63 2.39 -1.593 3.068 a3.745 3.745 0 0 1 -1.043 3.296 3.745 3.745 0 0 1 -3.296 1.043 A3.745 3.745 0 0 1 12 21 c-1.268 0 -2.39 -0.63 -3.068 -1.593 a3.746 3.746 0 0 1 -3.296 -1.043 3.745 3.745 0 0 1 -1.043 -3.296 A3.745 3.745 0 0 1 3 12 c0 -1.268 0.63 -2.39 1.593 -3.068 a3.745 3.745 0 0 1 1.043 -3.296 3.746 3.746 0 0 1 3.296 -1.043 A3.746 3.746 0 0 1 12 3 c1.268 0 2.39 0.63 3.068 1.593 a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296 A3.745 3.745 0 0 1 21 12 Z" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnCheckBadgeIcon extends LmnIconBase {}
