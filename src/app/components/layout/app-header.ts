import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { LmnExternalLinkIcon } from "@lumen/icons/icons/external-link";
import { LmnStarIcon } from "@lumen/icons/icons/star";
import { ThemeToggleComponent } from "../theme-toggle";
import { VoltButton } from "@voltui/components";

@Component({
  selector: "app-header",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    LmnStarIcon,
    LmnExternalLinkIcon,
    ThemeToggleComponent,
    VoltButton,
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
            <lmn-star [size]="14" [strokeWidth]="2.5" />
          </div>
          <span class="text-sm font-semibold tracking-tight text-foreground">
            lumen <span class="text-muted-foreground">/</span> icons
          </span>
          <span
            class="hidden rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary sm:block"
          >
            v0.1
          </span>
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
              <volt-button
                href="https://github.com/andersseen/lumen-icons"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source on GitHub (opens in new tab)"
                variant="link"
              >
                GitHub
                <lmn-external-link [size]="12" [strokeWidth]="2" />
              </volt-button>
            </li>
          </ul>
          <app-theme-toggle />
        </nav>
      </div>
    </header>
  `,
})
export class AppHeaderComponent {}
