import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./index.page').then((m) => m.IndexPageComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.page').then((m) => m.HomePageComponent),
      },
      // {
      //   path: 'uv',
      //   loadComponent: () =>
      //     import('./uv/uv.page').then((m) => m.UvPageComponent),
      // },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
