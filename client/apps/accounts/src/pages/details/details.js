import {Component} from '@tfg-core/component';
import {accountsService} from '../../services/accounts-service';
import {accountsRouter} from '../../accounts-router';
import './movement';
import '@tfg-apps/cards/summary';
class TFGAccountsDetails extends Component {
  static get properties() {
    return {
      account: {type: Object},
    };
  }
  async beforeRouteEnter(context, abort) {
    try {
      this.account = await accountsService.get(context.id);
    } catch (err) {
      abort();
      accountsRouter.redirect('/accounts/not-found');
    }
  }
  _renderMovements() {
    return this.account.movements.map((movement) => {
      return this.html`
        <tfg-accounts-movement .movement=${movement}></tfg-accounts-accounts-movement>
      `;
    });
  }
  _renderCards() {
    return this.account.cards.map((card) => {
      return this.html`
        <tfg-cards-summary .card=${card}></tfg-cards-summary>
      `;
    });
  }
  render() {
    return this.html`
      <div>
        <h3>Account ${this.account.iban}</h3>
        <p>Balance: ${this.account.balance} €</p>
        <h4>Last movements</h4>
        <div>
          ${this._renderMovements()}
        </div>
        ${this.account.cards.length ? this.html`<h4>Cards</h4>` : null}
        <div>
          ${this._renderCards()}
        </div>
      </div>
    `;
  }
}

customElements.define('tfg-accounts-details', TFGAccountsDetails);
