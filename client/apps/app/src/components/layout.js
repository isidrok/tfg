import {Component} from '@tfg-core/component';
import '@vaadin/vaadin-app-layout';


class TFGAppLayout extends Component {
    render() {
        return this.html`
            <vaadin-app-layout>
                <slot name="header" slot="navbar"></slot>
                <slot name="menu" slot="drawer"></slot>
                <slot></slot>
            </vaadin-app-layout>
        `
    }
}

customElements.define('tfg-app-layout', TFGAppLayout);