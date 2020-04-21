import { layout } from '@tfg-style/layout';
import { Component } from '@tfg-core/component';
import { appRouter } from './app-router';
import './components/layout';
import './components/header/header';
import './components/menu/menu';

class TFGApp extends Component {
  static get styles() {
    return layout;
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    appRouter.start(this.renderRoot.getElementById('outlet'));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    appRouter.stop();
  }
  render() {
    return this.html`
      <tfg-app-layout>
        <tfg-app-header class="fill-width" slot="header"></tfg-app-header>
        <tfg-app-menu slot="menu"></tfg-app-menu>
        <main id="outlet"></main>
      </tfg-app-layout>
    `;
  }
}

customElements.define('tfg-app', TFGApp);