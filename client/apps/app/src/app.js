import { LitElement, html } from 'lit-element';

class TFGApp extends LitElement {
    render(){
        return html`
            <h1>App</h1>
        `
    }
}
customElements.define('tfg-app', TFGApp);