import {Component} from '@tfg-core/component';

class TFGAccountsNotFound extends Component {
  render() {
    return this.html`
      <h3>Account not found</h3>
    `;
  }
}

customElements.define('tfg-accounts-not-found', TFGAccountsNotFound);