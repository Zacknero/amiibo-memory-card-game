import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {v1 as uuidv1} from 'uuid';

import {GameSeriesEnum} from "../model/game-series.enum";
import {AmiiboResponse} from "../model/amiibo-response";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * Contiene la base URL dell'API Game Series
   * @private
   */
  private basePath = 'https://amiiboapi.com/api/amiibo/?gameseries='

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Metodo che richiama le card in base alla tipologia selezionata passato come parametro typeGAme
   * @param typeGame
   */
  loadGameSeries(typeGame: GameSeriesEnum) {
    return this.httpClient.get<AmiiboResponse>(`${this.basePath}${GameSeriesEnum[typeGame]}`)
      .pipe(
        map((response: AmiiboResponse) => response ? response.amiibo.slice(0, 6) : []),
        map(list => list.filter(item => {
          item.match = false;
          item.show = false;
          item.id = uuidv1();
          return item;
        }))
      )
  }
}
