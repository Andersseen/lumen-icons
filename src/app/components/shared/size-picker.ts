import { ChangeDetectionStrategy, Component, input, model } from "@angular/core";
import type { LmnIconSize } from "@lumen/icons";

const SIZES: LmnIconSize[] = [12, 14, 16, 20, 24, 32];

@Component({
  selector: "app-size-picker",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl:'./size-picker.html'
})
export class SizePickerComponent {
  readonly size = model<LmnIconSize>(24);
  readonly ariaLabel = input<string>("Icon size");

  readonly sizes = SIZES;
}
