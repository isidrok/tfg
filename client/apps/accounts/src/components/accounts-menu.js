import {Component} from '@tfg-core/component';
import {layout} from '@tfg-style/layout';
import accountsMenuCSS from './accounts-menu.css';
import '@material/mwc-icon';

class TFGAccountsMenu extends Component {
  static styles = [layout, accountsMenuCSS];
  render() {
    return this.html`
            <div class="menu horizontal">
                <a class="menu__item" href="/accounts">
                    <mwc-icon class="menu__item__icon">list</mwc-icon>
                    <span class="menu__item__text">Show all</span>
                </a>
            </div>
        `;
  }
}

customElements.define('tfg-accounts-menu', TFGAccountsMenu);
