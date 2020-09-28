import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFlightsComponent } from './view-flights.component';

describe('ViewFlightsComponent', () => {
  let component: ViewFlightsComponent;
  let fixture: ComponentFixture<ViewFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
