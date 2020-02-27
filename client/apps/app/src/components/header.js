import {Component} from '@tfg-core/component';
import {layout} from '@tfg-style/layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import bank from './bank.svg';
import headerCSS from './header.css';

class TFGAppHeader extends Component {
    static get styles(){
        return this.css(headerCSS, layout);
    }
    render() {
        return this.html`
            <header class="horizontal fill-width header">
                <vaadin-drawer-toggle></vaadin-drawer-toggle>
                <div class="horizontal fill-width header__content">
                    <img class="header__image" src="${bank}" />
                    <h1 class="header__title">TFG BANK</h1>
                    <img class="header__image" src="${bank}" />
                </div>
            </header>
        `
    }
}

customElements.define('tfg-app-header', TFGAppHeader);