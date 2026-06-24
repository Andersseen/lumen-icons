import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-menu-top {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(6px) rotate(45deg); }
        }
        @keyframes lmn-menu-mid {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes lmn-menu-bot {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-6px) rotate(-45deg); }
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
          transform-origin: center;
        }

    :host(.lmn-animate) svg .lmn-path-1 { animation: lmn-menu-top 400ms ease both; }
        :host(.lmn-animate) svg .lmn-path-2 { animation: lmn-menu-mid 400ms ease both; }
        :host(.lmn-animate) svg .lmn-path-3 { animation: lmn-menu-bot 400ms ease both; }

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
    
    .lmn-filled svg,
    .lmn-filled path {
      fill: currentColor;
      stroke: none;
    }
  
  `],
  template: `
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
      <line x1="4" x2="20" y1="6" y2="6" class="lmn-animate-el lmn-path-1 lmn-path-1 lmn-path-1 lmn-path-1 lmn-path-1 lmn-path-1" /><line x1="4" x2="20" y1="12" y2="12" class="lmn-animate-el lmn-path-2 lmn-path-2 lmn-path-2 lmn-path-2 lmn-path-2 lmn-path-2" /><line x1="4" x2="20" y1="18" y2="18" class="lmn-animate-el lmn-path-3 lmn-path-3 lmn-path-3 lmn-path-3 lmn-path-3 lmn-path-3" />
    </svg>
  `,
})
export class LmnMenuIcon extends LmnIconBase {}
