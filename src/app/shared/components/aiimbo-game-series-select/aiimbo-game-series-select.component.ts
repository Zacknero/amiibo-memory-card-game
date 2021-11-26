import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

import {GameSeriesEnum} from "../../../model/game-series.enum";
import {AutoUnsubscribeComponent} from "../auto-unsubscribe/auto-unsubscribe.component";

@Component({
  selector: 'app-aiimbo-game-series-select',
  templateUrl: './aiimbo-game-series-select.component.html',
  styleUrls: ['./aiimbo-game-series-select.component.scss']
})
export class AiimboGameSeriesSelectComponent extends AutoUnsubscribeComponent implements OnInit {

  /**
   * Variabile EventEmitter che serve ad emettere il valore verso il parent
   */
  @Output() selectedEvent = new EventEmitter<number>();

  /**
   * Array di keys dell'enum GameSeriesEnum per iterare la select box
   */
  listGameSeriesKeys = Object.keys(GameSeriesEnum).filter(k => !isNaN(Number(k)));
  /**
   * Variabile che contiene l'enum GameSeriesEnum per visualizzare il valore
   */
  listGameSeries = GameSeriesEnum;
  /**
   * FormControl per gestire la selectbox
   */
  selectGameSeriesCtrl = new FormControl(null, Validators.required);

  constructor() {
    super();
  }

  /**
   * Ancora del ciclo di vita di angular che gestisco il cambiamento della selectbox dove emetto il valore in output
   */
  ngOnInit(): void {
    this.addSubscriptions(
      this.selectGameSeriesCtrl.valueChanges
        .subscribe(value => {
          this.selectedEvent.emit(value)
        })
    )
  }

}
