import {Component} from '@tfg-core/component';
import {mask} from '@tfg-core/format/mask';
import summaryCSS from './summary.css';
class TFGCardsSummary extends Component {
  static properties = {
    card: {type: Object},
  };
  static styles = summaryCSS;

  render() {
    return this.html`
            <div class="summary">
                <p>${mask(this.card.number, 12)}</p>
                <p>${this.card.type}</p>
            </div>
        `;
  }
}

customElements.define('tfg-cards-summary', TFGCardsSummary);
