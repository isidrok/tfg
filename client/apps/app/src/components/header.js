import { LitElement, html, css } from 'lit-element';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import bank from './bank.svg';


class TFGAppHeader extends LitElement {
    static get styles(){
        return css`
            .header {
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100%; 
            }
            .header__content {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                width: 100%; 
            }
            .header__image {
                height: 3rem;
            }
            .header__title{
                padding-right: 1rem;
                padding-left: 1rem;
            }
        `
    }
    render() {
        return html`
            <header class="header">
                <vaadin-drawer-toggle></vaadin-drawer-toggle>
                <div class="header__content">
                    <img class="header__image" src="${bank}" />
                    <h1 class="header__title">TFG BANK</h1>
                    <img class="header__image" src="${bank}" />
                </div>
            </header>
        `
    }
}

customElements.define('tfg-app-header', TFGAppHeader);