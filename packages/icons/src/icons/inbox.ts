import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-inbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-inbox-item {
          0% { transform: translateY(-6px) scaleX(0.8); opacity: 0.4; }
          18% { opacity: 1; }
          52% { transform: translateY(1.2px) scaleX(1); opacity: 1; }
          70% { transform: translateY(-0.4px) scaleX(1); }
          100% { transform: translateY(0) scaleX(1); opacity: 1; }
        }
        @keyframes lmn-inbox-tray {
          0%, 46% { transform: scaleY(1); }
          58% { transform: scaleY(0.94); }
          78% { transform: scaleY(1.01); }
          100% { transform: scaleY(1); }
        }
        @keyframes lmn-inbox-squash {
          0%, 22% { transform: scale(1, 1); }
          48% { transform: scale(1.06, 0.84); }
          70% { transform: scale(0.98, 1.04); }
          100% { transform: scale(1, 1); }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { transform-origin: bottom center; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-inbox-item 720ms cubic-bezier(0.5, 0, 0.3, 1) both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-inbox-tray 720ms ease-out both; }
        :host(.lmn-animate.lmn-filled) svg { transform-origin: 50% 100%; animation: lmn-inbox-squash 720ms cubic-bezier(0.3, 1.2, 0.5, 1) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M6.912 3a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H6.912Zm13.823 9.75-2.213-7.191A1.5 1.5 0 0 0 17.088 4.5H6.912a1.5 1.5 0 0 0-1.434 1.059L3.265 12.75H6.11a3 3 0 0 1 2.684 1.658l.256.513a1.5 1.5 0 0 0 1.342.829h3.218a1.5 1.5 0 0 0 1.342-.83l.256-.512a3 3 0 0 1 2.684-1.658h2.844Z" clip-rule="evenodd"/>
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
      <path class="lmn-path-1" d="M2.25 13.5 h3.86 a2.25 2.25 0 0 1 2.012 1.244 l0.256 0.512 a2.25 2.25 0 0 0 2.013 1.244 h3.218 a2.25 2.25 0 0 0 2.013 -1.244 l0.256 -0.512 a2.25 2.25 0 0 1 2.013 -1.244 h3.859"/><path class="lmn-path-2" d="M2.25 13.838 V18 a2.25 2.25 0 0 0 2.25 2.25 h15 A2.25 2.25 0 0 0 21.75 18 v-4.162 c0 -0.224 -0.034 -0.447 -0.1 -0.661 L19.24 5.338 a2.25 2.25 0 0 0 -2.15 -1.588 H6.911 a2.25 2.25 0 0 0 -2.15 1.588 L2.35 13.177 a2.25 2.25 0 0 0 -0.1 0.661 Z"/>
    </svg>
    }
  `,
})
export class LmnInboxIcon extends LmnIconBase {}
