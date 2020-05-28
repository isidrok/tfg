import {Component} from '@tfg-core/component';
import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-icon-button';

class TFGAppHeader extends Component {
  _onNavIconClick() {
    this.fire('toggle');
  }
  render() {
    return this.html`
            <mwc-top-app-bar-fixed ?centerTitle=${true} @MDCTopAppBar:nav=${
      this._onNavIconClick
    }>
                <mwc-icon-button slot="navigationIcon" icon="menu"></mwc-icon-button>
                    <h1 slot="title">TFG Baank</h1>
            </mwc-top-app-bar-fixed>
        `;
  }
}

customElements.define('tfg-app-header', TFGAppHeader);
