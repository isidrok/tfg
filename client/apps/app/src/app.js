import { LitElement, html, css } from 'lit-element';
import './components/layout';
import './components/menu';
import './components/header';
import { createRouter } from './app.router';
import {MENU_ITEMS} from './menu-items';

class TFGApp extends LitElement {
  static get styles(){
    return css`
      .app-header {
        width: 100%;
      }
    `;
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
    return html`
      <tfg-app-layout>
        <tfg-app-header class="app-header" slot="header"></tfg-app-header>
        <tfg-app-menu slot="menu" .items=${MENU_ITEMS}></tfg-app-menu>
        <main id="outlet"></main>
      </tfg-app-layout>
    `;
  }
}

customElements.define('tfg-app', TFGApp);