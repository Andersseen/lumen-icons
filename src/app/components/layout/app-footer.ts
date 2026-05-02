import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LmnExternalLinkIcon } from '@lumen/icons/external-link';
import { VoltSeparator } from '@voltui/components';
import { AppLogoComponent } from './app-logo';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LmnExternalLinkIcon, VoltSeparator, AppLogoComponent],
  templateUrl:'./app-footer.html'
})
export class AppFooterComponent {}
