import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LmnArrowRightIcon } from 'lumen-icons/arrow-right';
import { VoltBadge, VoltCard } from '@voltui/components';
import { MOVEMENT_DIRECTIVES } from 'angular-movement';

import { CodeSnippetComponent } from '../shared/code-snippet';

@Component({
  selector: 'app-home-quickstart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    LmnArrowRightIcon,
    CodeSnippetComponent,
    VoltCard,
    VoltBadge,
    MOVEMENT_DIRECTIVES,
  ],
  templateUrl:'./home-quickstart.html'
})
export class HomeQuickstartComponent {
  readonly importCode = "import { LmnCheckIcon } from 'lumen-icons/check';";
  readonly templateCode = '<lmn-check [size]="24" [animate]="true" />';
}
