import {Component} from '@tfg-core/component';
import '@vaadin/vaadin-item';
import summaryCSS from './summary.css';

class TFGAccountsListSummary extends Component {
    static get styles() {
        return summaryCSS;
    }
    render() {
        return this.html`
            <vaadin-item>Foobar</vaadin-item>
        `;
    }
}

customElements.define('tfg-accounts-list-summary', TFGAccountsListSummary);