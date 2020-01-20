import { LitElement, html, css } from 'lit-element';
import '@vaadin/vaadin-tabs';
import '@polymer/iron-icon';
import '@polymer/iron-icons';

class TFGAppMenuItem extends LitElement {
    static get styles(){
        return css`
            .menu-item__content {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
            }
            .menu-item__icon {
                margin-right: 1rem;
            }
        `;
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
                <a class="menu-item__content" href=${href}>
                    <iron-icon class="menu-item__icon" icon=${icon}></iron-icon>
                    ${label}
                </a>
            </vaadin-tab>
        `
    }
}

customElements.define('tfg-app-menu-item', TFGAppMenuItem);