import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-device-tablet',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-device-tablet-screen {
          0% { transform: scaleY(0.02) scaleX(0.7); opacity: 0.5; }
          22% { transform: scaleY(0.03) scaleX(1); opacity: 1; }
          52% { transform: scaleY(1.12) scaleX(1); opacity: 1; }
          74% { transform: scaleY(0.96); }
          100% { transform: scaleY(1) scaleX(1); opacity: 1; }
        }
        @keyframes lmn-device-tablet-flash {
          0%, 20% { opacity: 0; transform: scaleY(0.03); }
          30% { opacity: 0.55; transform: scaleY(0.06); }
          58% { opacity: 0.18; transform: scaleY(1); }
          100% { opacity: 0; transform: scaleY(1); }
        }
        @keyframes lmn-device-tablet-chassis {
          0%, 30% { opacity: 0; transform: translateY(2px); }
          64% { opacity: 1; transform: translateY(0); }
          100% { opacity: 1; transform: translateY(0); }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate) { position: relative; }
        /* The phosphor flood behind the glass. */
        :host(.lmn-animate)::after {
          content: '';
          position: absolute;
          left: 16%;
          top: 14%;
          width: 68%;
          height: 46%;
          background: currentColor;
          border-radius: 6%;
          opacity: 0;
          transform-origin: center;
        }
        :host(.lmn-animate) svg path { transform-origin: center; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-device-tablet-screen 900ms cubic-bezier(0.2, 0.9, 0.3, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-device-tablet-chassis 900ms ease-out both; }
        :host(.lmn-animate)::after { animation: lmn-device-tablet-flash 900ms ease-out both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-device-tablet-screen 900ms cubic-bezier(0.2, 0.9, 0.3, 1) both; }

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
      <path class="lmn-path-1" d="M10.5 18a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"/><path class="lmn-path-2" fill-rule="evenodd" d="M7.125 1.5A3.375 3.375 0 0 0 3.75 4.875v14.25A3.375 3.375 0 0 0 7.125 22.5h9.75a3.375 3.375 0 0 0 3.375-3.375V4.875A3.375 3.375 0 0 0 16.875 1.5h-9.75ZM6 4.875c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v14.25c0 .621-.504 1.125-1.125 1.125h-9.75A1.125 1.125 0 0 1 6 19.125V4.875Z" clip-rule="evenodd"/>
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
      <path class="lmn-path-1" d="M10.5 19.5 h3"/><path class="lmn-path-2" d="M6.75 21.75 h10.5 a2.25 2.25 0 0 0 2.25 -2.25 v-15 a2.25 2.25 0 0 0 -2.25 -2.25 H6.75 A2.25 2.25 0 0 0 4.5 4.5 v15 a2.25 2.25 0 0 0 2.25 2.25 Z"/>
    </svg>
    }
  `,
})
export class LmnDeviceTabletIcon extends LmnIconBase {}
