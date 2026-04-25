import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DocsCodeBlockComponent } from "./docs-code-block";

@Component({
  selector: "app-docs-accessibility",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsCodeBlockComponent],
  template: `
    <section id="accessibility" class="mt-16">
      <h2 class="text-2xl font-bold tracking-tight text-foreground">Accessibility</h2>
      <p class="mt-3 text-secondary-foreground">
        Icons are decorative by default —
        <code class="rounded bg-secondary px-1 py-0.5 text-sm">aria-hidden="true"</code>
        is applied automatically. Pass
        <code class="rounded bg-secondary px-1 py-0.5 text-sm">ariaLabel</code>
        when the icon conveys meaning:
      </p>
      <app-docs-code-block
        class="mt-4 block"
        [code]="a11ySnippet"
        label="Accessibility examples"
        copyKey="a11y"
      />
    </section>
  `,
})
export class DocsAccessibilityComponent {
  readonly a11ySnippet = `<!-- icon-only button: label on the button, icon is decorative -->
<button aria-label="Close dialog">
  <lmn-x />
</button>

<!-- standalone icon with meaning -->
<lmn-alert-circle ariaLabel="Warning: action is irreversible" />`;
}
