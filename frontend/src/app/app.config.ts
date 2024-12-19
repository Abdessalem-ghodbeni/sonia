import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthIntercepterService } from './services/auth-intercepter.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(),provideClientHydration(),provideHttpClient(withFetch()), // Ajouter withFetch() ici
      //ce ligne pour utiliser l'interceptor
      { provide: HTTP_INTERCEPTORS, useClass: AuthIntercepterService, multi: true }
  ]
};
