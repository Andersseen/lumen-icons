import { ChangeDetectionStrategy, Component, effect, ElementRef, input, viewChild } from '@angular/core';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { animateScalePulse } from '../lib/animate-waapi';

@Component({
  selector: 'lmn-heart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path #path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  `,
})
export class LmnHeartIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private path = viewChild.required('path', { read: ElementRef<SVGPathElement> });
  private animation: Animation | null = null;

  constructor() {
    super();
    effect(() => {
      this.animation?.cancel();
      this.animation = null;

      if (this.animate()) {
        this.animation = animateScalePulse(this.path().nativeElement, { from: 1, to: 1.15, duration: 800 });
      }
    });
  }
}
