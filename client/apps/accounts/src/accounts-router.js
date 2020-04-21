import { Router } from '@tfg-core/routing';

export const accountsRouter = new Router({
    baseURL: '/accounts',
    routes: {
        '/': {tag: 'tfg-accounts-list', load: () => import('./pages/list/list') },
        '/create': { tag: 'tfg-accounts-create', load: () => import('./pages/create/create') },
        '/not-found': {tag: 'tfg-accounts-not-found', load: () => import('./pages/not-found/not-found')},
        '/:id': { tag: 'tfg-accounts-details', load: () => import('./pages/details/details') }
    }
});