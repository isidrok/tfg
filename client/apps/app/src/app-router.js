import { Router } from '@tfg-core/routing';

export const appRouter = new Router({
    baseURL: '',
    routes: {
        '/': { redirect: '/accounts' },
        '/accounts': { tag: 'tfg-accounts', load: () => import('@tfg-apps/accounts'), hasChildren: true },
        '/cards': { tag: 'tfg-cards', load: () => import('@tfg-apps/cards'), hasChildren: true },
        '*': { tag: 'tfg-app-not-found', load: () => import('./pages/not-found') }
    }
});