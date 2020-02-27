import { LitElement, html } from 'lit-element';
import { createRouter } from './cards.router';

class TFGCards extends LitElement {
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this._router = createRouter(this.renderRoot.getElementById('outlet'));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._router.dispose();
  }
  render() {
    return html`
      <h2>Cards</h2>
      <div id="outlet"></div>
    `;
  }
}

customElements.define('tfg-cards', TFGCards);