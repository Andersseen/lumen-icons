import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-home",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero -->
    <section
      class="mx-auto max-w-6xl px-4 py-24 text-center"
      aria-labelledby="hero-heading"
    >
      <span
        class="mb-6 inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
      >
        Currently in development &mdash; v0.1
      </span>

      <h1
        id="hero-heading"
        class="mx-auto max-w-3xl text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl"
      >
        Beautiful icons for Angular apps
      </h1>

      <p
        class="mx-auto mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-400"
      >
        Open-source Angular icon library. Accessible, tree-shakable, and
        consistent. Copy any icon as a standalone component in one click.
      </p>

      <div class="mt-10 flex flex-wrap justify-center gap-4">
        <a
          href="https://github.com/andersseen/lumen-icons"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-slate-900"
        >
          Get started
        </a>
        <a
          href="https://github.com/andersseen/lumen-icons"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
        >
          View on GitHub
        </a>
      </div>

      <!-- Stats row -->
      <dl
        class="mt-16 grid grid-cols-3 gap-8 border-t border-slate-200 pt-10 dark:border-slate-800 sm:mx-auto sm:max-w-lg"
      >
        <div class="flex flex-col gap-1">
          <dt class="text-sm text-slate-500 dark:text-slate-400">Icons</dt>
          <dd class="text-3xl font-bold text-slate-900 dark:text-white">0+</dd>
        </div>
        <div class="flex flex-col gap-1">
          <dt class="text-sm text-slate-500 dark:text-slate-400">Frameworks</dt>
          <dd class="text-3xl font-bold text-slate-900 dark:text-white">
            Angular
          </dd>
        </div>
        <div class="flex flex-col gap-1">
          <dt class="text-sm text-slate-500 dark:text-slate-400">License</dt>
          <dd class="text-3xl font-bold text-slate-900 dark:text-white">MIT</dd>
        </div>
      </dl>
    </section>

    <!-- Features -->
    <section
      class="border-t border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900"
      aria-labelledby="features-heading"
    >
      <div class="mx-auto max-w-6xl px-4">
        <h2
          id="features-heading"
          class="text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Designed for Angular
        </h2>

        <ul class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" role="list">
          @for (feature of features; track feature.title) {
            <li
              class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
            >
              <div
                class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-xl dark:bg-slate-800"
                aria-hidden="true"
              >
                {{ feature.icon }}
              </div>
              <h3 class="font-semibold text-slate-900 dark:text-white">
                {{ feature.title }}
              </h3>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {{ feature.description }}
              </p>
            </li>
          }
        </ul>
      </div>
    </section>

    <!-- Install snippet -->
    <section class="py-20" aria-labelledby="install-heading">
      <div class="mx-auto max-w-2xl px-4 text-center">
        <h2
          id="install-heading"
          class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Install in seconds
        </h2>
        <p class="mt-3 text-slate-600 dark:text-slate-400">
          Add the package, import the icon, drop the tag.
        </p>

        <div
          class="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-800"
          role="region"
          aria-label="Installation code snippet"
        >
          <div
            class="flex items-center gap-2 border-b border-slate-800 px-4 py-2"
          >
            <span class="text-xs text-slate-500">Terminal</span>
          </div>
          <pre
            class="overflow-x-auto p-4 text-left text-sm text-slate-300"
          ><code>npm install &#64;lumen/icons</code></pre>
        </div>

        <div
          class="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-800"
          role="region"
          aria-label="Usage code snippet"
        >
          <div
            class="flex items-center gap-2 border-b border-slate-800 px-4 py-2"
          >
            <span class="text-xs text-slate-500">TypeScript</span>
          </div>
          <pre
            class="overflow-x-auto p-4 text-left text-sm text-slate-300"
          ><code>import &#123; LmnCheckIcon &#125; from '&#64;lumen/icons/icons/check';</code></pre>
        </div>

        <div
          class="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-800"
          role="region"
          aria-label="Template code snippet"
        >
          <div
            class="flex items-center gap-2 border-b border-slate-800 px-4 py-2"
          >
            <span class="text-xs text-slate-500">Template</span>
          </div>
          <pre
            class="overflow-x-auto p-4 text-left text-sm text-slate-300"
          ><code>&lt;lmn-check aria-label="Done" /&gt;</code></pre>
        </div>
      </div>
    </section>
  `,
})
export default class HomePage {
  readonly features = [
    {
      icon: "♿",
      title: "Accessible by default",
      description:
        "Every icon ships with correct ARIA attributes and passes AXE audits out of the box.",
    },
    {
      icon: "🌲",
      title: "Fully tree-shakable",
      description:
        "Import only the icons you use. Each icon is its own entry point with zero side effects.",
    },
    {
      icon: "📐",
      title: "Consistent design",
      description:
        "Uniform stroke width, size scale, and optical balance across all icons.",
    },
    {
      icon: "⚡",
      title: "Angular-native",
      description:
        "Standalone components with OnPush, signals, and typed inputs — no wrappers, no hacks.",
    },
    {
      icon: "🎨",
      title: "Customisable",
      description:
        "Control size, stroke width and colour via inputs or CSS custom properties.",
    },
    {
      icon: "📦",
      title: "Copy-paste ready",
      description:
        "Prefer no dependency? Copy any single component file directly into your project.",
    },
  ] as const;
}
