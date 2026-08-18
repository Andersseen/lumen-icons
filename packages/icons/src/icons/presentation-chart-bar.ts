import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-presentation-chart-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-presentation-chart-bar-bar { 0% { transform: scaleY(0); opacity: 0; } 72% { transform: scaleY(1.04); opacity: 1; } 100% { transform: scaleY(1); opacity: 1; } }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate) svg path { transform-origin: bottom center; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-presentation-chart-bar-bar 800ms cubic-bezier(0.22, 0.8, 0.32, 1) 85ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-presentation-chart-bar-bar 800ms cubic-bezier(0.22, 0.8, 0.32, 1) 170ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-presentation-chart-bar-bar 800ms cubic-bezier(0.22, 0.8, 0.32, 1) 255ms both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.04 16.5.5-1.5h6.42l.5 1.5H8.29Zm7.46-12a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0v-6Zm-3 2.25a.75.75 0 0 0-1.5 0v3.75a.75.75 0 0 0 1.5 0V9Zm-3 2.25a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5Z" clip-rule="evenodd"/>
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
      <path class="lmn-path-1" d="M3.75 3 v11.25 A2.25 2.25 0 0 0 6 16.5 h2.25"/><path class="lmn-path-2" d="M3.75 3 h-1.5"/><path class="lmn-path-3" d="M3.75 3 h16.5"/><path class="lmn-path-4" d="M20.25 3 h1.5"/><path class="lmn-path-5" d="M20.25 3 v11.25 A2.25 2.25 0 0 1 18 16.5 h-2.25"/><path d="M8.25 16.5 h7.5"/><path d="M8.25 16.5 l-1 3"/><path d="M15.75 16.5 l1 3"/><path d="M16.75 19.5 l0.5 1.5"/><path d="M16.75 19.5 h-9.5"/><path d="M7.25 19.5 l-0.5 1.5"/><path d="M9 11.25 v1.5"/><path d="M12 9 v3.75"/><path d="M15 6.75 v6"/>
    </svg>
    }
  `,
})
export class LmnPresentationChartBarIcon extends LmnIconBase {}
