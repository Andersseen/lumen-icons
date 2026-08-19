import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import type { LmnIconSize } from 'lumen-icons';
import { VoltButton, VoltInput, VoltSearch, VoltSearchClear, VoltSlider, VoltSwitch } from '@voltui/components';
import { LmnXIcon } from 'lumen-icons/x';

import { IconCatalogStore } from '../../services/icon-catalog-store';
import { OptionGroupComponent } from '../shared/option-group';
import { SwatchGroupComponent } from '../shared/swatch-group';
import {
  BACKGROUND_OPTIONS,
  BACKGROUND_TONE_OPTIONS,
  CATEGORY_FILTERS,
  TONE_OPTIONS,
  VARIANT_OPTIONS,
} from './icon-control-options';

const SIZE_OPTIONS: readonly { value: LmnIconSize; label: string }[] = (
  [12, 14, 16, 20, 24, 32] as const
).map(size => ({ value: size, label: String(size) }));

const RADIUS_PRESETS: readonly { value: string; label: string }[] = [
  { value: '50%', label: 'Circle' },
  { value: '0.5rem', label: 'Rounded' },
  { value: '0', label: 'Square' },
];

/**
 * The catalog playground controls — rendered once and reused by both layouts.
 *
 * There used to be two near-identical copies of this (a desktop sidebar and a
 * mobile block, both permanently in the DOM), which duplicated every control,
 * the `icon-search` id and all of the state.
 */
@Component({
  selector: 'app-icon-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VoltSearch,
    VoltSearchClear,
    VoltInput,
    VoltSlider,
    VoltSwitch,
    VoltButton,
    LmnXIcon,
    OptionGroupComponent,
    SwatchGroupComponent,
  ],
  templateUrl: './icon-controls.html',
})
export class IconControlsComponent {
  protected readonly store = inject(IconCatalogStore);

  protected readonly categories = CATEGORY_FILTERS;
  protected readonly sizeOptions = SIZE_OPTIONS;
  protected readonly variantOptions = VARIANT_OPTIONS;
  protected readonly backgroundOptions = BACKGROUND_OPTIONS;
  protected readonly toneOptions = TONE_OPTIONS;
  protected readonly backgroundToneOptions = BACKGROUND_TONE_OPTIONS;
  protected readonly radiusPresets = RADIUS_PRESETS;

  protected readonly radiusSliderValue = computed(() => {
    const radius = this.store.radius();
    if (radius === '50%') return 24;
    if (typeof radius === 'string') return 10;
    return radius;
  });

  /** Which preset chip reads as active for the current radius value. */
  protected readonly radiusPreset = computed(() => {
    const radius = this.store.radius();
    if (radius === '50%') return '50%';
    if (radius === 0 || radius === '0') return '0';
    return '0.5rem';
  });

  protected readonly radiusLabel = computed(() => {
    const radius = this.store.radius();
    return typeof radius === 'number' ? `${radius}px` : radius;
  });
}
