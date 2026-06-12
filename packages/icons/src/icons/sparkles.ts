import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnIconBase } from '../lib/icon-base';

@Component({
  selector: 'lmn-sparkles',
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
    
      @keyframes lmn-sparkles {
        0%, 100% { scale: 1; opacity: 1; }
        50% { scale: 1.04; opacity: 1; }
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
      <path d="M12 2v4"     class="lmn-animate-el" [style.animation]="animate() ? 'lmn-sparkles 560ms ease 0ms both' : null"/>
      <path d="m5 5 2.8 2.8" class="lmn-animate-el" [style.animation]="animate() ? 'lmn-sparkles 560ms ease 35ms both' : null"/>
      <path d="m19 5-2.8 2.8" class="lmn-animate-el" [style.animation]="animate() ? 'lmn-sparkles 560ms ease 70ms both' : null"/>
      <path d="M12 12v8"     class="lmn-animate-el" [style.animation]="animate() ? 'lmn-sparkles 560ms ease 105ms both' : null"/>
      <path d="m5 19 2.8-2.8" class="lmn-animate-el" [style.animation]="animate() ? 'lmn-sparkles 560ms ease 140ms both' : null"/>
      <path d="m19 19-2.8-2.8" class="lmn-animate-el" [style.animation]="animate() ? 'lmn-sparkles 560ms ease 175ms both' : null"/>
      <circle cx="12" cy="12" r="3"
        class="lmn-animate-el" [style.animation]="animate() ? 'lmn-sparkles 560ms ease 90ms both' : null"/>
    </svg>
  `,
})
export class LmnSparklesIcon extends LmnIconBase {}
