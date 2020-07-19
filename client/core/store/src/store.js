function actionContext(store, ns) {
  return {
    state: store.state[ns],
    projections: store.projections[ns],
    actions: store.actions[ns],
    rootState: store.state,
    rootProjections: store.projections,
    rootActions: store.actions,
  };
}

function projectionContext(store, ns) {
  return {
    state: store.state[ns],
    projections: store.projections[ns],
    rootState: store.state,
    rootProjections: store.projections,
  };
}

class Subject {
  constructor() {
    this._observers = [];
  }
  sub(cb, ctx) {
    this._observers.push([cb, ctx]);
    return () => this.unsub(cb, ctx);
  }
  unsub(cb, ctx) {
    const i = this._observers.findIndex(([_cb, _ctx]) => {
      return _cb === cb && _ctx === ctx;
    });
    if (i !== -1) {
      this._observers.splice(i, 1);
    }
  }
  notify(...args) {
    this._observers.forEach(([cb, ctx]) => {
      cb.apply(ctx, args);
    });
  }
  dispose() {
    this._observers.length = 0;
  }
}

class Store {
  constructor() {
    this._state = {};
    this._actions = {};
    this._projections = {};
    this._subscriptions = Object.create(null);
  }
  get state() {
    return this._state;
  }
  get actions() {
    return this._actions;
  }
  get projections() {
    return this._projections;
  }
  register(config = {}) {
    const {state = {}, actions = {}, projections = {}, namespace: ns} = config;
    this.state[ns] = this._decorateState(state, ns);
    this.actions[ns] = this._decorateActions(actions, ns);
    this.projections[ns] = this._decorateProjections(projections, ns);
  }
  subscribe(statePath, cb, ctx) {
    this._subscriptions[statePath] =
      this._subscriptions[statePath] || new Subject();
    return this._subscriptions[statePath].sub(cb, ctx);
  }
  unsubscribe(statePath, cb, ctx) {
    if (this._subscriptions[statePath]) {
      this._subscriptions[statePath].unsub(cb, ctx);
    }
  }
  unregister({namespace: ns}) {
    this.state[ns] = null;
    this.actions[ns] = null;
    this.projections[ns] = null;
  }
  _notify(statePath, value) {
    if (this._subscriptions[statePath]) {
      this._subscriptions[statePath].notify(value);
    }
  }
  _decorateState(state, ns) {
    const decoratedState = {};
    const notify = this._notify.bind(this);
    for (let [key, value] of Object.entries(state)) {
      const privateKey = `_${key}`;
      decoratedState[privateKey] = value;
      Object.defineProperty(decoratedState, key, {
        get() {
          return this[privateKey];
        },
        set(value) {
          this[privateKey] = value;
          notify(`${ns}.${key}`, value);
        },
      });
    }
    return decoratedState;
  }
  _decorateActions(actions, ns) {
    const decoratedActions = {};
    for (let [name, fn] of Object.entries(actions)) {
      decoratedActions[name] = async (payload) => {
        await fn(actionContext(this, ns), payload);
      };
    }
    return decoratedActions;
  }
  _decorateProjections(projections, ns) {
    const decoratedProjections = {};
    for (let [name, fn] of Object.entries(projections)) {
      decoratedProjections[name] = (payload) => {
        return fn(projectionContext(this, ns), payload);
      };
    }
    return decoratedProjections;
  }
}
export const store = new Store();

export function ConnectStore(Super) {
  return class extends Super {
    constructor() {
      super();
      this.store = store;
      this.__initProps();
      this.__initActions();
      this.__unsubs = [];
    }
    connectedCallback() {
      super.connectedCallback();
      this.__subscribeProps();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.__unsubscribeProps();
    }
    __initProps() {
      for (let [ns, state] of Object.entries(this.constructor.mapState || {})) {
        for (let [from, to] of Object.entries(state)) {
          this[to] = store.state[ns][from];
        }
      }
    }
    __initActions() {
      for (let [ns, actions] of Object.entries(
        this.constructor.mapActions || {}
      )) {
        for (let [from, to] of Object.entries(actions)) {
          this[to] = store.actions[ns][from];
        }
      }
    }
    __subscribeProps() {
      for (let [ns, state] of Object.entries(this.constructor.mapState || {})) {
        for (let [from, to] of Object.entries(state)) {
          const sub = store.subscribe(
            `${ns}.${from}`,
            (value) => (this[to] = value)
          );
          this.__unsubs.push(sub);
        }
      }
    }
    __unsubscribeProps() {
      this.__unsubs.forEach((d) => d());
    }
  };
}
