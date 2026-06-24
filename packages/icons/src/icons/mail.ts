import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-mail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-mail-flap {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px) rotateX(25deg); }
        }
        @keyframes lmn-mail-body {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.04); }
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
        :host(.lmn-animate) svg .lmn-path-2 {
          transform-origin: top center;
        }

    :host(.lmn-animate) svg .lmn-path-1 { animation: lmn-mail-flap 500ms ease both; }
        :host(.lmn-animate) svg .lmn-path-2 { animation: lmn-mail-body 500ms ease both; }

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
      <rect width="20" height="16" x="2" y="4" rx="2" class="lmn-animate-el lmn-path-1" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" class="lmn-animate-el lmn-path-2" />
    </svg>
  `,
})
export class LmnMailIcon extends LmnIconBase {}
