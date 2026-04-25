import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LmnExternalLinkIcon } from '@lumen/icons/icons/external-link';
import { LmnStarIcon } from '@lumen/icons/icons/star';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LmnStarIcon, LmnExternalLinkIcon],
  template: `
    <footer class="border-t border-slate-200 dark:border-slate-800">
      <div class="mx-auto max-w-6xl px-4 py-8">
        <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">

          <div class="flex items-center gap-2">
            <div class="flex h-5 w-5 items-center justify-center rounded bg-violet-600 text-white">
              <lmn-star [size]="12" [strokeWidth]="2.5" />
            </div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">lumen icons</span>
            <span class="text-sm text-slate-400 dark:text-slate-600">&mdash; MIT License</span>
          </div>

          <nav aria-label="Footer navigation">
            <ul class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500" role="list">
              <li><a routerLink="/icons" class="transition-colors hover:text-slate-900 dark:hover:text-white">Icons</a></li>
              <li><a routerLink="/docs" class="transition-colors hover:text-slate-900 dark:hover:text-white">Docs</a></li>
              <li>
                <a href="https://github.com/andersseen/lumen-icons" target="_blank" rel="noopener noreferrer"
                  class="flex items-center gap-1 transition-colors hover:text-slate-900 dark:hover:text-white"
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
