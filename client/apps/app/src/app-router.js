import { Router } from '@tfg-core/routing';

export const appRouter = new Router({
    baseURL: '',
    preloader: 'tfg-app-preload',
    routes: [
        {
            path: '/',
            redirect: '/accounts'
        },
        {
            path: '/accounts',
            name: 'accounts',
            tag: 'tfg-accounts',
            load: () => import('@tfg-apps/accounts'),
            hasChildren: true
        },
        {
            path: '/cards',
            name: 'cards',
            tag: 'tfg-cards',
            load: () => import('@tfg-apps/cards'),
            hasChildren: true 
        },
        {
            path: '*',
            name: 'not-found',
            tag: 'tfg-app-not-found',
            load: () => import('./pages/not-found')
        }
    ]
});