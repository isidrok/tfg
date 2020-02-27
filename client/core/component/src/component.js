import { LitElement, html as litHtml } from 'lit-element';

class Component extends LitElement {
    static css(...styleSheets){
        return styleSheets.map((styleSheet) => {
            return { styleSheet };
        });
    }
    get html(){
        return litHtml;
    }
}

export {
    Component
}