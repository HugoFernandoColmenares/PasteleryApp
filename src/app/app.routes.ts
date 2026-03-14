import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: 'main',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'cart',
        loadComponent: () => import('./shared/cart/cart').then((m) => m.Cart),
      },
      {
        path: 'login',
        loadComponent: () => import('./auth/auth').then((m) => m.Auth),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
        canActivate: [authGuard],
      },
      {
        path: 'inventory',
        loadComponent: () => import('./pages/inventory/inventory').then((m) => m.Inventory),
        canActivate: [authGuard],
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about').then((m) => m.About),
      },
      {
        path: 'recipes',
        loadComponent: () => import('./pages/recipes/recipes').then((m) => m.Recipes),
      },
      {
        path: 'payment',
        loadComponent: () => import('./pages/payment/payment').then((m) => m.Payment),
        canActivate: [authGuard],
      },
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'main',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
