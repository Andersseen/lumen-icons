import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import type { MoveKeyframes } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-check',
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
  private engine = inject(AnimationEngine);
  private player: ReturnType<AnimationEngine['play']> = null;

  constructor() {
    super();
    effect(() => {
      this.player?.cancel();
      this.player = null;

      const el = this.path().nativeElement;
      if (this.animate()) {
        const length = el.getTotalLength?.() ?? 28;
        (el as unknown as HTMLElement).style.strokeDasharray = `${length}`;
        (el as unknown as HTMLElement).style.strokeDashoffset = `${length}`;

        this.player = this.engine.play(
          el,
          { strokeDashoffset: [length, 0] } as MoveKeyframes,
          { config: { duration: 400, easing: 'ease-out', delay: 0, disabled: false } },
        );
      } else {
        (el as unknown as HTMLElement).style.strokeDasharray = '';
        (el as unknown as HTMLElement).style.strokeDashoffset = '';
      }
    });
  }
}
