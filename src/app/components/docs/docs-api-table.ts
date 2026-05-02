import { ChangeDetectionStrategy, Component } from "@angular/core";
import { VoltCard } from "@voltui/components";

@Component({
  selector: "app-docs-api-table",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltCard],
  templateUrl:'./docs-api-table.html'
})
export class DocsApiTableComponent {}
