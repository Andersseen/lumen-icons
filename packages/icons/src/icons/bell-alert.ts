import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-bell-alert',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-bell-alert-body {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(18deg); }
          24% { transform: rotate(-15deg); }
          38% { transform: rotate(11deg); }
          52% { transform: rotate(-7deg); }
          66% { transform: rotate(4deg); }
          80% { transform: rotate(-2deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes lmn-bell-alert-clapper {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(4deg); }
          22% { transform: rotate(26deg); }
          36% { transform: rotate(-21deg); }
          50% { transform: rotate(14deg); }
          64% { transform: rotate(-8deg); }
          78% { transform: rotate(4deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes lmn-bell-alert-wave-left {
          0%, 100% { transform: translate(0, 0) scale(1); }
          12% { transform: translate(-2.5px, -1px) scale(1.2); }
          26% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-2px, -0.5px) scale(1.14); }
          56% { transform: translate(0, 0) scale(1); }
        }
        @keyframes lmn-bell-alert-wave-right {
          0%, 100% { transform: translate(0, 0) scale(1); }
          12% { transform: translate(2.5px, -1px) scale(1.2); }
          26% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(2px, -0.5px) scale(1.14); }
          56% { transform: translate(0, 0) scale(1); }
        }
        @keyframes lmn-bell-alert-waves {
          0%, 26%, 56%, 100% { transform: scale(1); }
          12% { transform: scale(1.16); }
          40% { transform: scale(1.1); }
        }
        @keyframes lmn-bell-alert-z {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          42% { transform: translate(1.2px, -1.6px) rotate(-14deg) scale(1.22); }
          72% { transform: translate(0.3px, -0.4px) rotate(4deg) scale(0.97); }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); }
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
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { transform-box: view-box; transform-origin: 12px 3px; animation: lmn-bell-alert-body 1000ms ease-in-out both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { transform-box: view-box; transform-origin: 12px 3px; animation: lmn-bell-alert-clapper 1000ms ease-in-out both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-bell-alert-wave-left 1000ms cubic-bezier(0.22, 0.8, 0.32, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5 { animation: lmn-bell-alert-wave-right 1000ms cubic-bezier(0.22, 0.8, 0.32, 1) both; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-2 { transform-box: view-box; transform-origin: 12px 3px; animation: lmn-bell-alert-body 1000ms ease-in-out both; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-1 { animation: lmn-bell-alert-waves 1000ms cubic-bezier(0.22, 0.8, 0.32, 1) both; }

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
      <path class="lmn-path-1" d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z"/><path class="lmn-path-2" fill-rule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clip-rule="evenodd"/>
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
      <path class="lmn-path-1" d="M14.857 17.082 a23.848 23.848 0 0 0 5.454 -1.31 A8.967 8.967 0 0 1 18 9.75 V9 A6 6 0 0 0 6 9 v0.75 a8.967 8.967 0 0 1 -2.312 6.022 c1.733 0.64 3.56 1.085 5.455 1.31"/><path class="lmn-path-2" d="M14.857000000000001 17.082 a24.255 24.255 0 0 1 -5.714 0"/><path class="lmn-path-3" d="M14.857000000000001 17.082 a3 3 0 1 1 -5.714 0"/><path class="lmn-path-4" d="M3.124 7.5 A8.969 8.969 0 0 1 5.292 3"/><path class="lmn-path-5" d="M18.708 3 a8.969 8.969 0 0 1 2.168 4.5"/>
    </svg>
    }
  `,
})
export class LmnBellAlertIcon extends LmnIconBase {}
