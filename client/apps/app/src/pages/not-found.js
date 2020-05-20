import {Component} from '@tfg-core/component';
import {appRouter} from '../app-router';
import notFoundCSS from './not-found.css';
import '@material/mwc-button';
import '@material/mwc-icon';

class TFGAppNotFound extends Component {
  static styles = notFoundCSS;
  static properties = {
    routingContext: {type: Object},
  };
  _goBack() {
    appRouter.navigate('/');
  }
  render() {
    return this.html`
            <div class="not-found__title">
                <h2>Page not found</h2>
                <mwc-icon class="not-found__icon">warning</mwc-icon>
            </div>
            <p>The page <b>${this.routingContext.wild}</b> could not be found</p>
            <mwc-button autoFocus raised icon="home" @click=${this._goBack}>Take me home</mwc-button>
        `;
  }
}

customElements.define('tfg-app-not-found', TFGAppNotFound);
