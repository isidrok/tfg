import { Component } from '@tfg-core/component';
import { ConnectStore } from '@tfg-core/store';
import { menuItemsService } from './menu-items-service';
import '@vaadin/vaadin-tabs';
import './menu-item';

class TFGAppMenu extends ConnectStore(Component) {
    static properties = {
        items: {
            type: Array
        }
    };
    static mapState = {
        items: {
            from: (state) => state.app.menuItems,
            on: (mutations) => mutations.app.setMenuItems
        }
    }
    async connectedCallback() {
        super.connectedCallback();
        await this.store.actions.app.getMenuItems({ menuItemsService });
    }
    _menuItem(item) {
        return this.html`<tfg-app-menu-item .config=${item}></tfg-app-menu-item>`;
    }
    render() {
        return this.html`
        <vaadin-tabs slot="drawer" orientation="vertical">
            ${this.items.map((item) => this._menuItem(item))}
        </vaadin-tabs>
    `
    }
}

customElements.define('tfg-app-menu', TFGAppMenu);