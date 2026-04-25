import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from "@angular/core";
import { NgComponentOutlet } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { timer } from "rxjs";

import { LmnCheckIcon } from "@lumen/icons/icons/check";

import { ICON_CATALOG } from "../data/icon-catalog";

@Component({
  selector: "app-docs",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, LmnCheckIcon],
  template: `
    <div class="mx-auto max-w-3xl px-4 py-12">
      <h1
        class="text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
      >
        Documentation
      </h1>
      <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">
        Accessible, tree-shakable Angular icon components with a consistent
        <code class="rounded bg-slate-100 px-1 py-0.5 text-sm dark:bg-slate-800"
          >lmn-*</code
        >
        selector.
      </p>

      <!-- TOC -->
      <nav
        class="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900"
        aria-label="Page sections"
      >
        <p
          class="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500"
        >
          On this page
        </p>
        <ul class="space-y-1 text-sm">
          @for (s of sections; track s.id) {
            <li>
              <a
                [href]="'#' + s.id"
                class="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                {{ s.label }}
              </a>
            </li>
          }
        </ul>
      </nav>

      <!-- Installation -->
      <section id="installation" class="mt-16">
        <h2
          class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Installation
        </h2>
        <p class="mt-3 text-slate-600 dark:text-slate-300">Install from npm:</p>
        <div
          class="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-800"
        >
          <div
            class="flex items-center justify-between border-b border-slate-800 px-4 py-2"
          >
            <span class="text-xs text-slate-500">Terminal</span>
            <button
              type="button"
              (click)="copy('npm install @lumen/icons', 'install')"
              class="text-xs text-slate-500 transition hover:text-slate-300"
            >
              {{ copied() === "install" ? "Copied!" : "Copy" }}
            </button>
          </div>
          <pre
            class="overflow-x-auto p-4 text-sm text-slate-300"
          ><code>npm install &#64;lumen/icons</code></pre>
        </div>
        <p class="mt-3 text-sm text-slate-600">
          Peer deps:
          <code class="rounded bg-slate-100 px-1 dark:bg-slate-800"
            >&#64;angular/core</code
          >
          and
          <code class="rounded bg-slate-100 px-1 dark:bg-slate-800"
            >&#64;angular/common</code
          >
          ≥ 21.
        </p>
      </section>

      <!-- Usage -->
      <section id="usage" class="mt-16">
        <h2
          class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Usage
        </h2>
        <p class="mt-3 text-slate-600 dark:text-slate-300">
          Import the icon you need and add it to your component's
          <code
            class="rounded bg-slate-100 px-1 py-0.5 text-sm dark:bg-slate-800"
            >imports</code
          >
          array. Each icon is its own entry point — only what you import gets
          bundled.
        </p>

        <div
          class="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-800"
        >
          <div
            class="flex items-center justify-between border-b border-slate-800 px-4 py-2"
          >
            <span class="text-xs text-slate-500">my-component.ts</span>
            <button
              type="button"
              (click)="copy(tsSnippet, 'ts')"
              class="text-xs text-slate-500 transition hover:text-slate-300"
            >
              {{ copied() === "ts" ? "Copied!" : "Copy" }}
            </button>
          </div>
          <pre
            class="overflow-x-auto p-4 text-sm text-slate-300"
          ><code>{{ tsSnippet }}</code></pre>
        </div>

        <div
          class="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-800"
        >
          <div
            class="flex items-center justify-between border-b border-slate-800 px-4 py-2"
          >
            <span class="text-xs text-slate-500">template</span>
            <button
              type="button"
              (click)="copy(htmlSnippet, 'html')"
              class="text-xs text-slate-500 transition hover:text-slate-300"
            >
              {{ copied() === "html" ? "Copied!" : "Copy" }}
            </button>
          </div>
          <pre
            class="overflow-x-auto p-4 text-sm text-slate-300"
          ><code>{{ htmlSnippet }}</code></pre>
        </div>

        <!-- Live preview -->
        <div
          class="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900"
        >
          <p
            class="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500"
          >
            Live preview
          </p>
          <div
            class="flex flex-wrap items-center gap-6 text-slate-800 dark:text-slate-200"
          >
            <div class="flex items-center gap-2">
              <lmn-check [size]="20" />
              <span class="text-sm text-slate-600 dark:text-slate-400">default</span>
            </div>
            <div class="flex items-center gap-2">
              <lmn-check [size]="20" ariaLabel="Task complete" />
              <span class="text-sm text-slate-600 dark:text-slate-400">ariaLabel</span>
            </div>
            <div class="flex items-center gap-2">
              <lmn-check [size]="32" [strokeWidth]="1" />
              <span class="text-sm text-slate-600 dark:text-slate-400">size=32 stroke=1</span>
            </div>
            <div class="flex items-center gap-2">
              <lmn-check [size]="20" [strokeWidth]="3" />
              <span class="text-sm text-slate-600 dark:text-slate-400">stroke=3</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Accessibility -->
      <section id="accessibility" class="mt-16">
        <h2
          class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Accessibility
        </h2>
        <p class="mt-3 text-slate-600 dark:text-slate-300">
          Icons are decorative by default —
          <code
            class="rounded bg-slate-100 px-1 py-0.5 text-sm dark:bg-slate-800"
            >aria-hidden="true"</code
          >
          is applied automatically. Pass
          <code
            class="rounded bg-slate-100 px-1 py-0.5 text-sm dark:bg-slate-800"
            >ariaLabel</code
          >
          when the icon conveys meaning:
        </p>
        <div
          class="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-800"
        >
          <pre
            class="overflow-x-auto p-4 text-sm text-slate-300"
          ><code>{{ a11ySnippet }}</code></pre>
        </div>
      </section>

      <!-- API -->
      <section id="api" class="mt-16">
        <h2
          class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          API Reference
        </h2>
        <p class="mt-3 text-slate-600 dark:text-slate-300">
          All icons share the same three inputs.
        </p>

        <div
          class="mt-5 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"
        >
          <table class="w-full text-sm">
            <thead>
              <tr
                class="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
              >
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300"
                >
                  Input
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300"
                >
                  Type
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300"
                >
                  Default
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr class="bg-white dark:bg-slate-950">
                <td class="px-4 py-3 font-mono text-xs">size</td>
                <td class="px-4 py-3 font-mono text-xs text-slate-500">
                  12|14|16|20|24|32
                </td>
                <td class="px-4 py-3 font-mono text-xs text-slate-500">24</td>
                <td class="px-4 py-3 text-slate-600 dark:text-slate-300">
                  Width and height in px
                </td>
              </tr>
              <tr class="bg-white dark:bg-slate-950">
                <td class="px-4 py-3 font-mono text-xs">strokeWidth</td>
                <td class="px-4 py-3 font-mono text-xs text-slate-500">
                  number
                </td>
                <td class="px-4 py-3 font-mono text-xs text-slate-500">2</td>
                <td class="px-4 py-3 text-slate-600 dark:text-slate-300">
                  SVG stroke-width
                </td>
              </tr>
              <tr class="bg-white dark:bg-slate-950">
                <td class="px-4 py-3 font-mono text-xs">ariaLabel</td>
                <td class="px-4 py-3 font-mono text-xs text-slate-500">
                  string | undefined
                </td>
                <td class="px-4 py-3 font-mono text-xs text-slate-500">
                  undefined
                </td>
                <td class="px-4 py-3 text-slate-600 dark:text-slate-300">
                  When set, adds
                  <code class="rounded bg-slate-100 px-1 dark:bg-slate-800"
                    >role="img"</code
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Icons catalog -->
      <section id="icons" class="mt-16">
        <h2
          class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Available Icons
        </h2>
        <p class="mt-3 text-slate-600 dark:text-slate-300">
          Click the import path to copy it.
        </p>

        <div
          class="mt-5 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"
        >
          <table class="w-full text-sm">
            <thead>
              <tr
                class="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
              >
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300"
                >
                  Icon
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300"
                >
                  Selector
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300"
                >
                  Import (click to copy)
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              @for (row of iconCatalog; track row.selector) {
                <tr class="bg-white dark:bg-slate-950">
                  <td class="px-4 py-3">
                    <div
                      class="flex items-center gap-3 text-slate-800 dark:text-slate-200"
                    >
                      <ng-container
                        [ngComponentOutlet]="row.component"
                        [ngComponentOutletInputs]="{ size: 20 }"
                      />
                      <span class="text-slate-700 dark:text-slate-300">{{
                        row.name
                      }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 font-mono text-xs text-slate-500">
                    &lt;{{ row.selector }} /&gt;
                  </td>
                  <td class="px-4 py-3">
                    <button
                      type="button"
                      (click)="copy(row.importStr, row.name)"
                      class="flex items-center gap-2 font-mono text-xs text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      [attr.aria-label]="'Copy import for ' + row.name"
                    >
                      <span class="truncate">{{ row.importStr }}</span>
                      @if (copied() === row.name) {
                        <span
                          class="shrink-0 text-green-600 dark:text-green-400"
                          >✓</span
                        >
                      }
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <div class="mt-20 border-t border-slate-200 pt-8 dark:border-slate-800">
        <p class="text-sm text-slate-500">
          MIT License · Built with Angular 21
        </p>
      </div>
    </div>
  `,
})
export default class DocsPageComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly copied = signal<string | null>(null);

  readonly sections = [
    { id: "installation", label: "Installation" },
    { id: "usage", label: "Usage" },
    { id: "accessibility", label: "Accessibility" },
    { id: "api", label: "API Reference" },
    { id: "icons", label: "Available Icons" },
  ];

  readonly tsSnippet = `import { Component } from '@angular/core';
import { LmnCheckIcon } from '@lumen/icons/icons/check';

@Component({
  imports: [LmnCheckIcon],
  template: \`<lmn-check [size]="20" ariaLabel="Done" />\`,
})
export class MyComponent {}`;

  readonly htmlSnippet = `<!-- decorative: aria-hidden="true" set automatically -->
<lmn-check />

<!-- meaningful: role="img" + aria-label set on host -->
<lmn-check ariaLabel="Task complete" />

<!-- custom size and stroke -->
<lmn-check [size]="32" [strokeWidth]="1.5" />`;

  readonly a11ySnippet = `<!-- icon-only button: label on the button, icon is decorative -->
<button aria-label="Close dialog">
  <lmn-x />
</button>

<!-- standalone icon with meaning -->
<lmn-alert-circle ariaLabel="Warning: action is irreversible" />`;

  readonly iconCatalog = ICON_CATALOG;

  copy(text: string, key: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    this.copied.set(key);
    timer(2000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.copied.set(null));
  }
}
