import page from 'page';

export class Router {
    constructor({ routes, baseURL }) {
        this._context = {};
        this._subscribers = [];
        this._router = page.create();
        this._outlet = null;
        this._configure(routes, baseURL);
    }
    get context() {
        return this._context;
    }
    _configure(routes, baseURL) {
        baseURL && this._router.base(baseURL);
        this._registerRoutes(routes);
    }
    _registerRoutes(routes) {
        Object.entries(routes).forEach(([path, routeConfig]) => {
            this._addRoute(path, routeConfig);
        });
    }
    _addRoute(path, routeConfig) {
        const { hasChildren, redirect } = routeConfig;
        const route = hasChildren ? `${path}/:__CHILD_ROUTE__?` : path;
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
        this._context = context;
        const element = document.createElement(tag);
        element.routingContext = context;
        if(element.beforeRouteEnter) {
            let aborted = false;
            await element.beforeRouteEnter(context, () => {aborted = true;})
            if(aborted) {
                return;
            }
        }
        if (this._outlet.firstChild) {
            this._outlet.firstChild.replaceWith(element);
        } else {
            this._outlet.append(element);
        }
        this._notify();
    }
    _notify() {
        this._subscribers.forEach(([cb, ctx]) => {
            cb.call(ctx, this.context);
        });
    }
    listen(cb, ctx) {
        this._subscribers.push(cb, ctx);
        return this.unlisten.bind(this, cb, ctx);
    }
    unlisten(cb, ctx) {
        const index = this._subscribers.findIndex(([_cb, _ctx]) => {
            return _cb === cb && _ctx === ctx;
        });
        if (index !== -1) {
            this._subscribers.splice(index, 1);
        }
    }
    navigate(path) {
        this._router.show(path);
    }
    redirect(path) {
        this._router.redirect(path)
    }
    start(outlet)  {
        this._outlet = outlet;
        this._router.start();
    }
    stop() {
        this._router.stop();
        this._outlet = null;
        this._subscribers.length = 0;
        this._context = {};
    }
}