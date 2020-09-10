import {Component} from '@tfg-core/component';
import summaryCSS from './summary.css';
class TFGCardsSummary extends Component {
  static properties = {
    card: {type: Object},
  };
  static styles = summaryCSS;
  render() {
    return this.html`
            <div class="summary">
                <p>${this.card.number}</p>
                <p>${this.card.type}</p>
            </div>
        `;
  }
}

customElements.define('tfg-cards-summary', TFGCardsSummary);
