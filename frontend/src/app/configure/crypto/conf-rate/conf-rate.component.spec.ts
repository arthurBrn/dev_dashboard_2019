import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfRateComponent } from './conf-rate.component';

describe('ConfRateComponent', () => {
  let component: ConfRateComponent;
  let fixture: ComponentFixture<ConfRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
