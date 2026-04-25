import { ChangeDetectionStrategy, Component } from "@angular/core";

import { DocsAccessibilityComponent } from "../components/docs/docs-accessibility";
import { DocsApiTableComponent } from "../components/docs/docs-api-table";
import { DocsIconTableComponent } from "../components/docs/docs-icon-table";
import { DocsInstallationComponent } from "../components/docs/docs-installation";
import { DocsTocComponent } from "../components/docs/docs-toc";
import { DocsUsageComponent } from "../components/docs/docs-usage";

@Component({
  selector: "app-docs",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DocsTocComponent,
    DocsInstallationComponent,
    DocsUsageComponent,
    DocsAccessibilityComponent,
    DocsApiTableComponent,
    DocsIconTableComponent,
  ],
  template: `
    <div class="mx-auto max-w-3xl px-4 py-12">
      <h1 class="text-4xl font-bold tracking-tight text-foreground">Documentation</h1>
      <p class="mt-4 text-lg text-secondary-foreground">
        Accessible, tree-shakable Angular icon components with a consistent
        <code class="rounded bg-secondary px-1 py-0.5 text-sm">lmn-*</code>
        selector.
      </p>

      <app-docs-toc [sections]="sections" />
      <app-docs-installation />
      <app-docs-usage />
      <app-docs-accessibility />
      <app-docs-api-table />
      <app-docs-icon-table />

      <div class="mt-20 border-t border-border pt-8">
        <p class="text-sm text-muted-foreground">MIT License · Built with Angular 21</p>
      </div>
    </div>
  `,
})
export default class DocsPageComponent {
  readonly sections = [
    { id: "installation", label: "Installation" },
    { id: "usage", label: "Usage" },
    { id: "accessibility", label: "Accessibility" },
    { id: "api", label: "API Reference" },
    { id: "icons", label: "Available Icons" },
  ];
}
