import { ChangeDetectionStrategy, Component, input, model } from "@angular/core";
import type { LmnIconSize } from "@lumen/icons";

const SIZES: LmnIconSize[] = [12, 14, 16, 20, 24, 32];

@Component({
  selector: "app-size-picker",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-wrap gap-1.5" role="radiogroup" [attr.aria-label]="ariaLabel()">
      @for (s of sizes; track s) {
        <button
          type="button"
          role="radio"
          [attr.aria-checked]="s === size()"
          class="rounded-md px-2.5 py-1 text-sm font-medium transition-colors"
          [class]="s === size()
            ? 'bg-card text-primary-foreground dark:bg-background dark:text-foreground'
            : 'border border-border text-secondary-foreground hover:border-border dark:border-border dark:text-muted-foreground dark:hover:border-border'"
          (click)="size.set(s)"
        >
          {{ s }}
        </button>
      }
    </div>
  `,
})
export class SizePickerComponent {
  readonly size = model<LmnIconSize>(24);
  readonly ariaLabel = input<string>("Icon size");

  readonly sizes = SIZES;
}
