import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <header class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90">
        <div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-2.5" aria-label="Lumen Icons home">
            <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 shadow-sm shadow-violet-600/30">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white"
                stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </div>
            <span class="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
              lumen <span class="text-slate-400 dark:text-slate-600">/</span> icons
            </span>
            <span class="hidden rounded-md bg-violet-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-600 dark:bg-violet-950/50 dark:text-violet-400 sm:block">
              v0.1
            </span>
          </a>

          <nav aria-label="Main navigation">
            <ul class="flex items-center gap-1 text-sm" role="list">
              <li>
                <a routerLink="/icons" routerLinkActive="text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800"
                  class="rounded-md px-3 py-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                  Icons
                </a>
              </li>
              <li>
                <a routerLink="/docs" routerLinkActive="text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800"
                  class="rounded-md px-3 py-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                  Docs
                </a>
              </li>
              <li class="ml-2">
                <a href="https://github.com/andersseen/lumen-icons" target="_blank" rel="noopener noreferrer"
                  aria-label="View on GitHub"
                  class="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-slate-600 transition-all hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
                  </svg>
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main-content" class="flex-1">
        <router-outlet />
      </main>

      <footer class="border-t border-slate-200 dark:border-slate-800">
        <div class="mx-auto max-w-6xl px-4 py-8">
          <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div class="flex items-center gap-2">
              <div class="flex h-5 w-5 items-center justify-center rounded bg-violet-600">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white"
                  stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </div>
              <span class="text-sm font-medium text-slate-700 dark:text-slate-300">lumen icons</span>
              <span class="text-sm text-slate-400 dark:text-slate-600">&mdash; MIT License</span>
            </div>
            <div class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
              <a routerLink="/icons" class="transition-colors hover:text-slate-900 dark:hover:text-white">Icons</a>
              <a routerLink="/docs" class="transition-colors hover:text-slate-900 dark:hover:text-white">Docs</a>
              <a href="https://github.com/andersseen/lumen-icons" target="_blank" rel="noopener noreferrer"
                class="transition-colors hover:text-slate-900 dark:hover:text-white">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
})
export class App {}
