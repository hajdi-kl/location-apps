import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';

import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { appDefaultLanguage, languageSlice, loadingSlice, locationSlice, weatherSlice } from '@libs/util-lib-common/src/lib/store/weather/index';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { fakeDelayInterceptor } from './app/interceptors/fake-delay.interceptor';
import {
  provideTranslateService,
  TranslateLoader,
} from '@ngx-translate/core';
import { HttpLoaderFactory } from './app/core/translate-loader';
import { AppEffects } from './app/services/app-effects.injectable';
import { provideEffects } from '@ngrx/effects';
import { PersistDataService } from './app/services/persist-data.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([fakeDelayInterceptor])),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideStore({
      [languageSlice.prop]: languageSlice.reducer,
      [locationSlice.prop]: locationSlice.reducer,
      [loadingSlice.prop]: loadingSlice.reducer,
      [weatherSlice.prop]: weatherSlice.reducer,
    }),
    provideEffects(AppEffects),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: appDefaultLanguage,
    }),
    PersistDataService
  ],
});
