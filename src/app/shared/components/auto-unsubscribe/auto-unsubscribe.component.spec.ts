import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from "rxjs";

import {AutoUnsubscribeComponent} from './auto-unsubscribe.component';

describe('AutoUnsubscribeComponent', () => {
  let component: AutoUnsubscribeComponent;
  let fixture: ComponentFixture<AutoUnsubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoUnsubscribeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoUnsubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component['subscriptions']).toEqual([])
  });

  it('metodo addSubscriptions', () => {
    component['addSubscriptions'](of([]).subscribe())
    expect(component['subscriptions'].length).toEqual(1)
  })
});
