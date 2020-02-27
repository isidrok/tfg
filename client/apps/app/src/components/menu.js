import {Component} from '@tfg-core/component';
import '@vaadin/vaadin-tabs';
import './menu-item';

class TFGAppMenu extends Component {
    static get properties() {
        return {
            items: { type: Array },
        };
    }
    _menuItem(item){
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