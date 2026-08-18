import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-chart-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-chart-bar-bar { 0% { transform: scaleY(0); opacity: 0; } 72% { transform: scaleY(1.04); opacity: 1; } 100% { transform: scaleY(1); opacity: 1; } }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate) svg path { transform-origin: bottom center; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-chart-bar-bar 720ms cubic-bezier(0.22, 0.8, 0.32, 1) 85ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-chart-bar-bar 720ms cubic-bezier(0.22, 0.8, 0.32, 1) 170ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-chart-bar-bar 720ms cubic-bezier(0.22, 0.8, 0.32, 1) 255ms both; }

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
      <path class="lmn-path-1" d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z"/>
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
      <path class="lmn-path-1" d="M3 13.125 C3 12.504 3.504 12 4.125 12 h2.25 c0.621 0 1.125 0.504 1.125 1.125 v6.75 C7.5 20.496 6.996 21 6.375 21 h-2.25 A1.125 1.125 0 0 1 3 19.875 v-6.75 Z"/><path class="lmn-path-2" d="M9.75 8.625 c0 -0.621 0.504 -1.125 1.125 -1.125 h2.25 c0.621 0 1.125 0.504 1.125 1.125 v11.25 c0 0.621 -0.504 1.125 -1.125 1.125 h-2.25 a1.125 1.125 0 0 1 -1.125 -1.125 V8.625 Z"/><path class="lmn-path-3" d="M16.5 4.125 c0 -0.621 0.504 -1.125 1.125 -1.125 h2.25 C20.496 3 21 3.504 21 4.125 v15.75 c0 0.621 -0.504 1.125 -1.125 1.125 h-2.25 a1.125 1.125 0 0 1 -1.125 -1.125 V4.125 Z"/>
    </svg>
    }
  `,
})
export class LmnChartBarIcon extends LmnIconBase {}
