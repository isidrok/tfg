import { Router } from '@tfg-core/routing';

export function createRouter(outlet) {
    return new Router({
        outlet,
        baseURL: '/accounts',
        routes: {
            '/': {tag: 'tfg-accounts-list', load: () => import('./pages/list/list')},
            '/create': {tag: 'tfg-accounts-create', load: () => import('./pages/create')}
        }
    }); 
}