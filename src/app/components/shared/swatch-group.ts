import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { VoltTooltip, VoltTooltipContent } from '@voltui/components';

export interface SwatchOption<T> {
  readonly value: T;
  readonly label: string;
  readonly swatch: string;
}

/**
 * Colour-swatch radio group.
 *
 * volt-ui has no colour-picker primitive and a toggle group would paint its
 * own selected background over the swatch, so this stays a custom control —
 * but it is now implemented once (it used to exist twice, hand-rolled) with
 * real arrow-key support and a volt tooltip instead of a `title` attribute.
 */
@Component({
  selector: 'app-swatch-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltTooltip, VoltTooltipContent],
  templateUrl: './swatch-group.html',
})
export class SwatchGroupComponent<T extends string> {
  readonly options = input.required<readonly SwatchOption<T>[]>();
  readonly value = model.required<T>();
  readonly ariaLabel = input.required<string>();

  readonly activeIndex = computed(() =>
    Math.max(0, this.options().findIndex(option => option.value === this.value())),
  );

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const options = this.options();
    const last = options.length - 1;
    let next: number;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = index === last ? 0 : index + 1;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = index === 0 ? last : index - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.value.set(options[next].value);

    const group = (event.currentTarget as HTMLElement).parentElement;
    group?.querySelectorAll<HTMLElement>('[role="radio"]')[next]?.focus();
  }
}
