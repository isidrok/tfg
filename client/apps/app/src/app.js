import {layout} from '@tfg-style/layout';
import {Component} from '@tfg-core/component';
import './app-router';
import './components/layout';
import './components/header/header';
import './components/menu/menu';

class TFGApp extends Component {
  static get styles(){
    return layout;
  } 
  render() {
    return this.html`
      <tfg-app-layout>
        <tfg-app-header class="fill-width" slot="header"></tfg-app-header>
        <tfg-app-menu slot="menu"></tfg-app-menu>
        <tfg-app-router></tfg-app-router>
      </tfg-app-layout>
    `;
  }
}

customElements.define('tfg-app', TFGApp);