import { ChangeDetectionStrategy, Component, input, model } from "@angular/core";
import type { LmnIconAnimate } from "@lumen/icons";

const ANIMATIONS: { value: LmnIconAnimate; label: string; symbol: string }[] = [
  { value: "none",   label: "None",   symbol: "—" },
  { value: "spin",   label: "Spin",   symbol: "↻" },
  { value: "pulse",  label: "Pulse",  symbol: "◉" },
  { value: "bounce", label: "Bounce", symbol: "↕" },
  { value: "ping",   label: "Ping",   symbol: "◎" },
];

@Component({
  selector: "app-animation-picker",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-1" role="radiogroup" [attr.aria-label]="ariaLabel()">
      @for (anim of animations; track anim.value) {
        <button
          type="button"
          role="radio"
          [attr.aria-checked]="anim.value === animate()"
          class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors"
          [class]="anim.value === animate()
            ? 'bg-primary text-primary dark:bg-primary/50 dark:text-primary'
            : 'text-secondary-foreground hover:bg-secondary dark:text-muted-foreground dark:hover:bg-secondary'"
          (click)="animate.set(anim.value)"
        >
          <span class="flex h-5 w-5 items-center justify-center rounded-md border text-[10px]"
            [class]="anim.value === animate()
              ? 'border-primary bg-primary dark:border-primary dark:bg-primary/50'
              : 'border-border dark:border-border'">
            {{ anim.symbol }}
          </span>
          {{ anim.label }}
        </button>
      }
    </div>
  `,
})
export class AnimationPickerComponent {
  readonly animate = model<LmnIconAnimate>("none");
  readonly ariaLabel = input<string>("Animation");

  readonly animations = ANIMATIONS;
}
