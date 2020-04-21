import {Component} from '@tfg-core/component';
import { accountsService } from '../../services/accounts-service';
import {accountsRouter} from '../../accounts-router';

class TFGAccountsDetails extends Component {
  static get properties() {
    return {
      account: { type: Object }
    };
  }
  async beforeRouteEnter(context, abort) {
    try {
      this.account = await accountsService.get(context.params.id);
    } catch (err) {
      abort();
      accountsRouter.redirect('/accounts/not-found');
    }
  }
  render() {
    return this.html`
      <h3>${this.account.iban}</h3>
    `;
  }
}

customElements.define('tfg-accounts-details', TFGAccountsDetails);