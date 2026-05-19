import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-smile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.is-animated]="animate()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle class="face" cx="12" cy="12" r="10"/>
      <path class="mouth" d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line class="eye-left" x1="9" y1="9" x2="9.01" y2="9"/>
      <line class="eye-right" x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  `,
  styles: [`
    .face, .mouth, .eye-left, .eye-right {
      transform-box: fill-box;
      transition: none;
    }
    .mouth {
      transform-origin: center;
    }
    .is-animated .face {
      animation: face-laugh 560ms ease-out both;
    }
    .is-animated .mouth {
      animation: mouth-smile 560ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }
    .is-animated .eye-right {
      animation: eye-wink 300ms ease-in-out 380ms both;
    }
    @keyframes face-laugh {
      0%   { transform: scale(1) rotate(0deg); }
      50%  { transform: scale(1.05) rotate(3deg); }
      100% { transform: scale(1) rotate(0deg); }
    }
    @keyframes mouth-smile {
      0%   { transform: scaleY(1); }
      50%  { transform: scaleY(1.5); }
      100% { transform: scaleY(1); }
    }
    @keyframes eye-wink {
      0%   { opacity: 1; }
      45%  { opacity: 0; }
      100% { opacity: 1; }
    }
  `],
})
export class LmnSmileIcon extends LmnIconBase {}
