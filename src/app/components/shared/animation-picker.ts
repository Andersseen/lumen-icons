import { ChangeDetectionStrategy, Component, input, model } from "@angular/core";

@Component({
  selector: "app-animation-picker",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="animate()"
      class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors"
      [class]="animate()
        ? 'bg-primary text-primary dark:bg-primary/50 dark:text-primary'
        : 'text-secondary-foreground hover:bg-secondary dark:text-muted-foreground dark:hover:bg-secondary'"
      (click)="animate.set(!animate())"
    >
      <span class="flex h-5 w-5 items-center justify-center rounded-md border text-[10px]"
        [class]="animate()
          ? 'border-primary bg-primary dark:border-primary dark:bg-primary/50'
          : 'border-border dark:border-border'">
        {{ animate() ? '✓' : '' }}
      </span>
      Animate
    </button>
  `,
})
export class AnimationPickerComponent {
  readonly animate = model<boolean>(false);
  readonly ariaLabel = input<string>("Animation");
}
