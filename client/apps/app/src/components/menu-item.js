import {LitElement, html} from 'lit-element';
import {layout} from '@tfg-style/layout';
import menuItemCSS from './menu-item.css';
import '@vaadin/vaadin-tabs';
import '@polymer/iron-icon';
import '@polymer/iron-icons';

class TFGAppMenuItem extends LitElement {
    static get styles(){
        return [menuItemCSS, layout];
    }
    static get properties() {
        return {
            config: { type: Object },
        };
    }
    render() {
        const {href, icon, label} = this.config;
        return html`
            <vaadin-tab class="menu-item">
                <a class="menu-item__content horizontal" href=${href}>
                    <iron-icon class="menu-item__icon" icon=${icon}></iron-icon>
                    ${label}
                </a>
            </vaadin-tab>
        `
    }
}

customElements.define('tfg-app-menu-item', TFGAppMenuItem);