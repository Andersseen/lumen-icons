import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AppHeaderComponent } from "./components/layout/app-header";
import { AppFooterComponent } from "./components/layout/app-footer";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  imports: [RouterOutlet, AppHeaderComponent, AppFooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
