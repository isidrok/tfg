import { LitElement, html } from 'lit-element';
import './summary';

class TFGAccountsList extends LitElement {
  render() {
    return html`
      <tfg-accounts-list-summary></tfg-accounts-list-summary>
    `;
  }
}

customElements.define('tfg-accounts-list', TFGAccountsList);