import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DocsCodeBlockComponent } from "./docs-code-block";

@Component({
  selector: "app-docs-installation",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsCodeBlockComponent],
  template: `
    <section id="installation" class="mt-16">
      <h2 class="text-2xl font-bold tracking-tight text-foreground">Installation</h2>
      <p class="mt-3 text-secondary-foreground">Install from npm:</p>
      <app-docs-code-block
        class="mt-4 block"
        code="npm install @lumen/icons"
        label="Terminal"
        copyKey="install"
      />
      <p class="mt-3 text-sm text-secondary-foreground">
        Peer deps:
        <code class="rounded bg-secondary px-1">&#64;angular/core</code>
        and
        <code class="rounded bg-secondary px-1">&#64;angular/common</code>
        ≥ 21.
      </p>
    </section>
  `,
})
export class DocsInstallationComponent {}
