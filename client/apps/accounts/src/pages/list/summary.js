import {Component} from '@tfg-core/component';
import summaryCSS from './summary.css';

class TFGAccountsSummary extends Component {
    static get properties(){
        return {
            account: {type: Object}
        }
    }
    static get styles() {
        return summaryCSS;
    }
    render() {
        return this.html`
            <vaadin-item>${this.account.iban}</vaadin-item>
        `;
    }
}

customElements.define('tfg-accounts-summary', TFGAccountsSummary);