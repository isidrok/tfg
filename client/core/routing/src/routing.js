import Navaid from './navaid';
const CHILD_ROUTE = '__CHILD_ROUTE__';
export class Router {
    constructor({ baseURL, routes }) {
        this._router = new Navaid(baseURL);
        this._registerRoutes(routes);
        this._context = {};
        this._outlet = null;
    }
    get context() {
        return this._context;
    }
    _registerRoutes(routes) {
        Object.entries(routes).forEach(([path, config]) => {
            config.path = path;
            this._addRoute(path, config);
        })
    }
    _addRoute(path, config) {
        const { redirect, hasChildren } = config;
        const route = hasChildren ? path + `/:${CHILD_ROUTE}?` : path;
        if (typeof redirect !== 'undefined') {
            this._router.on(route, this.redirect.bind(this, redirect));
        } else {
            this._router.on(route, this._routeCallback.bind(this, config));
        }
    }
    async _routeCallback(config, context) {
        this._context = context;
        if (this._isChildrenActive(config)) {
            return;
        }
        await this._loadResources(config);
        const element = this._createElement(config);
        const abort = await this._callElementCallback(element);
        if (abort) {
            return;
        }
        this._renderElement(element);
    }
    _isChildrenActive(config) {
        const { hasChildren, path } = config;
        const { firstChild } = this._outlet;
        return hasChildren && firstChild && firstChild.dataset.path === path;
    }
    async _loadResources(config) {
        const { src, load } = config;
        src && await import(src);
        load && await load();
    }
    _createElement(config) { 
        const { tag, path } = config;
        const element = document.createElement(tag);
        element.dataset.path = path;
        element.routingContext = this.context;
        return element;
    }
    async _callElementCallback(element) {
        let abort = false;
        if (element.beforeRouteEnter) {
            await element.beforeRouteEnter(this._context, () => { abort = true; })
        }
        return abort;
    }
    _renderElement(element){
        if (this._outlet.firstChild) {
            this._outlet.firstChild.replaceWith(element);
        } else {
            this._outlet.append(element);
        }
    }
    navigate(path) {
        this._router.route(path);
    }
    redirect(path) {
        this._router.route(path, true)
    }
    start(outlet) {
        this._outlet = outlet;
        this._router.listen();
    }
    stop() {
        this._router.unlisten && this._router.unlisten();
    }
}
