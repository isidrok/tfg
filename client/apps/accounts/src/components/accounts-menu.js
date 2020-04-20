import {Component} from '@tfg-core/component';
import { layout } from '@tfg-style/layout';
import accountsMenuCSS from './accounts-menu.css';
import '@polymer/iron-icon';
import '@polymer/iron-icons';

class TFGAccountsMenu extends Component {
    static get styles() {
        return [layout, accountsMenuCSS];
    }
    render() {
        return this.html`
            <div class="menu horizontal">
                <div class="menu__item">
                    <a class="menu__item__text" href="/accounts">
                    <iron-icon icon="icons:account-balance-wallet"></iron-icon>
                        Show all
                    </a>
                </div>
                <div class="menu__item">
                    <a class="menu__item__text" href="/accounts/create">
                        <iron-icon icon="icons:add"></iron-icon>
                        Create an account
                    </a>
                </div>
            </div>
        `;
    }
}

customElements.define('tfg-accounts-menu', TFGAccountsMenu);