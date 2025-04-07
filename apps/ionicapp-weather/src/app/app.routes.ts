import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/layout/index.component').then((m) => m.IndexComponent),
    children: [
      {
        path: 'weather',
        loadChildren: () =>
          import('@libs/app-lib-weather/src/lib/pages/weather.routes').then((m) => m.routes),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('@libs/app-lib-about/src/lib/pages/about.routes').then((m) => m.routes),
      },
      { path: '', redirectTo: 'weather', pathMatch: 'full' },
      { path: '**', loadComponent: () => import('./pages/not-found-base/not-found.page').then((m) => m.NotFoundPageComponent) },
    ],
  },
];
