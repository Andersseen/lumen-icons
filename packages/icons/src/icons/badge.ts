import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <rect width="18" height="12" x="3" y="6" rx="6" ry="6"/>
    </svg>
  `,
})
export class LmnBadgeIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private r = viewChild('r', { read: ElementRef<SVGPathElement> });
  private engine = inject(AnimationEngine);
  private player: ReturnType<AnimationEngine['play']> = null;

  constructor() {
    super();
    effect(() => {
      this.player?.cancel();
      this.player = null;

      const el = this.r()?.nativeElement;
      if (!el) return;
      applyTransformOrigin(el);
      if (this.animate()) {
        this.player = this.engine.play(el, { scale: [1, 1.12, 1] }, { config: { duration: 600, easing: 'ease-in-out', delay: 0, disabled: false } });
      } else {
        this.player = this.engine.play(el, { scale: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
