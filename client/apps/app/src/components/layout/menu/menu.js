import {Component} from '@tfg-core/component';
import {ConnectStore} from '@tfg-core/store';
import {menuItemsService} from './menu-items-service';
import menuCSS from './menu.css';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';

class TFGAppMenu extends ConnectStore(Component) {
  static properties = {
    items: {type: Array},
  };
  static styles = menuCSS;
  static mapState = {
    app: {
      menuItems: 'items',
    },
  };
  static mapActions = {
    app: {
      getMenuItems: 'getMenuItems',
    },
  };
  async connectedCallback() {
    super.connectedCallback();
    await this.getMenuItems({menuItemsService});
  }
  _menuItem(item) {
    const {href, icon, label, name} = item;
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
            ${this.items.map((item) => this._menuItem(item))}
        </mwc-list>
    `;
  }
}

customElements.define('tfg-app-menu', TFGAppMenu);
