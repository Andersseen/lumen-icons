import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DocsCodeBlockComponent } from "./docs-code-block";

@Component({
  selector: "app-docs-accessibility",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsCodeBlockComponent],
  templateUrl:'./docs-accessibility.html'
})
export class DocsAccessibilityComponent {
  readonly a11ySnippet = `<!-- icon-only button: label on the button, icon is decorative -->
<button aria-label="Close dialog">
  <lmn-x />
</button>

<!-- standalone icon with meaning -->
<lmn-alert-circle ariaLabel="Warning: action is irreversible" />`;
}
