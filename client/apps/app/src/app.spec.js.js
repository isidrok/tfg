System.register(['../../../../../../../../../../app-router-c5fa0580.js', '@tfg-core/component', '@tfg-core/store', '@tfg-core/routing', '@material/mwc-drawer', '@tfg-core/http', '@material/mwc-list', '@material/mwc-list/mwc-list-item', '@material/mwc-icon', '@material/mwc-top-app-bar-fixed', '@material/mwc-icon-button'], function () {
    'use strict';
    var _defineProperty, appRouter, Component, ConnectStore, store, HTTPService;
    return {
        setters: [function (module) {
            _defineProperty = module._;
            appRouter = module.a;
        }, function (module) {
            Component = module.Component;
        }, function (module) {
            ConnectStore = module.ConnectStore;
            store = module.store;
        }, function () {}, function () {}, function (module) {
            HTTPService = module.HTTPService;
        }, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: function () {

            const appStore = {
              namespace: 'app',
              state: {
                menuItems: []
              },
              mutations: {
                setMenuItems(state, {
                  items
                }) {
                  state.menuItems = items;
                }

              },
              actions: {
                async getMenuItems({
                  mutations,
                  state
                }, {
                  menuItemsService
                }) {
                  if (state.menuItems.length) {
                    return;
                  }

                  const items = await menuItemsService.getAll();
                  mutations.setMenuItems.exec({
                    items
                  });
                }

              }
            };

            const styleSheet = new CSSStyleSheet();
                    styleSheet.replaceSync(":host {\r\n    display: block;\r\n    height: 100%;\r\n}\r\n.app {\r\n    padding: var(--tfg-padding-medium);\r\n}");

            const styleSheet$1 = new CSSStyleSheet();
                    styleSheet$1.replaceSync(":host {\r\n    display: block;\r\n    height: 100%;\r\n}\r\n.layout__title {\r\n    display: flex;\r\n    justify-content: center;\r\n}\r\n.layout__logo {\r\n    height: 5rem;\r\n}\r\n\r\n.layout__content {\r\n    height: 100%;\r\n}");

            var logo = "data:image/svg+xml,%3Csvg%20id%3D%22Layer_1%22%20data-name%3D%22Layer%201%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Ctitle%3Ebank-building%3C%2Ftitle%3E%3Cg%20id%3D%22bank-building%22%3E%3Crect%20id%3D%22label%22%20width%3D%22100%25%22%20height%3D%22511.99%22%20fill%3D%22%236200ee%22%2F%3E%3Cg%20id%3D%22bank-building-2%22%20data-name%3D%22bank-building%22%3E%3Cpath%20d%3D%22M384.72%2C351.32H368.61V259.41h16.12V241H127.3v18.43h16.18v91.91H127.3v17.41H113.08v20.39H398.92V368.73h-14.2Zm-177.29%2C0H176.79V259.41h30.64Zm63.89%2C0H240.72V259.41h30.61Zm64%2C0H304.66V259.41h30.62Zm-222.2-132.4v8.59H398.92v-8.59L256%2C122.88ZM306%2C197.59H206v-3L256%2C161l50%2C33.63Z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";

            class MenuItemsService extends HTTPService {
              get config() {
                return this.extendedConfig(super.config, {
                  baseURL: '/menu-items'
                });
              }

            }

            const menuItemsService = new MenuItemsService();

            const styleSheet$2 = new CSSStyleSheet();
                    styleSheet$2.replaceSync(".menu__item {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    display: flex;\r\n    align-items: center;\r\n    text-decoration: none;\r\n}\r\n.menu__item__icon {\r\n    padding-right: var(--tfg-margin-medium);\r\n    padding-left: var(--tfg-margin-medium);\r\n}");

            class TFGAppMenu extends ConnectStore(Component) {
              async connectedCallback() {
                super.connectedCallback();
                await this.store.actions.app.getMenuItems({
                  menuItemsService
                });
              }

              _menuItem(item) {
                const {
                  href,
                  icon,
                  label,
                  name
                } = item;
                const isActive = window.location.pathname === href;
                return this.html`
            <mwc-list-item ?selected=${isActive}>
                <tfg-app-preload .name=${name}>
                    <a class="menu__item" href=${href}>
                        <mwc-icon class="menu__item__icon">${icon}</mwc-icon>
                        ${label}
                    </a>
                </tfg-app-preload>
            </mwc-list-item>
        `;
              }

              render() {
                return this.html`
        <mwc-list activatable>
            ${this.items.map(item => this._menuItem(item))}
        </mwc-list>
    `;
              }

            }

            _defineProperty(TFGAppMenu, "properties", {
              items: {
                type: Array
              }
            });

            _defineProperty(TFGAppMenu, "styles", styleSheet$2);

            _defineProperty(TFGAppMenu, "mapState", {
              items: {
                from: state => state.app.menuItems,
                on: mutations => mutations.app.setMenuItems
              }
            });

            customElements.define('tfg-app-menu', TFGAppMenu);

            class TFGAppHeader extends Component {
              _onNavIconClick() {
                this.fire('toggle');
              }

              render() {
                return this.html`
            <mwc-top-app-bar-fixed ?centerTitle=${true} @MDCTopAppBar:nav=${this._onNavIconClick}>
                <mwc-icon-button slot="navigationIcon" icon="menu"></mwc-icon-button>
                    <h1 slot="title">TFG Bank</h1>
            </mwc-top-app-bar-fixed>
        `;
              }

            }

            customElements.define('tfg-app-header', TFGAppHeader);

            class TFGAppLayout extends Component {
              _toggleDrawer() {
                this.refs.drawer.open = !this.refs.drawer.open;
              }

              render() {
                return this.html`
      <mwc-drawer ref="drawer" hasHeader type="modal">
        <div slot="title" class="layout__title">
          <img  class="layout__logo" src=${logo} />
        </div>
        <tfg-app-menu></tfg-app-menu>
        <div slot="appContent" class="layout__content">
          <tfg-app-header @toggle=${this._toggleDrawer}></tfg-app-header>
          <slot></slot>
        </div>
      </mwc-drawer>
    `;
              }

            }

            _defineProperty(TFGAppLayout, "styles", styleSheet$1);

            customElements.define('tfg-app-layout', TFGAppLayout);

            class TFGApp extends Component {
              async connectedCallback() {
                super.connectedCallback();
                store.register(appStore);
                await this.updateComplete;
                appRouter.start(this.renderRoot.getElementById('outlet'));
              }

              disconnectedCallback() {
                super.disconnectedCallback();
                store.unregister(appStore);
                appRouter.stop();
              }

              render() {
                return this.html`
      <tfg-app-layout>
        <main id="outlet" class="app"></main>
      </tfg-app-layout>
    `;
              }

            }

            _defineProperty(TFGApp, "styles", styleSheet);

            customElements.define('tfg-app', TFGApp);

            describe('App', function () {
              it('should define tfg-app', () => {
                expect(customElements.get('tfg-app')).toBe(TFGApp);
              });
            });

        }
    };
});
//# sourceMappingURL=app.spec.js.js.map
