import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-bars-3-bottom-left',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-bars-3-bottom-left-line {
          0% { stroke-dashoffset: 1; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-bars-3-bottom-left-line-reverse {
          0% { stroke-dashoffset: -1; opacity: 0; }
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

    :host(.lmn-animate) svg .lmn-path-1,
        :host(.lmn-animate) svg .lmn-path-2,
        :host(.lmn-animate) svg .lmn-path-3 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-bars-3-bottom-left-line 440ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate) svg .lmn-path-1 { animation-delay: 0ms; }
        :host(.lmn-animate) svg .lmn-path-2 { animation-delay: 70ms; }
        :host(.lmn-animate) svg .lmn-path-3 { animation-delay: 140ms; }

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
      <path class="lmn-path-1" fill-rule="evenodd" clip-rule="evenodd" d="M3 6.75 A0.75 0.75 0 0 1 3.75 6 h16.5 a0.75 0.75 0 0 1 0 1.5 H3.75 A0.75 0.75 0 0 1 3 6.75 Z" pathLength="1"/><path class="lmn-path-2" fill-rule="evenodd" clip-rule="evenodd" d="M3 12 a0.75 0.75 0 0 1 0.75 -0.75 h16.5 a0.75 0.75 0 0 1 0 1.5 H3.75 A0.75 0.75 0 0 1 3 12 Z" pathLength="1"/><path class="lmn-path-3" fill-rule="evenodd" clip-rule="evenodd" d="M3 17.25 a0.75 0.75 0 0 1 0.75 -0.75 H12 a0.75 0.75 0 0 1 0 1.5 H3.75 a0.75 0.75 0 0 1 -0.75 -0.75 Z" pathLength="1"/>
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
      <path class="lmn-path-1" d="M3.75 6.75 h16.5" pathLength="1"/><path class="lmn-path-2" d="M3.75 12 h16.5" pathLength="1"/><path class="lmn-path-3" d="M3.75 17.25 H12" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnBars3BottomLeftIcon extends LmnIconBase {}
