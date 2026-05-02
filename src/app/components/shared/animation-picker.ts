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
  templateUrl:'./animation-picker.html'
})
export class AnimationPickerComponent {
  readonly animate = model<LmnIconAnimate>("none");
  readonly ariaLabel = input<string>("Animation");

  readonly animations = ANIMATIONS;
}
