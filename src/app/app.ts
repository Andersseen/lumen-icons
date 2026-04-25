import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AppHeaderComponent } from "./components/layout/app-header";
import { AppFooterComponent } from "./components/layout/app-footer";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, AppHeaderComponent, AppFooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <app-header />
      <main id="main-content" class="flex-1">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class App {}
