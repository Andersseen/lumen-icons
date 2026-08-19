import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { VoltToggleGroup, VoltToggleGroupItem } from '@voltui/components';

export interface OptionGroupItem<T> {
  readonly value: T;
  readonly label: string;
}

/**
 * Single-select control built on volt-ui's toggle group.
 *
 * Replaces the hand-rolled `role="radio"` button grids that used to be
 * copy-pasted across the catalog controls: volt-ui supplies the roving
 * tabindex, the ARIA wiring and the selected-state styling.
 *
 * The toggle group speaks `string[]`; this atom adapts it to a single typed
 * value so callers keep working with `LmnIconSize`, `LmnIconVariant`, etc.
 */
@Component({
  selector: 'app-option-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltToggleGroup, VoltToggleGroupItem],
  templateUrl: './option-group.html',
})
export class OptionGroupComponent<T extends string | number> {
  readonly options = input.required<readonly OptionGroupItem<T>[]>();
  readonly value = model.required<T>();
  readonly ariaLabel = input.required<string>();
  readonly itemSize = input<'sm' | 'md' | 'lg'>('sm');
  /** Let the group flow onto several lines — needed in the narrow sidebar. */
  readonly wrap = input(true);

  readonly items = computed(() =>
    this.options().map(option => ({ key: String(option.value), label: option.label })),
  );

  readonly selected = computed(() => [String(this.value())]);

  protected onValueChange(next: readonly string[]): void {
    const key = next[0];
    const match = this.options().find(option => String(option.value) === key);

    // allowDeselection is off, so an empty payload means "no change".
    if (match) {
      this.value.set(match.value);
    }
  }
}
