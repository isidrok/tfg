import {Component} from '@tfg-core/component';
import './summary';

class TFGAccountsList extends Component {
  render() {
    return this.html`
      <tfg-accounts-list-summary></tfg-accounts-list-summary>
    `;
  }
}

customElements.define('tfg-accounts-list', TFGAccountsList);