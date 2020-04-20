import { TFGRouter } from '@tfg-core/routing';

class TFGAppRouter extends TFGRouter {
    static get routerConfig() {
        return {
            baseURL: '',
            routes: {
                '/': { redirect: '/accounts' },
                '/accounts': { tag: 'tfg-accounts', src: '@tfg-apps/accounts', hasChildren: true },
                '/cards': { tag: 'tfg-cards', src: '@tfg-apps/cards', hasChildren: true },
                '*': {tag:'tfg-app-not-found', load: () => import('./components/not-found')}
            }
        };
    }
    render(){
        return this.html`
            <main id="outlet"></main>
        `
    }
}
window.customElements.define('tfg-app-router', TFGAppRouter);