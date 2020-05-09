import { Component } from '@tfg-core/component';
import { store } from '@tfg-core/store';
import { appStore } from './app-store';
import { appRouter } from './app-router';
import appCSS from './app.css';
import './components/layout/layout';

class TFGApp extends Component {
  static styles = appCSS;

  async connectedCallback() {
    super.connectedCallback();
    store.register(appStore);
    await this.updateComplete;
    appRouter.start(this.renderRoot.getElementById('outlet'));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    store.unregister(appStore);
    appRouter.stop();
  }
  render() {
    return this.html`
      <tfg-app-layout>
        <main id="outlet" class="app"></main>
      </tfg-app-layout>
    `;
  }
}

customElements.define('tfg-app', TFGApp);