import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DesignModule } from '@directives/design/design.module';
import { routes } from '../app.routes';
import { loadingInterceptor } from '../interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withRouterConfig({ paramsInheritanceStrategy: 'always' })),
    provideAnimations(),
    importProvidersFrom(DesignModule),
  ],
};
