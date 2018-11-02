import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PentionAccountBalanceGraphComponent } from './pention-account-balance-graph.component';

describe('PentionAccountBalanceGraphComponent', () => {
  let component: PentionAccountBalanceGraphComponent;
  let fixture: ComponentFixture<PentionAccountBalanceGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PentionAccountBalanceGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PentionAccountBalanceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
