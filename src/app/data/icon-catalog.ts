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
import { ICON_METADATA, type IconCategory } from './icon-metadata';

export interface IconEntry {
  readonly name: string;
  readonly selector: string;
  readonly component: Type<LmnIconInstance>;
  readonly importStr: string;
  readonly selectorStr: string;
  readonly exampleStr: string;
  readonly category: IconCategory;
  readonly aliases: readonly string[];
}

export const ICON_CATALOG: IconEntry[] = [
  {
    name: 'alert-circle',
    selector: 'lmn-alert-circle',
    component: LmnAlertCircleIcon as Type<LmnIconInstance>,
    importStr: "import { LmnAlertCircleIcon } from '@lumen/icons/alert-circle';",
    selectorStr: '<lmn-alert-circle ariaLabel="alert-circle" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnAlertCircleIcon } from '@lumen/icons/alert-circle';

@Component({
  selector: 'app-example',
  imports: [LmnAlertCircleIcon],
  template: '<lmn-alert-circle ariaLabel="alert-circle" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['alert-circle']?.category ?? 'system',
    aliases: ICON_METADATA['alert-circle']?.aliases ?? [],
  },
  {
    name: 'arrow-left',
    selector: 'lmn-arrow-left',
    component: LmnArrowLeftIcon as Type<LmnIconInstance>,
    importStr: "import { LmnArrowLeftIcon } from '@lumen/icons/arrow-left';",
    selectorStr: '<lmn-arrow-left ariaLabel="arrow-left" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnArrowLeftIcon } from '@lumen/icons/arrow-left';

@Component({
  selector: 'app-example',
  imports: [LmnArrowLeftIcon],
  template: '<lmn-arrow-left ariaLabel="arrow-left" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['arrow-left']?.category ?? 'system',
    aliases: ICON_METADATA['arrow-left']?.aliases ?? [],
  },
  {
    name: 'arrow-right',
    selector: 'lmn-arrow-right',
    component: LmnArrowRightIcon as Type<LmnIconInstance>,
    importStr: "import { LmnArrowRightIcon } from '@lumen/icons/arrow-right';",
    selectorStr: '<lmn-arrow-right ariaLabel="arrow-right" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnArrowRightIcon } from '@lumen/icons/arrow-right';

@Component({
  selector: 'app-example',
  imports: [LmnArrowRightIcon],
  template: '<lmn-arrow-right ariaLabel="arrow-right" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['arrow-right']?.category ?? 'system',
    aliases: ICON_METADATA['arrow-right']?.aliases ?? [],
  },
  {
    name: 'avatar',
    selector: 'lmn-avatar',
    component: LmnAvatarIcon as Type<LmnIconInstance>,
    importStr: "import { LmnAvatarIcon } from '@lumen/icons/avatar';",
    selectorStr: '<lmn-avatar ariaLabel="avatar" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnAvatarIcon } from '@lumen/icons/avatar';

@Component({
  selector: 'app-example',
  imports: [LmnAvatarIcon],
  template: '<lmn-avatar ariaLabel="avatar" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['avatar']?.category ?? 'system',
    aliases: ICON_METADATA['avatar']?.aliases ?? [],
  },
  {
    name: 'badge',
    selector: 'lmn-badge',
    component: LmnBadgeIcon as Type<LmnIconInstance>,
    importStr: "import { LmnBadgeIcon } from '@lumen/icons/badge';",
    selectorStr: '<lmn-badge ariaLabel="badge" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnBadgeIcon } from '@lumen/icons/badge';

@Component({
  selector: 'app-example',
  imports: [LmnBadgeIcon],
  template: '<lmn-badge ariaLabel="badge" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['badge']?.category ?? 'system',
    aliases: ICON_METADATA['badge']?.aliases ?? [],
  },
  {
    name: 'bell',
    selector: 'lmn-bell',
    component: LmnBellIcon as Type<LmnIconInstance>,
    importStr: "import { LmnBellIcon } from '@lumen/icons/bell';",
    selectorStr: '<lmn-bell ariaLabel="bell" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnBellIcon } from '@lumen/icons/bell';

@Component({
  selector: 'app-example',
  imports: [LmnBellIcon],
  template: '<lmn-bell ariaLabel="bell" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['bell']?.category ?? 'system',
    aliases: ICON_METADATA['bell']?.aliases ?? [],
  },
  {
    name: 'bold',
    selector: 'lmn-bold',
    component: LmnBoldIcon as Type<LmnIconInstance>,
    importStr: "import { LmnBoldIcon } from '@lumen/icons/bold';",
    selectorStr: '<lmn-bold ariaLabel="bold" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnBoldIcon } from '@lumen/icons/bold';

@Component({
  selector: 'app-example',
  imports: [LmnBoldIcon],
  template: '<lmn-bold ariaLabel="bold" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['bold']?.category ?? 'system',
    aliases: ICON_METADATA['bold']?.aliases ?? [],
  },
  {
    name: 'calendar',
    selector: 'lmn-calendar',
    component: LmnCalendarIcon as Type<LmnIconInstance>,
    importStr: "import { LmnCalendarIcon } from '@lumen/icons/calendar';",
    selectorStr: '<lmn-calendar ariaLabel="calendar" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnCalendarIcon } from '@lumen/icons/calendar';

@Component({
  selector: 'app-example',
  imports: [LmnCalendarIcon],
  template: '<lmn-calendar ariaLabel="calendar" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['calendar']?.category ?? 'system',
    aliases: ICON_METADATA['calendar']?.aliases ?? [],
  },
  {
    name: 'camera',
    selector: 'lmn-camera',
    component: LmnCameraIcon as Type<LmnIconInstance>,
    importStr: "import { LmnCameraIcon } from '@lumen/icons/camera';",
    selectorStr: '<lmn-camera ariaLabel="camera" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnCameraIcon } from '@lumen/icons/camera';

@Component({
  selector: 'app-example',
  imports: [LmnCameraIcon],
  template: '<lmn-camera ariaLabel="camera" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['camera']?.category ?? 'system',
    aliases: ICON_METADATA['camera']?.aliases ?? [],
  },
  {
    name: 'check',
    selector: 'lmn-check',
    component: LmnCheckIcon as Type<LmnIconInstance>,
    importStr: "import { LmnCheckIcon } from '@lumen/icons/check';",
    selectorStr: '<lmn-check ariaLabel="check" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnCheckIcon } from '@lumen/icons/check';

@Component({
  selector: 'app-example',
  imports: [LmnCheckIcon],
  template: '<lmn-check ariaLabel="check" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['check']?.category ?? 'system',
    aliases: ICON_METADATA['check']?.aliases ?? [],
  },
  {
    name: 'checkbox',
    selector: 'lmn-checkbox',
    component: LmnCheckboxIcon as Type<LmnIconInstance>,
    importStr: "import { LmnCheckboxIcon } from '@lumen/icons/checkbox';",
    selectorStr: '<lmn-checkbox ariaLabel="checkbox" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnCheckboxIcon } from '@lumen/icons/checkbox';

@Component({
  selector: 'app-example',
  imports: [LmnCheckboxIcon],
  template: '<lmn-checkbox ariaLabel="checkbox" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['checkbox']?.category ?? 'system',
    aliases: ICON_METADATA['checkbox']?.aliases ?? [],
  },
  {
    name: 'chevron-down',
    selector: 'lmn-chevron-down',
    component: LmnChevronDownIcon as Type<LmnIconInstance>,
    importStr: "import { LmnChevronDownIcon } from '@lumen/icons/chevron-down';",
    selectorStr: '<lmn-chevron-down ariaLabel="chevron-down" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnChevronDownIcon } from '@lumen/icons/chevron-down';

@Component({
  selector: 'app-example',
  imports: [LmnChevronDownIcon],
  template: '<lmn-chevron-down ariaLabel="chevron-down" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['chevron-down']?.category ?? 'system',
    aliases: ICON_METADATA['chevron-down']?.aliases ?? [],
  },
  {
    name: 'chevron-right',
    selector: 'lmn-chevron-right',
    component: LmnChevronRightIcon as Type<LmnIconInstance>,
    importStr: "import { LmnChevronRightIcon } from '@lumen/icons/chevron-right';",
    selectorStr: '<lmn-chevron-right ariaLabel="chevron-right" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnChevronRightIcon } from '@lumen/icons/chevron-right';

@Component({
  selector: 'app-example',
  imports: [LmnChevronRightIcon],
  template: '<lmn-chevron-right ariaLabel="chevron-right" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['chevron-right']?.category ?? 'system',
    aliases: ICON_METADATA['chevron-right']?.aliases ?? [],
  },
  {
    name: 'clock',
    selector: 'lmn-clock',
    component: LmnClockIcon as Type<LmnIconInstance>,
    importStr: "import { LmnClockIcon } from '@lumen/icons/clock';",
    selectorStr: '<lmn-clock ariaLabel="clock" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnClockIcon } from '@lumen/icons/clock';

@Component({
  selector: 'app-example',
  imports: [LmnClockIcon],
  template: '<lmn-clock ariaLabel="clock" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['clock']?.category ?? 'system',
    aliases: ICON_METADATA['clock']?.aliases ?? [],
  },
  {
    name: 'copy',
    selector: 'lmn-copy',
    component: LmnCopyIcon as Type<LmnIconInstance>,
    importStr: "import { LmnCopyIcon } from '@lumen/icons/copy';",
    selectorStr: '<lmn-copy ariaLabel="copy" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnCopyIcon } from '@lumen/icons/copy';

@Component({
  selector: 'app-example',
  imports: [LmnCopyIcon],
  template: '<lmn-copy ariaLabel="copy" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['copy']?.category ?? 'system',
    aliases: ICON_METADATA['copy']?.aliases ?? [],
  },
  {
    name: 'download',
    selector: 'lmn-download',
    component: LmnDownloadIcon as Type<LmnIconInstance>,
    importStr: "import { LmnDownloadIcon } from '@lumen/icons/download';",
    selectorStr: '<lmn-download ariaLabel="download" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnDownloadIcon } from '@lumen/icons/download';

@Component({
  selector: 'app-example',
  imports: [LmnDownloadIcon],
  template: '<lmn-download ariaLabel="download" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['download']?.category ?? 'system',
    aliases: ICON_METADATA['download']?.aliases ?? [],
  },
  {
    name: 'edit',
    selector: 'lmn-edit',
    component: LmnEditIcon as Type<LmnIconInstance>,
    importStr: "import { LmnEditIcon } from '@lumen/icons/edit';",
    selectorStr: '<lmn-edit ariaLabel="edit" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnEditIcon } from '@lumen/icons/edit';

@Component({
  selector: 'app-example',
  imports: [LmnEditIcon],
  template: '<lmn-edit ariaLabel="edit" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['edit']?.category ?? 'system',
    aliases: ICON_METADATA['edit']?.aliases ?? [],
  },
  {
    name: 'external-link',
    selector: 'lmn-external-link',
    component: LmnExternalLinkIcon as Type<LmnIconInstance>,
    importStr: "import { LmnExternalLinkIcon } from '@lumen/icons/external-link';",
    selectorStr: '<lmn-external-link ariaLabel="external-link" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnExternalLinkIcon } from '@lumen/icons/external-link';

@Component({
  selector: 'app-example',
  imports: [LmnExternalLinkIcon],
  template: '<lmn-external-link ariaLabel="external-link" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['external-link']?.category ?? 'system',
    aliases: ICON_METADATA['external-link']?.aliases ?? [],
  },
  {
    name: 'eye',
    selector: 'lmn-eye',
    component: LmnEyeIcon as Type<LmnIconInstance>,
    importStr: "import { LmnEyeIcon } from '@lumen/icons/eye';",
    selectorStr: '<lmn-eye ariaLabel="eye" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnEyeIcon } from '@lumen/icons/eye';

@Component({
  selector: 'app-example',
  imports: [LmnEyeIcon],
  template: '<lmn-eye ariaLabel="eye" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['eye']?.category ?? 'system',
    aliases: ICON_METADATA['eye']?.aliases ?? [],
  },
  {
    name: 'file',
    selector: 'lmn-file',
    component: LmnFileIcon as Type<LmnIconInstance>,
    importStr: "import { LmnFileIcon } from '@lumen/icons/file';",
    selectorStr: '<lmn-file ariaLabel="file" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnFileIcon } from '@lumen/icons/file';

@Component({
  selector: 'app-example',
  imports: [LmnFileIcon],
  template: '<lmn-file ariaLabel="file" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['file']?.category ?? 'system',
    aliases: ICON_METADATA['file']?.aliases ?? [],
  },
  {
    name: 'folder',
    selector: 'lmn-folder',
    component: LmnFolderIcon as Type<LmnIconInstance>,
    importStr: "import { LmnFolderIcon } from '@lumen/icons/folder';",
    selectorStr: '<lmn-folder ariaLabel="folder" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnFolderIcon } from '@lumen/icons/folder';

@Component({
  selector: 'app-example',
  imports: [LmnFolderIcon],
  template: '<lmn-folder ariaLabel="folder" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['folder']?.category ?? 'system',
    aliases: ICON_METADATA['folder']?.aliases ?? [],
  },
  {
    name: 'github',
    selector: 'lmn-github',
    component: LmnGithubIcon as Type<LmnIconInstance>,
    importStr: "import { LmnGithubIcon } from '@lumen/icons/github';",
    selectorStr: '<lmn-github ariaLabel="github" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnGithubIcon } from '@lumen/icons/github';

@Component({
  selector: 'app-example',
  imports: [LmnGithubIcon],
  template: '<lmn-github ariaLabel="github" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['github']?.category ?? 'system',
    aliases: ICON_METADATA['github']?.aliases ?? [],
  },
  {
    name: 'heart',
    selector: 'lmn-heart',
    component: LmnHeartIcon as Type<LmnIconInstance>,
    importStr: "import { LmnHeartIcon } from '@lumen/icons/heart';",
    selectorStr: '<lmn-heart ariaLabel="heart" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnHeartIcon } from '@lumen/icons/heart';

@Component({
  selector: 'app-example',
  imports: [LmnHeartIcon],
  template: '<lmn-heart ariaLabel="heart" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['heart']?.category ?? 'system',
    aliases: ICON_METADATA['heart']?.aliases ?? [],
  },
  {
    name: 'home',
    selector: 'lmn-home',
    component: LmnHomeIcon as Type<LmnIconInstance>,
    importStr: "import { LmnHomeIcon } from '@lumen/icons/home';",
    selectorStr: '<lmn-home ariaLabel="home" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnHomeIcon } from '@lumen/icons/home';

@Component({
  selector: 'app-example',
  imports: [LmnHomeIcon],
  template: '<lmn-home ariaLabel="home" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['home']?.category ?? 'system',
    aliases: ICON_METADATA['home']?.aliases ?? [],
  },
  {
    name: 'image',
    selector: 'lmn-image',
    component: LmnImageIcon as Type<LmnIconInstance>,
    importStr: "import { LmnImageIcon } from '@lumen/icons/image';",
    selectorStr: '<lmn-image ariaLabel="image" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnImageIcon } from '@lumen/icons/image';

@Component({
  selector: 'app-example',
  imports: [LmnImageIcon],
  template: '<lmn-image ariaLabel="image" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['image']?.category ?? 'system',
    aliases: ICON_METADATA['image']?.aliases ?? [],
  },
  {
    name: 'info',
    selector: 'lmn-info',
    component: LmnInfoIcon as Type<LmnIconInstance>,
    importStr: "import { LmnInfoIcon } from '@lumen/icons/info';",
    selectorStr: '<lmn-info ariaLabel="info" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnInfoIcon } from '@lumen/icons/info';

@Component({
  selector: 'app-example',
  imports: [LmnInfoIcon],
  template: '<lmn-info ariaLabel="info" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['info']?.category ?? 'system',
    aliases: ICON_METADATA['info']?.aliases ?? [],
  },
  {
    name: 'italic',
    selector: 'lmn-italic',
    component: LmnItalicIcon as Type<LmnIconInstance>,
    importStr: "import { LmnItalicIcon } from '@lumen/icons/italic';",
    selectorStr: '<lmn-italic ariaLabel="italic" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnItalicIcon } from '@lumen/icons/italic';

@Component({
  selector: 'app-example',
  imports: [LmnItalicIcon],
  template: '<lmn-italic ariaLabel="italic" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['italic']?.category ?? 'system',
    aliases: ICON_METADATA['italic']?.aliases ?? [],
  },
  {
    name: 'link',
    selector: 'lmn-link',
    component: LmnLinkIcon as Type<LmnIconInstance>,
    importStr: "import { LmnLinkIcon } from '@lumen/icons/link';",
    selectorStr: '<lmn-link ariaLabel="link" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnLinkIcon } from '@lumen/icons/link';

@Component({
  selector: 'app-example',
  imports: [LmnLinkIcon],
  template: '<lmn-link ariaLabel="link" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['link']?.category ?? 'system',
    aliases: ICON_METADATA['link']?.aliases ?? [],
  },
  {
    name: 'lock',
    selector: 'lmn-lock',
    component: LmnLockIcon as Type<LmnIconInstance>,
    importStr: "import { LmnLockIcon } from '@lumen/icons/lock';",
    selectorStr: '<lmn-lock ariaLabel="lock" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnLockIcon } from '@lumen/icons/lock';

@Component({
  selector: 'app-example',
  imports: [LmnLockIcon],
  template: '<lmn-lock ariaLabel="lock" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['lock']?.category ?? 'system',
    aliases: ICON_METADATA['lock']?.aliases ?? [],
  },
  {
    name: 'mail',
    selector: 'lmn-mail',
    component: LmnMailIcon as Type<LmnIconInstance>,
    importStr: "import { LmnMailIcon } from '@lumen/icons/mail';",
    selectorStr: '<lmn-mail ariaLabel="mail" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnMailIcon } from '@lumen/icons/mail';

@Component({
  selector: 'app-example',
  imports: [LmnMailIcon],
  template: '<lmn-mail ariaLabel="mail" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['mail']?.category ?? 'system',
    aliases: ICON_METADATA['mail']?.aliases ?? [],
  },
  {
    name: 'map-pin',
    selector: 'lmn-map-pin',
    component: LmnMapPinIcon as Type<LmnIconInstance>,
    importStr: "import { LmnMapPinIcon } from '@lumen/icons/map-pin';",
    selectorStr: '<lmn-map-pin ariaLabel="map-pin" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnMapPinIcon } from '@lumen/icons/map-pin';

@Component({
  selector: 'app-example',
  imports: [LmnMapPinIcon],
  template: '<lmn-map-pin ariaLabel="map-pin" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['map-pin']?.category ?? 'system',
    aliases: ICON_METADATA['map-pin']?.aliases ?? [],
  },
  {
    name: 'menu',
    selector: 'lmn-menu',
    component: LmnMenuIcon as Type<LmnIconInstance>,
    importStr: "import { LmnMenuIcon } from '@lumen/icons/menu';",
    selectorStr: '<lmn-menu ariaLabel="menu" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnMenuIcon } from '@lumen/icons/menu';

@Component({
  selector: 'app-example',
  imports: [LmnMenuIcon],
  template: '<lmn-menu ariaLabel="menu" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['menu']?.category ?? 'system',
    aliases: ICON_METADATA['menu']?.aliases ?? [],
  },
  {
    name: 'moon',
    selector: 'lmn-moon',
    component: LmnMoonIcon as Type<LmnIconInstance>,
    importStr: "import { LmnMoonIcon } from '@lumen/icons/moon';",
    selectorStr: '<lmn-moon ariaLabel="moon" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnMoonIcon } from '@lumen/icons/moon';

@Component({
  selector: 'app-example',
  imports: [LmnMoonIcon],
  template: '<lmn-moon ariaLabel="moon" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['moon']?.category ?? 'system',
    aliases: ICON_METADATA['moon']?.aliases ?? [],
  },
  {
    name: 'more-vertical',
    selector: 'lmn-more-vertical',
    component: LmnMoreVerticalIcon as Type<LmnIconInstance>,
    importStr: "import { LmnMoreVerticalIcon } from '@lumen/icons/more-vertical';",
    selectorStr: '<lmn-more-vertical ariaLabel="more-vertical" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnMoreVerticalIcon } from '@lumen/icons/more-vertical';

@Component({
  selector: 'app-example',
  imports: [LmnMoreVerticalIcon],
  template: '<lmn-more-vertical ariaLabel="more-vertical" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['more-vertical']?.category ?? 'system',
    aliases: ICON_METADATA['more-vertical']?.aliases ?? [],
  },
  {
    name: 'paperclip',
    selector: 'lmn-paperclip',
    component: LmnPaperclipIcon as Type<LmnIconInstance>,
    importStr: "import { LmnPaperclipIcon } from '@lumen/icons/paperclip';",
    selectorStr: '<lmn-paperclip ariaLabel="paperclip" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnPaperclipIcon } from '@lumen/icons/paperclip';

@Component({
  selector: 'app-example',
  imports: [LmnPaperclipIcon],
  template: '<lmn-paperclip ariaLabel="paperclip" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['paperclip']?.category ?? 'system',
    aliases: ICON_METADATA['paperclip']?.aliases ?? [],
  },
  {
    name: 'phone',
    selector: 'lmn-phone',
    component: LmnPhoneIcon as Type<LmnIconInstance>,
    importStr: "import { LmnPhoneIcon } from '@lumen/icons/phone';",
    selectorStr: '<lmn-phone ariaLabel="phone" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnPhoneIcon } from '@lumen/icons/phone';

@Component({
  selector: 'app-example',
  imports: [LmnPhoneIcon],
  template: '<lmn-phone ariaLabel="phone" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['phone']?.category ?? 'system',
    aliases: ICON_METADATA['phone']?.aliases ?? [],
  },
  {
    name: 'plus',
    selector: 'lmn-plus',
    component: LmnPlusIcon as Type<LmnIconInstance>,
    importStr: "import { LmnPlusIcon } from '@lumen/icons/plus';",
    selectorStr: '<lmn-plus ariaLabel="plus" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnPlusIcon } from '@lumen/icons/plus';

@Component({
  selector: 'app-example',
  imports: [LmnPlusIcon],
  template: '<lmn-plus ariaLabel="plus" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['plus']?.category ?? 'system',
    aliases: ICON_METADATA['plus']?.aliases ?? [],
  },
  {
    name: 'radio',
    selector: 'lmn-radio',
    component: LmnRadioIcon as Type<LmnIconInstance>,
    importStr: "import { LmnRadioIcon } from '@lumen/icons/radio';",
    selectorStr: '<lmn-radio ariaLabel="radio" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnRadioIcon } from '@lumen/icons/radio';

@Component({
  selector: 'app-example',
  imports: [LmnRadioIcon],
  template: '<lmn-radio ariaLabel="radio" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['radio']?.category ?? 'system',
    aliases: ICON_METADATA['radio']?.aliases ?? [],
  },
  {
    name: 'search',
    selector: 'lmn-search',
    component: LmnSearchIcon as Type<LmnIconInstance>,
    importStr: "import { LmnSearchIcon } from '@lumen/icons/search';",
    selectorStr: '<lmn-search ariaLabel="search" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnSearchIcon } from '@lumen/icons/search';

@Component({
  selector: 'app-example',
  imports: [LmnSearchIcon],
  template: '<lmn-search ariaLabel="search" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['search']?.category ?? 'system',
    aliases: ICON_METADATA['search']?.aliases ?? [],
  },
  {
    name: 'settings',
    selector: 'lmn-settings',
    component: LmnSettingsIcon as Type<LmnIconInstance>,
    importStr: "import { LmnSettingsIcon } from '@lumen/icons/settings';",
    selectorStr: '<lmn-settings ariaLabel="settings" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnSettingsIcon } from '@lumen/icons/settings';

@Component({
  selector: 'app-example',
  imports: [LmnSettingsIcon],
  template: '<lmn-settings ariaLabel="settings" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['settings']?.category ?? 'system',
    aliases: ICON_METADATA['settings']?.aliases ?? [],
  },
  {
    name: 'share',
    selector: 'lmn-share',
    component: LmnShareIcon as Type<LmnIconInstance>,
    importStr: "import { LmnShareIcon } from '@lumen/icons/share';",
    selectorStr: '<lmn-share ariaLabel="share" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnShareIcon } from '@lumen/icons/share';

@Component({
  selector: 'app-example',
  imports: [LmnShareIcon],
  template: '<lmn-share ariaLabel="share" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['share']?.category ?? 'system',
    aliases: ICON_METADATA['share']?.aliases ?? [],
  },
  {
    name: 'shield',
    selector: 'lmn-shield',
    component: LmnShieldIcon as Type<LmnIconInstance>,
    importStr: "import { LmnShieldIcon } from '@lumen/icons/shield';",
    selectorStr: '<lmn-shield ariaLabel="shield" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnShieldIcon } from '@lumen/icons/shield';

@Component({
  selector: 'app-example',
  imports: [LmnShieldIcon],
  template: '<lmn-shield ariaLabel="shield" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['shield']?.category ?? 'system',
    aliases: ICON_METADATA['shield']?.aliases ?? [],
  },
  {
    name: 'smile',
    selector: 'lmn-smile',
    component: LmnSmileIcon as Type<LmnIconInstance>,
    importStr: "import { LmnSmileIcon } from '@lumen/icons/smile';",
    selectorStr: '<lmn-smile ariaLabel="smile" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnSmileIcon } from '@lumen/icons/smile';

@Component({
  selector: 'app-example',
  imports: [LmnSmileIcon],
  template: '<lmn-smile ariaLabel="smile" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['smile']?.category ?? 'system',
    aliases: ICON_METADATA['smile']?.aliases ?? [],
  },
  {
    name: 'sparkles',
    selector: 'lmn-sparkles',
    component: LmnSparklesIcon as Type<LmnIconInstance>,
    importStr: "import { LmnSparklesIcon } from '@lumen/icons/sparkles';",
    selectorStr: '<lmn-sparkles ariaLabel="sparkles" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnSparklesIcon } from '@lumen/icons/sparkles';

@Component({
  selector: 'app-example',
  imports: [LmnSparklesIcon],
  template: '<lmn-sparkles ariaLabel="sparkles" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['sparkles']?.category ?? 'system',
    aliases: ICON_METADATA['sparkles']?.aliases ?? [],
  },
  {
    name: 'star',
    selector: 'lmn-star',
    component: LmnStarIcon as Type<LmnIconInstance>,
    importStr: "import { LmnStarIcon } from '@lumen/icons/star';",
    selectorStr: '<lmn-star ariaLabel="star" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnStarIcon } from '@lumen/icons/star';

@Component({
  selector: 'app-example',
  imports: [LmnStarIcon],
  template: '<lmn-star ariaLabel="star" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['star']?.category ?? 'system',
    aliases: ICON_METADATA['star']?.aliases ?? [],
  },
  {
    name: 'sun',
    selector: 'lmn-sun',
    component: LmnSunIcon as Type<LmnIconInstance>,
    importStr: "import { LmnSunIcon } from '@lumen/icons/sun';",
    selectorStr: '<lmn-sun ariaLabel="sun" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnSunIcon } from '@lumen/icons/sun';

@Component({
  selector: 'app-example',
  imports: [LmnSunIcon],
  template: '<lmn-sun ariaLabel="sun" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['sun']?.category ?? 'system',
    aliases: ICON_METADATA['sun']?.aliases ?? [],
  },
  {
    name: 'trash',
    selector: 'lmn-trash',
    component: LmnTrashIcon as Type<LmnIconInstance>,
    importStr: "import { LmnTrashIcon } from '@lumen/icons/trash';",
    selectorStr: '<lmn-trash ariaLabel="trash" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnTrashIcon } from '@lumen/icons/trash';

@Component({
  selector: 'app-example',
  imports: [LmnTrashIcon],
  template: '<lmn-trash ariaLabel="trash" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['trash']?.category ?? 'system',
    aliases: ICON_METADATA['trash']?.aliases ?? [],
  },
  {
    name: 'upload',
    selector: 'lmn-upload',
    component: LmnUploadIcon as Type<LmnIconInstance>,
    importStr: "import { LmnUploadIcon } from '@lumen/icons/upload';",
    selectorStr: '<lmn-upload ariaLabel="upload" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnUploadIcon } from '@lumen/icons/upload';

@Component({
  selector: 'app-example',
  imports: [LmnUploadIcon],
  template: '<lmn-upload ariaLabel="upload" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['upload']?.category ?? 'system',
    aliases: ICON_METADATA['upload']?.aliases ?? [],
  },
  {
    name: 'user',
    selector: 'lmn-user',
    component: LmnUserIcon as Type<LmnIconInstance>,
    importStr: "import { LmnUserIcon } from '@lumen/icons/user';",
    selectorStr: '<lmn-user ariaLabel="user" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnUserIcon } from '@lumen/icons/user';

@Component({
  selector: 'app-example',
  imports: [LmnUserIcon],
  template: '<lmn-user ariaLabel="user" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['user']?.category ?? 'system',
    aliases: ICON_METADATA['user']?.aliases ?? [],
  },
  {
    name: 'x',
    selector: 'lmn-x',
    component: LmnXIcon as Type<LmnIconInstance>,
    importStr: "import { LmnXIcon } from '@lumen/icons/x';",
    selectorStr: '<lmn-x ariaLabel="x" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnXIcon } from '@lumen/icons/x';

@Component({
  selector: 'app-example',
  imports: [LmnXIcon],
  template: '<lmn-x ariaLabel="x" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['x']?.category ?? 'system',
    aliases: ICON_METADATA['x']?.aliases ?? [],
  },
  {
    name: 'zap',
    selector: 'lmn-zap',
    component: LmnZapIcon as Type<LmnIconInstance>,
    importStr: "import { LmnZapIcon } from '@lumen/icons/zap';",
    selectorStr: '<lmn-zap ariaLabel="zap" />',
    exampleStr: `import { Component } from '@angular/core';
import { LmnZapIcon } from '@lumen/icons/zap';

@Component({
  selector: 'app-example',
  imports: [LmnZapIcon],
  template: '<lmn-zap ariaLabel="zap" />',
})
export class ExampleComponent {}`,
    category: ICON_METADATA['zap']?.category ?? 'system',
    aliases: ICON_METADATA['zap']?.aliases ?? [],
  },
] as const;
