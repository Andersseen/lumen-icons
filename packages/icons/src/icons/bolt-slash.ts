import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-bolt-slash',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-bolt-slash-body {
          0% { transform: scale(0.88); opacity: 0.35; }
          46% { transform: scale(1.04); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes lmn-bolt-slash-bar {
          0%, 34% { stroke-dashoffset: 1; opacity: 0; }
          40% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate) svg .lmn-body { transform-origin: center; }

    :host(.lmn-animate) svg .lmn-body { animation: lmn-bolt-slash-body calc(780ms * 0.62) cubic-bezier(0.3, 1.3, 0.5, 1) both; }
        :host(.lmn-animate) svg .lmn-slash {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-bolt-slash-bar 780ms cubic-bezier(0.5, 0, 0.2, 1) both;
        }

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
      <path class="lmn-body" d="m20.798 11.012-3.188 3.416L9.462 6.28l4.24-4.542a.75.75 0 0 1 1.272.71L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262ZM3.202 12.988 6.39 9.572l8.148 8.148-4.24 4.542a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262ZM3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18Z"/>
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
      <path class="lmn-body" d="M11.412 15.655 9.75 21.75 l3.745 -4.012"/><path class="lmn-body" d="M9.257 13.5 H3.75 l2.659 -2.849"/><path class="lmn-body" d="M8.457 8.457 L14.25 2.25 12 10.5 h8.25 l-4.707 5.043"/><path class="lmn-slash" d="M8.457 8.457 3 3" pathLength="1"/><path class="lmn-slash" d="M8.457 8.457 l7.086 7.086" pathLength="1"/><path class="lmn-slash" d="M15.543000000000001 15.543000000000001 L21 21" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnBoltSlashIcon extends LmnIconBase {}
