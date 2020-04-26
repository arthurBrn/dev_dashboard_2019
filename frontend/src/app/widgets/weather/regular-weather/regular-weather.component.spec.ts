import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularWeatherComponent } from './regular-weather.component';

describe('RegularWeatherComponent', () => {
  let component: RegularWeatherComponent;
  let fixture: ComponentFixture<RegularWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
