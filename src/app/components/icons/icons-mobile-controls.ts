import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import type { LmnIconBackground, LmnIconSize, LmnIconTone, LmnIconVariant } from 'lumen-icons';
import { VoltInput, VoltSlider } from '@voltui/components';

import { AnimationPickerComponent } from '../shared/animation-picker';
import { SizePickerComponent } from '../shared/size-picker';
import type { CategoryFilterOption, ControlOption, ToneOption } from './icon-control-options';

@Component({
  selector: 'app-icons-mobile-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltInput, VoltSlider, SizePickerComponent, AnimationPickerComponent],
  templateUrl: './icons-mobile-controls.html',
})
export class IconsMobileControlsComponent {
  readonly search = model('');
  readonly category = model<CategoryFilterOption['value']>('all');
  readonly size = model<LmnIconSize>(24);
  readonly strokeWidth = model(2);
  readonly animate = model<boolean>(false);
  readonly tone = model<LmnIconTone>('inherit');
  readonly variant = model<LmnIconVariant>('outline');
  readonly background = model<LmnIconBackground>('none');
  readonly backgroundTone = model<LmnIconTone>('primary');
  readonly padding = model(8);
  readonly radius = model<number | string>(10);

  readonly radiusSliderValue = computed(() => {
    const r = this.radius();
    if (r === '50%') return 24;
    if (typeof r === 'string') return 10;
    return r;
  });

  readonly categories = input<readonly CategoryFilterOption[]>([]);
  readonly toneOptions = input<readonly ToneOption[]>([]);
  readonly variantOptions = input<readonly ControlOption<LmnIconVariant>[]>([]);
  readonly backgroundOptions = input<readonly ControlOption<LmnIconBackground>[]>([]);
  readonly backgroundToneOptions = input<readonly ToneOption[]>([]);
}
