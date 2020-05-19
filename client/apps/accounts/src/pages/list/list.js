import { Component } from '@tfg-core/component';
import { ConnectStore } from '@tfg-core/store';
import { accountsRouter } from '../../accounts-router';
import { accountsService } from '../../services/accounts-service';
import listCSS from './list.css';
import './summary';

class TFGAccountsList extends ConnectStore(Component) {
  static styles = listCSS;
  static properties = {
    accounts: { type: Array }
  }
  static mapState = {
    accounts: {
      from: (state) => state.accounts.accounts,
      on: (mutations) => mutations.accounts.setAccounts
    }
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.store.actions.accounts.getAccounts({accountsService})
  }
  _renderAccount(account) {
    return this.html`
      <tfg-accounts-summary tabindex="1" class="list__item" data-id=${account.id} .account=${account}></tfg-accounts-summary>
    `;
  }
  _onClick(ev) {
    const { target } = ev;
    if (target.dataset.id) {
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