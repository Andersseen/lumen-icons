import { ChangeDetectionStrategy, Component, effect, ElementRef, input, viewChild } from '@angular/core';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { animateScalePulse } from '../lib/animate-waapi';

@Component({
  selector: 'lmn-star',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <polygon #path points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  `,
})
export class LmnStarIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private path = viewChild.required('path', { read: ElementRef<SVGPolygonElement> });
  private animation: Animation | null = null;

  constructor() {
    super();
    effect(() => {
      this.animation?.cancel();
      this.animation = null;

      if (this.animate()) {
        this.animation = animateScalePulse(this.path().nativeElement, { from: 1, to: 1.12, duration: 1000 });
      }
    });
  }
}
