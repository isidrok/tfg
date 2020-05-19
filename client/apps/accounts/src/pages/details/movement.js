import { Component } from '@tfg-core/component';
import '@material/mwc-icon';
import movementCSS from './movement.css';

class TFGAccountsMovement extends Component {
    static styles = movementCSS;
    static get properties() {
        return {
            movement: { type: Object }
        };
    }
    _renderIcon() {
        if (this.movement.type === 1) {
            return this.html`<mwc-icon class="movement__icon movement__icon--up">trending_up</mwc-icon>`;
        }
        return this.html`<mwc-icon class="movement__icon movement__icon--down">trending_down</mwc-icon>`;
    }
    render() {
        const { concept, type, ammount } = this.movement;
        return this.html`
        <div class="movement">
            ${this._renderIcon()}
            <span>${concept}</span>
            <span>${type === 0 && '-' || ''}${ammount} €</span>
        </div>
    `;
    }
}

customElements.define('tfg-accounts-movement', TFGAccountsMovement);