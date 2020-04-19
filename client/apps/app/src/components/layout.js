import {LitElement, html} from 'lit-element';
import '@vaadin/vaadin-app-layout';


class TFGAppLayout extends LitElement {
    render() {
        return html`
            <vaadin-app-layout>
                <slot name="header" slot="navbar"></slot>
                <slot name="menu" slot="drawer"></slot>
                <slot></slot>
            </vaadin-app-layout>
        `
    }
}

customElements.define('tfg-app-layout', TFGAppLayout);