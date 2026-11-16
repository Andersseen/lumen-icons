/**
 * Must FAIL to compile under `strictTemplates`: 15 is not an LmnIconSize.
 * `scripts/check-template-types.mjs` asserts the expected diagnostic.
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnCheckIcon } from 'lumen-icons/check';

@Component({
  selector: 'app-template-inputs-invalid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LmnCheckIcon],
  template: `<lmn-check size="15" />`,
})
export class TemplateInputsInvalid {}
