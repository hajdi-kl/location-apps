import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: import('./layout/layout.component').then((m) => m.LayoutComponent),
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
