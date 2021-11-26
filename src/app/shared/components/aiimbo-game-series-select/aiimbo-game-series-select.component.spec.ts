import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiimboGameSeriesSelectComponent } from './aiimbo-game-series-select.component';

fdescribe('AiimboGameSeriesSelectComponent', () => {
  let component: AiimboGameSeriesSelectComponent;
  let fixture: ComponentFixture<AiimboGameSeriesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiimboGameSeriesSelectComponent ]
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
    expect(component.selectGameSeries).toBeDefined();
    expect(component.selectedEvent).toBeDefined();
  });
});
