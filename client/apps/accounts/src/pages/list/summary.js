import { Component } from '@tfg-core/component';
import summaryCSS from './summary.css';
class TFGAccountsSummary extends Component {
    static properties = {
        account: { type: Object }
    };
    static styles = summaryCSS;

    render() {
        return this.html`
            <div class="summary">
                <p>${this.account.iban}</p>
                <p>${this.account.balance} €</p>
            </div>
        `;
    }
}

customElements.define('tfg-accounts-summary', TFGAccountsSummary);