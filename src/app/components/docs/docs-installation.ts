import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DocsCodeBlockComponent } from "./docs-code-block";

@Component({
  selector: "app-docs-installation",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsCodeBlockComponent],
  templateUrl:'./docs-installation.html'
})
export class DocsInstallationComponent {}
