import { Router } from '@tfg-core/routing';

export function createRouter(outlet) {
    return new Router({
        outlet,
        baseURL: '',
        routes: {
            '/': { redirect: 'accounts' },
            '/accounts': {tag: 'tfg-accounts', src: '@tfg-apps/accounts', hasChildren: true}
        }
    }); 
}