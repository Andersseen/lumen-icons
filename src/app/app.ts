import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex min-h-screen flex-col">
      <header
        class="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80"
      >
        <div
          class="mx-auto flex h-14 max-w-6xl items-center justify-between px-4"
        >
          <a
            routerLink="/"
            class="flex items-center gap-2 font-semibold tracking-tight"
            aria-label="Lumen Icons home"
          >
            <span class="text-slate-900 dark:text-white">lumen</span>
            <span
              class="rounded bg-slate-900 px-1.5 py-0.5 text-xs font-medium text-white dark:bg-white dark:text-slate-900"
              >icons</span
            >
          </a>

          <nav aria-label="Main navigation">
            <ul
              class="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400"
              role="list"
            >
              <li>
                <a
                  routerLink="/icons"
                  class="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >Icons</a
                >
              </li>
              <li>
                <a
                  routerLink="/docs"
                  class="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >Docs</a
                >
              </li>
              <li>
                <a
                  href="https://github.com/andersseen/lumen-icons"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="transition-colors hover:text-slate-900 dark:hover:text-white"
                  aria-label="GitHub repository (opens in new tab)"
                >
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

      <footer class="border-t border-slate-200 py-8 dark:border-slate-800">
        <div
          class="mx-auto max-w-6xl px-4 text-center text-sm text-slate-500 dark:text-slate-500"
        >
          Built with Angular &mdash; MIT License
        </div>
      </footer>
    </div>
  `,
})
export class App {}
