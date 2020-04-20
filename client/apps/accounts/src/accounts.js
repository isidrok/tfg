import {Component} from '@tfg-core/component';
import './accounts-router';
import './components/accounts-menu';

class TFGAccounts extends Component {
  render() {
    return this.html`
      <h2>Accounts</h2>
      <tfg-accounts-menu></tfg-accounts-menu>
      <tfg-accounts-router></tfg-accounts-router>
    `;
  }
}

customElements.define('tfg-accounts', TFGAccounts);