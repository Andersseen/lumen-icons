import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-clipboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-clipboard-clip {
          0%, 8% { transform: translateY(0) scale(1, 1); }
          30%, 46% { transform: translateY(-0.75px) scale(1.16, 1.32); }
          60% { transform: translateY(0.5px) scale(0.95, 0.78); }
          78% { transform: translateY(0) scale(1.02, 1.06); }
          100% { transform: translateY(0) scale(1, 1); }
        }
        @keyframes lmn-clipboard-sheet {
          0%, 10% { transform: translateY(-5px) rotate(-5deg); opacity: 0.5; }
          52% { transform: translateY(0.6px) rotate(0deg); opacity: 1; }
          64% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(0) rotate(0deg); opacity: 1; }
        }
        @keyframes lmn-clipboard-bullet {
          0% { transform: scale(0); }
          60% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @keyframes lmn-clipboard-line {
          0% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes lmn-clipboard-squash {
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

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { transform-box: view-box; transform-origin: 12px 5.25px; }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1,
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-clipboard-clip 820ms cubic-bezier(0.4, 0, 0.2, 1) both; }
        :host(.lmn-animate.lmn-filled) svg { transform-origin: 50% 100%; animation: lmn-clipboard-squash 820ms cubic-bezier(0.3, 1.2, 0.5, 1) both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M10.5 3A1.501 1.501 0 0 0 9 4.5h6A1.5 1.5 0 0 0 13.5 3h-3Zm-2.693.178A3 3 0 0 1 10.5 1.5h3a3 3 0 0 1 2.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15Z" clip-rule="evenodd"/>
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
      <path class="lmn-path-1" d="M15.666 3.888 A2.25 2.25 0 0 0 13.5 2.25 h-3 c-1.03 0 -1.9 0.693 -2.166 1.638"/><path class="lmn-path-2" d="M15.666 3.888 c0.055 0.194 0.084 0.4 0.084 0.612 v0 a0.75 0.75 0 0 1 -0.75 0.75 H9 a0.75 0.75 0 0 1 -0.75 -0.75 v0 c0 -0.212 0.03 -0.418 0.084 -0.612"/><path class="lmn-path-3" d="M15.666 3.888 c0.646 0.049 1.288 0.11 1.927 0.184 1.1 0.128 1.907 1.077 1.907 2.185 V19.5 a2.25 2.25 0 0 1 -2.25 2.25 H6.75 A2.25 2.25 0 0 1 4.5 19.5 V6.257 c0 -1.108 0.806 -2.057 1.907 -2.185 a48.208 48.208 0 0 1 1.927 -0.184"/>
    </svg>
    }
  `,
})
export class LmnClipboardIcon extends LmnIconBase {}
