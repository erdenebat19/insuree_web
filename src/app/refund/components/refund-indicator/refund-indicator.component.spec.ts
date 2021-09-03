import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundIndicatorComponent } from './refund-indicator.component';

describe('RefundIndicatorComponent', () => {
  let component: RefundIndicatorComponent;
  let fixture: ComponentFixture<RefundIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
