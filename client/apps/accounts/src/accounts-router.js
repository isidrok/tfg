import {Router} from '@tfg-core/routing';

export const accountsRouter = new Router({
  baseURL: '/accounts',
  routes: [
    {
      path: '/',
      name: 'list',
      tag: 'tfg-accounts-list',
      load: () => import('./pages/list/list'),
    },
    {
      path: '/create',
      name: 'create',
      tag: 'tfg-accounts-create',
      load: () => import('./pages/create/create'),
    },
    {
      path: '/not-found',
      name: 'not-found',
      tag: 'tfg-accounts-not-found',
      load: () => import('./pages/not-found/not-found'),
    },
    {
      path: '/:id',
      name: 'detail',
      tag: 'tfg-accounts-details',
      load: () => import('./pages/details/details'),
    },
  ],
});
