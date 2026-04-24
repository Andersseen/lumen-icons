import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-docs",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h1
        class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
      >
        Documentation
      </h1>
      <p class="mt-3 text-slate-600 dark:text-slate-400">
        Installation guides and API reference. Coming soon.
      </p>
    </div>
  `,
})
export default class DocsPageComponent {}
