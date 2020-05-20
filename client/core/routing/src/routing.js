import Navaid from './navaid';
import {Component} from '@tfg-core/component';
const CHILD_ROUTE = '__CHILD_ROUTE__';

export class Router {
  constructor({baseURL, routes, preloader}) {
    this._baseURL = baseURL;
    this._router = new Navaid(baseURL);
    this._preloads = this._mapNamesToResources(routes);
    this._registerRoutes(routes);
    this._context = {};
    this._outlet = null;
    preloader && createPreloader(this, preloader);
  }
  get context() {
    return this._context;
  }
  _registerRoutes(routes) {
    routes.forEach((config) => {
      this._addRoute(config);
    });
  }
  _mapNamesToResources(routes) {
    const map = {};
    for (let {name, load} of routes) {
      map[name] = load;
    }
    return map;
  }
  _addRoute(config) {
    const {path, redirect, hasChildren} = config;
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
    const {hasChildren, path} = config;
    const {firstChild} = this._outlet;
    return hasChildren && firstChild && firstChild.dataset.path === path;
  }
  async _loadResources(config) {
    const {load} = config;
    load && (await load());
  }
  _createElement(config) {
    const {tag, path} = config;
    const element = document.createElement(tag);
    element.dataset.path = path;
    element.routingContext = this.context;
    return element;
  }
  async _callElementCallback(element) {
    let abort = false;
    if (element.beforeRouteEnter) {
      await element.beforeRouteEnter(this._context, () => {
        abort = true;
      });
    }
    return abort;
  }
  _renderElement(element) {
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
    this._router.route(path, true);
  }
  start(outlet) {
    this._outlet = outlet;
    this._router.listen();
  }
  stop() {
    this._router.unlisten && this._router.unlisten();
  }
  preload(name) {
    const load = this._preloads[name];
    load && load();
  }
}

function createPreloader(router, name) {
  customElements.define(
    name,
    class Preloader extends Component {
      static properties = {
        name: {type: String},
      };
      connectedCallback() {
        super.connectedCallback();
        this.addEventListener('focus', this._preload);
        this.addEventListener('mouseenter', this._preload);
      }
      disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('focus', this._preload);
        this.removeEventListener('mouseenter', this._preload);
      }
      _preload = () => {
        router.preload(this.name);
      };
      render() {
        return this.html`<slot></slot>`;
      }
    }
  );
}
