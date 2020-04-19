import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-item';
import summaryCSS from './summary.css';

class TFGAccountsListSummary extends LitElement {
    static get styles() {
        return summaryCSS;
    }
    render() {
        return html`
            <vaadin-item>Foobar</vaadin-item>
        `;
    }
}

customElements.define('tfg-accounts-list-summary', TFGAccountsListSummary);