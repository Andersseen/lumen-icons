import { NgComponentOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { VoltCard } from "@voltui/components";
import { ICON_CATALOG } from "../../data/icon-catalog";
import { ClipboardService } from "../../services/clipboard";

@Component({
  selector: "app-docs-icon-table",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, VoltCard],
  templateUrl :'./docs-icon-table.html'
})
export class DocsIconTableComponent {
  readonly clipboard = inject(ClipboardService);
  readonly iconCatalog = ICON_CATALOG;
}
