import {Component} from '@tfg-core/component';
// import {mask} from '@tfg-core/format';
import summaryCSS from './summary.css';
class TFGCardsSummary extends Component {
  static properties = {
    card: {type: Object},
  };
  static styles = summaryCSS;

  // <p>${mask(this.card.number, 12)}</p>
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
