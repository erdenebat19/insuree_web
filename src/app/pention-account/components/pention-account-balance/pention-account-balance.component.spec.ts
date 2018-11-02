import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PentionAccountBalanceComponent } from './pention-account-balance.component';

describe('PentionAccountBalanceComponent', () => {
  let component: PentionAccountBalanceComponent;
  let fixture: ComponentFixture<PentionAccountBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PentionAccountBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PentionAccountBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
