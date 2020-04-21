import { Component } from '@tfg-core/component';
import { appRouter } from '../app-router';

class TFGAppNotFound extends Component {
    static get properties() {
        return {
            routingContext: { type: Object }
        }; 
    }
    _goBack() {
        appRouter.navigate('/');
    }
    render() {
        return this.html`
          <h2>Page not found</h2>
          <p>Page ${this.routingContext.pathname} could not be found</p>
          <button @click=${this._goBack}>Take me home</button>
        `
    }
}

customElements.define('tfg-app-not-found', TFGAppNotFound);