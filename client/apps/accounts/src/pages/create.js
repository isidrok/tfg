import { LitElement, html } from 'lit-element';

class TFGAccountsCreate extends LitElement {
  render() {
    return html`
      <h3>New Account</h3>
    `;
  }
}

customElements.define('tfg-accounts-create', TFGAccountsCreate);