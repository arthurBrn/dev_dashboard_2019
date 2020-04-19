import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateExchangeComponent } from './rate-exchange.component';

describe('RateExchangeComponent', () => {
  let component: RateExchangeComponent;
  let fixture: ComponentFixture<RateExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
