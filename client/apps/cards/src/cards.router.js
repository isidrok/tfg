import { Router } from '@tfg-core/routing';

export function createRouter(outlet) {
    return new Router({
        outlet, 
        baseURL: '/cards',
        routes: {
            '/create': {tag: 'tfg-cards-create', load: () => import('./pages/create')}
        }
    }); 
}