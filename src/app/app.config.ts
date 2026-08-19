import { provideHttpClient, withFetch } from '@angular/common/http';
import { type ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideFileRouter } from '@analogjs/router';
import { provideMovement } from 'angular-movement';

function prefersReducedMotion(): boolean {
  return typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideFileRouter(),
    provideHttpClient(withFetch()),
    provideMovement({
      duration: 280,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      delay: 0,
      // The library's own icon animations opt out via CSS; the app-level motion
      // layer has no stylesheet to hook into, so it is disabled here instead.
      disabled: prefersReducedMotion(),
    }),
  ],
};
