import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-rss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-rss-arc { 0%, 100% { transform: scale(1); opacity: 1; } 12% { transform: scale(0.72); opacity: 0; } 28% { transform: scale(1.05); opacity: 1; } 46% { transform: scale(1); opacity: 1; } 58% { transform: scale(0.72); opacity: 0; } 76% { transform: scale(1.05); opacity: 1; } }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-rss-arc 880ms cubic-bezier(0.22, 0.8, 0.32, 1) 0ms both; } :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-rss-arc 880ms cubic-bezier(0.22, 0.8, 0.32, 1) 80ms both; } :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-rss-arc 880ms cubic-bezier(0.22, 0.8, 0.32, 1) 160ms both; }

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
      <path class="lmn-path-1" fill-rule="evenodd" d="M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 0 1-.75-.75V4.5Zm0 6.75a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75a6 6 0 0 0-6-6H4.5a.75.75 0 0 1-.75-.75v-.75Zm0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clip-rule="evenodd"/>
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
      <path class="lmn-path-1" d="M12.75 19.5 v-0.75 a7.5 7.5 0 0 0 -7.5 -7.5 H4.5"/><path class="lmn-path-2" d="M4.5 4.5 h0.75 c7.87 0 14.25 6.38 14.25 14.25 v0.75"/><path class="lmn-path-3" d="M6 18.75 a0.75 0.75 0 1 1 -1.5 0 0.75 0.75 0 0 1 1.5 0 Z"/>
    </svg>
    }
  `,
})
export class LmnRssIcon extends LmnIconBase {}
