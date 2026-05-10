import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-star',
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

  private path = viewChild('path', { read: ElementRef<SVGPolygonElement> });
  private engine = inject(AnimationEngine);
  private player: ReturnType<AnimationEngine['play']> = null;

  constructor() {
    super();
    effect(() => {
      this.player?.cancel();
      this.player = null;

      const el = this.path()?.nativeElement;
      if (!el) return;
      applyTransformOrigin(el);
      if (this.animate()) {
        this.player = this.engine.play(el, { scale: [1, 1.2, 0.95, 1.1, 1] }, { config: { duration: 700, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 0, disabled: false } });
      } else {
        this.player = this.engine.play(el, { scale: [1] }, { config: { duration: 300, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
