import { Router } from '@tfg-core/routing';

export const cardsRouter = new Router({
    baseURL: '/cards',
    routes: {
        '/create': { tag: 'tfg-cards-create', load: () => import('./pages/create') }
    }
}); 