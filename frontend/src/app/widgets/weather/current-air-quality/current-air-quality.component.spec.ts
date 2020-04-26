import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAirQualityComponent } from './current-air-quality.component';

describe('CurrentAirQualityComponent', () => {
  let component: CurrentAirQualityComponent;
  let fixture: ComponentFixture<CurrentAirQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentAirQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentAirQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
