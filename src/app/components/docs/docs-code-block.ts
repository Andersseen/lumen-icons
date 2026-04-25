import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { CodeSnippetComponent } from "../shared/code-snippet";

@Component({
  standalone: true,
  selector: "app-docs-code-block",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeSnippetComponent],
  template: `
    <app-code-snippet
      class="block"
      [code]="code()"
      [label]="label()"
      [copyKey]="copyKey()"
    />
  `,
})
export class DocsCodeBlockComponent {
  readonly code = input("");
  readonly label = input("");
  readonly copyKey = input("");
}
