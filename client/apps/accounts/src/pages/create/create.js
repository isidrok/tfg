import {Component} from '@tfg-core/component';

class TFGAccountsCreate extends Component {
  render() {
    return this.html`
      <h3>Create new account</h3>
    `;
  }
}

customElements.define('tfg-accounts-create', TFGAccountsCreate);
