import { Router } from '@tfg-core/routing';

export function createRouter(outlet) {
    return new Router({
        outlet,
        baseURL: '/accounts',
        routes: {
            '/create': {tag: 'tfg-accounts-create', load: () => import('./pages/create')}
        }
    }); 
}