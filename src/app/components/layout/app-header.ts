import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { LmnExternalLinkIcon } from "@lumen/icons/external-link";
import { VoltBadge } from "@voltui/components";
import { AppLogoComponent } from "./app-logo";
import { ThemeToggleComponent } from "../theme-toggle";

@Component({
  selector: "app-header",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    LmnExternalLinkIcon,
    VoltBadge,
    AppLogoComponent,
    ThemeToggleComponent,
  ],
  template: `
    <header
      class="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md dark:border-border/80 dark:bg-background/90"
    >
      <div
        class="mx-auto flex h-14 max-w-6xl items-center justify-between px-4"
      >
        <!-- Logo -->
        <a
          routerLink="/"
          class="flex items-center gap-2.5"
          aria-label="Lumen Icons home"
        >
          <div
            class="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/30"
          >
            <app-logo [size]="20" />
          </div>
          <span class="text-sm font-semibold tracking-tight text-foreground">
            lumen <span class="text-muted-foreground">/</span> icons
          </span>
          <volt-badge variant="secondary" class="hidden sm:inline-flex">v0.1</volt-badge>
        </a>

        <!-- Nav -->
        <nav aria-label="Main navigation" class="flex items-center gap-2">
          <ul class="flex items-center gap-1 text-sm" role="list">
            <li>
              <a
                routerLink="/icons"
                routerLinkActive="text-foreground bg-secondary"
                class="rounded-md px-3 py-1.5 text-secondary-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Icons
              </a>
            </li>
            <li>
              <a
                routerLink="/docs"
                routerLinkActive="text-foreground bg-secondary"
                class="rounded-md px-3 py-1.5 text-secondary-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Docs
              </a>
            </li>
            <li class="ml-1">
              <a
                href="https://github.com/andersseen/lumen-icons"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source on GitHub (opens in new tab)"
                class="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-secondary-foreground transition-all hover:border-border hover:text-foreground"
              >
                GitHub
                <lmn-external-link [size]="12" [strokeWidth]="2" />
              </a>
            </li>
          </ul>
          <app-theme-toggle />
        </nav>
      </div>
    </header>
  `,
})
export class AppHeaderComponent {}
