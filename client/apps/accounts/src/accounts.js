import {Component} from '@tfg-core/component';
import {accountsRouter} from './accounts-router';
import { store } from '@tfg-core/store';
import {accountsStore} from './accounts-store';
import './components/accounts-menu';
import accountsCSS from './accounts.css';

class TFGAccounts extends Component {
  static styles = accountsCSS;
  
  async connectedCallback() {
    super.connectedCallback();
    store.register(accountsStore);
    await this.updateComplete;
    accountsRouter.start(this.renderRoot.getElementById('outlet'));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    store.unregister(accountsStore);
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