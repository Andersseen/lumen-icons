import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    svg { transform-origin: center; transform-box: fill-box; }

    .is-animated {
      animation: search-wiggle 500ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    @keyframes search-wiggle {
      0% { transform: scale(1) rotate(0deg) translate(0, 0); }
      50% { transform: scale(1.1) rotate(-5deg) translate(0.5px, 0); }
      100% { transform: scale(1) rotate(0deg) translate(0, 0); }
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
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  `,
})
export class LmnSearchIcon extends LmnIconBase {}
