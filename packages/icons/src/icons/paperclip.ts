import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { AnimationEngine } from 'angular-movement';
import type { MoveKeyframes } from 'angular-movement';
import { LmnIconBase, LM_ICON_HOST } from '../lib/icon-base';

@Component({
  selector: 'lmn-paperclip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: LM_ICON_HOST,
  template: `
<svg [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path #path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
    </svg>
  `,
})
export class LmnPaperclipIcon extends LmnIconBase {
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
      if (this.animate()) {
        const length = el.getTotalLength?.() ?? 28;
        (el as unknown as HTMLElement).style.strokeDasharray = `${length}`;
        (el as unknown as HTMLElement).style.strokeDashoffset = `${length}`;
        this.player = this.engine.play(el, { strokeDashoffset: [length, 0] } as MoveKeyframes, { config: { duration: 500, easing: 'ease-out', delay: 0, disabled: false } });
      } else {
        (el as unknown as HTMLElement).style.strokeDasharray = '';
        (el as unknown as HTMLElement).style.strokeDashoffset = '';
      }
    });
  }
}
