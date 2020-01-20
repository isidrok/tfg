import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-tabs';
import '@polymer/iron-icon';
import '@polymer/iron-icons';

class TFGAppMenuItem extends LitElement {
    static get properties() {
        return {
            config: { type: Object },
        };
    }
    render() {
        const {href, icon, label} = this.config;
        return html`
            <vaadin-tab>
                <a href=${href}>
                    <iron-icon icon=${icon}></iron-icon>
                    ${label}
                </a>
            </vaadin-tab>
        `
    }
}

customElements.define('tfg-app-menu-item', TFGAppMenuItem);