import {
  ChangeDetectionStrategy,
  Component,
  type TemplateRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { LmnAdjustmentsHorizontalIcon } from 'lumen-icons/adjustments-horizontal';
import { LmnSearchIcon } from 'lumen-icons/search';
import {
  VoltBadge,
  VoltButton,
  VoltDrawer,
  VoltDrawerClose,
  VoltDrawerContent,
  VoltDrawerOverlay,
  VoltDrawerTitle,
  VoltSkeleton,
  VoltToast,
  VoltToastTitle,
  NgpToastManager,
} from '@voltui/components';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';

import { IconCardComponent } from '../components/icon-card';
import { IconControlsComponent } from '../components/icons/icon-controls';
import {
  BACKGROUND_OPTIONS,
  TONE_OPTIONS,
  VARIANT_OPTIONS,
} from '../components/icons/icon-control-options';
import { ICON_CATEGORY_LABELS, type IconCategory } from '../data/icon-metadata';
import { IconCatalogStore } from '../services/icon-catalog-store';

/** Icons per deferred chunk — big enough that scrolling never waits on a block. */
const CHUNK_SIZE = 60;

@Component({
  selector: 'app-icons',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [IconCatalogStore],
  imports: [
    LmnSearchIcon,
    LmnAdjustmentsHorizontalIcon,
    IconCardComponent,
    IconControlsComponent,
    VoltButton,
    VoltBadge,
    VoltDrawer,
    VoltDrawerOverlay,
    VoltDrawerContent,
    VoltDrawerTitle,
    VoltDrawerClose,
    VoltSkeleton,
    VoltToast,
    VoltToastTitle,
  VoltToastTitle,
    MOVEMENT_DIRECTIVES,
  ],
  templateUrl: './icons.page.html',
})
export default class IconsPageComponent {
  protected readonly store = inject(IconCatalogStore);

  private readonly toasts = inject(NgpToastManager);
  private readonly copyToast = viewChild.required<TemplateRef<void>>('copyToast');

  /** Held separately from the copy event: the toast manager owns dismissal. */
  protected readonly toastMessage = signal('');

  /**
   * Raised from the card's output, never from an `effect`: the toast manager
   * creates views imperatively and doing that inside a reactive context
   * deadlocks zoneless change detection.
   */
  protected showCopyToast(message: string): void {
    this.toastMessage.set(message);
    this.toasts.show(this.copyToast(), { placement: 'bottom-center', duration: 2400 });
  }

  protected readonly skeletonSlots = Array.from({ length: 10 });

  /**
   * The filtered catalog sliced into chunks so the grid can `@defer` each one.
   *
   * Rendering all 362 cards eagerly put ~6 700 nodes and a 14 000 px page into
   * the document on first paint.
   */
  protected readonly chunks = computed(() => {
    const icons = this.store.filteredIcons();
    const chunks: (typeof icons)[] = [];

    for (let i = 0; i < icons.length; i += CHUNK_SIZE) {
      chunks.push(icons.slice(i, i + CHUNK_SIZE));
    }

    return chunks;
  });

  protected readonly selectedCategoryLabel = computed(() =>
    this.store.category() === 'all'
      ? 'All categories'
      : this.store.categoryLabel(this.store.category() as IconCategory),
  );

  protected readonly summaryChips = computed(() => {
    const store = this.store;
    const tone = TONE_OPTIONS.find(option => option.value === store.tone());
    const variant = VARIANT_OPTIONS.find(option => option.value === store.variant());
    const background = BACKGROUND_OPTIONS.find(option => option.value === store.background());
    const radius = store.radius();

    const chips = [
      this.selectedCategoryLabel(),
      `${store.size()}px`,
      `${store.strokeWidth()} stroke`,
      store.background() === 'solid' ? 'Auto foreground' : (tone?.label ?? 'Inherit'),
      variant?.label ?? 'Outline',
      `${background?.label ?? 'None'} bg`,
    ];

    if (store.padding() > 0 && store.background() !== 'none') {
      chips.push(`${store.padding()}px pad`);
    }
    chips.push(`${typeof radius === 'number' ? `${radius}px` : radius} radius`);

    return chips;
  });

  protected categoryLabel(category: IconCategory): string {
    return ICON_CATEGORY_LABELS[category];
  }
}
