import type { Type } from '@angular/core';

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
import type { LmnIconInstance } from '@lumen/icons';

export interface IconEntry {
  readonly name: string;
  readonly selector: string;
  readonly component: Type<LmnIconInstance>;
  readonly importStr: string;
}

export const ICON_CATALOG: IconEntry[] = [
  {
    name: 'alert-circle',
    selector: 'lmn-alert-circle',
    component: LmnAlertCircleIcon as Type<LmnIconInstance>,
    importStr: "import { LmnAlertCircleIcon } from '@lumen/icons/alert-circle';",
  },
  {
    name: 'arrow-left',
    selector: 'lmn-arrow-left',
    component: LmnArrowLeftIcon as Type<LmnIconInstance>,
    importStr: "import { LmnArrowLeftIcon } from '@lumen/icons/arrow-left';",
  },
  {
    name: 'arrow-right',
    selector: 'lmn-arrow-right',
    component: LmnArrowRightIcon as Type<LmnIconInstance>,
    importStr: "import { LmnArrowRightIcon } from '@lumen/icons/arrow-right';",
  },
  {
    name: 'avatar',
    selector: 'lmn-avatar',
    component: LmnAvatarIcon as Type<LmnIconInstance>,
    importStr: "import { LmnAvatarIcon } from '@lumen/icons/avatar';",
  },
  {
    name: 'badge',
    selector: 'lmn-badge',
    component: LmnBadgeIcon as Type<LmnIconInstance>,
    importStr: "import { LmnBadgeIcon } from '@lumen/icons/badge';",
  },
  {
    name: 'bold',
    selector: 'lmn-bold',
    component: LmnBoldIcon as Type<LmnIconInstance>,
    importStr: "import { LmnBoldIcon } from '@lumen/icons/bold';",
  },
  {
    name: 'check',
    selector: 'lmn-check',
    component: LmnCheckIcon as Type<LmnIconInstance>,
    importStr: "import { LmnCheckIcon } from '@lumen/icons/check';",
  },
  {
    name: 'checkbox',
    selector: 'lmn-checkbox',
    component: LmnCheckboxIcon as Type<LmnIconInstance>,
    importStr: "import { LmnCheckboxIcon } from '@lumen/icons/checkbox';",
  },
  {
    name: 'chevron-down',
    selector: 'lmn-chevron-down',
    component: LmnChevronDownIcon as Type<LmnIconInstance>,
    importStr: "import { LmnChevronDownIcon } from '@lumen/icons/chevron-down';",
  },
  {
    name: 'chevron-right',
    selector: 'lmn-chevron-right',
    component: LmnChevronRightIcon as Type<LmnIconInstance>,
    importStr: "import { LmnChevronRightIcon } from '@lumen/icons/chevron-right';",
  },
  {
    name: 'copy',
    selector: 'lmn-copy',
    component: LmnCopyIcon as Type<LmnIconInstance>,
    importStr: "import { LmnCopyIcon } from '@lumen/icons/copy';",
  },
  {
    name: 'external-link',
    selector: 'lmn-external-link',
    component: LmnExternalLinkIcon as Type<LmnIconInstance>,
    importStr: "import { LmnExternalLinkIcon } from '@lumen/icons/external-link';",
  },
  {
    name: 'github',
    selector: 'lmn-github',
    component: LmnGithubIcon as Type<LmnIconInstance>,
    importStr: "import { LmnGithubIcon } from '@lumen/icons/github';",
  },
  {
    name: 'heart',
    selector: 'lmn-heart',
    component: LmnHeartIcon as Type<LmnIconInstance>,
    importStr: "import { LmnHeartIcon } from '@lumen/icons/heart';",
  },
  {
    name: 'home',
    selector: 'lmn-home',
    component: LmnHomeIcon as Type<LmnIconInstance>,
    importStr: "import { LmnHomeIcon } from '@lumen/icons/home';",
  },
  {
    name: 'info',
    selector: 'lmn-info',
    component: LmnInfoIcon as Type<LmnIconInstance>,
    importStr: "import { LmnInfoIcon } from '@lumen/icons/info';",
  },
  {
    name: 'italic',
    selector: 'lmn-italic',
    component: LmnItalicIcon as Type<LmnIconInstance>,
    importStr: "import { LmnItalicIcon } from '@lumen/icons/italic';",
  },
  {
    name: 'mail',
    selector: 'lmn-mail',
    component: LmnMailIcon as Type<LmnIconInstance>,
    importStr: "import { LmnMailIcon } from '@lumen/icons/mail';",
  },
  {
    name: 'menu',
    selector: 'lmn-menu',
    component: LmnMenuIcon as Type<LmnIconInstance>,
    importStr: "import { LmnMenuIcon } from '@lumen/icons/menu';",
  },
  {
    name: 'moon',
    selector: 'lmn-moon',
    component: LmnMoonIcon as Type<LmnIconInstance>,
    importStr: "import { LmnMoonIcon } from '@lumen/icons/moon';",
  },
  {
    name: 'more-vertical',
    selector: 'lmn-more-vertical',
    component: LmnMoreVerticalIcon as Type<LmnIconInstance>,
    importStr: "import { LmnMoreVerticalIcon } from '@lumen/icons/more-vertical';",
  },
  {
    name: 'paperclip',
    selector: 'lmn-paperclip',
    component: LmnPaperclipIcon as Type<LmnIconInstance>,
    importStr: "import { LmnPaperclipIcon } from '@lumen/icons/paperclip';",
  },
  {
    name: 'plus',
    selector: 'lmn-plus',
    component: LmnPlusIcon as Type<LmnIconInstance>,
    importStr: "import { LmnPlusIcon } from '@lumen/icons/plus';",
  },
  {
    name: 'radio',
    selector: 'lmn-radio',
    component: LmnRadioIcon as Type<LmnIconInstance>,
    importStr: "import { LmnRadioIcon } from '@lumen/icons/radio';",
  },
  {
    name: 'search',
    selector: 'lmn-search',
    component: LmnSearchIcon as Type<LmnIconInstance>,
    importStr: "import { LmnSearchIcon } from '@lumen/icons/search';",
  },
  {
    name: 'settings',
    selector: 'lmn-settings',
    component: LmnSettingsIcon as Type<LmnIconInstance>,
    importStr: "import { LmnSettingsIcon } from '@lumen/icons/settings';",
  },
  {
    name: 'smile',
    selector: 'lmn-smile',
    component: LmnSmileIcon as Type<LmnIconInstance>,
    importStr: "import { LmnSmileIcon } from '@lumen/icons/smile';",
  },
  {
    name: 'sparkles',
    selector: 'lmn-sparkles',
    component: LmnSparklesIcon as Type<LmnIconInstance>,
    importStr: "import { LmnSparklesIcon } from '@lumen/icons/sparkles';",
  },
  {
    name: 'star',
    selector: 'lmn-star',
    component: LmnStarIcon as Type<LmnIconInstance>,
    importStr: "import { LmnStarIcon } from '@lumen/icons/star';",
  },
  {
    name: 'sun',
    selector: 'lmn-sun',
    component: LmnSunIcon as Type<LmnIconInstance>,
    importStr: "import { LmnSunIcon } from '@lumen/icons/sun';",
  },
  {
    name: 'x',
    selector: 'lmn-x',
    component: LmnXIcon as Type<LmnIconInstance>,
    importStr: "import { LmnXIcon } from '@lumen/icons/x';",
  },
] as const;
