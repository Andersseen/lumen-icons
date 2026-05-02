import { ChangeDetectionStrategy, Component, effect, ElementRef, input, viewChild } from '@angular/core';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { animateStrokeDraw } from '../lib/animate-waapi';

@Component({
  selector: 'lmn-check',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <polyline #path points="20 6 9 17 4 12"/>
    </svg>
  `,
})
export class LmnCheckIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private path = viewChild.required('path', { read: ElementRef<SVGPolylineElement> });
  private animation: Animation | null = null;

  constructor() {
    super();
    effect(() => {
      this.animation?.cancel();
      this.animation = null;

      const el = this.path().nativeElement;
      el.style.strokeDasharray = '';
      el.style.strokeDashoffset = '';

      if (this.animate()) {
        this.animation = animateStrokeDraw(el, 400);
      }
    });
  }
}
