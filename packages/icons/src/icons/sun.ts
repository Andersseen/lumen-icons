import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveVariantsDirective } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-sun',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoveVariantsDirective],
  host: LM_ICON_HOST,
  styles: [`
    .sun-ray {
      transform-box: fill-box;
      transform-origin: center;
    }
    .is-animated .sun-ray {
      animation: sun-ray-pop 400ms ease-out both;
    }
    .is-animated .sun-ray:nth-child(2)  { animation-delay: 60ms; }
    .is-animated .sun-ray:nth-child(3)  { animation-delay: 120ms; }
    .is-animated .sun-ray:nth-child(4)  { animation-delay: 180ms; }
    .is-animated .sun-ray:nth-child(5)  { animation-delay: 240ms; }
    .is-animated .sun-ray:nth-child(6)  { animation-delay: 300ms; }
    .is-animated .sun-ray:nth-child(7)  { animation-delay: 360ms; }
    .is-animated .sun-ray:nth-child(8)  { animation-delay: 420ms; }
    .is-animated .sun-ray:nth-child(9)  { animation-delay: 480ms; }

    @keyframes sun-ray-pop {
      0%   { transform: scale(0.5); opacity: 0.35; }
      100% { transform: scale(1);   opacity: 1; }
    }
  `],
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="strokeWidth()"
      [class.is-animated]="animate()"
      [moveVariants]="{ active: { rotate: [0, 12], scale: [1, 1.05, 1] } }"
      [moveAnimate]="animate() ? 'active' : undefined"
      [moveDuration]="800"
      moveEasing="ease-in-out"
      style="transform-origin: center; transform-box: fill-box;"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4"/>
      <path class="sun-ray" d="M12 2v2"/>
      <path class="sun-ray" d="M12 20v2"/>
      <path class="sun-ray" d="M4.93 4.93l1.41 1.41"/>
      <path class="sun-ray" d="M17.66 17.66l1.41 1.41"/>
      <path class="sun-ray" d="M2 12h2"/>
      <path class="sun-ray" d="M20 12h2"/>
      <path class="sun-ray" d="M6.34 17.66l-1.41 1.41"/>
      <path class="sun-ray" d="M19.07 4.93l-1.41 1.41"/>
    </svg>
  `,
})
export class LmnSunIcon extends LmnIconBase {}
