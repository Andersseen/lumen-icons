import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    svg { transform-origin: center; transform-box: fill-box; }

    .head, .body {
      transform-origin: center;
      transition: transform 220ms ease-out;
    }

    .is-animated .head,
    .is-animated .body {
      animation: avatar-pop 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .is-animated .body { animation-delay: 60ms; }

    @keyframes avatar-pop {
      0% { transform: scale(0.9); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
  `],
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
})
export class LmnAvatarIcon extends LmnIconBase {}
