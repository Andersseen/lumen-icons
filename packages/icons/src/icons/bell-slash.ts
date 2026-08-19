import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-bell-slash',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-bell-slash-body {
          0% { transform: scale(0.88); opacity: 0.35; }
          46% { transform: scale(1.04); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes lmn-bell-slash-bar {
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

    :host(.lmn-animate) svg .lmn-body { animation: lmn-bell-slash-body calc(780ms * 0.62) cubic-bezier(0.3, 1.3, 0.5, 1) both; }
        :host(.lmn-animate) svg .lmn-slash {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-bell-slash-bar 780ms cubic-bezier(0.5, 0, 0.2, 1) both;
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
      <path class="lmn-body" d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.57 16.476c-.223.082-.448.161-.674.238L7.319 4.137A6.75 6.75 0 0 1 18.75 9v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206Z"/><path class="lmn-body" fill-rule="evenodd" d="M5.25 9c0-.184.007-.366.022-.546l10.384 10.384a3.751 3.751 0 0 1-7.396-1.119 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clip-rule="evenodd"/>
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
      <path class="lmn-body" d="M9.143 17.082 a24.248 24.248 0 0 0 3.844 0.148"/><path class="lmn-body" d="M9.143 17.082 a23.856 23.856 0 0 1 -5.455 -1.31 8.964 8.964 0 0 0 2.3 -5.542"/><path class="lmn-body" d="M14.598 18.392000000000003 a3 3 0 0 0 5.667 1.97"/><path class="lmn-body" d="M22.23 18.085 L21 21"/><path class="lmn-body" d="M16.775 16.775 a23.81 23.81 0 0 0 3.536 -1.003 A8.967 8.967 0 0 1 18 9.75 V9 A6 6 0 0 0 6.53 6.53"/><path class="lmn-slash" d="M16.775 16.775 L6.53 6.53" pathLength="1"/><path class="lmn-slash" d="M3 3 l3.53 3.53" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnBellSlashIcon extends LmnIconBase {}
