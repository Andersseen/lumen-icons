import { ChangeDetectionStrategy, Component, input, model } from "@angular/core";

@Component({
  selector: "app-animation-picker",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./animation-picker.html",
})
export class AnimationPickerComponent {
  readonly animate = model<boolean>(false);
  readonly ariaLabel = input<string>("Animation");
}
