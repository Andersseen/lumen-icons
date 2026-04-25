import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AppHeaderComponent } from "./components/layout/app-header";
import { AppFooterComponent } from "./components/layout/app-footer";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, AppHeaderComponent, AppFooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg dark:focus:bg-card dark:focus:text-primary-foreground"
    >
      Skip to main content
    </a>

    <div class="flex min-h-screen flex-col bg-background">
      <app-header />
      <main id="main-content" class="flex-1">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class App {}
