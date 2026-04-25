import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LmnExternalLinkIcon } from '@lumen/icons/icons/external-link';
import { LmnStarIcon } from '@lumen/icons/icons/star';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, LmnStarIcon, LmnExternalLinkIcon],
  template: `
    <header class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90">
      <div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">

        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-2.5" aria-label="Lumen Icons home">
          <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-white shadow-sm shadow-violet-600/30">
            <lmn-star [size]="14" [strokeWidth]="2.5" />
          </div>
          <span class="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
            lumen <span class="text-slate-400 dark:text-slate-600">/</span> icons
          </span>
          <span class="hidden rounded-md bg-violet-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-600 dark:bg-violet-950/50 dark:text-violet-400 sm:block">
            v0.1
          </span>
        </a>

        <!-- Nav -->
        <nav aria-label="Main navigation">
          <ul class="flex items-center gap-1 text-sm" role="list">
            <li>
              <a routerLink="/icons"
                routerLinkActive="text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800"
                class="rounded-md px-3 py-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                Icons
              </a>
            </li>
            <li>
              <a routerLink="/docs"
                routerLinkActive="text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800"
                class="rounded-md px-3 py-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                Docs
              </a>
            </li>
            <li class="ml-2">
              <a href="https://github.com/andersseen/lumen-icons"
                target="_blank" rel="noopener noreferrer"
                aria-label="View source on GitHub (opens in new tab)"
                class="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-slate-600 transition-all hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-white">
                GitHub
                <lmn-external-link [size]="12" [strokeWidth]="2" />
              </a>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  `,
})
export class AppHeaderComponent {}
