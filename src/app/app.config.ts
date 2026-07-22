import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

import { routes } from './app.routes';

function passthroughImageLoader(config: ImageLoaderConfig): string {
  return config.src;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withXhr()),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: IMAGE_LOADER, useValue: passthroughImageLoader },
  ],
};
