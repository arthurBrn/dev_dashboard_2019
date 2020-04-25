import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfGraphComponent } from './conf-graph.component';

describe('ConfGraphComponent', () => {
  let component: ConfGraphComponent;
  let fixture: ComponentFixture<ConfGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
