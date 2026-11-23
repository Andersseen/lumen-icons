import { ChangeDetectionStrategy, Component } from "@angular/core";
import { VoltCard } from "@voltui/components";
import { DocsCodeBlockComponent } from "./docs-code-block";

@Component({
  selector: "app-docs-api-table",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltCard, DocsCodeBlockComponent],
  templateUrl:'./docs-api-table.html'
})
export class DocsApiTableComponent {
  protected readonly outletSnippet = `import type { LmnIconInputs } from 'lumen-icons';

readonly inputs: LmnIconInputs = { size: 40, background: 'soft', tone: 'primary', padding: 8, radius: '50%' };

<ng-container *ngComponentOutlet="icon; inputs: inputs" />`;
}
