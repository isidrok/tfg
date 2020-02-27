import { LitElement, html } from 'lit-element';

class TFGCardsCreate extends LitElement {
  render() {
    return html`
      <h3>New Card</h3>
    `;
  }
}

customElements.define('tfg-cards-create', TFGCardsCreate);