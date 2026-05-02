import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-heart',
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
  private engine = inject(AnimationEngine);
  private player: ReturnType<AnimationEngine['play']> = null;

  constructor() {
    super();
    effect(() => {
      this.player?.cancel();
      this.player = null;

      const el = this.path().nativeElement;
      applyTransformOrigin(el);

      if (this.animate()) {
        this.player = this.engine.play(
          el,
          { scale: [1, 1.12] },
          { config: { duration: 300, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 0, disabled: false } },
        );
      } else {
        this.player = this.engine.play(
          el,
          { scale: [1.12, 1] },
          { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } },
        );
      }
    });
  }
}
