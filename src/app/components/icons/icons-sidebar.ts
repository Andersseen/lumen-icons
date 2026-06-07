import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import type { LmnIconBackground, LmnIconSize, LmnIconTone, LmnIconVariant } from '@lumen/icons';
import { VoltInput, VoltSlider } from '@voltui/components';

import { AnimationPickerComponent } from '../shared/animation-picker';
import { SizePickerComponent } from '../shared/size-picker';
import type { IconCategory } from '../../data/icon-metadata';

type CategoryFilter = IconCategory | 'all';

interface CategoryFilterOption {
  readonly value: CategoryFilter;
  readonly label: string;
}

interface ToneOption {
  readonly value: LmnIconTone;
  readonly label: string;
  readonly swatch: string;
}

interface ControlOption<T extends string> {
  readonly value: T;
  readonly label: string;
}

@Component({
  selector: 'app-icons-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltInput, VoltSlider, SizePickerComponent, AnimationPickerComponent],
  templateUrl: './icons-sidebar.html',
})
export class IconsSidebarComponent {
  readonly search = model('');
  readonly category = model<CategoryFilter>('all');
  readonly size = model<LmnIconSize>(24);
  readonly strokeWidth = model(2);
  readonly animate = model<boolean>(false);
  readonly tone = model<LmnIconTone>('inherit');
  readonly variant = model<LmnIconVariant>('outline');
  readonly background = model<LmnIconBackground>('none');
  readonly backgroundTone = model<LmnIconTone>('primary');
  readonly padding = model(8);
  readonly radius = model(10);
  readonly categories = input<readonly CategoryFilterOption[]>([]);
  readonly toneOptions = input<readonly ToneOption[]>([]);
  readonly variantOptions = input<readonly ControlOption<LmnIconVariant>[]>([]);
  readonly backgroundOptions = input<readonly ControlOption<LmnIconBackground>[]>([]);
  readonly backgroundToneOptions = input<readonly ToneOption[]>([]);
  readonly resultCount = input(0);
  readonly totalCount = input(0);

  resetDemo(): void {
    this.search.set('');
    this.category.set('all');
    this.size.set(24);
    this.strokeWidth.set(2);
    this.animate.set(false);
    this.tone.set('inherit');
    this.variant.set('outline');
    this.background.set('none');
    this.backgroundTone.set('primary');
    this.padding.set(8);
    this.radius.set(10);
  }
}
