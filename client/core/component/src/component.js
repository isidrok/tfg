import { LitElement, html as litHTML } from 'lit-element';

export class Component extends LitElement {
    static getStyles() {
        if (!this.styles) {
            return;
        }
        const styles = Array.isArray(this.styles) ? this.styles : [this.styles];
        return styles.map((styleSheet) => {
            return { styleSheet };
        });
    }
    constructor(){
        super();
        this.refs = {};
    }
    get html() {
        return litHTML;
    }
    updated(changedProperties){
        super.updated(changedProperties);
        this.renderRoot.querySelectorAll('[ref]').forEach((el) => {
            this.refs[el.getAttribute('ref')] = el;
        });
    }
    fire(type, data) {
        this.dispatchEvent(new CustomEvent(type, {
            bubbles: true,
            detail: data,
            composed: true
        }));
    }
}