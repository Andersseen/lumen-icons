/**
 * Must FAIL to compile under `strictTemplates`: a non-numeric size is not an LmnIconSizeInput.
 * `scripts/check-template-types.mjs` asserts the expected diagnostic.
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnCheckIcon } from 'lumen-icons/check';

@Component({
  selector: 'app-template-inputs-invalid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LmnCheckIcon],
  template: `<lmn-check size="large" />`,
})
export class TemplateInputsInvalid {}
