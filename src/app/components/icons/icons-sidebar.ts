import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import type { LmnIconAnimate, LmnIconSize } from '@lumen/icons';
import { VoltInput, VoltSlider } from '@voltui/components';

import { AnimationPickerComponent } from '../shared/animation-picker';
import { SizePickerComponent } from '../shared/size-picker';

@Component({
  selector: 'app-icons-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VoltInput, VoltSlider, SizePickerComponent, AnimationPickerComponent],
  templateUrl:'./icons-sidebar.html'
})
export class IconsSidebarComponent {
  readonly search = model('');
  readonly size = model<LmnIconSize>(24);
  readonly strokeWidth = model(2);
  readonly animate = model<LmnIconAnimate>('none');
}
