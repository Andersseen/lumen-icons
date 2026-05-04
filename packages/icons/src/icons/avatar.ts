import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';
import { applyTransformOrigin } from '../lib/animation-utils';

@Component({
  selector: 'lmn-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="8" r="5"/>
      <path #body #head d="M20 21a8 8 0 1 0-16 0"/>
    </svg>
  `,
})
export class LmnAvatarIcon extends LmnIconBase {
  readonly animate = input<boolean>(false);

  private head = viewChild('head', { read: ElementRef<SVGPathElement> });
  private body = viewChild('body', { read: ElementRef<SVGPathElement> });
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

      const head = this.head()?.nativeElement;
      const body = this.body()?.nativeElement;
      if (!head || !body) return;
      applyTransformOrigin(head); applyTransformOrigin(body);
      if (this.animate()) {
        this.player = this.engine.play(head, { scale: [0.9, 1.1, 1] }, { config: { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 0, disabled: false } });
        this.player2 = this.engine.play(body, { scale: [0.9, 1.1, 1] }, { config: { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 60, disabled: false } });
      } else {
        this.player = this.engine.play(head, { scale: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
        this.player2 = this.engine.play(body, { scale: [1] }, { config: { duration: 200, easing: 'ease-out', delay: 0, disabled: false } });
      }
    });
  }
}
