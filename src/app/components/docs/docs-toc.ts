import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { VoltCard } from "@voltui/components";

export interface DocsTocSection {
  readonly id: string;
  readonly label: string;
}

@Component({
  selector: "app-docs-toc",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltCard],
  template: `
    <volt-card class="mt-8 block p-5">
      <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        On this page
      </p>
      <nav aria-label="Page sections">
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
    </volt-card>
  `,
})
export class DocsTocComponent {
  readonly sections = input.required<DocsTocSection[]>();
}
