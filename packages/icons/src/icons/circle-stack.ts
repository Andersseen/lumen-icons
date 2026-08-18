import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-circle-stack',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    @keyframes lmn-circle-stack-layer { 0% { transform: translateY(5px); opacity: 0; } 70% { transform: translateY(-0.7px); opacity: 1; } 100% { transform: translateY(0); opacity: 1; } }

    :host(.lmn-animate) svg path,
    :host(.lmn-animate) svg line,
    :host(.lmn-animate) svg circle,
    :host(.lmn-animate) svg rect,
    :host(.lmn-animate) svg g {
      transform-box: fill-box;
      transform-origin: center;
    }

    :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-1 { animation: lmn-circle-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 385ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-2 { animation: lmn-circle-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 330ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-3 { animation: lmn-circle-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 275ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-4 { animation: lmn-circle-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 220ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-5 { animation: lmn-circle-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 165ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-6 { animation: lmn-circle-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 110ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-7 { animation: lmn-circle-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 55ms both; }
        :host(.lmn-animate:not(.lmn-filled)) svg .lmn-path-8 { animation: lmn-circle-stack-layer 680ms cubic-bezier(0.22, 0.8, 0.32, 1) 0ms both; }

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
      <path class="lmn-path-1" d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z"/><path class="lmn-path-2" d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z"/><path class="lmn-path-3" d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z"/><path class="lmn-path-4" d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z"/>
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
      <path class="lmn-path-1" d="M20.25 6.375 c0 2.278 -3.694 4.125 -8.25 4.125 S3.75 8.653 3.75 6.375"/><path class="lmn-path-2" d="M20.25 6.375 c0 -2.278 -3.694 -4.125 -8.25 -4.125 S3.75 4.097 3.75 6.375"/><path class="lmn-path-3" d="M20.25 6.375 v11.25 c0 2.278 -3.694 4.125 -8.25 4.125 s-8.25 -1.847 -8.25 -4.125 V6.375"/><path class="lmn-path-4" d="M20.25 6.375 v3.75"/><path class="lmn-path-5" d="M3.75 6.375 v3.75"/><path class="lmn-path-6" d="M20.25 10.125 v3.75 C20.25 16.153 16.556 18 12 18 s-8.25 -1.847 -8.25 -4.125 v-3.75"/><path class="lmn-path-7" d="M20.25 10.125 c0 2.278 -3.694 4.125 -8.25 4.125 s-8.25 -1.847 -8.25 -4.125"/>
    </svg>
    }
  `,
})
export class LmnCircleStackIcon extends LmnIconBase {}
