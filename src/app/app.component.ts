import {Component} from '@angular/core';
import {ApiService} from "./services/api.service";

import {Amiibo} from "./model/amiibo";
import {shuffle} from "./utility/pure.function";
import {AutoUnsubscribeComponent} from "./shared/components/auto-unsubscribe/auto-unsubscribe.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AutoUnsubscribeComponent {

  /**
   * Array contatore per gestire le carte aperte
   */
  openedCards = new Array<Amiibo>()
  /**
   * Array che accumula tutte le carte scoperte e uguali
   */
  matchedCard = new Array<Amiibo>()
  /**
   * Array di carte da gioco mescolate
   */
  cards = new Array<Amiibo>()
  /**
   * Variabile numerico del tipo di game series selezionato e utilizzato anche per visualizzare o meno il tavolo da gioco
   */
  gameSeriesSelected = null

  constructor(private apiService: ApiService) {
    super();
  }

  /**
   * Funzione che gestisce la chiamata per caricare le carte in base al tipo di game series
   * @private
   */
  private loadGameSeriesCard() {
    this.cards = [];
    this.addSubscriptions(
      this.apiService.loadGameSeries(this.gameSeriesSelected)
        .subscribe(
          list => this.startGame([...list, ...JSON.parse(JSON.stringify(list))])
        )
    )
  }

  /**
   * Evento che riceve da input dal componente figlio il valore della select selezionata
   * @param value
   */
  seriesSelected(value) {
    this.gameSeriesSelected = value;
    if (this.gameSeriesSelected) {
      this.loadGameSeriesCard()
    }
  }

  /**
   * Funzione che prepara il gioco prima mescolando le carte e successivamente dispone nel tavolo
   * @param listSeries
   */
  startGame(listSeries: Amiibo[]) {
    this.cards = shuffle(listSeries);
  }

  /**
   * Funzione che gestisce il click delle carte dove mostra l'immagine e verfica il confronto delle due carte se è
   * cliccata la seconda carta. Con l'esito del match si gestisce il match o unmatch
   * @param card
   */
  cardOpen(card: Amiibo) {
    if (!card.match && !card.show) {
      this.openedCards.push(card);
      card.show = true;
      let len = this.openedCards.length;
      if (len === 2) {
        if (this.openedCards[0].id === this.openedCards[1].id) {
          this.matched();
        } else {
          setTimeout(() => {
            this.unmatched();
          }, 500)
        }
      }
    }
  };

  /**
   * Funzione che gestisce le carte uguali e aggiorna l'array delle carte identiche
   */
  matched() {
    this.openedCards[0].match = true;
    this.openedCards[1].match = true;
    this.matchedCard.push(...this.openedCards);
    this.openedCards = [];
  }

  /**
   * Funzione che gestisce le card NON uguali che resetta le carte aperte
   */
  unmatched() {
    this.openedCards[0].show = false;
    this.openedCards[1].show = false;
    this.openedCards = [];
  }

  /**
   * Evento gestito dal bottone che permette ri rigiocre richiamdndo la funzione loadGameSeriesCard()
   */
  reloadGame() {
    this.loadGameSeriesCard()
  }
}
