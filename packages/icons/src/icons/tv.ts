import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-tv',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-tv-screen {
          0% { transform: scaleY(0.02) scaleX(0.7); opacity: 0.5; }
          22% { transform: scaleY(0.03) scaleX(1); opacity: 1; }
          52% { transform: scaleY(1.12) scaleX(1); opacity: 1; }
          74% { transform: scaleY(0.96); }
          100% { transform: scaleY(1) scaleX(1); opacity: 1; }
        }
        @keyframes lmn-tv-flash {
          0%, 20% { opacity: 0; transform: scaleY(0.03); }
          30% { opacity: 0.55; transform: scaleY(0.06); }
          58% { opacity: 0.18; transform: scaleY(1); }
          100% { opacity: 0; transform: scaleY(1); }
        }
        @keyframes lmn-tv-chassis {
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

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-tv-screen 900ms cubic-bezier(0.2, 0.9, 0.3, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-tv-chassis 900ms ease-out both; }
        :host(.lmn-animate)::after { animation: lmn-tv-flash 900ms ease-out both; }
        :host(.lmn-animate.lmn-filled) svg { animation: lmn-tv-screen 900ms cubic-bezier(0.2, 0.9, 0.3, 1) both; }

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
      <path class="lmn-path-1" d="M19.5 6h-15v9h15V6Z"/><path class="lmn-path-2" fill-rule="evenodd" d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 0 0 6 21h12a.75.75 0 0 0 0-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375Zm0 13.5h17.25a.375.375 0 0 0 .375-.375V4.875a.375.375 0 0 0-.375-.375H3.375A.375.375 0 0 0 3 4.875v11.25c0 .207.168.375.375.375Z" clip-rule="evenodd"/>
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
      <path class="lmn-path-1" d="M6 20.25 h12"/><path class="lmn-path-2" d="M10.5 17.25 v3"/><path class="lmn-path-3" d="M13.5 17.25 v3"/><path class="lmn-path-4" d="M3.375 17.25 h17.25 c0.621 0 1.125 -0.504 1.125 -1.125 V4.875 c0 -0.621 -0.504 -1.125 -1.125 -1.125 H3.375 c-0.621 0 -1.125 0.504 -1.125 1.125 v11.25 c0 0.621 0.504 1.125 1.125 1.125 Z"/>
    </svg>
    }
  `,
})
export class LmnTvIcon extends LmnIconBase {}
