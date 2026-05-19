import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-avatar',
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
      <circle class="head" cx="12" cy="8" r="5"/>
      <path class="body" d="M20 21a8 8 0 1 0-16 0"/>
    </svg>
  `,
  styles: [`
    .head, .body {
      transform-box: fill-box;
      transition: none;
    }
    .head {
      transform-origin: center bottom;
    }
    .body {
      transform-origin: center bottom;
    }
    .is-animated .head {
      animation: head-greet 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }
    .is-animated .body {
      animation: body-ack 500ms ease-out 100ms both;
    }
    @keyframes head-greet {
      0%   { transform: rotate(0deg) translateY(0); }
      40%  { transform: rotate(-14deg) translateY(-1px); }
      75%  { transform: rotate(4deg) translateY(0); }
      100% { transform: rotate(0deg) translateY(0); }
    }
    @keyframes body-ack {
      0%   { transform: scale(1); }
      50%  { transform: scale(1.03); }
      100% { transform: scale(1); }
    }
  `],
})
export class LmnAvatarIcon extends LmnIconBase {}
