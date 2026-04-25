import type { InputSignal, Type } from '@angular/core';

import { LmnAlertCircleIcon } from '@lumen/icons/alert-circle';
import { LmnArrowLeftIcon } from '@lumen/icons/arrow-left';
import { LmnArrowRightIcon } from '@lumen/icons/arrow-right';
import { LmnCheckIcon } from '@lumen/icons/check';
import { LmnCopyIcon } from '@lumen/icons/copy';
import { LmnExternalLinkIcon } from '@lumen/icons/external-link';
import { LmnHeartIcon } from '@lumen/icons/heart';
import { LmnInfoIcon } from '@lumen/icons/info';
import { LmnMenuIcon } from '@lumen/icons/menu';
import { LmnSearchIcon } from '@lumen/icons/search';
import { LmnStarIcon } from '@lumen/icons/star';
import { LmnXIcon } from '@lumen/icons/x';
import type { LmnIconAnimate, LmnIconSize } from '@lumen/icons';

export interface LumenIconInstance {
  readonly size: InputSignal<LmnIconSize>;
  readonly strokeWidth: InputSignal<number>;
  readonly ariaLabel: InputSignal<string | undefined>;
  readonly animate: InputSignal<LmnIconAnimate>;
}

export interface IconEntry {
  readonly name: string;
  readonly selector: string;
  readonly component: Type<LumenIconInstance>;
  readonly importStr: string;
}

export const ICON_CATALOG: IconEntry[] = [
  {
    name: 'check',
    selector: 'lmn-check',
    component: LmnCheckIcon,
    importStr: "import { LmnCheckIcon } from '@lumen/icons/check';",
  },
  {
    name: 'x',
    selector: 'lmn-x',
    component: LmnXIcon,
    importStr: "import { LmnXIcon } from '@lumen/icons/x';",
  },
  {
    name: 'arrow-right',
    selector: 'lmn-arrow-right',
    component: LmnArrowRightIcon,
    importStr: "import { LmnArrowRightIcon } from '@lumen/icons/arrow-right';",
  },
  {
    name: 'arrow-left',
    selector: 'lmn-arrow-left',
    component: LmnArrowLeftIcon,
    importStr: "import { LmnArrowLeftIcon } from '@lumen/icons/arrow-left';",
  },
  {
    name: 'search',
    selector: 'lmn-search',
    component: LmnSearchIcon,
    importStr: "import { LmnSearchIcon } from '@lumen/icons/search';",
  },
  {
    name: 'menu',
    selector: 'lmn-menu',
    component: LmnMenuIcon,
    importStr: "import { LmnMenuIcon } from '@lumen/icons/menu';",
  },
  {
    name: 'alert-circle',
    selector: 'lmn-alert-circle',
    component: LmnAlertCircleIcon,
    importStr: "import { LmnAlertCircleIcon } from '@lumen/icons/alert-circle';",
  },
  {
    name: 'info',
    selector: 'lmn-info',
    component: LmnInfoIcon,
    importStr: "import { LmnInfoIcon } from '@lumen/icons/info';",
  },
  {
    name: 'star',
    selector: 'lmn-star',
    component: LmnStarIcon,
    importStr: "import { LmnStarIcon } from '@lumen/icons/star';",
  },
  {
    name: 'heart',
    selector: 'lmn-heart',
    component: LmnHeartIcon,
    importStr: "import { LmnHeartIcon } from '@lumen/icons/heart';",
  },
  {
    name: 'copy',
    selector: 'lmn-copy',
    component: LmnCopyIcon,
    importStr: "import { LmnCopyIcon } from '@lumen/icons/copy';",
  },
  {
    name: 'external-link',
    selector: 'lmn-external-link',
    component: LmnExternalLinkIcon,
    importStr: "import { LmnExternalLinkIcon } from '@lumen/icons/external-link';",
  },
] as const;
