import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {shuffle} from "./utility/pure.function";
import {ApiService} from "./services/api.service";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";

const listCards = [
  {
    amiiboSeries: 'Pippo',
    character: '',
    gameSeries: '',
    head: '',
    image: 'pippo.jpg',
    name: '',
    release: null,
    tail: '',
    type: '',
    show: false,
    match: false,
    id: '1'
  },
  {
    amiiboSeries: 'Pluto',
    character: '',
    gameSeries: '',
    head: '',
    image: 'pluto.jpg',
    name: '',
    release: null,
    tail: '',
    type: '',
    show: false,
    match: false,
    id: '2'
  }
]
const fakeApiService = jasmine.createSpyObj<ApiService>('ApiService', {
  loadGameSeries: of(listCards),
});

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        HttpClient,
        HttpHandler,
        {provide: ApiService, useValue: fakeApiService},
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
    expect(component.openedCards).toBeDefined();
    expect(component.matchedCard).toBeDefined();
    expect(component.cards).toBeDefined();
    expect(component.gameSeriesSelected).toBe(null)
  });

  it('metodo private', () => {
    spyOn<any>(component, 'loadGameSeriesCard')
    component.gameSeriesSelected = 0;
    component['loadGameSeriesCard']();
    expect(component.cards.length).toEqual(0);
  })

  it('metodo startGame', () => {
    const shuffled = shuffle(listCards);
    component.startGame(listCards)
    expect(component.cards).toEqual(shuffled)
  })

  describe('', () => {
    it('metodo cardOpen', () => {
      /*test con una carta aperta*/
      component.openedCards = [];
      component.cardOpen(listCards[0])
      expect(component.openedCards.length).toEqual(1)
      /*test con due carte aperte*/
      component.openedCards = listCards
      expect(component.openedCards.length).toEqual(2)

      const card = {
        amiiboSeries: 'Pippo',
        character: '',
        gameSeries: '',
        head: '',
        image: 'pippo.jpg',
        name: '',
        release: null,
        tail: '',
        type: '',
        show: true,
        match: true,
        id: '1'
      };

      let card1 = {
        amiiboSeries: 'Pluto',
        character: '',
        gameSeries: '',
        head: '',
        image: 'pippo.jpg',
        name: '',
        release: null,
        tail: '',
        type: '',
        show: false,
        match: false,
        id: '1'
      }

      /*test con card aperta*/
      component.openedCards = [];
      component.cardOpen(card)
      expect(component.openedCards.length).toEqual(0)

      /*test match*/
      component.openedCards = [card]
      spyOn(component, 'matched')
      component.cardOpen(card1);
      expect(component.matched).toHaveBeenCalled();
    })
  })

  it('metodo matched', () => {
    component.openedCards = listCards;
    component.matched();
    expect(component.matchedCard.length).toEqual(2)
    expect(component.openedCards.length).toEqual(0)
  })

  it('metodo unmatched', () => {
    component.openedCards = listCards;
    component.unmatched();
    expect(component.matchedCard.length).toEqual(0)
    expect(component.openedCards.length).toEqual(0)
  })

  it('metodo reloadGame', () => {
    spyOn<any>(component, 'loadGameSeriesCard');
    component.reloadGame()
    expect(component['loadGameSeriesCard']).toHaveBeenCalled()
  })

  it('metodo openCard con richiamo metodo unmatch', fakeAsync(() => {
    component.openedCards = [];
    const card = {
      amiiboSeries: 'Pippo',
      character: '',
      gameSeries: '',
      head: '',
      image: 'pippo.jpg',
      name: '',
      release: null,
      tail: '',
      type: '',
      show: true,
      match: true,
      id: '1'
    };

    let card1 = {
      amiiboSeries: 'Pluto',
      character: '',
      gameSeries: '',
      head: '',
      image: 'pippo.jpg',
      name: '',
      release: null,
      tail: '',
      type: '',
      show: false,
      match: false,
      id: '3'
    }

    component.openedCards = [card]
    spyOn<any>(component, 'unmatched');
    component.cardOpen(card1);
    tick(600);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.unmatched).toHaveBeenCalled();
    });
  }));

  it('metodo loadGameSeriesCard async', fakeAsync(() => {
    spyOn<any>(component, 'loadGameSeriesCard')
    component['loadGameSeriesCard']();
    fakeApiService.loadGameSeries(0).subscribe(x => {
      expect(x).toBe(listCards);
    });
  }));

  describe('html test', () => {
    it('h1 element', () => {
      const el = fixture.debugElement.nativeElement;
      expect(el.querySelector('h1')).toBeDefined();

      expect(el.querySelector('h1').textContent).toContain('AIIMBO MEMORY CARD GAME');
    })

    it('app-aiimbo-game-series-select element', () => {
      const el = fixture.debugElement.nativeElement;
      expect(el.querySelector('app-aiimbo-game-series-select')).toBeDefined();
    })

    it('button element', () => {
      const el = fixture.debugElement.nativeElement;
      expect(el.querySelector('button')).toBeDefined();
      expect(el.querySelector('button').textContent).toContain('Ricomincia');
    })

    it("button is disabled", () => {
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css("button"));
      expect(button.nativeElement.disabled).toBeTruthy();
    });

    it("button is enabled", () => {
      component.gameSeriesSelected = 1;
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css("button"));
      expect(button.nativeElement.disabled).toBeFalsy();
    });

    it("button submit active", () => {
      component.gameSeriesSelected = 2;
      fixture.detectChanges();
      spyOn(component, "reloadGame");
      const button = fixture.debugElement.query(By.css("button")).nativeElement;
      button.click();
      expect(component.reloadGame).toHaveBeenCalledTimes(1);
    });

    it("button submit not active", () => {
      component.gameSeriesSelected = null;
      fixture.detectChanges();
      spyOn(component, "reloadGame");
      const button = fixture.debugElement.query(By.css("button")).nativeElement;
      button.click();
      expect(component.reloadGame).toHaveBeenCalledTimes(0);
    });

    it("table element", () => {
      component.gameSeriesSelected = 1;
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".table"));
      expect(el).toBeDefined()
    });

    it("game-card element", () => {
      component.gameSeriesSelected = 1;
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".game-card"));
      expect(el).toBeDefined()
    });
  })
});
