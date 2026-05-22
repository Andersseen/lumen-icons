import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-copy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    svg { transform-origin: center; transform-box: fill-box; }

    .copy-back, .copy-front {
      transform-origin: center;
      transition: transform 220ms ease-out, opacity 220ms ease-out;
    }

    .is-animated .copy-back {
      animation: copy-shift 400ms ease-in-out forwards;
    }

    .is-animated .copy-front {
      animation: copy-shift-rev 400ms ease-in-out forwards;
    }

    @keyframes copy-shift {
      0%, 100% { transform: translate(0, 0); opacity: 1; }
      50% { transform: translate(2px, 2px); opacity: 0.7; }
    }

    @keyframes copy-shift-rev {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(-1px, -1px); }
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
      <rect class="copy-back" width="14" height="14" x="8" y="8" rx="2" ry="2"/>
      <path class="copy-front" d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
  `,
})
export class LmnCopyIcon extends LmnIconBase {}
