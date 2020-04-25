import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirqualitycurrentComponent } from './airqualitycurrent.component';

describe('AirqualitycurrentComponent', () => {
  let component: AirqualitycurrentComponent;
  let fixture: ComponentFixture<AirqualitycurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirqualitycurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirqualitycurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
