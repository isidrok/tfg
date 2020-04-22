import { Component } from '@tfg-core/component';

class TFGCardsCreate extends Component {
  render() {
    return this.html`
      <h3>New Card</h3>
    `;
  }
}

customElements.define('tfg-cards-create', TFGCardsCreate);