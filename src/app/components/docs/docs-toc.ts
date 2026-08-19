import { ChangeDetectionStrategy, Component, input } from "@angular/core";
export interface DocsTocSection {
  readonly id: string;
  readonly label: string;
}

@Component({
  selector: "app-docs-toc",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // A sticky rail on wide viewports; the page used to open with the TOC as an
    // inline card that scrolled away immediately.
    class: "hidden w-56 shrink-0 self-start lg:sticky lg:top-24 lg:block",
  },
  templateUrl: './docs-toc.html',
})
export class DocsTocComponent {
  readonly sections = input.required<DocsTocSection[]>();
}
