import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-mail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    svg { transform-origin: center; transform-box: fill-box; }

    .mail-rect, .mail-flap {
      transform-origin: center;
      transition: transform 220ms ease-out;
    }

    .is-animated .mail-rect {
      animation: mail-scale 500ms ease-in-out forwards;
    }

    .is-animated .mail-flap {
      animation: mail-flap 400ms ease-out 80ms forwards;
    }

    @keyframes mail-scale {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.06); }
    }

    @keyframes mail-flap {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-2px); }
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
      <rect class="mail-rect" width="20" height="16" x="2" y="4" rx="2"/>
      <path class="mail-flap" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  `,
})
export class LmnMailIcon extends LmnIconBase {}
