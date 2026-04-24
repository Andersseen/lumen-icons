import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-icons",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h1
        class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
      >
        Icons
      </h1>
      <p class="mt-3 text-slate-600 dark:text-slate-400">
        Browse and search all available icons. Coming soon.
      </p>
    </div>
  `,
})
export default class IconsPageComponent {}
