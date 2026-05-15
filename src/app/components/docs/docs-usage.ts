import { ChangeDetectionStrategy, Component } from "@angular/core";
import { LmnCheckIcon } from "@lumen/icons/check";
import { DocsCodeBlockComponent } from "./docs-code-block";

@Component({
  selector: "app-docs-usage",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsCodeBlockComponent, LmnCheckIcon],
  templateUrl:'./docs-usage.html'
})
export class DocsUsageComponent {
  readonly tsSnippet = `import { Component } from '@angular/core';
import { LmnCheckIcon } from '@lumen/icons/check';

@Component({
  imports: [LmnCheckIcon],
  template: \`<lmn-check [size]="20" ariaLabel="Done" />\`,
})
export class MyComponent {}`;

  readonly htmlSnippet = `<!-- decorative: aria-hidden="true" set automatically -->
<lmn-check />

<!-- meaningful: role="img" + aria-label set on host -->
<lmn-check ariaLabel="Task complete" />

<!-- custom size and stroke -->
<lmn-check [size]="32" [strokeWidth]="1.5" />`;
}
