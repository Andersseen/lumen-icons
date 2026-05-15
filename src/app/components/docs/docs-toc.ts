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
  templateUrl:'./docs-toc.html'
})
export class DocsTocComponent {
  readonly sections = input.required<DocsTocSection[]>();
}
