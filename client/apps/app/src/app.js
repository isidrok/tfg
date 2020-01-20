import { LitElement, html } from 'lit-element';
import './components/layout';
import './components/menu';
import { createRouter } from './app.router';
import {MENU_ITEMS} from './menu-items';

class TFGApp extends LitElement {
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
    return html`
      <tfg-app-layout>
        <tfg-app-menu slot="menu" .items=${MENU_ITEMS}></tfg-app-menu>
        <div class="content">
          <h1>App</h1>
          <main id="outlet"></main>
        </div>  
      </tfg-app-layout>
    `;
  }
}

customElements.define('tfg-app', TFGApp);