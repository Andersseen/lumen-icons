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
        class="text-4xl font-bold tracking-tight text-foreground"
      >
        Documentation
      </h1>
      <p class="mt-4 text-lg text-secondary-foreground">
        Accessible, tree-shakable Angular icon components with a consistent
        <code class="rounded bg-secondary px-1 py-0.5 text-sm dark:bg-secondary"
          >lmn-*</code
        >
        selector.
      </p>

      <!-- TOC -->
      <nav
        class="mt-8 rounded-xl border border-border bg-muted p-5 dark:border-border dark:bg-card"
        aria-label="Page sections"
      >
        <p
          class="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
        >
          On this page
        </p>
        <ul class="space-y-1 text-sm">
          @for (s of sections; track s.id) {
            <li>
              <a
                [href]="'#' + s.id"
                class="text-secondary-foreground transition-colors hover:text-foreground dark:text-muted-foreground dark:hover:text-primary-foreground"
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
          class="text-2xl font-bold tracking-tight text-foreground"
        >
          Installation
        </h2>
        <p class="mt-3 text-secondary-foreground">Install from npm:</p>
        <div
          class="mt-4 overflow-hidden rounded-xl border border-border bg-background dark:border-border"
        >
          <div
            class="flex items-center justify-between border-b border-border px-4 py-2"
          >
            <span class="text-xs text-muted-foreground">Terminal</span>
            <button
              type="button"
              (click)="copy('npm install @lumen/icons', 'install')"
              class="text-xs text-muted-foreground transition hover:text-muted-foreground"
            >
              {{ copied() === "install" ? "Copied!" : "Copy" }}
            </button>
          </div>
          <pre
            class="overflow-x-auto p-4 text-sm text-muted-foreground"
          ><code>npm install &#64;lumen/icons</code></pre>
        </div>
        <p class="mt-3 text-sm text-secondary-foreground">
          Peer deps:
          <code class="rounded bg-secondary px-1 dark:bg-secondary"
            >&#64;angular/core</code
          >
          and
          <code class="rounded bg-secondary px-1 dark:bg-secondary"
            >&#64;angular/common</code
          >
          ≥ 21.
        </p>
      </section>

      <!-- Usage -->
      <section id="usage" class="mt-16">
        <h2
          class="text-2xl font-bold tracking-tight text-foreground"
        >
          Usage
        </h2>
        <p class="mt-3 text-secondary-foreground">
          Import the icon you need and add it to your component's
          <code
            class="rounded bg-secondary px-1 py-0.5 text-sm dark:bg-secondary"
            >imports</code
          >
          array. Each icon is its own entry point — only what you import gets
          bundled.
        </p>

        <div
          class="mt-4 overflow-hidden rounded-xl border border-border bg-background dark:border-border"
        >
          <div
            class="flex items-center justify-between border-b border-border px-4 py-2"
          >
            <span class="text-xs text-muted-foreground">my-component.ts</span>
            <button
              type="button"
              (click)="copy(tsSnippet, 'ts')"
              class="text-xs text-muted-foreground transition hover:text-muted-foreground"
            >
              {{ copied() === "ts" ? "Copied!" : "Copy" }}
            </button>
          </div>
          <pre
            class="overflow-x-auto p-4 text-sm text-muted-foreground"
          ><code>{{ tsSnippet }}</code></pre>
        </div>

        <div
          class="mt-3 overflow-hidden rounded-xl border border-border bg-background dark:border-border"
        >
          <div
            class="flex items-center justify-between border-b border-border px-4 py-2"
          >
            <span class="text-xs text-muted-foreground">template</span>
            <button
              type="button"
              (click)="copy(htmlSnippet, 'html')"
              class="text-xs text-muted-foreground transition hover:text-muted-foreground"
            >
              {{ copied() === "html" ? "Copied!" : "Copy" }}
            </button>
          </div>
          <pre
            class="overflow-x-auto p-4 text-sm text-muted-foreground"
          ><code>{{ htmlSnippet }}</code></pre>
        </div>

        <!-- Live preview -->
        <div
          class="mt-5 rounded-xl border border-border bg-muted p-5 dark:border-border dark:bg-card"
        >
          <p
            class="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Live preview
          </p>
          <div
            class="flex flex-wrap items-center gap-6 text-foreground dark:text-foreground"
          >
            <div class="flex items-center gap-2">
              <lmn-check [size]="20" />
              <span class="text-sm text-secondary-foreground">default</span>
            </div>
            <div class="flex items-center gap-2">
              <lmn-check [size]="20" ariaLabel="Task complete" />
              <span class="text-sm text-secondary-foreground">ariaLabel</span>
            </div>
            <div class="flex items-center gap-2">
              <lmn-check [size]="32" [strokeWidth]="1" />
              <span class="text-sm text-secondary-foreground">size=32 stroke=1</span>
            </div>
            <div class="flex items-center gap-2">
              <lmn-check [size]="20" [strokeWidth]="3" />
              <span class="text-sm text-secondary-foreground">stroke=3</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Accessibility -->
      <section id="accessibility" class="mt-16">
        <h2
          class="text-2xl font-bold tracking-tight text-foreground"
        >
          Accessibility
        </h2>
        <p class="mt-3 text-secondary-foreground">
          Icons are decorative by default —
          <code
            class="rounded bg-secondary px-1 py-0.5 text-sm dark:bg-secondary"
            >aria-hidden="true"</code
          >
          is applied automatically. Pass
          <code
            class="rounded bg-secondary px-1 py-0.5 text-sm dark:bg-secondary"
            >ariaLabel</code
          >
          when the icon conveys meaning:
        </p>
        <div
          class="mt-4 overflow-hidden rounded-xl border border-border bg-background dark:border-border"
        >
          <pre
            class="overflow-x-auto p-4 text-sm text-muted-foreground"
          ><code>{{ a11ySnippet }}</code></pre>
        </div>
      </section>

      <!-- API -->
      <section id="api" class="mt-16">
        <h2
          class="text-2xl font-bold tracking-tight text-foreground"
        >
          API Reference
        </h2>
        <p class="mt-3 text-secondary-foreground">
          All icons share the same three inputs.
        </p>

        <div
          class="mt-5 overflow-hidden rounded-xl border border-border"
        >
          <table class="w-full text-sm">
            <thead>
              <tr
                class="border-b border-border bg-muted dark:border-border dark:bg-card"
              >
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-foreground"
                >
                  Input
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-foreground"
                >
                  Type
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-foreground"
                >
                  Default
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-foreground"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr class="bg-background">
                <td class="px-4 py-3 font-mono text-xs">size</td>
                <td class="px-4 py-3 font-mono text-xs text-muted-foreground">
                  12|14|16|20|24|32
                </td>
                <td class="px-4 py-3 font-mono text-xs text-muted-foreground">24</td>
                <td class="px-4 py-3 text-secondary-foreground">
                  Width and height in px
                </td>
              </tr>
              <tr class="bg-background">
                <td class="px-4 py-3 font-mono text-xs">strokeWidth</td>
                <td class="px-4 py-3 font-mono text-xs text-muted-foreground">
                  number
                </td>
                <td class="px-4 py-3 font-mono text-xs text-muted-foreground">2</td>
                <td class="px-4 py-3 text-secondary-foreground">
                  SVG stroke-width
                </td>
              </tr>
              <tr class="bg-background">
                <td class="px-4 py-3 font-mono text-xs">ariaLabel</td>
                <td class="px-4 py-3 font-mono text-xs text-muted-foreground">
                  string | undefined
                </td>
                <td class="px-4 py-3 font-mono text-xs text-muted-foreground">
                  undefined
                </td>
                <td class="px-4 py-3 text-secondary-foreground">
                  When set, adds
                  <code class="rounded bg-secondary px-1 dark:bg-secondary"
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
          class="text-2xl font-bold tracking-tight text-foreground"
        >
          Available Icons
        </h2>
        <p class="mt-3 text-secondary-foreground">
          Click the import path to copy it.
        </p>

        <div
          class="mt-5 overflow-hidden rounded-xl border border-border"
        >
          <table class="w-full text-sm">
            <thead>
              <tr
                class="border-b border-border bg-muted dark:border-border dark:bg-card"
              >
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-foreground"
                >
                  Icon
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-foreground"
                >
                  Selector
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-foreground"
                >
                  Import (click to copy)
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              @for (row of iconCatalog; track row.selector) {
                <tr class="bg-background">
                  <td class="px-4 py-3">
                    <div
                      class="flex items-center gap-3 text-foreground dark:text-foreground"
                    >
                      <ng-container
                        [ngComponentOutlet]="row.component"
                        [ngComponentOutletInputs]="{ size: 20 }"
                      />
                      <span class="text-foreground">{{
                        row.name
                      }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 font-mono text-xs text-muted-foreground">
                    &lt;{{ row.selector }} /&gt;
                  </td>
                  <td class="px-4 py-3">
                    <button
                      type="button"
                      (click)="copy(row.importStr, row.name)"
                      class="flex items-center gap-2 font-mono text-xs text-secondary-foreground transition hover:text-foreground dark:text-muted-foreground dark:hover:text-primary-foreground"
                      [attr.aria-label]="'Copy import for ' + row.name"
                    >
                      <span class="truncate">{{ row.importStr }}</span>
                      @if (copied() === row.name) {
                        <span
                          class="shrink-0 text-success dark:text-success"
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

      <div class="mt-20 border-t border-border pt-8 dark:border-border">
        <p class="text-sm text-muted-foreground">
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
