import {Component} from '@tfg-core/component';
import {layout} from '@tfg-style/layout';
import { createRouter } from './app.router';
import {MENU_ITEMS} from './menu-items';
import './components/layout';
import './components/menu';
import './components/header';

class TFGApp extends Component {
  static get styles(){
    return this.css(layout);
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this._router = createRouter(this.renderRoot.getElementById('outlet'));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._router.dispose();
  }
  render() {
    return this.html`
      <tfg-app-layout>
        <tfg-app-header class="fill-width" slot="header"></tfg-app-header>
        <tfg-app-menu slot="menu" .items=${MENU_ITEMS}></tfg-app-menu>
        <main id="outlet"></main>
      </tfg-app-layout>
    `;
  }
}

customElements.define('tfg-app', TFGApp);