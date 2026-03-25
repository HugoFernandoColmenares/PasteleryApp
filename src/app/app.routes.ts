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
        path: 'ingredients',
        loadComponent: () => import('./pages/ingredient/ingredient').then((m) => m.Ingredient),
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
        path: 'recipes/new',
        loadComponent: () => import('./pages/recipes/recipe-form/recipe-form').then((m) => m.RecipeForm),
        canActivate: [authGuard],
      },
      {
        path: 'recipes/:id/edit',
        loadComponent: () => import('./pages/recipes/recipe-form/recipe-form').then((m) => m.RecipeForm),
        canActivate: [authGuard],
      },
      {
        path: 'storage-locations',
        loadComponent: () => import('./pages/storage-locations/storage-locations').then((m) => m.StorageLocations),
        canActivate: [authGuard],
      },
      {
        path: 'news',
        loadComponent: () => import('./pages/news/news').then((m) => m.News),
      },
      {
        path: 'news/:id',
        loadComponent: () => import('./pages/article/article').then((m) => m.Article),
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
