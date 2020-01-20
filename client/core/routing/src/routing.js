import page from 'page';

export class Router {
    constructor({ outlet, routes, baseURL, notFound }) {
        this._outlet = outlet;
        this._context = {};
        this._router = page.create();
        this._configure(routes, baseURL, notFound);
        this._router.start();
    }
    get context() {
        return this._context;
    }
    _configure(routes, baseURL, notFound) {
        baseURL && this._router.base(baseURL);
        this._registerRoutes(routes);
        notFound && this._router('*', notFound);
    }
    _registerRoutes(routes) {
        Object.entries(routes).forEach(([path, routeConfig]) => {
            this._addRoute(path, routeConfig);
        });
    }
    _addRoute(path, routeConfig) {
        const { hasChildren, redirect } = routeConfig;
        const route = hasChildren ? `${path}/:__CHILDROUTE__?` : path;
        if (redirect === '' || redirect) {
            this._router(route, redirect);
        } else {
            this._router(route, this._routeCallback.bind(this, routeConfig));
        }
    }
    async _routeCallback(routeConfig, context) {
        const { src, load, tag } = routeConfig;
        if (src) {
            await import(src);
        }
        if (load) {
            await load();
        }
        const element = document.createElement(tag);
        element.routingContext = context;
        this._context = context;
        if (this._outlet.firstChild) {
            this._outlet.firstChild.replaceWith(element);
        } else {
            this._outlet.append(element);
        }
    }
    dispose() {
        this._router.stop();
        this._router = null;
        this._context = {};
    }
}