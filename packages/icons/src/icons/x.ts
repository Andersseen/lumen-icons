import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-x',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path #p2 #p1 d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  `,
})
export class LmnXIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private p1 = viewChild('p1', { read: ElementRef<SVGPathElement> });
  private p2 = viewChild('p2', { read: ElementRef<SVGPathElement> });
  private engine = inject(AnimationEngine);
  private player: ReturnType<AnimationEngine['play']> = null;
  private player2: ReturnType<AnimationEngine['play']> = null;

  constructor() {
    super();
    effect(() => {
      this.player?.cancel();
      this.player2?.cancel();
      this.player = null;
      this.player2 = null;

      const el1 = this.p1()?.nativeElement;
      const el2 = this.p2()?.nativeElement;
      if (!el1 || !el2) return;
      applyTransformOrigin(el1); applyTransformOrigin(el2);
      if (this.animate()) {
        this.player = this.engine.play(el1, { rotate: [0, 90] }, { config: { duration: 300, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 0, disabled: false } });
        this.player2 = this.engine.play(el2, { rotate: [0, -90] }, { config: { duration: 300, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 0, disabled: false } });
      } else {
        this.player = this.engine.play(el1, { rotate: [0] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(el2, { rotate: [0] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
