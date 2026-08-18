import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-battery-100',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-battery-100-frame {
          0% { stroke-dashoffset: 1; opacity: 0; }
          26% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes lmn-battery-100-terminal {
          0%, 26% { opacity: 0; transform: scaleX(0.35); }
          52%, 100% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes lmn-battery-100-charge {
          0%, 38% { transform: scaleX(0); opacity: 0; }
          78%, 100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes lmn-battery-100-filled {
          0% { transform: scaleX(0.9); opacity: 0.35; }
          74% { transform: scaleX(1.015); opacity: 1; }
          100% { transform: scaleX(1); opacity: 1; }
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
          transform-origin: left center;
        }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: lmn-battery-100-frame 800ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 {
          animation: lmn-battery-100-terminal 800ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 {
          animation: lmn-battery-100-charge 800ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
        }
        :host(.lmn-animate.lmn-filled) svg {
          transform-origin: left center;
          animation: lmn-battery-100-filled 800ms cubic-bezier(0.22, 0.8, 0.32, 1) both;
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
      <path class="lmn-path-1" fill-rule="evenodd" d="M3.75 6.75a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-.037c.856-.174 1.5-.93 1.5-1.838v-2.25c0-.907-.644-1.664-1.5-1.837V9.75a3 3 0 0 0-3-3h-15Zm15 1.5a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-6a1.5 1.5 0 0 1 1.5-1.5h15ZM4.5 9.75a.75.75 0 0 0-.75.75V15c0 .414.336.75.75.75H18a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75H4.5Z" clip-rule="evenodd" pathLength="1"/>
    </svg>
    } @else {
      <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.lmn-animate]="animate()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path class="lmn-path-1" d="M21 10.5 h0.375 c0.621 0 1.125 0.504 1.125 1.125 v2.25 c0 0.621 -0.504 1.125 -1.125 1.125 H21" pathLength="1"/><path class="lmn-path-2" d="M4.5 10.5 H18 V15 H4.5 v-4.5 Z" pathLength="1"/><path class="lmn-path-3" d="M3.75 18 h15 A2.25 2.25 0 0 0 21 15.75 v-6 a2.25 2.25 0 0 0 -2.25 -2.25 h-15 A2.25 2.25 0 0 0 1.5 9.75 v6 A2.25 2.25 0 0 0 3.75 18 Z" pathLength="1"/>
    </svg>
    }
  `,
})
export class LmnBattery100Icon extends LmnIconBase {}
