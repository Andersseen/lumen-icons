import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-copy',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-copy-front {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-3px, -3px); }
        }
        @keyframes lmn-copy-back {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(3px, 3px); }
        }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate) svg .lmn-path-1 { animation: lmn-copy-front 450ms ease both; }
        :host(.lmn-animate) svg .lmn-path-2 { animation: lmn-copy-back 450ms ease both; }

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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" class="lmn-animate-el lmn-path-1 lmn-path-1 lmn-path-1 lmn-path-1 lmn-path-1 lmn-path-1" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" class="lmn-animate-el lmn-path-2 lmn-path-2 lmn-path-2 lmn-path-2 lmn-path-2 lmn-path-2" />
    </svg>
  `,
})
export class LmnCopyIcon extends LmnIconBase {}
