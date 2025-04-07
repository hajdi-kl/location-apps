import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./index.page').then((m) => m.IndexPageComponent),
  },
];
