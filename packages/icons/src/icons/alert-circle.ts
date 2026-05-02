import { ChangeDetectionStrategy, Component, effect, ElementRef, input, viewChild } from '@angular/core';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { animateShake } from '../lib/animate-waapi';

@Component({
  selector: 'lmn-alert-circle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
    <svg #svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" x2="12" y1="8" y2="12"/>
      <line x1="12" x2="12.01" y1="16" y2="16"/>
    </svg>
  `,
})
export class LmnAlertCircleIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private svg = viewChild.required('svg', { read: ElementRef<SVGElement> });
  private animation: Animation | null = null;

  constructor() {
    super();
    effect(() => {
      this.animation?.cancel();
      this.animation = null;

      if (this.animate()) {
        this.animation = animateShake(this.svg().nativeElement, 400);
      }
    });
  }
}
