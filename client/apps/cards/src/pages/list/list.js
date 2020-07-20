import {Component} from '@tfg-core/component';
import {ConnectStore} from '@tfg-core/store';
import {cardsService} from '../../services/cards-service';
import listCSS from './list.css';
import '../../components/summary';

class TFGCardsList extends ConnectStore(Component) {
  static styles = listCSS;
  static properties = {
    cards: {type: Array},
  };
  static mapState = {
    cards: {
      cards: 'cards',
    },
  };
  static mapActions = {
    cards: {
      getCards: 'getCards',
    },
  };
  async connectedCallback() {
    super.connectedCallback();
    await this.getCards({cardsService});
  }
  render() {
    return this.html`
      <div class="list">
        ${this.cards.map(
          (card) =>
            this.html`<tfg-cards-summary .card=${card}></tfg-cards-summary>`
        )}
      </div>
    `;
  }
}

customElements.define('tfg-cards-list', TFGCardsList);
