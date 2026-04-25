import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LmnArrowRightIcon } from '@lumen/icons/arrow-right';
import { CodeSnippetComponent } from '../shared/code-snippet';

@Component({
  selector: 'app-home-quickstart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LmnArrowRightIcon, CodeSnippetComponent],
  template: `
    <section
      class="border-t border-border bg-muted py-20 dark:border-border dark:bg-card"
      aria-labelledby="quickstart-heading"
    >
      <div class="mx-auto max-w-2xl px-4">
        <div class="mb-8 text-center">
          <h2 id="quickstart-heading" class="text-3xl font-bold tracking-tight text-foreground">
            Up and running in seconds
          </h2>
          <p class="mt-3 text-secondary-foreground">Three steps — install, import, drop the tag.</p>
        </div>

        <div class="space-y-3">
          <app-code-snippet
            code="npm install @lumen/icons"
            label="Terminal"
            copyKey="install"
          />
          <app-code-snippet
            [code]="importCode"
            label="TypeScript"
            copyKey="import"
          />
          <app-code-snippet
            [code]="templateCode"
            label="Template"
            copyKey="template"
          />
        </div>

        <div class="mt-8 text-center">
          <a routerLink="/docs"
            class="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary dark:text-primary dark:hover:text-primary">
            Read the full documentation
            <lmn-arrow-right [size]="14" [strokeWidth]="2" />
          </a>
        </div>
      </div>
    </section>
  `,
})
export class HomeQuickstartComponent {
  readonly importCode = "import { LmnCheckIcon } from '@lumen/icons/check';";
  readonly templateCode = '<lmn-check [size]="24" animate="spin" />';
}
