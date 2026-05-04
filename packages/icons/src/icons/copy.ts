import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-copy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
      <path #p #r d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
  `,
})
export class LmnCopyIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private r = viewChild('r', { read: ElementRef<SVGPathElement> });
  private p = viewChild('p', { read: ElementRef<SVGPathElement> });
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

      const r = this.r()?.nativeElement;
      const p = this.p()?.nativeElement;
      if (!r || !p) return;
      applyTransformOrigin(r); applyTransformOrigin(p);
      if (this.animate()) {
        this.player = this.engine.play(r, { x: [0, 2], y: [0, 2], opacity: [1, 0.7, 1] }, { config: { duration: 400, easing: 'ease-in-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(p, { x: [0, -1], y: [0, -1] }, { config: { duration: 400, easing: 'ease-in-out', delay: 0, disabled: false } });
      } else {
        this.player = this.engine.play(r, { x: [0], y: [0], opacity: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(p, { x: [0], y: [0] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
