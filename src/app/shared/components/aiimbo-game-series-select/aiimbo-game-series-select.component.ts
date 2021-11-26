import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

import {GameSeriesEnum} from "../../model/game-series.enum";

@Component({
  selector: 'app-aiimbo-game-series-select',
  templateUrl: './aiimbo-game-series-select.component.html',
  styleUrls: ['./aiimbo-game-series-select.component.scss']
})
export class AiimboGameSeriesSelectComponent implements OnInit {

  @Output() selectedEvent = new EventEmitter<number>();

  listGameSeriesKeys = Object.keys(GameSeriesEnum).filter(k => !isNaN(Number(k)));
  listGameSeries = GameSeriesEnum;
  selectGameSeries = new FormControl(null, Validators.required);

  ngOnInit(): void {
    this.selectGameSeries.valueChanges
      .subscribe(value => {
        this.selectedEvent.emit(value)
      })
  }

}
