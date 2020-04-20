import page from 'page';
import { Component } from '@tfg-core/component';

class Location {
    constructor(location){
        this._location = location;
        this._subscribers = [];
        this.context = {};
    }
    changed(context) {
        this.context = context;
        this._notify();
    }
    listen(cb, ctx) {
        this._subscribers.push(cb, ctx);
        return this.unlisten.bind(this, cb, ctx);
    }
    unlisten(cb, ctx) {
        const index = this._subscribers.findIndex(([_cb, _ctx]) => {
            return _cb === cb && _ctx === ctx;
        });
        if(index !== -1){
            this._subscribers.splice(index, 1);
        }
    }
    navigate(path){
        this._location.href = path;
    }
    _notify() {
        this._subscribers.forEach(([cb, ctx]) => {
            cb.call(ctx, this.context);
        });
    }
};

export const location = new Location(window.location);

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
        location.changed(context);
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

export class TFGRouter extends Component {
    async connectedCallback() {
        super.connectedCallback();
        await this.updateComplete;
        this._router = this._createRouter();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._router.dispose();
    }
    _createRouter() {
        return new Router({
            outlet: this.renderRoot.getElementById('outlet'),
            ...this.constructor.routerConfig
        });
    }
    render() {
        return this.html`
            <div id="outlet"></div>
        `;
    }
}