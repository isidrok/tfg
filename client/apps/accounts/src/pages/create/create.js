import {Component} from '@tfg-core/component';

class TFGAccountsCreate extends Component {
  render() {
    return this.html`
      <h3>New Account</h3>
    `;
  }
}

customElements.define('tfg-accounts-create', TFGAccountsCreate);