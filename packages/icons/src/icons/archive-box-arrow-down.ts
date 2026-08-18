import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-archive-box-arrow-down',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-archive-box-arrow-down-lid {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          15%, 70% { transform: translateY(-2.5px) rotate(-7deg); }
        }
        @keyframes lmn-archive-box-arrow-down-drop {
          0%, 25% { transform: translateY(-3px); opacity: 0; }
          50% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5,
        :host(.lmn-animate.lmn-filled) svg .lmn-path-1 {
          transform-origin: left center;
        }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5 { animation: lmn-archive-box-arrow-down-lid 750ms ease-in-out both; }
        :host(.lmn-animate.lmn-filled) svg .lmn-path-1 { animation: lmn-archive-box-arrow-down-lid 750ms ease-in-out both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-archive-box-arrow-down-drop 750ms ease-in-out both; }

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
      <path class="lmn-path-1" d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z"/><path class="lmn-path-2" fill-rule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd"/>
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
      <path class="lmn-path-1" d="m20.25 7.5 -0.625 10.632 a2.25 2.25 0 0 1 -2.247 2.118 H6.622 a2.25 2.25 0 0 1 -2.247 -2.118 L3.75 7.5"/><path class="lmn-path-2" d="M12 10.5 v6.75"/><path class="lmn-path-3" d="M12 17.25 l-3 -3"/><path class="lmn-path-4" d="M12 17.25 l3 -3"/><path class="lmn-path-5" d="M3.375 7.5 h17.25 c0.621 0 1.125 -0.504 1.125 -1.125 v-1.5 c0 -0.621 -0.504 -1.125 -1.125 -1.125 H3.375 c-0.621 0 -1.125 0.504 -1.125 1.125 v1.5 c0 0.621 0.504 1.125 1.125 1.125 Z"/>
    </svg>
    }
  `,
})
export class LmnArchiveBoxArrowDownIcon extends LmnIconBase {}
