import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-computer-desktop',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-computer-desktop-screen {
          0% { transform: scaleY(0.02) scaleX(0.7); opacity: 0.5; }
          22% { transform: scaleY(0.03) scaleX(1); opacity: 1; }
          52% { transform: scaleY(1.12) scaleX(1); opacity: 1; }
          74% { transform: scaleY(0.96); }
          100% { transform: scaleY(1) scaleX(1); opacity: 1; }
        }
        @keyframes lmn-computer-desktop-flash {
          0%, 20% { opacity: 0; transform: scaleY(0.03); }
          30% { opacity: 0.55; transform: scaleY(0.06); }
          58% { opacity: 0.18; transform: scaleY(1); }
          100% { opacity: 0; transform: scaleY(1); }
        }
        @keyframes lmn-computer-desktop-chassis {
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

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-computer-desktop-screen 900ms cubic-bezier(0.2, 0.9, 0.3, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-computer-desktop-chassis 900ms ease-out both; }
        :host(.lmn-animate)::after { animation: lmn-computer-desktop-flash 900ms ease-out both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-computer-desktop-screen 900ms cubic-bezier(0.2, 0.9, 0.3, 1) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z" clip-rule="evenodd"/>
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
      <path class="lmn-path-1" d="M9 17.25 v1.007 a3 3 0 0 1 -0.879 2.122 L7.5 21 h9 l-0.621 -0.621 A3 3 0 0 1 15 18.257 V17.25"/><path class="lmn-path-2" d="M21 5.25 V15 a2.25 2.25 0 0 1 -2.25 2.25 H5.25 A2.25 2.25 0 0 1 3 15 V5.25"/><path class="lmn-path-3" d="M21 5.25 A2.25 2.25 0 0 0 18.75 3 H5.25 A2.25 2.25 0 0 0 3 5.25"/><path class="lmn-path-4" d="M21 5.25 V12 a2.25 2.25 0 0 1 -2.25 2.25 H5.25 A2.25 2.25 0 0 1 3 12 V5.25"/>
    </svg>
    }
  `,
})
export class LmnComputerDesktopIcon extends LmnIconBase {}
