import { LitElement, html as litHTML } from 'lit-element';

export class Component extends LitElement {
    static getStyles() {
        if(!this.styles){
            return;
        }
        const styles = Array.isArray(this.styles) ? this.styles : [this.styles];
        return styles.map((styleSheet) => {
            return { styleSheet };
        });
    }
    get html() {
        return litHTML;
    }
}