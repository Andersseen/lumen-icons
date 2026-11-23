/**
 * Compiled by `scripts/check-template-types.mjs` with `ngc` + `strictTemplates`.
 * Every binding below must type-check: numeric inputs accept both the bound
 * number and the static attribute string.
 */
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, type Type } from '@angular/core';
import type { LmnIconInputs } from 'lumen-icons';
import { LmnCheckIcon } from 'lumen-icons/check';

@Component({
  selector: 'app-template-inputs-valid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LmnCheckIcon, NgComponentOutlet],
  template: `
    <lmn-check size="14" />
    <lmn-check [size]="14" />
    <lmn-check [size]="'32'" />
    <lmn-check size="40" />
    <lmn-check [size]="40" />
    <ng-container *ngComponentOutlet="icon; inputs: inputs" />
    <lmn-check strokeWidth="1.5" [strokeWidth]="1.5" />
    <lmn-check padding="8" />
    <lmn-check [padding]="8" />
    <lmn-check radius="12" />
    <lmn-check [radius]="12" />
    <lmn-check radius="50%" />
  `,
})
export class TemplateInputsValid {
  readonly icon: Type<unknown> = LmnCheckIcon;
  // Icons rendered from data: the inputs object is typed, not hand-written.
  readonly inputs: LmnIconInputs = {
    size: 40,
    background: 'soft',
    backgroundTone: 'primary',
    tone: 'primary',
    padding: 8,
    radius: '50%',
    ariaLabel: 'Done',
  };
}
