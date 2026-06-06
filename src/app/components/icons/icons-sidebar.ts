import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import type { LmnIconSize } from '@lumen/icons';
import { VoltInput, VoltSlider } from '@voltui/components';

import { AnimationPickerComponent } from '../shared/animation-picker';
import { SizePickerComponent } from '../shared/size-picker';
import type { IconCategory } from '../../data/icon-metadata';

type CategoryFilter = IconCategory | 'all';

interface CategoryFilterOption {
  readonly value: CategoryFilter;
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
  readonly categories = input<readonly CategoryFilterOption[]>([]);
  readonly resultCount = input(0);
  readonly totalCount = input(0);
}
