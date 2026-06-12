import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-sun',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'ariaLabel() ? "img" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-hidden]': 'ariaLabel() ? null : "true"',
    '[class.lmn-animate]': 'animate()',
  },
  styles: [`
    :host(.lmn-filled) svg { fill: color-mix(in oklab, currentColor 24%, transparent); }

    .lmn-animate-el { display: inline-block; }
    
      @keyframes lmn-sun {
        0%, 100% { scale: 1; }
        50% { scale: 1.019; }
      }
  

    @media (prefers-reduced-motion: reduce) {
      :host(.lmn-animate) svg,
      :host(.lmn-animate) .lmn-animate-el {
        animation: none !important;
      }
    }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-sun 800ms ease 0ms both' : null"/>
      <path d="M12 2v2"         class="lmn-animate-el" [style.animation]="animate() ? 'lmn-sun 560ms cubic-bezier(0.22, 1, 0.36, 1) 60ms both' : null"/>
      <path d="M12 20v2"         class="lmn-animate-el" [style.animation]="animate() ? 'lmn-sun 560ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both' : null"/>
      <path d="M4.93 4.93l1.41 1.41" class="lmn-animate-el" [style.animation]="animate() ? 'lmn-sun 560ms cubic-bezier(0.22, 1, 0.36, 1) 180ms both' : null"/>
      <path d="M17.66 17.66l1.41 1.41" class="lmn-animate-el" [style.animation]="animate() ? 'lmn-sun 560ms cubic-bezier(0.22, 1, 0.36, 1) 240ms both' : null"/>
      <path d="M2 12h2"         class="lmn-animate-el" [style.animation]="animate() ? 'lmn-sun 560ms cubic-bezier(0.22, 1, 0.36, 1) 300ms both' : null"/>
      <path d="M20 12h2"         class="lmn-animate-el" [style.animation]="animate() ? 'lmn-sun 560ms cubic-bezier(0.22, 1, 0.36, 1) 360ms both' : null"/>
      <path d="M6.34 17.66l-1.41 1.41" class="lmn-animate-el" [style.animation]="animate() ? 'lmn-sun 560ms cubic-bezier(0.22, 1, 0.36, 1) 420ms both' : null"/>
      <path d="M19.07 4.93l-1.41 1.41" class="lmn-animate-el" [style.animation]="animate() ? 'lmn-sun 560ms cubic-bezier(0.22, 1, 0.36, 1) 480ms both' : null"/>
    </svg>
  `,
})
export class LmnSunIcon extends LmnIconBase {}
