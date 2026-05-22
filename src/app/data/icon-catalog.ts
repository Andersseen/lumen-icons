import type { Type } from '@angular/core';

import { LmnAlertCircleIcon } from '@lumen/icons/alert-circle';
import { LmnArrowLeftIcon } from '@lumen/icons/arrow-left';
import { LmnArrowRightIcon } from '@lumen/icons/arrow-right';
import { LmnAvatarIcon } from '@lumen/icons/avatar';
import { LmnBadgeIcon } from '@lumen/icons/badge';
import { LmnBellIcon } from '@lumen/icons/bell';
import { LmnBoldIcon } from '@lumen/icons/bold';
import { LmnCalendarIcon } from '@lumen/icons/calendar';
import { LmnCameraIcon } from '@lumen/icons/camera';
import { LmnCheckIcon } from '@lumen/icons/check';
import { LmnCheckboxIcon } from '@lumen/icons/checkbox';
import { LmnChevronDownIcon } from '@lumen/icons/chevron-down';
import { LmnChevronRightIcon } from '@lumen/icons/chevron-right';
import { LmnClockIcon } from '@lumen/icons/clock';
import { LmnCopyIcon } from '@lumen/icons/copy';
import { LmnDownloadIcon } from '@lumen/icons/download';
import { LmnEditIcon } from '@lumen/icons/edit';
import { LmnExternalLinkIcon } from '@lumen/icons/external-link';
import { LmnEyeIcon } from '@lumen/icons/eye';
import { LmnFileIcon } from '@lumen/icons/file';
import { LmnFolderIcon } from '@lumen/icons/folder';
import { LmnGithubIcon } from '@lumen/icons/github';
import { LmnHeartIcon } from '@lumen/icons/heart';
import { LmnHomeIcon } from '@lumen/icons/home';
import { LmnImageIcon } from '@lumen/icons/image';
import { LmnInfoIcon } from '@lumen/icons/info';
import { LmnItalicIcon } from '@lumen/icons/italic';
import { LmnLinkIcon } from '@lumen/icons/link';
import { LmnLockIcon } from '@lumen/icons/lock';
import { LmnMailIcon } from '@lumen/icons/mail';
import { LmnMapPinIcon } from '@lumen/icons/map-pin';
import { LmnMenuIcon } from '@lumen/icons/menu';
import { LmnMoonIcon } from '@lumen/icons/moon';
import { LmnMoreVerticalIcon } from '@lumen/icons/more-vertical';
import { LmnPaperclipIcon } from '@lumen/icons/paperclip';
import { LmnPhoneIcon } from '@lumen/icons/phone';
import { LmnPlusIcon } from '@lumen/icons/plus';
import { LmnRadioIcon } from '@lumen/icons/radio';
import { LmnSearchIcon } from '@lumen/icons/search';
import { LmnSettingsIcon } from '@lumen/icons/settings';
import { LmnShareIcon } from '@lumen/icons/share';
import { LmnShieldIcon } from '@lumen/icons/shield';
import { LmnSmileIcon } from '@lumen/icons/smile';
import { LmnSparklesIcon } from '@lumen/icons/sparkles';
import { LmnStarIcon } from '@lumen/icons/star';
import { LmnSunIcon } from '@lumen/icons/sun';
import { LmnTrashIcon } from '@lumen/icons/trash';
import { LmnUploadIcon } from '@lumen/icons/upload';
import { LmnUserIcon } from '@lumen/icons/user';
import { LmnXIcon } from '@lumen/icons/x';
import { LmnZapIcon } from '@lumen/icons/zap';
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
    name: 'bell',
    selector: 'lmn-bell',
    component: LmnBellIcon as Type<LmnIconInstance>,
    importStr: "import { LmnBellIcon } from '@lumen/icons/bell';",
  },
  {
    name: 'bold',
    selector: 'lmn-bold',
    component: LmnBoldIcon as Type<LmnIconInstance>,
    importStr: "import { LmnBoldIcon } from '@lumen/icons/bold';",
  },
  {
    name: 'calendar',
    selector: 'lmn-calendar',
    component: LmnCalendarIcon as Type<LmnIconInstance>,
    importStr: "import { LmnCalendarIcon } from '@lumen/icons/calendar';",
  },
  {
    name: 'camera',
    selector: 'lmn-camera',
    component: LmnCameraIcon as Type<LmnIconInstance>,
    importStr: "import { LmnCameraIcon } from '@lumen/icons/camera';",
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
    name: 'clock',
    selector: 'lmn-clock',
    component: LmnClockIcon as Type<LmnIconInstance>,
    importStr: "import { LmnClockIcon } from '@lumen/icons/clock';",
  },
  {
    name: 'copy',
    selector: 'lmn-copy',
    component: LmnCopyIcon as Type<LmnIconInstance>,
    importStr: "import { LmnCopyIcon } from '@lumen/icons/copy';",
  },
  {
    name: 'download',
    selector: 'lmn-download',
    component: LmnDownloadIcon as Type<LmnIconInstance>,
    importStr: "import { LmnDownloadIcon } from '@lumen/icons/download';",
  },
  {
    name: 'edit',
    selector: 'lmn-edit',
    component: LmnEditIcon as Type<LmnIconInstance>,
    importStr: "import { LmnEditIcon } from '@lumen/icons/edit';",
  },
  {
    name: 'external-link',
    selector: 'lmn-external-link',
    component: LmnExternalLinkIcon as Type<LmnIconInstance>,
    importStr: "import { LmnExternalLinkIcon } from '@lumen/icons/external-link';",
  },
  {
    name: 'eye',
    selector: 'lmn-eye',
    component: LmnEyeIcon as Type<LmnIconInstance>,
    importStr: "import { LmnEyeIcon } from '@lumen/icons/eye';",
  },
  {
    name: 'file',
    selector: 'lmn-file',
    component: LmnFileIcon as Type<LmnIconInstance>,
    importStr: "import { LmnFileIcon } from '@lumen/icons/file';",
  },
  {
    name: 'folder',
    selector: 'lmn-folder',
    component: LmnFolderIcon as Type<LmnIconInstance>,
    importStr: "import { LmnFolderIcon } from '@lumen/icons/folder';",
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
    name: 'image',
    selector: 'lmn-image',
    component: LmnImageIcon as Type<LmnIconInstance>,
    importStr: "import { LmnImageIcon } from '@lumen/icons/image';",
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
    name: 'link',
    selector: 'lmn-link',
    component: LmnLinkIcon as Type<LmnIconInstance>,
    importStr: "import { LmnLinkIcon } from '@lumen/icons/link';",
  },
  {
    name: 'lock',
    selector: 'lmn-lock',
    component: LmnLockIcon as Type<LmnIconInstance>,
    importStr: "import { LmnLockIcon } from '@lumen/icons/lock';",
  },
  {
    name: 'mail',
    selector: 'lmn-mail',
    component: LmnMailIcon as Type<LmnIconInstance>,
    importStr: "import { LmnMailIcon } from '@lumen/icons/mail';",
  },
  {
    name: 'map-pin',
    selector: 'lmn-map-pin',
    component: LmnMapPinIcon as Type<LmnIconInstance>,
    importStr: "import { LmnMapPinIcon } from '@lumen/icons/map-pin';",
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
    name: 'phone',
    selector: 'lmn-phone',
    component: LmnPhoneIcon as Type<LmnIconInstance>,
    importStr: "import { LmnPhoneIcon } from '@lumen/icons/phone';",
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
    name: 'share',
    selector: 'lmn-share',
    component: LmnShareIcon as Type<LmnIconInstance>,
    importStr: "import { LmnShareIcon } from '@lumen/icons/share';",
  },
  {
    name: 'shield',
    selector: 'lmn-shield',
    component: LmnShieldIcon as Type<LmnIconInstance>,
    importStr: "import { LmnShieldIcon } from '@lumen/icons/shield';",
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
    name: 'trash',
    selector: 'lmn-trash',
    component: LmnTrashIcon as Type<LmnIconInstance>,
    importStr: "import { LmnTrashIcon } from '@lumen/icons/trash';",
  },
  {
    name: 'upload',
    selector: 'lmn-upload',
    component: LmnUploadIcon as Type<LmnIconInstance>,
    importStr: "import { LmnUploadIcon } from '@lumen/icons/upload';",
  },
  {
    name: 'user',
    selector: 'lmn-user',
    component: LmnUserIcon as Type<LmnIconInstance>,
    importStr: "import { LmnUserIcon } from '@lumen/icons/user';",
  },
  {
    name: 'x',
    selector: 'lmn-x',
    component: LmnXIcon as Type<LmnIconInstance>,
    importStr: "import { LmnXIcon } from '@lumen/icons/x';",
  },
  {
    name: 'zap',
    selector: 'lmn-zap',
    component: LmnZapIcon as Type<LmnIconInstance>,
    importStr: "import { LmnZapIcon } from '@lumen/icons/zap';",
  },
] as const;
