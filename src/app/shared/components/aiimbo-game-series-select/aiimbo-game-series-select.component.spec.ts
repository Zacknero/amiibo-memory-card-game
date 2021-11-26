import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AiimboGameSeriesSelectComponent} from './aiimbo-game-series-select.component';

describe('AiimboGameSeriesSelectComponent', () => {
  let component: AiimboGameSeriesSelectComponent;
  let fixture: ComponentFixture<AiimboGameSeriesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiimboGameSeriesSelectComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiimboGameSeriesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.listGameSeries).toBeDefined();
    expect(component.listGameSeriesKeys).toBeDefined();
    expect(component.selectGameSeriesCtrl).toBeDefined();
    expect(component.selectedEvent).toBeDefined();
  });

  it('metodo OnInit', () => {
    spyOn(component.selectedEvent, 'emit');
    fixture.detectChanges();
    component.selectGameSeriesCtrl.setValue(0);
    component.ngOnInit()
    expect(component.selectedEvent.emit).toHaveBeenCalledWith(0)

    component.selectGameSeriesCtrl.setValue(null);
    component.ngOnInit()
    expect(component.selectedEvent.emit).toHaveBeenCalledWith(null)
  })

  describe('html test', () => {
    it('', () => {
      const el = fixture.debugElement.nativeElement;
      expect(el.querySelector('mat-form-field')).toBeDefined();

      expect(el.querySelector('mat-label').textContent).toContain('Seleziona il tipo di Game Series');

    })
  })
});
