import { Component } from '@tfg-core/component';
import { accountsService } from '../../services/accounts-service';
import { accountsRouter } from '../../accounts-router';
import './movement';

class TFGAccountsDetails extends Component {
  static get properties() {
    return {
      account: { type: Object }
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
      return this.html`<tfg-accounts-movement .movement=${movement}></tfg-accounts-accounts-movement>`
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
      </div>
    `;
  }
}

customElements.define('tfg-accounts-details', TFGAccountsDetails);