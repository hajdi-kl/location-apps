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
import { languageSlice, loadingSlice, locationSlice } from './app/store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { fakeDelayInterceptor } from './app/interceptors/fake-delay.interceptor';

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
    }),
  ],
});
