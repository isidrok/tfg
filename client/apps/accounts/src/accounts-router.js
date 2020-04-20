import { TFGRouter } from '@tfg-core/routing';

class TFGAccountsRouter extends TFGRouter {
    static get routerConfig() {
        return {
            baseURL: '/accounts',
            routes: {
                '/': {tag: 'tfg-accounts-list', load: () => import('./pages/list/list')},
                '/create': {tag: 'tfg-accounts-create', load: () => import('./pages/create/create')}
            }
        };
    }
}
window.customElements.define('tfg-accounts-router', TFGAccountsRouter);