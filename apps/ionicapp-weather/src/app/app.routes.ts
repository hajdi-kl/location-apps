import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/index.component').then((m) => m.IndexComponent),
    children: [
      {
        path: 'weather',
        loadChildren: () =>
          import('./pages/weather/weather.routes').then((m) => m.routes),
      },
      { path: '', redirectTo: 'weather', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
