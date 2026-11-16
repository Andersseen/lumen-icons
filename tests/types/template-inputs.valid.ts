/**
 * Compiled by `scripts/check-template-types.mjs` with `ngc` + `strictTemplates`.
 * Every binding below must type-check: numeric inputs accept both the bound
 * number and the static attribute string.
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnCheckIcon } from 'lumen-icons/check';

@Component({
  selector: 'app-template-inputs-valid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LmnCheckIcon],
  template: `
    <lmn-check size="14" />
    <lmn-check [size]="14" />
    <lmn-check [size]="'32'" />
    <lmn-check strokeWidth="1.5" [strokeWidth]="1.5" />
    <lmn-check padding="8" />
    <lmn-check [padding]="8" />
    <lmn-check radius="12" />
    <lmn-check [radius]="12" />
    <lmn-check radius="50%" />
  `,
})
export class TemplateInputsValid {}
