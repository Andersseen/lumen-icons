import type { InputSignal, Type } from '@angular/core';

import { LmnAlertCircleIcon } from '@lumen/icons/alert-circle';
import { LmnArrowLeftIcon } from '@lumen/icons/arrow-left';
import { LmnArrowRightIcon } from '@lumen/icons/arrow-right';
import { LmnAvatarIcon } from '@lumen/icons/avatar';
import { LmnBadgeIcon } from '@lumen/icons/badge';
import { LmnBoldIcon } from '@lumen/icons/bold';
import { LmnCheckIcon } from '@lumen/icons/check';
import { LmnCheckboxIcon } from '@lumen/icons/checkbox';
import { LmnChevronDownIcon } from '@lumen/icons/chevron-down';
import { LmnChevronRightIcon } from '@lumen/icons/chevron-right';
import { LmnCopyIcon } from '@lumen/icons/copy';
import { LmnExternalLinkIcon } from '@lumen/icons/external-link';
import { LmnGithubIcon } from '@lumen/icons/github';
import { LmnHeartIcon } from '@lumen/icons/heart';
import { LmnHomeIcon } from '@lumen/icons/home';
import { LmnInfoIcon } from '@lumen/icons/info';
import { LmnItalicIcon } from '@lumen/icons/italic';
import { LmnMailIcon } from '@lumen/icons/mail';
import { LmnMenuIcon } from '@lumen/icons/menu';
import { LmnMoonIcon } from '@lumen/icons/moon';
import { LmnMoreVerticalIcon } from '@lumen/icons/more-vertical';
import { LmnPaperclipIcon } from '@lumen/icons/paperclip';
import { LmnPlusIcon } from '@lumen/icons/plus';
import { LmnRadioIcon } from '@lumen/icons/radio';
import { LmnSearchIcon } from '@lumen/icons/search';
import { LmnSettingsIcon } from '@lumen/icons/settings';
import { LmnSmileIcon } from '@lumen/icons/smile';
import { LmnSparklesIcon } from '@lumen/icons/sparkles';
import { LmnStarIcon } from '@lumen/icons/star';
import { LmnSunIcon } from '@lumen/icons/sun';
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
    name: 'alert-circle',
    selector: 'lmn-alert-circle',
    component: LmnAlertCircleIcon,
    importStr: "import { LmnAlertCircleIcon } from '@lumen/icons/alert-circle';",
  },
  {
    name: 'arrow-left',
    selector: 'lmn-arrow-left',
    component: LmnArrowLeftIcon,
    importStr: "import { LmnArrowLeftIcon } from '@lumen/icons/arrow-left';",
  },
  {
    name: 'arrow-right',
    selector: 'lmn-arrow-right',
    component: LmnArrowRightIcon,
    importStr: "import { LmnArrowRightIcon } from '@lumen/icons/arrow-right';",
  },
  {
    name: 'avatar',
    selector: 'lmn-avatar',
    component: LmnAvatarIcon,
    importStr: "import { LmnAvatarIcon } from '@lumen/icons/avatar';",
  },
  {
    name: 'badge',
    selector: 'lmn-badge',
    component: LmnBadgeIcon,
    importStr: "import { LmnBadgeIcon } from '@lumen/icons/badge';",
  },
  {
    name: 'bold',
    selector: 'lmn-bold',
    component: LmnBoldIcon,
    importStr: "import { LmnBoldIcon } from '@lumen/icons/bold';",
  },
  {
    name: 'check',
    selector: 'lmn-check',
    component: LmnCheckIcon,
    importStr: "import { LmnCheckIcon } from '@lumen/icons/check';",
  },
  {
    name: 'checkbox',
    selector: 'lmn-checkbox',
    component: LmnCheckboxIcon,
    importStr: "import { LmnCheckboxIcon } from '@lumen/icons/checkbox';",
  },
  {
    name: 'chevron-down',
    selector: 'lmn-chevron-down',
    component: LmnChevronDownIcon,
    importStr: "import { LmnChevronDownIcon } from '@lumen/icons/chevron-down';",
  },
  {
    name: 'chevron-right',
    selector: 'lmn-chevron-right',
    component: LmnChevronRightIcon,
    importStr: "import { LmnChevronRightIcon } from '@lumen/icons/chevron-right';",
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
  {
    name: 'github',
    selector: 'lmn-github',
    component: LmnGithubIcon as unknown as Type<LumenIconInstance>,
    importStr: "import { LmnGithubIcon } from '@lumen/icons/github';",
  },
  {
    name: 'heart',
    selector: 'lmn-heart',
    component: LmnHeartIcon,
    importStr: "import { LmnHeartIcon } from '@lumen/icons/heart';",
  },
  {
    name: 'home',
    selector: 'lmn-home',
    component: LmnHomeIcon,
    importStr: "import { LmnHomeIcon } from '@lumen/icons/home';",
  },
  {
    name: 'info',
    selector: 'lmn-info',
    component: LmnInfoIcon,
    importStr: "import { LmnInfoIcon } from '@lumen/icons/info';",
  },
  {
    name: 'italic',
    selector: 'lmn-italic',
    component: LmnItalicIcon,
    importStr: "import { LmnItalicIcon } from '@lumen/icons/italic';",
  },
  {
    name: 'mail',
    selector: 'lmn-mail',
    component: LmnMailIcon,
    importStr: "import { LmnMailIcon } from '@lumen/icons/mail';",
  },
  {
    name: 'menu',
    selector: 'lmn-menu',
    component: LmnMenuIcon,
    importStr: "import { LmnMenuIcon } from '@lumen/icons/menu';",
  },
  {
    name: 'moon',
    selector: 'lmn-moon',
    component: LmnMoonIcon,
    importStr: "import { LmnMoonIcon } from '@lumen/icons/moon';",
  },
  {
    name: 'more-vertical',
    selector: 'lmn-more-vertical',
    component: LmnMoreVerticalIcon,
    importStr: "import { LmnMoreVerticalIcon } from '@lumen/icons/more-vertical';",
  },
  {
    name: 'paperclip',
    selector: 'lmn-paperclip',
    component: LmnPaperclipIcon,
    importStr: "import { LmnPaperclipIcon } from '@lumen/icons/paperclip';",
  },
  {
    name: 'plus',
    selector: 'lmn-plus',
    component: LmnPlusIcon,
    importStr: "import { LmnPlusIcon } from '@lumen/icons/plus';",
  },
  {
    name: 'radio',
    selector: 'lmn-radio',
    component: LmnRadioIcon,
    importStr: "import { LmnRadioIcon } from '@lumen/icons/radio';",
  },
  {
    name: 'search',
    selector: 'lmn-search',
    component: LmnSearchIcon,
    importStr: "import { LmnSearchIcon } from '@lumen/icons/search';",
  },
  {
    name: 'settings',
    selector: 'lmn-settings',
    component: LmnSettingsIcon,
    importStr: "import { LmnSettingsIcon } from '@lumen/icons/settings';",
  },
  {
    name: 'smile',
    selector: 'lmn-smile',
    component: LmnSmileIcon,
    importStr: "import { LmnSmileIcon } from '@lumen/icons/smile';",
  },
  {
    name: 'sparkles',
    selector: 'lmn-sparkles',
    component: LmnSparklesIcon,
    importStr: "import { LmnSparklesIcon } from '@lumen/icons/sparkles';",
  },
  {
    name: 'star',
    selector: 'lmn-star',
    component: LmnStarIcon,
    importStr: "import { LmnStarIcon } from '@lumen/icons/star';",
  },
  {
    name: 'sun',
    selector: 'lmn-sun',
    component: LmnSunIcon,
    importStr: "import { LmnSunIcon } from '@lumen/icons/sun';",
  },
  {
    name: 'x',
    selector: 'lmn-x',
    component: LmnXIcon,
    importStr: "import { LmnXIcon } from '@lumen/icons/x';",
  },
] as const;
