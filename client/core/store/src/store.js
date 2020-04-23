function actionContext(store, ns) {
    return {
        state: store.state[ns],
        projections: store.projections[ns],
        actions: store.actions[ns],
        mutations: store.mutations[ns],
        rootState: store.state,
        rootProjections: store.projections,
        rootActions: store.actions
    };
}

function subscriberContext(store, ns) {
    return {
        state: store.state[ns],
        projections: store.projections[ns],
        actions: store.actions[ns]
    }
}

function projectionContext(store) {
    return {
        state: store.state[ns],
        projections: store.projections[ns],
        rootState: store.state,
        rootProjections: store.projections,
    };
}

function mutationContext(store, ns) {
    return store.state[ns];
}

class Subject {
    constructor() {
        this._observers = [];
    }
    sub(cb, ctx) {
        this._observers.push([cb, ctx]);
        return () => unsub(cb, ctx);
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

class Mutation extends Subject {
    constructor(fn, store, ns) {
        super();
        this._fn = fn;
        this._store = store;
        this._ns = ns;
    }
    async exec(payload) {
        this._fn(mutationContext(this._store, this._ns), payload);
        this.notify(subscriberContext(this._store, this._ns));
    }
}

class Store {
    constructor() {
        this._state = {};
        this._actions = {};
        this._projections = {};
        this._mutations = {};
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
    get mutations() {
        return this._mutations;
    }
    register(config = {}) {
        const { state = {}, actions = {}, projections = {}, mutations = {}, namespace: ns } = config;
        this.state[ns] = state;
        this.actions[ns] = this._decorateActions(actions, ns);
        this.projections[ns] = this._decorateProjections(projections, ns);
        this.mutations[ns] = this._decorateMutations(mutations, ns);
    }
    unregister({ namespace: ns }) {
        this.state[ns] = null;
        this.actions[ns] = null;
        this.projections[ns] = null;
        Object.values(this.mutations[ns]).forEach((m) => m.dispose());
        this.mutations[ns] = null;
    }
    _decorateActions(actions, ns) {
        for (let [name, fn] of Object.entries(actions)) {
            actions[name] = async (payload) => {
                await fn(actionContext(this, ns), payload);
            }
        }
        return actions;
    }
    _decorateProjections(projections, ns) {
        for (let [name, fn] of Object.entries(projections)) {
            projections[name] = (payload) => {
                return fn(projectionContext(this, ns), payload);
            }
        }
        return projections;
    }
    _decorateMutations(mutations, ns) {
        for (let [name, fn] of Object.entries(mutations)) {
            mutations[name] = new Mutation(fn, this, ns)
        }
        return mutations;
    }
}
export const store = new Store();

export function ConnectStore(Super) {
    return class extends Super {
        constructor() {
            super();
            this.__initProps();
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
            Object.entries(this.constructor.connect).forEach(([prop, { from }]) => {
                this[prop] = from(store.state, store.projections);
            });
        }
        __subscribeProps() {
            Object.entries(this.constructor.connect).forEach(([prop, { on, from }]) => {
                on = Array.isArray(on) ? on : [on]
                on.forEach((mutation) => {
                    const unsub = mutation.sub(() => {
                        this[prop] = from(store.state, store.projections);
                    });
                    this.__unsubs.push(unsub);
                });
            });
        }
        __unsubscribeProps() {
            this.__unsubs.forEach((d) => d());
        }
    }
}
