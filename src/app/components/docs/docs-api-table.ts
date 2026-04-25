import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-docs-api-table",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="api" class="mt-16">
      <h2 class="text-2xl font-bold tracking-tight text-foreground">API Reference</h2>
      <p class="mt-3 text-secondary-foreground">All icons share the same three inputs.</p>

      <div class="mt-5 overflow-hidden rounded-xl border border-border">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted dark:bg-card">
              <th scope="col" class="px-4 py-3 text-left font-semibold text-foreground">Input</th>
              <th scope="col" class="px-4 py-3 text-left font-semibold text-foreground">Type</th>
              <th scope="col" class="px-4 py-3 text-left font-semibold text-foreground">Default</th>
              <th scope="col" class="px-4 py-3 text-left font-semibold text-foreground">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr class="bg-background">
              <td class="px-4 py-3 font-mono text-xs">size</td>
              <td class="px-4 py-3 font-mono text-xs text-muted-foreground">12|14|16|20|24|32</td>
              <td class="px-4 py-3 font-mono text-xs text-muted-foreground">24</td>
              <td class="px-4 py-3 text-secondary-foreground">Width and height in px</td>
            </tr>
            <tr class="bg-background">
              <td class="px-4 py-3 font-mono text-xs">strokeWidth</td>
              <td class="px-4 py-3 font-mono text-xs text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs text-muted-foreground">2</td>
              <td class="px-4 py-3 text-secondary-foreground">SVG stroke-width</td>
            </tr>
            <tr class="bg-background">
              <td class="px-4 py-3 font-mono text-xs">ariaLabel</td>
              <td class="px-4 py-3 font-mono text-xs text-muted-foreground">string | undefined</td>
              <td class="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
              <td class="px-4 py-3 text-secondary-foreground">
                When set, adds <code class="rounded bg-secondary px-1">role="img"</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
})
export class DocsApiTableComponent {}
