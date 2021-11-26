import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-auto-unsubscribe',
  template: '',
  styles: []
})

/**
 * Questa funzionalità è uno dei tanti metodi per gestire il memory leak qunado si usa sottoscrittori (subscribe)
 */
export class AutoUnsubscribeComponent implements OnDestroy {
  protected subscriptions: Subscription[] = [];

  /**
   * Al distruggere del componente faccio unsubscribe di tutti i sottoscrittori presenti nell'array
   */
  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  /**
  * Array che contiene tutti i sottoscrittori
  */
  protected addSubscriptions(...subs: Subscription[]) {
    this.subscriptions.push(...subs);
  }

}
