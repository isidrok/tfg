import {Component} from '@tfg-core/component';
import {cardsRouter} from './cards-router';

class TFGCards extends Component {
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    cardsRouter.start(this.renderRoot.getElementById('outlet'));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    cardsRouter.stop();
  }
  render() {
    return this.html`
      <h2>Cards</h2>
      <div id="outlet"></div>
    `;
  }
}

customElements.define('tfg-cards', TFGCards);
