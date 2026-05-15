import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-logo",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl:'./app-logo.html'
})
export class AppLogoComponent {
  readonly size = input<number>(28);
}
