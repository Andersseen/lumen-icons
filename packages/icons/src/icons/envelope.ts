import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-envelope',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-envelope-flap {
          0%, 16% { transform: perspective(150px) rotateX(0deg); }
          48%, 62% { transform: perspective(150px) rotateX(-74deg); }
          100% { transform: perspective(150px) rotateX(0deg); }
        }
        @keyframes lmn-envelope-body {
          0% { transform: scale(0.93); opacity: 0.5; }
          54% { transform: scale(1.03); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate) svg .lmn-path-3 { transform-origin: top center; }
        :host(.lmn-animate) svg path { transform-origin: center; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-envelope-flap 760ms cubic-bezier(0.4, 0, 0.2, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-envelope-body 760ms cubic-bezier(0.3, 1.2, 0.5, 1) both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-envelope-body 760ms cubic-bezier(0.3, 1.2, 0.5, 1) both; }

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
      <path class="lmn-path-1" d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"/><path class="lmn-path-2" d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"/>
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
      <path class="lmn-path-1" d="M21.75 6.75 v10.5 a2.25 2.25 0 0 1 -2.25 2.25 h-15 a2.25 2.25 0 0 1 -2.25 -2.25 V6.75"/><path class="lmn-path-2" d="M21.75 6.75 A2.25 2.25 0 0 0 19.5 4.5 h-15 a2.25 2.25 0 0 0 -2.25 2.25"/><path class="lmn-path-3" d="M21.75 6.75 v0.243 a2.25 2.25 0 0 1 -1.07 1.916 l-7.5 4.615 a2.25 2.25 0 0 1 -2.36 0 L3.32 8.91 a2.25 2.25 0 0 1 -1.07 -1.916 V6.75"/>
    </svg>
    }
  `,
})
export class LmnEnvelopeIcon extends LmnIconBase {}
