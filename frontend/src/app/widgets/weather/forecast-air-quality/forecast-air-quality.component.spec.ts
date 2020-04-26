import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastAirQualityComponent } from './forecast-air-quality.component';

describe('ForecastAirQualityComponent', () => {
  let component: ForecastAirQualityComponent;
  let fixture: ComponentFixture<ForecastAirQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastAirQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastAirQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
