import {Router} from '@tfg-core/routing';

export const cardsRouter = new Router({
  baseURL: '/cards',
  routes: [
    {
      path: '/',
      name: 'list',
      tag: 'tfg-cards-list',
      load: () => import('./pages/list/list'),
    },
  ],
});
