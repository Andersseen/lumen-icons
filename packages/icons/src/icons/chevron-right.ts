import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-chevron-right',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path #path d="m9 18 6-6-6-6"/>
    </svg>
  `,
})
export class LmnChevronRightIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

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
        this.player = this.engine.play(el, { x: [-3, 0], opacity: [0.5, 1] }, { config: { duration: 300, easing: 'ease-out', delay: 0, disabled: false } });
      } else {
        this.player = this.engine.play(el, { x: [0], opacity: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
