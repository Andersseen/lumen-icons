import { ChangeDetectionStrategy, Component, input } from "@angular/core";

export interface DocsTocSection {
  readonly id: string;
  readonly label: string;
}

@Component({
  selector: "app-docs-toc",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav
      class="mt-8 rounded-xl border border-border bg-muted p-5"
      aria-label="Page sections"
    >
      <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        On this page
      </p>
      <ul class="space-y-1 text-sm">
        @for (s of sections(); track s.id) {
          <li>
            <a
              [href]="'#' + s.id"
              class="text-secondary-foreground transition-colors hover:text-foreground"
            >
              {{ s.label }}
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
})
export class DocsTocComponent {
  readonly sections = input.required<DocsTocSection[]>();
}
