import {LitElement, html} from 'lit-element';
import '@vaadin/vaadin-tabs';
import './menu-item';

class TFGAppMenu extends LitElement {
    static get properties() {
        return {
            items: { type: Array },
        };
    }
    _menuItem(item){
        return html`<tfg-app-menu-item .config=${item}></tfg-app-menu-item>`;
    } 
    render() {
        return html`
        <vaadin-tabs slot="drawer" orientation="vertical">
            ${this.items.map((item) => this._menuItem(item))}
        </vaadin-tabs>
    `
    }
}

customElements.define('tfg-app-menu', TFGAppMenu);