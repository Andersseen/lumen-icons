import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-moon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path #path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  `,
})
export class LmnMoonIcon extends LmnIconBase {

  private path = viewChild('path', { read: ElementRef<SVGPathElement> });
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
        this.player = this.engine.play(el, { rotate: [0, 15], scale: [1, 1.08, 1] }, { config: { duration: 700, easing: 'ease-in-out', delay: 0, disabled: false } });
      } else {
        this.player = this.engine.play(el, { rotate: [15, 0], scale: [1] }, { config: { duration: 300, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
