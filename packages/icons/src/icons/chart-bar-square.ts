import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-chart-bar-square',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-chart-bar-square-bar { 0% { transform: scaleY(0); opacity: 0; } 72% { transform: scaleY(1.04); opacity: 1; } 100% { transform: scaleY(1); opacity: 1; } }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate) svg path { transform-origin: bottom center; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-chart-bar-square-bar 800ms cubic-bezier(0.22, 0.8, 0.32, 1) 85ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-chart-bar-square-bar 800ms cubic-bezier(0.22, 0.8, 0.32, 1) 170ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-chart-bar-square-bar 800ms cubic-bezier(0.22, 0.8, 0.32, 1) 255ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-chart-bar-square-bar 800ms cubic-bezier(0.22, 0.8, 0.32, 1) 340ms both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clip-rule="evenodd"/>
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
      <path class="lmn-path-1" d="M7.5 14.25 v2.25"/><path class="lmn-path-2" d="M10.5 12 v4.5"/><path class="lmn-path-3" d="M13.5 9.75 v6.75"/><path class="lmn-path-4" d="M16.5 7.5 v9"/><path class="lmn-path-5" d="M6 20.25 h12 A2.25 2.25 0 0 0 20.25 18 V6 A2.25 2.25 0 0 0 18 3.75 H6 A2.25 2.25 0 0 0 3.75 6 v12 A2.25 2.25 0 0 0 6 20.25 Z"/>
    </svg>
    }
  `,
})
export class LmnChartBarSquareIcon extends LmnIconBase {}
