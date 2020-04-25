import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirqualityforecastComponent } from './airqualityforecast.component';

describe('AirqualityforecastComponent', () => {
  let component: AirqualityforecastComponent;
  let fixture: ComponentFixture<AirqualityforecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirqualityforecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirqualityforecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
