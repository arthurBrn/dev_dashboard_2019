import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeathercurrentComponent } from './weathercurrent.component';

describe('WeathercurrentComponent', () => {
  let component: WeathercurrentComponent;
  let fixture: ComponentFixture<WeathercurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeathercurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeathercurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
