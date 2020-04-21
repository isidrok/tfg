import { Component } from '@tfg-core/component';
import {accountsRouter} from '../../accounts-router';
import { accountsService } from '../../services/accounts-service';
import './summary';

class TFGAccountsList extends Component {
  static get properties() {
    return {
      accounts: { type: Array }
    };
  }
  async beforeRouteEnter() {
    this.accounts = await accountsService.getAll();
  }
  _renderAccount(account) {
    return this.html`
      <tfg-accounts-summary data-id=${account.id} .account=${account}></tfg-accounts-summary>
    `;
  }
  _onClick(ev){
    const {target} = ev;
    if(target.dataset.id){
      accountsRouter.navigate(`/accounts/${target.dataset.id}`)
    }
  }
  render() {
    return this.html`
      <div @click=${this._onClick}>
        ${this.accounts.map(this._renderAccount.bind(this))}
      </div>
    `;
  }
}

customElements.define('tfg-accounts-list', TFGAccountsList);