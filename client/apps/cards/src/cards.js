import {Component} from '@tfg-core/component';
import {store} from '@tfg-core/store';
import {cardsRouter} from './cards-router';
import {cardsStore} from './cards-store';
class TFGCards extends Component {
  async connectedCallback() {
    super.connectedCallback();
    store.register(cardsStore);
    await this.updateComplete;
    cardsRouter.start(this.renderRoot.getElementById('outlet'));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    store.unregister(cardsStore);
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
