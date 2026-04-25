import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LmnExternalLinkIcon } from '@lumen/icons/external-link';
import { VoltSeparator } from '@voltui/components';
import { AppLogoComponent } from './app-logo';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LmnExternalLinkIcon, VoltSeparator, AppLogoComponent],
  template: `
    <footer>
      <volt-separator class="w-full" />
      <div class="mx-auto max-w-6xl px-4 py-8">
        <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">

          <div class="flex items-center gap-2">
            <div class="flex h-5 w-5 items-center justify-center rounded bg-primary text-primary-foreground">
              <app-logo [size]="14" />
            </div>
            <span class="text-sm font-medium text-foreground">lumen icons</span>
            <span class="text-sm text-muted-foreground dark:text-muted-foreground">&mdash; MIT License</span>
          </div>

          <nav aria-label="Footer navigation">
            <ul class="flex items-center gap-4 text-sm text-secondary-foreground" role="list">
              <li><a routerLink="/icons" class="transition-colors hover:text-foreground dark:hover:text-primary-foreground">Icons</a></li>
              <li><a routerLink="/docs" class="transition-colors hover:text-foreground dark:hover:text-primary-foreground">Docs</a></li>
              <li>
                <a href="https://github.com/andersseen/lumen-icons" target="_blank" rel="noopener noreferrer"
                  class="flex items-center gap-1 transition-colors hover:text-foreground dark:hover:text-primary-foreground"
                  aria-label="GitHub (opens in new tab)">
                  GitHub
                  <lmn-external-link [size]="12" [strokeWidth]="2" />
                </a>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    </footer>
  `,
})
export class AppFooterComponent {}
