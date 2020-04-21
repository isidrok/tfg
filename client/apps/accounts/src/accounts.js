import {Component} from '@tfg-core/component';
import {accountsRouter} from './accounts-router';
import './components/accounts-menu';

class TFGAccounts extends Component {
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    accountsRouter.start(this.renderRoot.getElementById('outlet'));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    accountsRouter.stop();
  }
  render() {
    return this.html`
      <h2>Accounts</h2>
      <tfg-accounts-menu></tfg-accounts-menu>
      <div id="outlet"></div>
    `;
  }
}

customElements.define('tfg-accounts', TFGAccounts);