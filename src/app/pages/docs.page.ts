import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { VoltTabs, VoltTabsContent, VoltTabsList, VoltTabsTrigger } from "@voltui/components";
import { MOVEMENT_DIRECTIVES } from "angular-movement";

import { DocsAccessibilityComponent } from "../components/docs/docs-accessibility";
import { DocsApiTableComponent } from "../components/docs/docs-api-table";
import { DocsAnimationsComponent } from "../components/docs/docs-animations";
import { DocsIconTableComponent } from "../components/docs/docs-icon-table";
import { DocsInstallationComponent } from "../components/docs/docs-installation";
import { DocsTocComponent } from "../components/docs/docs-toc";
import { DocsUsageComponent } from "../components/docs/docs-usage";

@Component({
  selector: "app-docs",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DocsTocComponent,
    DocsInstallationComponent,
    DocsUsageComponent,
    DocsAnimationsComponent,
    DocsAccessibilityComponent,
    DocsApiTableComponent,
    DocsIconTableComponent,
    VoltTabs,
    VoltTabsList,
    VoltTabsTrigger,
    VoltTabsContent,
    MOVEMENT_DIRECTIVES,
  ],
  templateUrl: "./docs.page.html",
})
export default class DocsPageComponent {
  /**
   * The reference tables are tabbed so the 362-row icon list is not appended to
   * every visit — it used to make this page ~26 000 px tall.
   */
  readonly referenceTab = signal<string | undefined>("api");

  readonly sections = [
    { id: "installation", label: "Installation" },
    { id: "usage", label: "Usage" },
    { id: "animations", label: "Animations" },
    { id: "accessibility", label: "Accessibility" },
    { id: "reference", label: "Reference" },
  ];
}
